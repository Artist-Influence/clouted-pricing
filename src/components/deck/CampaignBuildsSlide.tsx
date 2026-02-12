import GlassPanel from "./GlassPanel";

const campaigns = [
  {
    tier: "Starter",
    budget: "$3K–$5K",
    services: ["Spotify Playlisting (25K–50K)", "SoundCloud Reposts (1M reach)", "Instagram Seeding"],
    description: "Perfect for building initial traction on a single or debut release.",
  },
  {
    tier: "Momentum",
    budget: "$10K–$20K",
    services: [
      "Spotify Playlisting (100K–250K)",
      "YouTube Advertising",
      "Clipping (500K views)",
      "Fan Page Management (Basic)",
      "Culture Edits (3-Pack)",
    ],
    featured: true,
    description: "For artists ready to layer channels and build sustained growth.",
  },
  {
    tier: "Full Release",
    budget: "$30K+",
    services: [
      "Spotify Playlisting (500K)",
      "YouTube Advertising (full global)",
      "TikTok Creator Flood (25K+)",
      "Clipping (1M views)",
      "Spark Ads + Meta Ads",
      "Fan Page Management (Pro)",
      "Top 50 Trending (Full Bundle)",
      "Culture Edits (Campaign)",
    ],
    description: "The complete growth system for a major release push.",
  },
];

const CampaignBuildsSlide = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center px-16 relative overflow-hidden">
      <div className="relative z-10 w-full max-w-5xl">
        <h1 className="text-4xl font-bold text-foreground mb-3 text-center slide-enter">
          What campaigns typically look like.
        </h1>
        <p className="text-sm text-muted-foreground text-center mb-10 slide-enter stagger-1">
          Example builds at different budget levels.
        </p>

        <div className="grid grid-cols-3 gap-5 items-start">
          {campaigns.map((c, i) => (
            <GlassPanel
              key={c.tier}
              variant={c.featured ? "strong" : "card"}
              className={`flex flex-col h-full slide-enter stagger-${i + 2} ${c.featured ? "ring-2 ring-primary/30 scale-[1.02]" : ""}`}
            >
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="text-lg font-bold text-foreground">{c.tier}</h3>
                <span className="text-sm font-semibold text-primary">{c.budget}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-4">{c.description}</p>

              <div className="flex-1 flex flex-col gap-1.5">
                {c.services.map((s) => (
                  <div
                    key={s}
                    className="glass-card rounded-lg px-3 py-2 text-xs font-medium text-foreground/80"
                  >
                    {s}
                  </div>
                ))}
              </div>
            </GlassPanel>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CampaignBuildsSlide;
