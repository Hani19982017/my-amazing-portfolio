import { useAudioPlayer } from "@/contexts/AudioPlayerContext";
import { Play, Pause, X, SkipBack, SkipForward } from "lucide-react";
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

  const [bars, setBars] = useState<number[]>(Array(30).fill(10));
  const [rotation, setRotation] = useState(0);
  const animationRef = useRef<number>();
  const rotationRef = useRef<number>();
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
        setBars(Array(30).fill(10));
        return;
      }

      analyser.getByteFrequencyData(dataArray);
      const newBars = Array(30)
        .fill(0)
        .map((_, i) => {
          const value = dataArray[i] || 0;
          return Math.max(8, (value / 255) * 100);
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

  // Vinyl rotation animation
  useEffect(() => {
    const rotateVinyl = () => {
      if (isPlaying) {
        setRotation((prev) => (prev + 0.5) % 360);
        rotationRef.current = requestAnimationFrame(rotateVinyl);
      }
    };

    if (isPlaying) {
      rotateVinyl();
    }

    return () => {
      if (rotationRef.current) {
        cancelAnimationFrame(rotationRef.current);
      }
    };
  }, [isPlaying]);

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (!isPlayerVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-b from-background via-background/98 to-background">
      {/* Close Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={closePlayer}
        className="absolute top-4 right-4 z-10 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full"
      >
        <X className="w-6 h-6" />
      </Button>

      {/* Title */}
      <p className="text-muted-foreground text-sm tracking-widest mb-8 uppercase">Today's Mood</p>

      {/* Vinyl Record Container */}
      <div className="relative w-72 h-72 mb-8">
        {/* Glassmorphism background */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-muted/30 to-muted/10 backdrop-blur-xl border border-white/10 shadow-2xl" />
        
        {/* Vinyl Record */}
        <div className="absolute inset-4 flex items-center justify-center">
          <div
            className="relative w-56 h-56 rounded-full shadow-2xl"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {/* Outer vinyl grooves */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 border-4 border-zinc-700/50">
              {/* Groove rings */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full border border-zinc-700/30"
                  style={{
                    inset: `${12 + i * 8}px`,
                  }}
                />
              ))}
            </div>
            
            {/* Red label center */}
            <div className="absolute inset-[35%] rounded-full bg-gradient-to-br from-red-600 via-red-500 to-red-700 flex items-center justify-center shadow-inner">
              {/* Center hole */}
              <div className="w-3 h-3 rounded-full bg-zinc-900 shadow-inner" />
            </div>
            
            {/* Shine effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
          </div>
        </div>
      </div>

      {/* Song Info */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-1">My Music</h2>
        <p className="text-muted-foreground text-sm">Love Song</p>
      </div>

      {/* Progress Bar with Visualizer */}
      <div className="w-full max-w-sm px-6 mb-6">
        {/* Time and Progress */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs text-muted-foreground w-10 text-right">{formatTime(currentTime)}</span>
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.1}
            onValueChange={(value) => seek(value[0])}
            className="flex-1"
          />
          <span className="text-xs text-muted-foreground w-10">{formatTime(duration)}</span>
        </div>

        {/* Animated Visualizer Bars */}
        <div className="flex items-end justify-center gap-[2px] h-16">
          {bars.map((height, index) => (
            <div
              key={index}
              className="flex-1 max-w-[6px] rounded-t-sm transition-all duration-75"
              style={{
                height: `${height}%`,
                background: `linear-gradient(to top, hsl(var(--primary)), hsl(var(--primary) / 0.6))`,
                opacity: 0.7 + (height / 100) * 0.3,
              }}
            />
          ))}
        </div>
      </div>

      {/* Playback Controls */}
      <div className="flex items-center justify-center gap-8">
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 text-foreground hover:text-foreground hover:bg-muted/50 rounded-full"
        >
          <SkipBack className="w-6 h-6" fill="currentColor" />
        </Button>

        <Button
          onClick={() => toggle()}
          size="lg"
          className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/30"
        >
          {isPlaying ? (
            <Pause className="w-7 h-7" fill="currentColor" />
          ) : (
            <Play className="w-7 h-7 ms-1" fill="currentColor" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 text-foreground hover:text-foreground hover:bg-muted/50 rounded-full"
        >
          <SkipForward className="w-6 h-6" fill="currentColor" />
        </Button>
      </div>
    </div>
  );
};
