import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "strong" | "card";
}

const GlassPanel = ({ children, className, variant = "default" }: GlassPanelProps) => {
  const variantClass = {
    default: "glass",
    strong: "glass-strong",
    card: "glass-card",
  }[variant];

  return (
    <div className={cn(variantClass, "rounded-2xl p-6", className)}>
      {children}
    </div>
  );
};

export default GlassPanel;
