import AuroraBackground from "@/components/AuroraBackground";
import cloutedLogo from "@/assets/clouted-logo.png";
import { Music, Briefcase } from "lucide-react";

interface IndustryGateProps {
  onSelect: (industry: "music" | "other") => void;
}

const IndustryGate = ({ onSelect }: IndustryGateProps) => {
  return (
    <div className="min-h-screen deck-bg relative flex items-center justify-center">
      <AuroraBackground />
      <div className="relative z-10 text-center px-6 max-w-lg w-full">
        <img src={cloutedLogo} alt="CLOUTED" className="h-14 sm:h-16 mx-auto mb-8" />
        <h1 className="text-2xl font-bold text-foreground mb-2">
          What industry are you in?
        </h1>
        <p className="text-sm text-muted-foreground mb-10">
          We'll tailor our services to match your needs.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => onSelect("music")}
            className="glass-card rounded-xl px-6 py-8 flex flex-col items-center gap-3 transition-all hover:ring-2 hover:ring-primary/40 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Music className="h-8 w-8 text-primary" />
            <span className="text-lg font-semibold text-foreground">Music</span>
            <span className="text-xs text-muted-foreground">
              Artists, labels & distributors
            </span>
          </button>
          <button
            onClick={() => onSelect("other")}
            className="glass-card rounded-xl px-6 py-8 flex flex-col items-center gap-3 transition-all hover:ring-2 hover:ring-primary/40 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Briefcase className="h-8 w-8 text-primary" />
            <span className="text-lg font-semibold text-foreground">Other Industries</span>
            <span className="text-xs text-muted-foreground">
              Brands, podcasts, sports & more
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default IndustryGate;
