import GlassPanel from "./GlassPanel";
import PricingCard from "./PricingCard";
import Visualizer from "./Visualizer";
import { Service } from "@/data/services";
import { Clock } from "lucide-react";

interface ServiceSlideProps {
  service: Service;
}

const ServiceSlide = ({ service }: ServiceSlideProps) => {
  const gridCols = service.pricing.length > 5
    ? "grid-cols-3"
    : service.pricing.length > 2
    ? "grid-cols-2"
    : "grid-cols-1";

  return (
    <div className="h-full w-full flex flex-col justify-center px-16 py-14 relative overflow-hidden">
      <Visualizer type={service.visualizer} />

      <h1 className="text-4xl font-bold text-foreground mb-6 relative z-10 slide-enter">
        {service.title}
      </h1>

      <div className="flex gap-8 relative z-10 flex-1 min-h-0 max-h-[72vh]">
        {/* Description Panel */}
        <div className="w-2/5 flex-shrink-0 flex flex-col slide-enter stagger-1">
          <GlassPanel variant="strong" className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto glass-scroll pr-1">
              <p className="text-sm leading-relaxed text-foreground/75">
                {service.description}
              </p>
            </div>
            {(service.timeframe || service.minimum) && (
              <div className="mt-4 pt-4 border-t border-border/40 flex flex-col gap-1.5">
                {service.timeframe && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs font-medium text-primary">
                      {service.timeframe}
                    </span>
                  </div>
                )}
                {service.minimum && (
                  <span className="text-xs text-muted-foreground">
                    Minimum: {service.minimum}
                  </span>
                )}
              </div>
            )}
            {service.note && (
              <p className="mt-3 text-xs text-muted-foreground italic">{service.note}</p>
            )}
          </GlassPanel>
        </div>

        {/* Pricing Cards */}
        <div className={`flex-1 grid ${gridCols} gap-3 auto-rows-min overflow-y-auto glass-scroll content-start`}>
          {service.pricing.map((item, i) => (
            <PricingCard
              key={i}
              label={item.label}
              price={item.price}
              detail={item.detail}
              featured={item.featured}
              className={`slide-enter stagger-${Math.min(i + 2, 8)}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceSlide;
