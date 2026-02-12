

# Pricing Data & Display Overhaul

## What's Changing

The entire pricing dataset needs to be corrected, several services need restructuring, and the accordion display should use a compact table format (inside a dropdown) for services with many tiers instead of the current card grid.

---

## Updated Service Structure

### Services to keep (with corrected pricing)

1. **YouTube Ads** -- same tiers, add minimum info per row (e.g. "1,000 views ($13)")
2. **Spotify Playlisting** -- expanded from 6 tiers to 17 (10K through 1M Streams with new prices)
3. **SoundCloud Reposts** -- changed from 500K-10M to 5M-80M reach with new prices
4. **Instagram Seeding** -- unchanged (70/30 split, $350 min)

### Services to restructure

5. **Dedicated Accounts** -- replaces both "Fan Page Management" and "Dedicated UGC Accounts". Two sub-types (Fan Accounts for artists, UGC Accounts for brands). New tiers: Basic $15K/mo (9 accounts, 270 posts), Plus $22.5K/mo (15 accounts, 450 posts), Pro $32.5K/mo (24 accounts, 720 posts), Scale $40K/mo (30 accounts, 900 posts). 3-month minimum, client owns everything.

6. **Marketplace Campaigns** -- new service replacing "Clipping". CPM-based, min $2K budget ($1K for music). Categories: Music $2 CPM, Podcast $2, Sports $2, TV/Film $3, Politics $4, Out-of-Scope custom (min $10K).

### Services to simplify (flat pricing)

7. **Creator Flood** -- single flat price: $12K (remove tiered options)
8. **Top 50 Trending** -- single flat price: $14K (remove per-platform breakdown)

### Add-on service

9. **Paid Amplification (Meta/TikTok Spark Ads)** -- stays as add-on. +$1K creative fee (10 assets, $100 each additional). 30% fee up to $5K, 20% up to $10K, 10% above $10K.

### Services to remove
- Culture Edits (not in new pricing)

---

## Display Changes

### Table format for long tier lists
For services with many pricing tiers (Spotify with 17 rows, SoundCloud with 7, YouTube with 7), the accordion's expanded view will render a **styled table** instead of a grid of pricing cards. Columns: Package/Service | Price | Minimum (if applicable). This is more scannable and compact.

Services with fewer tiers or special structures (Dedicated Accounts, Marketplace, Instagram) will keep a card-style or descriptive layout.

### Campaign Builder updates
- Remove Culture Edits row
- Creator Flood: no tier dropdown needed, just a toggle (flat $12K)
- Top 50 Trending: no tier dropdown needed, just a toggle (flat $14K)
- Dedicated Accounts: tier dropdown with 4 options (monthly)
- Marketplace Campaigns: budget slider with category selector
- Update all preset configurations to match new pricing

---

## Technical Changes

### `src/data/services.ts`
- Rewrite all service entries with corrected pricing data
- Add `tableDisplay?: boolean` flag on services that should render as tables
- Add `minimumDetail?: string` to PricingItem for YouTube's per-row minimums
- Merge fanpages + ugc-accounts into a single "dedicated-accounts" entry
- Replace clipping with "marketplace" entry containing category sub-items
- Simplify creator-flood and trending to single-price entries

### `src/components/ServiceAccordion.tsx`
- Add conditional rendering: if `service.tableDisplay` is true, render a `<table>` with glass styling instead of the PricingCard grid
- Table has columns: Package | Price | Minimum (Minimum column only if any tier has minimumDetail)

### `src/components/CampaignBuilder.tsx`
- Update service IDs to match new data (dedicated-accounts, marketplace)
- For flat-price services (creator-flood, trending): show toggle only, no dropdown
- For marketplace: add a category selector dropdown + budget slider
- Update preset configurations to reference correct new service IDs and tier indices
- Update cost calculation logic for new service structures

### `src/components/deck/PricingCard.tsx`
- No changes needed (still used for non-table services)

