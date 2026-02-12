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
        const hasMinimumColumn = service.pricing.some((p) => p.minimumDetail);

        return (
          <AccordionItem
            key={service.id}
            value={service.id}
            className="glass-card rounded-xl border-none px-5 py-1 overflow-hidden"
          >
             <AccordionTrigger className="hover:no-underline gap-4">
               <div className="flex flex-1 items-center gap-3 flex-wrap text-left">
                <span className="text-base font-semibold text-foreground">
                  {service.title}
                </span>
                {service.timeframe && (
                  <Badge variant="secondary" className="text-[10px] font-medium">
                    {service.timeframe}
                  </Badge>
                )}
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

              {service.tableDisplay ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10 text-left">
                        <th className="pb-2 pr-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          {hasMinimumColumn ? "Service" : "Package"}
                        </th>
                        <th className="pb-2 pr-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Price
                        </th>
                        {hasMinimumColumn && (
                          <th className="pb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Minimum
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {service.pricing.map((tier) => (
                        <tr
                          key={tier.label}
                          className="border-b border-white/5 last:border-0"
                        >
                          <td className="py-2.5 pr-4 font-medium text-foreground">
                            {tier.label}
                          </td>
                          <td className="py-2.5 pr-4 text-primary font-medium">
                            {tier.price}
                            {tier.detail && (
                              <span className="text-xs text-muted-foreground ml-2">
                                ({tier.detail})
                              </span>
                            )}
                          </td>
                          {hasMinimumColumn && (
                            <td className="py-2.5 text-muted-foreground">
                              {tier.minimumDetail ?? "—"}
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
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
              )}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default ServiceAccordion;
