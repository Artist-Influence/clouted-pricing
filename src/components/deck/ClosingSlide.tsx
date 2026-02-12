import GlassPanel from "./GlassPanel";
import Visualizer from "./Visualizer";

const ClosingSlide = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden">
      <Visualizer type="signal" />

      <div className="relative z-10 text-center flex flex-col items-center gap-8">
        <GlassPanel variant="strong" className="max-w-lg slide-enter">
          <h1 className="text-3xl font-bold text-foreground mb-3">
            Build the right system for your next release.
          </h1>
          <p className="text-base text-muted-foreground">
            We can recommend a campaign structure within 24 hours.
          </p>
        </GlassPanel>

        <div className="slide-enter stagger-3">
          <h2 className="text-5xl font-bold tracking-tight text-foreground">
            CLOUTED
          </h2>
        </div>

        <p className="slide-enter stagger-5 text-xs text-muted-foreground tracking-widest uppercase">
          Let's build momentum together.
        </p>
      </div>
    </div>
  );
};

export default ClosingSlide;
