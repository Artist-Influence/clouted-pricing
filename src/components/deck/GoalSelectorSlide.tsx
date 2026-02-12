import GlassPanel from "./GlassPanel";
import { Radio, Zap, Eye, Layers } from "lucide-react";

const goals = [
  {
    icon: <Radio className="w-8 h-8" />,
    title: "Streaming Growth",
    description: "Drive streams, saves, and algorithmic discovery",
    visual: "growth",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Algorithm Momentum",
    description: "Trigger platform algorithms with velocity signals",
    visual: "signal",
  },
  {
    icon: <Eye className="w-8 h-8" />,
    title: "Awareness & Visibility",
    description: "Distribute across communities and audiences",
    visual: "network",
  },
  {
    icon: <Layers className="w-8 h-8" />,
    title: "Full Release Push",
    description: "Layered system covering all growth channels",
    visual: "tiles",
  },
];

const GoalSelectorSlide = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center px-16 relative overflow-hidden">
      <div className="relative z-10 w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-3 text-center slide-enter">
          Start with the goal.
        </h1>
        <p className="text-base text-muted-foreground text-center mb-12 slide-enter stagger-1">
          Select a goal to see recommended service combinations.
        </p>

        <div className="grid grid-cols-2 gap-5">
          {goals.map((goal, i) => (
            <GlassPanel
              key={goal.title}
              variant="card"
              className={`flex flex-col items-center text-center py-10 px-6 cursor-default slide-enter stagger-${i + 2}`}
            >
              {/* Mini visualizer */}
              <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
                {goal.visual === "growth" && (
                  <div className="flex items-end gap-0.5 h-full w-full p-1 opacity-30">
                    {[3, 5, 4, 7, 6, 9, 8, 12].map((h, j) => (
                      <div key={j} className="flex-1 bg-primary rounded-t" style={{ height: `${h * 7}%` }} />
                    ))}
                  </div>
                )}
                {goal.visual === "signal" && (
                  <>
                    {[1, 2, 3].map(r => (
                      <div key={r} className="absolute rounded-full border border-primary/20"
                        style={{ width: `${r * 20}px`, height: `${r * 20}px` }} />
                    ))}
                  </>
                )}
                {goal.visual === "network" && (
                  <>
                    {[...Array(8)].map((_, j) => (
                      <div key={j} className="absolute rounded-full bg-primary/20"
                        style={{
                          width: `${4 + Math.random() * 4}px`,
                          height: `${4 + Math.random() * 4}px`,
                          left: `${20 + Math.random() * 60}%`,
                          top: `${20 + Math.random() * 60}%`,
                        }} />
                    ))}
                  </>
                )}
                {goal.visual === "tiles" && (
                  <div className="grid grid-cols-3 gap-1 w-full h-full p-2 opacity-30">
                    {[...Array(9)].map((_, j) => (
                      <div key={j} className="bg-primary rounded-sm" />
                    ))}
                  </div>
                )}
              </div>
              <div className="text-primary mb-3">{goal.icon}</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{goal.title}</h3>
              <p className="text-sm text-muted-foreground">{goal.description}</p>
            </GlassPanel>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GoalSelectorSlide;
