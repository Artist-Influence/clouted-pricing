export interface PricingItem {
  label: string;
  price: string;
  detail?: string;
  featured?: boolean;
  numericPrice?: number;
  isPercentage?: boolean;
  isMonthly?: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  timeframe?: string;
  pricing: PricingItem[];
  minimum?: string;
  visualizer: string;
  note?: string;
  budgetBased?: boolean;
}

export const services: Service[] = [
  {
    id: "youtube",
    title: "YouTube Advertising",
    description:
      "Our YouTube ad campaigns turn music videos into highly optimized promotional assets using strategic international targeting and our proprietary view-to-engagement ratio engine. By tapping into global markets with ultra-low CPVs, we maximize reach while ensuring your video resonates with viewers. Whether you're focused on subscribers, long-form engagement, or workarounds for unapproved videos, we tailor every campaign for high impact and transparent reporting.",
    timeframe: "1–3 weeks",
    minimum: "1,000 views",
    visualizer: "growth",
    pricing: [
      { label: "USA Website Traffic", price: "$13 CPM", numericPrice: 1300 },
      { label: "LATAM Website Traffic", price: "$5.60 CPM", numericPrice: 560 },
      { label: "EUR/AUS Website Traffic", price: "$12 CPM", numericPrice: 1200 },
      { label: "Asia Website Traffic", price: "$5 CPM", numericPrice: 500 },
      { label: "Worldwide Website", price: "$7–$2 CPM", detail: "Volume-based pricing", numericPrice: 700 },
      { label: "Worldwide Skippable", price: "$7–$2.40 CPM", detail: "Volume-based pricing", numericPrice: 700 },
      { label: "Worldwide Display", price: "$7 CPM", numericPrice: 700 },
    ],
  },
  {
    id: "spotify",
    title: "Spotify Playlisting (Organic)",
    description:
      "We run fully organic Spotify campaigns that place your music on third-party playlists curated for your genre, helping you reach real listeners—not bots—and trigger Spotify's algorithm. Each campaign is designed for maximum discovery, often resulting in Discover Weekly or Radio placements, with strong performance in both U.S. and global markets. Stream goals are guaranteed, and every campaign includes weekly reporting, performance tracking, and strategic playlist placement to boost saves, followers, and engagement.",
    timeframe: "90 days",
    visualizer: "growth",
    pricing: [
      { label: "10K Streams", price: "$350", numericPrice: 350 },
      { label: "25K Streams", price: "$700", numericPrice: 700 },
      { label: "50K Streams", price: "$1,200", featured: true, numericPrice: 1200 },
      { label: "100K Streams", price: "$2,000", featured: true, numericPrice: 2000 },
      { label: "250K Streams", price: "$4,500", numericPrice: 4500 },
      { label: "500K Streams", price: "$8,000", numericPrice: 8000 },
    ],
  },
  {
    id: "soundcloud",
    title: "SoundCloud Reposts",
    description:
      "We tap into an underground network of verified SoundCloud artists and labels to organically repost your track across genre-specific communities. With over 50 million active U.S.-based listeners reached through our repost groups, this service connects your music with passionate fans who actively seek new sounds. Campaigns are fully transparent, trackable, and optimized to foster genuine fan engagement rather than passive plays.",
    visualizer: "network",
    pricing: [
      { label: "500K Reach", price: "$300", numericPrice: 300 },
      { label: "1M Reach", price: "$500", numericPrice: 500 },
      { label: "2.5M Reach", price: "$1,000", featured: true, numericPrice: 1000 },
      { label: "5M Reach", price: "$1,800", numericPrice: 1800 },
      { label: "10M Reach", price: "$3,000", numericPrice: 3000 },
    ],
  },
  {
    id: "instagram",
    title: "Instagram Seeding",
    description:
      "Instagram seeding places your music on genre-aligned fan pages where your target audience already hangs out. We handpick creators for each campaign to ensure relevance and cost-efficiency, maximizing ROI and discovery. Every post tags the artist, links the sound, and is tracked via a live dashboard for real-time results.",
    visualizer: "tiles",
    budgetBased: true,
    pricing: [
      { label: "Service Fee", price: "30% of budget", detail: "On top of ad spend", isPercentage: true },
      { label: "Ad Spend", price: "70% of budget", detail: "Goes directly to placement", isPercentage: true },
    ],
    minimum: "$350 budget",
  },
  {
    id: "clipping",
    title: "Clipping",
    description:
      "This service is our curated video ad network powered by 10,000+ clippers who produce native-style TikToks, Reels, and Shorts using your track. Campaigns launch in 24 hours, run for 7–14 days, and deliver guaranteed views at $1.50 per 1,000, often beating that with organic lift. All posts use the official sound, tag the artist, follow your branding, and come with full campaign reporting plus UGC reuse rights.",
    timeframe: "2–4 weeks",
    visualizer: "tiles",
    pricing: [
      { label: "Cost Per 1K Views", price: "$1.50", detail: "Often lower with organic lift", numericPrice: 1.5 },
      { label: "10K Views", price: "$15", numericPrice: 15 },
      { label: "100K Views", price: "$150", featured: true, numericPrice: 150 },
      { label: "500K Views", price: "$750", numericPrice: 750 },
      { label: "1M Views", price: "$1,500", numericPrice: 1500 },
    ],
  },
  {
    id: "fanpages",
    title: "Fan Page Management",
    description:
      "Fan Page Management provides a long-term approach to building and centralizing fandoms through owned community assets. These dedicated social media accounts consistently engage fans between releases, amplify key moments, and drive measurable outcomes including streaming, ticket sales, merchandise, and official social growth.",
    timeframe: "Minimum 3 months",
    visualizer: "network",
    pricing: [
      { label: "Basic", price: "$500/mo", detail: "1 managed account", numericPrice: 500, isMonthly: true },
      { label: "Plus", price: "$900/mo", detail: "2 managed accounts", numericPrice: 900, isMonthly: true },
      { label: "Pro", price: "$1,600/mo", detail: "4 managed accounts", featured: true, numericPrice: 1600, isMonthly: true },
      { label: "Scale", price: "$3,000/mo", detail: "8+ managed accounts", numericPrice: 3000, isMonthly: true },
    ],
  },
  {
    id: "ugc-accounts",
    title: "Dedicated UGC Accounts",
    description:
      "Dedicated UGC Accounts are fresh creator accounts making content specifically built for conversion. Unlike clipping, which focuses on awareness, this offering is performance-driven and focused on driving users directly to products or actions through strong CTAs.",
    timeframe: "Minimum 3 months",
    visualizer: "funnel",
    pricing: [
      { label: "Starter", price: "$800/mo", detail: "2 dedicated accounts", numericPrice: 800, isMonthly: true },
      { label: "Growth", price: "$1,500/mo", detail: "4 dedicated accounts", featured: true, numericPrice: 1500, isMonthly: true },
      { label: "Scale", price: "$2,800/mo", detail: "8+ dedicated accounts", numericPrice: 2800, isMonthly: true },
    ],
  },
  {
    id: "culture-edits",
    title: "Culture Edits",
    description:
      "Get your song placed in cinematic and sports edits across established pages with active audiences. These trusted pages already post high-engagement edits daily. We handle placement logistics and can align edits to specific aesthetics or demographics.",
    timeframe: "2–3 weeks",
    visualizer: "chart",
    pricing: [
      { label: "Single Placement", price: "$250", detail: "One established page", numericPrice: 250 },
      { label: "3-Pack", price: "$650", detail: "Three placements", featured: true, numericPrice: 650 },
      { label: "Campaign", price: "$1,500", detail: "8+ placements across demographics", numericPrice: 1500 },
    ],
  },
  {
    id: "creator-flood",
    title: "TikTok Creator Flood",
    description:
      "Mass-posting your track across 10,000+ real TikTok UGC videos, primarily from international nano-creators with a handful of macros mixed in. Campaigns often drive spillover beyond 10,000 posts depending on performance. This method builds massive volume and algorithmic lift through real creator accounts.",
    timeframe: "3–4 weeks",
    visualizer: "tiles",
    pricing: [
      { label: "10K Posts", price: "$3,000", numericPrice: 3000 },
      { label: "25K Posts", price: "$6,500", featured: true, numericPrice: 6500 },
      { label: "50K Posts", price: "$11,000", numericPrice: 11000 },
    ],
    note: "Campaigns often exceed guaranteed post count through organic spillover.",
  },
  {
    id: "trending",
    title: "Top 50 Trending & Popular Tab",
    description:
      "We guarantee your track appears on Top 50 trending charts across YouTube Shorts, Instagram Reels, and Facebook Reels, and enters the Popular Tab on TikTok. The process uses a hybrid of AI-generated quantity content and real UGC, prioritizing volume to push traction until the track charts.",
    timeframe: "2–3 weeks",
    visualizer: "chart",
    pricing: [
      { label: "YouTube Shorts Top 50", price: "$2,500", numericPrice: 2500 },
      { label: "IG Reels Top 50", price: "$2,500", numericPrice: 2500 },
      { label: "FB Reels Top 50", price: "$2,000", numericPrice: 2000 },
      { label: "TikTok Popular Tab", price: "$3,000", featured: true, numericPrice: 3000 },
      { label: "Full Bundle", price: "$8,500", detail: "All platforms included", featured: true, numericPrice: 8500 },
    ],
  },
  {
    id: "paid-amplification",
    title: "Paid Amplification",
    description:
      "TikTok Spark Ads whitelist top-performing organic content and amplify it through paid distribution, maintaining authenticity while scaling reach. Meta Ads extend your campaign across Instagram and Facebook with precision targeting. Both channels come with full creative production, strategic optimization, and transparent reporting.",
    visualizer: "signal",
    budgetBased: true,
    pricing: [
      { label: "Creative Fee", price: "$1,000", detail: "10 assets included", numericPrice: 1000 },
      { label: "Up to $5K Spend", price: "30% fee", detail: "Of total ad spend", isPercentage: true },
      { label: "$5K–$10K Spend", price: "20% fee", detail: "Of total ad spend", isPercentage: true },
      { label: "$10K+ Spend", price: "10% fee", detail: "Of total ad spend", isPercentage: true },
    ],
  },
];
