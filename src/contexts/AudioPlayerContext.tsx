import { createContext, useContext, useState, useRef, ReactNode, useEffect } from "react";

interface AudioPlayerContextType {
  isPlaying: boolean;
  isPlayerVisible: boolean;
  currentTime: number;
  duration: number;
  play: (songUrl?: string) => void;
  pause: () => void;
  toggle: (songUrl?: string) => void;
  seek: (time: number) => void;
  closePlayer: () => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export const AudioPlayerProvider = ({ children }: { children: ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentSongUrl, setCurrentSongUrl] = useState<string>("/audio/demo-song.wav");
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("durationchange", handleDurationChange);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("durationchange", handleDurationChange);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const play = (songUrl?: string) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (songUrl && songUrl !== currentSongUrl) {
      setCurrentSongUrl(songUrl);
      audio.src = songUrl;
    }

    setIsPlayerVisible(true);
    audio.play();
    setIsPlaying(true);
  };

  const pause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const toggle = (songUrl?: string) => {
    if (isPlaying) {
      pause();
    } else {
      play(songUrl);
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const closePlayer = () => {
    pause();
    setIsPlayerVisible(false);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
    setCurrentTime(0);
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        isPlaying,
        isPlayerVisible,
        currentTime,
        duration,
        play,
        pause,
        toggle,
        seek,
        closePlayer,
        audioRef,
      }}
    >
      <audio ref={audioRef} src={currentSongUrl} preload="metadata" />
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error("useAudioPlayer must be used within an AudioPlayerProvider");
  }
  return context;
};
