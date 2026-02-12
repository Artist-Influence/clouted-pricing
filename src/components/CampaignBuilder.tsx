import { useState, useMemo, useCallback } from "react";
import { services, type Service, type PricingItem } from "@/data/services";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import GlassPanel from "@/components/deck/GlassPanel";

/* ── YouTube multi-select model ── */
interface YouTubeAdType {
  enabled: boolean;
  budget: number;
}

interface ServiceSelection {
  enabled: boolean;
  tierIndex: number;
  budget: number;
  categoryIndex: number;
  youtubeAdTypes: Record<number, YouTubeAdType>;
}

type Selections = Record<string, ServiceSelection>;

const defaultSelection = (): ServiceSelection => ({
  enabled: false,
  tierIndex: 0,
  budget: 2000,
  categoryIndex: 0,
  youtubeAdTypes: {},
});



function getSelectableTiers(service: Service) {
  return service.pricing.filter(
    (p) => p.numericPrice !== undefined && !p.isPercentage
  );
}

/* ── Tiered fee calculation for Paid Amplification ── */
function calcTieredFee(spend: number): number {
  const first = Math.min(spend, 5000) * 0.3;
  const second = Math.min(Math.max(spend - 5000, 0), 5000) * 0.2;
  const third = Math.max(spend - 10000, 0) * 0.1;
  return first + second + third;
}

function calcServiceCost(
  service: Service,
  sel: ServiceSelection | undefined
): number {
  if (!sel || !sel.enabled) return 0;

  // YouTube multi-select: sum of all enabled ad type budgets
  if (service.multiSelect) {
    let total = 0;
    Object.values(sel.youtubeAdTypes).forEach((at) => {
      if (at.enabled) total += at.budget;
    });
    return total;
  }

  if (service.flatPrice) return service.flatPrice;

  if (service.id === "marketplace") return sel.budget;

  if (service.budgetBased) {
    if (service.id === "instagram") return sel.budget;
    if (service.id === "paid-amplification") {
      const creative = 1000;
      const fee = calcTieredFee(sel.budget);
      return creative + sel.budget + fee;
    }
    return sel.budget;
  }

  const tiers = getSelectableTiers(service);
  const tier = tiers[sel.tierIndex];
  return tier?.numericPrice ?? 0;
}

const CampaignBuilder = () => {
  const [selections, setSelections] = useState<Selections>(() => {
    const init: Selections = {};
    services.forEach((s) => (init[s.id] = defaultSelection()));
    return init;
  });

  const update = useCallback(
    (id: string, patch: Partial<ServiceSelection>) =>
      setSelections((prev) => ({
        ...prev,
        [id]: { ...prev[id], ...patch },
      })),
    []
  );

  const updateYoutubeAdType = useCallback(
    (adIndex: number, patch: Partial<YouTubeAdType>) =>
      setSelections((prev) => {
        const yt = prev.youtube;
        if (!yt) return prev;
        const current = yt.youtubeAdTypes[adIndex] ?? {
          enabled: false,
          budget: 100,
        };
        return {
          ...prev,
          youtube: {
            ...yt,
            youtubeAdTypes: {
              ...yt.youtubeAdTypes,
              [adIndex]: { ...current, ...patch },
            },
          },
        };
      }),
    []
  );


  const { total, monthlyTotal, hasMonthly } = useMemo(() => {
    let oneTime = 0;
    let monthly = 0;
    services.forEach((s) => {
      const sel = selections[s.id];
      if (!sel) return;
      const cost = calcServiceCost(s, sel);
      const tiers = getSelectableTiers(s);
      const tier = tiers[sel.tierIndex];
      if (tier?.isMonthly) {
        monthly += cost;
      } else {
        oneTime += cost;
      }
    });
    return { total: oneTime, monthlyTotal: monthly, hasMonthly: monthly > 0 };
  }, [selections]);

  return (
    <div className="space-y-8">
      {/* Service rows */}
      <div className="space-y-3">
        {services.map((service) => {
          const sel = selections[service.id];
          if (!sel) return null;
          const tiers = getSelectableTiers(service);
          const cost = calcServiceCost(service, sel);
          const isFlat = !!service.flatPrice;

          if (service.multiSelect) {
            return (
              <YouTubeRow
                key={service.id}
                service={service}
                sel={sel}
                cost={cost}
                onToggle={(enabled) => update(service.id, { enabled })}
                onUpdateAdType={updateYoutubeAdType}
              />
            );
          }

          return (
            <ServiceRow
              key={service.id}
              service={service}
              sel={sel}
              tiers={tiers}
              cost={cost}
              isFlat={isFlat}
              onUpdate={update}
            />
          );
        })}
      </div>

      {/* Sticky total */}
      <div className="sticky bottom-6 z-40">
        <GlassPanel
          variant="strong"
          className="flex items-center justify-between"
        >
          <span className="text-sm font-medium text-muted-foreground">
            Estimated Total
          </span>
          <div className="text-right">
            <span className="text-2xl font-bold text-foreground">
              ${total.toLocaleString()}
            </span>
            {hasMonthly && (
              <Badge variant="secondary" className="ml-2 text-xs">
                + ${monthlyTotal.toLocaleString()}/mo
              </Badge>
            )}
          </div>
        </GlassPanel>
      </div>
    </div>
  );
};

/* ── YouTube multi-select row ── */

interface YouTubeRowProps {
  service: Service;
  sel: ServiceSelection;
  cost: number;
  onToggle: (enabled: boolean) => void;
  onUpdateAdType: (index: number, patch: Partial<YouTubeAdType>) => void;
}

function YouTubeRow({
  service,
  sel,
  cost,
  onToggle,
  onUpdateAdType,
}: YouTubeRowProps) {
  return (
    <div
      className={`glass-card rounded-xl px-5 py-4 flex flex-col gap-4 transition-all ${
        sel.enabled ? "ring-2 ring-primary/30" : "opacity-70"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Switch checked={sel.enabled} onCheckedChange={onToggle} />
          <span
            className={`text-sm font-medium ${
              sel.enabled ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {service.title}
          </span>
        </div>
      </div>

      {sel.enabled && (
        <div className="space-y-3 pl-10">
          {service.pricing.map((tier, i) => {
            const at = sel.youtubeAdTypes[i] ?? {
              enabled: false,
              budget: 100,
            };
            const cpm = tier.cpmValue ?? 7;
            const estViews = at.enabled
              ? Math.round((at.budget / cpm) * 1000)
              : 0;

            return (
              <div key={tier.label} className="space-y-1">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={at.enabled}
                    onCheckedChange={(checked) =>
                      onUpdateAdType(i, { enabled: !!checked })
                    }
                  />
                  <span className="text-xs font-medium text-foreground">
                    {tier.label}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {tier.price}
                  </span>
                </div>
                {at.enabled && (
                  <div className="pl-7 space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Budget</span>
                      <span className="font-medium text-foreground">
                        ${at.budget.toLocaleString()}
                      </span>
                    </div>
                    <Slider
                      value={[at.budget]}
                      onValueChange={([v]) =>
                        onUpdateAdType(i, { budget: v })
                      }
                      min={Math.ceil(cpm)}
                      max={5000}
                      step={10}
                    />
                    <div className="text-xs text-muted-foreground">
                      Est. ~{estViews.toLocaleString()} views
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ── Standard service row ── */

interface ServiceRowProps {
  service: Service;
  sel: ServiceSelection;
  tiers: PricingItem[];
  cost: number;
  isFlat: boolean;
  onUpdate: (id: string, patch: Partial<ServiceSelection>) => void;
}

function ServiceRow({
  service,
  sel,
  tiers,
  cost,
  isFlat,
  onUpdate,
}: ServiceRowProps) {
  const isMarketplace = service.id === "marketplace";
  const isPaidAmp = service.id === "paid-amplification";
  const minBudget =
    isMarketplace && service.categories
      ? service.categories[sel.categoryIndex]?.minBudget ?? 2000
      : isPaidAmp
      ? 500
      : 350;

  const handleCategoryChange = useCallback(
    (v: string) => {
      const newIdx = Number(v);
      const newMin = service.categories?.[newIdx]?.minBudget ?? 2000;
      onUpdate(service.id, {
        categoryIndex: newIdx,
        budget: Math.max(sel.budget, newMin),
      });
    },
    [service, sel.budget, onUpdate]
  );

  // Marketplace estimated views
  const marketplaceViews = useMemo(() => {
    if (!isMarketplace || !service.categories) return 0;
    const cat = service.categories[sel.categoryIndex];
    if (!cat || cat.cpm <= 0) return 0;
    return Math.round((sel.budget / cat.cpm) * 1000);
  }, [isMarketplace, service.categories, sel.categoryIndex, sel.budget]);

  // Paid amplification breakdown
  const paidAmpBreakdown = useMemo(() => {
    if (!isPaidAmp) return null;
    const fee = calcTieredFee(sel.budget);
    return {
      spend: sel.budget,
      fee: Math.round(fee),
      creative: 1000,
      total: sel.budget + Math.round(fee) + 1000,
    };
  }, [isPaidAmp, sel.budget]);

  return (
    <div
      className={`glass-card rounded-xl px-5 py-4 flex flex-col gap-4 transition-all ${
        sel.enabled ? "ring-2 ring-primary/30" : "opacity-70"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Toggle + name */}
        <div className="flex items-center gap-3 sm:w-56 shrink-0">
          <Switch
            checked={sel.enabled}
            onCheckedChange={(checked) =>
              onUpdate(service.id, { enabled: checked })
            }
          />
          <span
            className={`text-sm font-medium ${
              sel.enabled ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {service.title}
          </span>
        </div>

        {/* Controls */}
        {sel.enabled && !isFlat && (
          <div className="flex-1 flex items-center gap-4 flex-wrap">
            {isMarketplace && service.categories ? (
              <>
                <Select
                  value={String(sel.categoryIndex)}
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger className="w-48 bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {service.categories.map((cat, i) => (
                      <SelectItem key={cat.label} value={String(i)} textValue={cat.label}>
                        {cat.label} — ${cat.cpm} CPM
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex-1 min-w-[200px] space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Budget</span>
                    <span className="font-medium text-foreground">
                      ${sel.budget.toLocaleString()}
                    </span>
                  </div>
                  <Slider
                    value={[sel.budget]}
                    onValueChange={([v]) =>
                      onUpdate(service.id, { budget: v })
                    }
                    min={minBudget}
                    max={30000}
                    step={500}
                  />
                  {marketplaceViews > 0 && (
                    <div className="text-xs text-muted-foreground">
                      Est. ~{marketplaceViews.toLocaleString()} views
                    </div>
                  )}
                </div>
              </>
            ) : isPaidAmp ? (
              <div className="flex-1 min-w-[200px] space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Ad Spend</span>
                  <span className="font-medium text-foreground">
                    ${sel.budget.toLocaleString()}
                  </span>
                </div>
                <Slider
                  value={[sel.budget]}
                  onValueChange={([v]) =>
                    onUpdate(service.id, { budget: v })
                  }
                  min={minBudget}
                  max={100000}
                  step={500}
                />
                {paidAmpBreakdown && (
                  <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-muted-foreground mt-1">
                    <span>
                      Ad Spend: ${paidAmpBreakdown.spend.toLocaleString()}
                    </span>
                    <span>
                      Mgmt Fee: ${paidAmpBreakdown.fee.toLocaleString()}
                    </span>
                    <span>Creative: $1,000</span>
                    <span className="font-medium text-foreground">
                      Total: ${paidAmpBreakdown.total.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            ) : service.budgetBased ? (
              <div className="flex-1 min-w-[200px] space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Budget</span>
                  <span className="font-medium text-foreground">
                    ${sel.budget.toLocaleString()}
                  </span>
                </div>
                <Slider
                  value={[sel.budget]}
                  onValueChange={([v]) =>
                    onUpdate(service.id, { budget: v })
                  }
                  min={minBudget}
                  max={25000}
                  step={50}
                />
              </div>
            ) : tiers.length > 0 ? (
              <div className="flex-1 space-y-1">
                <Select
                  value={String(sel.tierIndex)}
                  onValueChange={(v) =>
                    onUpdate(service.id, { tierIndex: Number(v) })
                  }
                >
                  <SelectTrigger className="w-56 bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {tiers.map((tier, i) => (
                      <SelectItem key={tier.label} value={String(i)} textValue={tier.label}>
                        {tier.label} — {tier.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {tiers[sel.tierIndex]?.detail && (
                  <div className="text-xs text-muted-foreground pl-1">
                    {tiers[sel.tierIndex].detail}
                  </div>
                )}
              </div>
            ) : null}
          </div>
        )}

        {/* Flat price label */}
        {sel.enabled && isFlat && (
          <div className="flex-1">
            <span className="text-xs text-muted-foreground">Flat rate</span>
          </div>
        )}

      </div>
    </div>
  );
}

export default CampaignBuilder;
