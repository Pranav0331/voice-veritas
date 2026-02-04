import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

interface ClassificationBadgeProps {
  classification: "AI_GENERATED" | "HUMAN";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ClassificationBadge({
  classification,
  size = "md",
  className,
}: ClassificationBadgeProps) {
  const isAI = classification === "AI_GENERATED";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-lg font-semibold",
        isAI
          ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300"
          : "bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-300",
        size === "sm" && "px-2 py-1 text-xs",
        size === "md" && "px-3 py-1.5 text-sm",
        size === "lg" && "px-4 py-2 text-base",
        className
      )}
    >
      {isAI ? (
        <Bot className={cn(
          size === "sm" && "w-3 h-3",
          size === "md" && "w-4 h-4",
          size === "lg" && "w-5 h-5"
        )} />
      ) : (
        <User className={cn(
          size === "sm" && "w-3 h-3",
          size === "md" && "w-4 h-4",
          size === "lg" && "w-5 h-5"
        )} />
      )}
      {isAI ? "AI Generated" : "Human"}
    </div>
  );
}
