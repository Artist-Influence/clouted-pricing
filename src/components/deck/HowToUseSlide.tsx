import GlassPanel from "./GlassPanel";
import { Layers, ArrowRight, TrendingUp } from "lucide-react";

const HowToUseSlide = () => {
  const steps = [
    { icon: <Layers className="w-6 h-6" />, label: "Start with a single service" },
    { icon: <ArrowRight className="w-6 h-6" />, label: "Combine into a launch plan" },
    { icon: <TrendingUp className="w-6 h-6" />, label: "Scale based on goals & budget" },
  ];

  return (
    <div className="h-full w-full flex flex-col items-center justify-center px-16 relative overflow-hidden">
      <div className="relative z-10 max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4 slide-enter">
          Build your campaign your way.
        </h1>
        <p className="text-base text-muted-foreground mb-12 slide-enter stagger-1 max-w-lg mx-auto">
          Every release has different goals. This menu shows how services combine
          to create momentum across short-form, streaming, and culture.
        </p>

        <div className="flex items-center justify-center gap-4 slide-enter stagger-2">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-4">
              <GlassPanel variant="card" className="flex flex-col items-center gap-3 px-8 py-6 min-w-[180px]">
                <div className="text-primary">{step.icon}</div>
                <span className="text-sm font-medium text-foreground">{step.label}</span>
              </GlassPanel>
              {i < steps.length - 1 && (
                <ArrowRight className="w-5 h-5 text-primary/40 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>

        {/* Modular service blocks visual */}
        <div className="mt-16 slide-enter stagger-4">
          <div className="flex justify-center gap-2 flex-wrap max-w-lg mx-auto">
            {[
              "YouTube Ads", "Playlisting", "Clipping", "Fan Pages",
              "Culture Edits", "Spark Ads", "Seeding", "Creator Flood",
            ].map((s, i) => (
              <div
                key={s}
                className="glass-card rounded-lg px-3 py-1.5 text-xs font-medium text-foreground/70"
                style={{ animationDelay: `${0.3 + i * 0.05}s` }}
              >
                {s}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Mix and match to build your system →
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowToUseSlide;
