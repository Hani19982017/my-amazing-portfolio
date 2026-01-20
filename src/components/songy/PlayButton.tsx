import { Play, Pause } from "lucide-react";
import { useAudioPlayer } from "@/contexts/AudioPlayerContext";
import { cn } from "@/lib/utils";

interface PlayButtonProps {
  songUrl?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const PlayButton = ({ songUrl, size = "md", className }: PlayButtonProps) => {
  const { isPlaying, isPlayerVisible, toggle } = useAudioPlayer();

  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-14 h-14",
    lg: "w-20 h-20",
  };

  const iconSizes = {
    sm: "w-5 h-5",
    md: "w-7 h-7",
    lg: "w-10 h-10",
  };

  const handleClick = () => {
    toggle(songUrl);
  };

  const showPause = isPlaying && isPlayerVisible;

  return (
    <button
      onClick={handleClick}
      className={cn(
        "rounded-full bg-primary flex items-center justify-center",
        "hover:scale-105 transition-transform duration-200",
        "shadow-lg glow-primary",
        sizeClasses[size],
        className
      )}
    >
      {showPause ? (
        <Pause className={cn("text-primary-foreground", iconSizes[size])} />
      ) : (
        <Play className={cn("text-primary-foreground ms-0.5", iconSizes[size])} />
      )}
    </button>
  );
};
