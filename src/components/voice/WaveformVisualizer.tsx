import { cn } from "@/lib/utils";

interface WaveformVisualizerProps {
  isActive?: boolean;
  className?: string;
  barCount?: number;
}

export function WaveformVisualizer({
  isActive = false,
  className,
  barCount = 12,
}: WaveformVisualizerProps) {
  return (
    <div className={cn("flex items-end justify-center gap-1 h-12", className)}>
      {Array.from({ length: barCount }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "w-1 rounded-full bg-gradient-to-t from-primary to-accent transition-all duration-300",
            isActive ? "waveform-bar" : "h-2"
          )}
          style={{
            height: isActive ? `${20 + Math.random() * 80}%` : "8px",
            animationDelay: `${i * 80}ms`,
          }}
        />
      ))}
    </div>
  );
}
