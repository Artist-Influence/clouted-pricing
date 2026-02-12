import { cn } from "@/lib/utils";

interface PricingCardProps {
  label: string;
  price: string;
  detail?: string;
  featured?: boolean;
  className?: string;
}

const PricingCard = ({ label, price, detail, featured, className }: PricingCardProps) => {
  return (
    <div
      className={cn(
        "glass-card rounded-xl p-4 flex flex-col gap-1",
        featured && "ring-2 ring-primary/40 bg-white/50",
        className
      )}
    >
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <span className="text-lg font-bold text-foreground">{price}</span>
      {detail && (
        <span className="text-xs text-muted-foreground leading-snug">{detail}</span>
      )}
    </div>
  );
};

export default PricingCard;
