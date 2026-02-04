import { cn } from "@/lib/utils";

interface ConfidenceMeterProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export function ConfidenceMeter({
  score,
  size = "md",
  showLabel = true,
  className,
}: ConfidenceMeterProps) {
  const percentage = Math.round(score * 100);
  const normalizedScore = Math.min(Math.max(score, 0), 1);

  const getColor = () => {
    if (normalizedScore >= 0.8) return "from-green-500 to-emerald-500";
    if (normalizedScore >= 0.6) return "from-yellow-500 to-orange-500";
    return "from-red-500 to-rose-500";
  };

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {showLabel && (
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">Confidence</span>
          <span className={cn(
            "font-mono font-semibold",
            size === "sm" && "text-sm",
            size === "md" && "text-base",
            size === "lg" && "text-lg"
          )}>
            {normalizedScore.toFixed(2)}
          </span>
        </div>
      )}
      <div
        className={cn(
          "relative w-full rounded-full bg-muted overflow-hidden",
          size === "sm" && "h-1.5",
          size === "md" && "h-2",
          size === "lg" && "h-3"
        )}
      >
        <div
          className={cn("h-full rounded-full bg-gradient-to-r transition-all duration-500", getColor())}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
