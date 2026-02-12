import GlassPanel from "./GlassPanel";
import Visualizer from "./Visualizer";

const CoverSlide = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden">
      <Visualizer type="signal" />

      <div className="relative z-10 text-center flex flex-col items-center gap-8">
        <div className="slide-enter">
          <h1 className="text-7xl font-bold tracking-tight text-foreground">
            CLOUTED
          </h1>
        </div>

        <GlassPanel variant="strong" className="slide-enter stagger-2 max-w-xl">
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Services & Campaign Builder
          </h2>
          <p className="text-base text-muted-foreground">
            Build the right growth system for your release.
          </p>
        </GlassPanel>

        <p className="slide-enter stagger-4 text-xs text-muted-foreground tracking-widest uppercase">
          Confidential &nbsp;|&nbsp; February 2026
        </p>
      </div>
    </div>
  );
};

export default CoverSlide;
