import { cn } from "@/lib/utils";

interface LanguageBadgeProps {
  language: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const languageColors: Record<string, string> = {
  Tamil: "from-orange-500/20 to-red-500/20 border-orange-500/30 text-orange-300",
  English: "from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-300",
  Hindi: "from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-300",
  Malayalam: "from-purple-500/20 to-violet-500/20 border-purple-500/30 text-purple-300",
  Telugu: "from-pink-500/20 to-rose-500/20 border-pink-500/30 text-pink-300",
};

export function LanguageBadge({ language, className, size = "md" }: LanguageBadgeProps) {
  const colors = languageColors[language] || "from-gray-500/20 to-gray-600/20 border-gray-500/30 text-gray-300";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-gradient-to-r border font-medium",
        colors,
        size === "sm" && "px-2 py-0.5 text-xs",
        size === "md" && "px-3 py-1 text-sm",
        size === "lg" && "px-4 py-1.5 text-base",
        className
      )}
    >
      {language}
    </span>
  );
}
