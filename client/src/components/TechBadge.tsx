import { cn } from "@/lib/utils";

interface TechBadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "accent";
}

export function TechBadge({ children, className, variant = "default" }: TechBadgeProps) {
  const variants = {
    default: "bg-secondary text-secondary-foreground border-transparent",
    outline: "bg-transparent border-primary/20 text-primary hover:border-primary/50",
    accent: "bg-primary/10 text-primary border-primary/20",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 font-mono",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
