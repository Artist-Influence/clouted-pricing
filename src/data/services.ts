export interface PricingItem {
  label: string;
  price: string;
  detail?: string;
  featured?: boolean;
  numericPrice?: number;
  isPercentage?: boolean;
  isMonthly?: boolean;
  minimumDetail?: string;
  cpmValue?: number;
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
  tableDisplay?: boolean;
  flatPrice?: number;
  multiSelect?: boolean;
  categories?: { label: string; cpm: number; cost: number; minBudget: number }[];
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
    tableDisplay: true,
    multiSelect: true,
    pricing: [
      { label: "USA Website Traffic", price: "$13 CPM", numericPrice: 13, cpmValue: 13, minimumDetail: "1,000 views ($13)" },
      { label: "LATAM Website Traffic", price: "$5.60 CPM", numericPrice: 5.6, cpmValue: 5.6, minimumDetail: "1,000 views ($5.60)" },
      { label: "EUR/AUS Website Traffic", price: "$12 CPM", numericPrice: 12, cpmValue: 12, minimumDetail: "1,000 views ($12)" },
      { label: "Asia Website Traffic", price: "$5 CPM", numericPrice: 5, cpmValue: 5, minimumDetail: "1,000 views ($5)" },
      { label: "Worldwide Website", price: "$7–$2 CPM", detail: "Volume-based pricing", numericPrice: 7, cpmValue: 7, minimumDetail: "1,000 views ($7)" },
      { label: "Worldwide Skippable", price: "$7–$2.40 CPM", detail: "Volume-based pricing", numericPrice: 7, cpmValue: 7, minimumDetail: "1,000 views ($7)" },
      { label: "Worldwide Display", price: "$7 CPM", numericPrice: 7, cpmValue: 7, minimumDetail: "1,000 views ($7)" },
    ],
  },
  {
    id: "spotify",
    title: "Spotify Playlisting (Organic)",
    description:
      "We run fully organic Spotify campaigns that place your music on third-party playlists curated for your genre, helping you reach real listeners—not bots—and trigger Spotify's algorithm. Each campaign is designed for maximum discovery, often resulting in Discover Weekly or Radio placements, with strong performance in both U.S. and global markets. Stream goals are guaranteed, and every campaign includes weekly reporting, performance tracking, and strategic playlist placement to boost saves, followers, and engagement.",
    timeframe: "90 days",
    visualizer: "growth",
    tableDisplay: true,
    pricing: [
      { label: "10K Streams", price: "$200", numericPrice: 200 },
      { label: "20K Streams", price: "$370", numericPrice: 370 },
      { label: "30K Streams", price: "$540", numericPrice: 540 },
      { label: "40K Streams", price: "$700", numericPrice: 700 },
      { label: "50K Streams", price: "$850", numericPrice: 850 },
      { label: "60K Streams", price: "$1,000", numericPrice: 1000 },
      { label: "70K Streams", price: "$1,190", numericPrice: 1190 },
      { label: "80K Streams", price: "$1,360", numericPrice: 1360 },
      { label: "90K Streams", price: "$1,530", numericPrice: 1530 },
      { label: "100K Streams", price: "$1,650", featured: true, numericPrice: 1650 },
      { label: "125K Streams", price: "$2,062", numericPrice: 2062 },
      { label: "150K Streams", price: "$2,400", numericPrice: 2400 },
      { label: "200K Streams", price: "$3,200", numericPrice: 3200 },
      { label: "250K Streams", price: "$4,000", numericPrice: 4000 },
      { label: "500K Streams", price: "$8,000", numericPrice: 8000 },
      { label: "750K Streams", price: "$12,000", numericPrice: 12000 },
      { label: "1M Streams", price: "$15,000", numericPrice: 15000 },
    ],
  },
  {
    id: "soundcloud",
    title: "SoundCloud Reposts",
    description:
      "We tap into an underground network of verified SoundCloud artists and labels to organically repost your track across genre-specific communities. With over 50 million active U.S.-based listeners reached through our repost groups, this service connects your music with passionate fans who actively seek new sounds. Campaigns are fully transparent, trackable, and optimized to foster genuine fan engagement rather than passive plays.",
    visualizer: "network",
    tableDisplay: true,
    pricing: [
      { label: "5M Reach", price: "$150", numericPrice: 150 },
      { label: "10M Reach", price: "$300", numericPrice: 300 },
      { label: "20M Reach", price: "$600", numericPrice: 600 },
      { label: "30M Reach", price: "$850", featured: true, numericPrice: 850 },
      { label: "40M Reach", price: "$1,175", numericPrice: 1175 },
      { label: "60M Reach", price: "$1,750", numericPrice: 1750 },
      { label: "80M Reach", price: "$2,250", numericPrice: 2250 },
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
    id: "dedicated-accounts",
    title: "Dedicated Accounts",
    description:
      "Dedicated accounts on fresh profiles provide a long-term approach to building communities through owned social assets. Fan Accounts (faceless, VA-managed) serve artists, while UGC Accounts (actor-driven, vetted creators) serve brands. All packages include a 3-month minimum commitment, and the client owns all accounts and content.",
    timeframe: "3-month minimum",
    visualizer: "network",
    note: "Two sub-types: Fan Accounts (faceless; for artists) managed by VAs, and UGC Accounts (actor-driven; for brands) managed by vetted creators.",
    pricing: [
      { label: "Basic", price: "$15,000/mo", detail: "9 total accounts (3 per platform) | 270 posts", numericPrice: 15000, isMonthly: true },
      { label: "Plus", price: "$22,500/mo", detail: "15 total accounts (5 per platform) | 450 posts", numericPrice: 22500, isMonthly: true },
      { label: "Pro", price: "$32,500/mo", detail: "24 total accounts (8 per platform) | 720 posts", featured: true, numericPrice: 32500, isMonthly: true },
      { label: "Scale", price: "$40,000/mo", detail: "30 total accounts (10 per platform) | 900 posts", numericPrice: 40000, isMonthly: true },
    ],
  },
  {
    id: "marketplace",
    title: "Clipping",
    description:
      "CPM-based campaigns across verticals. Any user can run campaigns with a minimum $2K budget ($1K for music). We handle creator sourcing, content production, and distribution across the relevant platforms.",
    visualizer: "chart",
    budgetBased: true,
    minimum: "$2K budget ($1K for music)",
    categories: [
      { label: "Music", cpm: 2, cost: 1, minBudget: 1000 },
      { label: "Podcast", cpm: 2, cost: 1.25, minBudget: 2000 },
      { label: "Sports", cpm: 2, cost: 1.25, minBudget: 2000 },
      { label: "TV/Film", cpm: 3, cost: 1.5, minBudget: 2000 },
      { label: "Politics", cpm: 4, cost: 2, minBudget: 2000 },
      { label: "Out-of-Scope", cpm: 0, cost: 0, minBudget: 10000 },
    ],
    pricing: [
      { label: "Music", price: "$2 CPM", detail: "Min $1K budget", numericPrice: 2 },
      { label: "Podcast", price: "$2 CPM", detail: "Min $2K budget", numericPrice: 2 },
      { label: "Sports", price: "$2 CPM", detail: "Min $2K budget", numericPrice: 2 },
      { label: "TV/Film", price: "$3 CPM", detail: "Min $2K budget", numericPrice: 3 },
      { label: "Politics", price: "$4 CPM", detail: "Min $2K budget", numericPrice: 4 },
      { label: "Out-of-Scope", price: "Custom", detail: "Min $10K budget", numericPrice: 0 },
    ],
  },
  {
    id: "creator-flood",
    title: "TikTok Creator Flood",
    description:
      "Mass-posting your track across 10,000+ real TikTok UGC videos, primarily from international nano-creators with a handful of macros mixed in. Campaigns often drive spillover beyond 10,000 posts depending on performance. This method builds massive volume and algorithmic lift through real creator accounts.",
    timeframe: "3–4 weeks",
    visualizer: "tiles",
    flatPrice: 12000,
    pricing: [
      { label: "Creator Flood", price: "$12,000", numericPrice: 12000 },
    ],
    note: "Flat rate. Campaigns often exceed guaranteed post count through organic spillover.",
  },
  {
    id: "trending",
    title: "Top 50 Trending & Popular Tab",
    description:
      "We guarantee your track appears on Top 50 trending charts across YouTube Shorts, Instagram Reels, and Facebook Reels, and enters the Popular Tab on TikTok. The process uses a hybrid of AI-generated quantity content and real UGC, prioritizing volume to push traction until the track charts.",
    timeframe: "2–3 weeks",
    visualizer: "chart",
    flatPrice: 14000,
    pricing: [
      { label: "Top 50 Trending", price: "$14,000", numericPrice: 14000 },
    ],
  },
  {
    id: "paid-amplification",
    title: "Paid Amplification (Meta/TikTok Spark Ads)",
    description:
      "TikTok Spark Ads whitelist top-performing organic content and amplify it through paid distribution, maintaining authenticity while scaling reach. Meta Ads extend your campaign across Instagram and Facebook with precision targeting. Both channels come with full creative production, strategic optimization, and transparent reporting.",
    visualizer: "signal",
    budgetBased: true,
    pricing: [
      { label: "Creative Fee", price: "$1,000", detail: "10 assets included ($100 each additional)", numericPrice: 1000 },
      { label: "Up to $5K Spend", price: "30% fee", detail: "Of total ad spend", isPercentage: true },
      { label: "$5K–$10K Spend", price: "20% fee", detail: "Of total ad spend", isPercentage: true },
      { label: "$10K+ Spend", price: "10% fee", detail: "Of total ad spend", isPercentage: true },
    ],
  },
];
