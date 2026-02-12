import { useState, useMemo, useCallback } from "react";
import { services, type Service } from "@/data/services";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import GlassPanel from "@/components/deck/GlassPanel";

interface ServiceSelection {
  enabled: boolean;
  tierIndex: number;
  budget: number;
}

type Selections = Record<string, ServiceSelection>;

const defaultSelection = (): ServiceSelection => ({
  enabled: false,
  tierIndex: 0,
  budget: 1000,
});

// Preset campaign configurations
const presets: Record<string, Record<string, Partial<ServiceSelection>>> = {
  starter: {
    spotify: { enabled: true, tierIndex: 0 },
    soundcloud: { enabled: true, tierIndex: 0 },
    clipping: { enabled: true, tierIndex: 2 },
  },
  momentum: {
    spotify: { enabled: true, tierIndex: 3 },
    soundcloud: { enabled: true, tierIndex: 2 },
    clipping: { enabled: true, tierIndex: 3 },
    instagram: { enabled: true, budget: 2000 },
    "culture-edits": { enabled: true, tierIndex: 1 },
  },
  "full-release": {
    spotify: { enabled: true, tierIndex: 4 },
    soundcloud: { enabled: true, tierIndex: 3 },
    clipping: { enabled: true, tierIndex: 4 },
    instagram: { enabled: true, budget: 5000 },
    "creator-flood": { enabled: true, tierIndex: 1 },
    trending: { enabled: true, tierIndex: 4 },
    fanpages: { enabled: true, tierIndex: 2 },
    "paid-amplification": { enabled: true, budget: 5000 },
  },
};

function getSelectableTiers(service: Service) {
  return service.pricing.filter(
    (p) => p.numericPrice !== undefined && !p.isPercentage
  );
}

function calcServiceCost(service: Service, sel: ServiceSelection): number {
  if (!sel.enabled) return 0;

  if (service.budgetBased) {
    if (service.id === "instagram") {
      return sel.budget; // total budget (70% ad + 30% fee)
    }
    if (service.id === "paid-amplification") {
      const creative = 1000;
      let feeRate = 0.3;
      if (sel.budget > 10000) feeRate = 0.1;
      else if (sel.budget > 5000) feeRate = 0.2;
      return creative + sel.budget + sel.budget * feeRate;
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

  const applyPreset = useCallback((key: string) => {
    setSelections(() => {
      const next: Selections = {};
      services.forEach((s) => (next[s.id] = defaultSelection()));
      const preset = presets[key];
      if (preset) {
        Object.entries(preset).forEach(([id, patch]) => {
          next[id] = { ...next[id], ...patch };
        });
      }
      return next;
    });
  }, []);

  const { total, monthlyTotal, hasMonthly } = useMemo(() => {
    let oneTime = 0;
    let monthly = 0;
    services.forEach((s) => {
      const cost = calcServiceCost(s, selections[s.id]);
      const tiers = getSelectableTiers(s);
      const tier = tiers[selections[s.id]?.tierIndex];
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
      {/* Presets */}
      <div className="flex flex-wrap gap-3">
        {[
          { key: "starter", label: "Starter", range: "$3K–$5K" },
          { key: "momentum", label: "Momentum", range: "$10K–$20K" },
          { key: "full-release", label: "Full Release", range: "$30K+" },
        ].map((p) => (
          <button
            key={p.key}
            onClick={() => applyPreset(p.key)}
            className="glass-card rounded-xl px-5 py-3 text-left transition hover:ring-2 hover:ring-primary/40"
          >
            <span className="block text-sm font-semibold text-foreground">
              {p.label}
            </span>
            <span className="text-xs text-muted-foreground">{p.range}</span>
          </button>
        ))}
        <button
          onClick={() => applyPreset("__clear")}
          className="glass-card rounded-xl px-5 py-3 text-sm text-muted-foreground hover:text-foreground transition"
        >
          Clear All
        </button>
      </div>

      {/* Service rows */}
      <div className="space-y-3">
        {services.map((service) => {
          const sel = selections[service.id];
          const tiers = getSelectableTiers(service);
          const cost = calcServiceCost(service, sel);

          return (
            <div
              key={service.id}
              className={`glass-card rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4 transition-all ${
                sel.enabled ? "ring-2 ring-primary/30" : "opacity-70"
              }`}
            >
              {/* Toggle + name */}
              <div className="flex items-center gap-3 sm:w-56 shrink-0">
                <Switch
                  checked={sel.enabled}
                  onCheckedChange={(checked) =>
                    update(service.id, { enabled: checked })
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

              {/* Tier selector or budget slider */}
              {sel.enabled && (
                <div className="flex-1 flex items-center gap-4 flex-wrap">
                  {service.budgetBased ? (
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
                          update(service.id, { budget: v })
                        }
                        min={350}
                        max={25000}
                        step={50}
                      />
                    </div>
                  ) : tiers.length > 0 ? (
                    <Select
                      value={String(sel.tierIndex)}
                      onValueChange={(v) =>
                        update(service.id, { tierIndex: Number(v) })
                      }
                    >
                      <SelectTrigger className="w-48 bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {tiers.map((tier, i) => (
                          <SelectItem key={tier.label} value={String(i)}>
                            {tier.label} — {tier.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : null}
                </div>
              )}

              {/* Cost */}
              {sel.enabled && cost > 0 && (
                <div className="text-right sm:w-28 shrink-0">
                  <span className="text-sm font-bold text-foreground">
                    ${cost.toLocaleString()}
                  </span>
                  {tiers[sel.tierIndex]?.isMonthly && (
                    <span className="text-xs text-muted-foreground">/mo</span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sticky total */}
      <div className="sticky bottom-6 z-40">
        <GlassPanel variant="strong" className="flex items-center justify-between">
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

export default CampaignBuilder;
