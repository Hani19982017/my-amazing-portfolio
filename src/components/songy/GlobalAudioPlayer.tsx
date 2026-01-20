import { useAudioPlayer } from "@/contexts/AudioPlayerContext";
import { Play, Pause, X, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState, useRef } from "react";

export const GlobalAudioPlayer = () => {
  const {
    isPlaying,
    isPlayerVisible,
    currentTime,
    duration,
    toggle,
    seek,
    closePlayer,
    audioRef,
  } = useAudioPlayer();

  const [bars, setBars] = useState<number[]>(Array(20).fill(10));
  const animationRef = useRef<number>();
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  useEffect(() => {
    if (!isPlayerVisible || !audioRef.current) return;

    // Setup audio context and analyser only once
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 64;
      sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
      sourceRef.current.connect(analyserRef.current);
      analyserRef.current.connect(audioContextRef.current.destination);
    }

    const analyser = analyserRef.current;
    if (!analyser) return;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const animate = () => {
      if (!isPlaying) {
        setBars(Array(20).fill(10));
        return;
      }

      analyser.getByteFrequencyData(dataArray);
      const newBars = Array(20)
        .fill(0)
        .map((_, i) => {
          const value = dataArray[i] || 0;
          return Math.max(10, (value / 255) * 100);
        });
      setBars(newBars);
      animationRef.current = requestAnimationFrame(animate);
    };

    if (isPlaying) {
      audioContextRef.current?.resume();
      animate();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, isPlayerVisible, audioRef]);

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (!isPlayerVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-lg">
      {/* Stereo Visualizer Background */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="flex items-end justify-center gap-1 h-64 w-full max-w-2xl px-4">
          {bars.map((height, index) => (
            <div
              key={index}
              className="flex-1 max-w-4 rounded-t-full transition-all duration-75"
              style={{
                height: `${height}%`,
                background: `linear-gradient(to top, hsl(var(--primary)), hsl(var(--accent)))`,
                opacity: 0.6 + (height / 100) * 0.4,
                boxShadow: isPlaying ? `0 0 ${height / 5}px hsl(var(--primary) / 0.5)` : "none",
              }}
            />
          ))}
        </div>
      </div>

      {/* Close Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={closePlayer}
        className="absolute top-4 right-4 z-10 text-foreground hover:bg-muted rounded-full"
      >
        <X className="w-6 h-6" />
      </Button>

      {/* Player Controls */}
      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-md px-6">
        {/* Album Art / Icon */}
        <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl glow-primary">
          <Volume2 className="w-20 h-20 text-primary-foreground" />
        </div>

        {/* Song Info */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-1">أغنية مخصصة</h2>
          <p className="text-muted-foreground">SONGY</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full space-y-2">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.1}
            onValueChange={(value) => seek(value[0])}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Play/Pause Button */}
        <Button
          onClick={() => toggle()}
          size="lg"
          className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg glow-primary"
        >
          {isPlaying ? (
            <Pause className="w-10 h-10 text-primary-foreground" />
          ) : (
            <Play className="w-10 h-10 text-primary-foreground ms-1" />
          )}
        </Button>
      </div>
    </div>
  );
};
