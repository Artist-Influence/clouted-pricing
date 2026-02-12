import { services } from "@/data/services";
import PricingCard from "@/components/deck/PricingCard";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ServiceAccordion = () => {
  return (
    <Accordion type="multiple" className="space-y-3">
      {services.map((service) => {
        const featuredPricing = service.pricing.find((p) => p.featured);
        const pricePreview = featuredPricing?.price ?? service.pricing[0]?.price ?? "";

        return (
          <AccordionItem
            key={service.id}
            value={service.id}
            className="glass-card rounded-xl border-none px-5 py-1 overflow-hidden"
          >
            <AccordionTrigger className="hover:no-underline gap-4">
              <div className="flex flex-1 items-center gap-3 flex-wrap">
                <span className="text-base font-semibold text-foreground">
                  {service.title}
                </span>
                {service.timeframe && (
                  <Badge variant="secondary" className="text-[10px] font-medium">
                    {service.timeframe}
                  </Badge>
                )}
                <span className="ml-auto text-sm font-medium text-primary mr-2">
                  {pricePreview}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-3xl">
                {service.description}
              </p>
              {service.minimum && (
                <p className="text-xs text-muted-foreground mb-3">
                  Minimum: {service.minimum}
                </p>
              )}
              {service.note && (
                <p className="text-xs text-muted-foreground italic mb-3">
                  {service.note}
                </p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {service.pricing.map((tier) => (
                  <PricingCard
                    key={tier.label}
                    label={tier.label}
                    price={tier.price}
                    detail={tier.detail}
                    featured={tier.featured}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default ServiceAccordion;
