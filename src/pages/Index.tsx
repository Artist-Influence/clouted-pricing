import ServiceAccordion from "@/components/ServiceAccordion";
import CampaignBuilder from "@/components/CampaignBuilder";
import GeometricGrid from "@/components/GeometricGrid";
import cloutedLogo from "@/assets/clouted-logo.png";

const Index = () => {
  return (
    <div className="min-h-screen deck-bg relative">
      <GeometricGrid />
      {/* Hero */}
      <header className="relative z-10 pt-20 pb-16 px-6 text-center max-w-3xl mx-auto">
        <img src={cloutedLogo} alt="CLOUTED" className="h-14 sm:h-16 mx-auto mb-4" />
        
        <p className="text-lg text-muted-foreground font-medium mb-2">
          Services & Campaign Builder
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto">
          Every release has different goals. Browse our services below, then use
          the campaign builder to mix and match into a custom growth plan scaled
          to your budget.
        </p>
      </header>

      {/* Services */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pb-20">
        <h2 className="text-2xl font-bold text-foreground mb-6">Our Services</h2>
        <ServiceAccordion />
      </section>

      {/* Campaign Builder */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pb-20">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Build Your Campaign
        </h2>
        <p className="text-sm text-muted-foreground mb-8">
          Toggle services on, pick a tier or set a budget, and watch your
          estimate update live. Or start with a preset.
        </p>
        <CampaignBuilder />
      </section>

      {/* Closing */}
      <footer className="relative z-10 py-16 px-6 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Build the right system for your next release.
        </h2>
        <p className="text-sm text-muted-foreground">
          We can recommend a campaign structure within 24 hours.
        </p>
        <p className="text-xs text-muted-foreground/50 mt-8">
          CLOUTED · Confidential
        </p>
      </footer>
    </div>
  );
};

export default Index;
