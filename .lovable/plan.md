

# Redesign: Single Scrollable Page with Campaign Builder

## Overview
Transform the current slide deck into a single scrollable page that shows all services with expandable descriptions and pricing, plus an interactive campaign builder at the bottom where users can mix-and-match services with sliders to estimate costs.

## Page Structure (top to bottom)

### 1. Hero Section
- Compact version of the current cover: "CLOUTED" title, tagline, and a brief intro paragraph (merged from CoverSlide + HowToUseSlide content)
- Keep the gradient background and subtle visualizer

### 2. Services Section
- Section heading: "Our Services"
- Each service rendered as a collapsible accordion item using the existing Radix accordion component
- **Collapsed state**: Service title, a short tagline, timeframe badge, and a "featured" price or price range
- **Expanded state**: Full description, all pricing cards in a responsive grid, minimum/timeframe/notes
- Keep the glassmorphism card styling for each service row

### 3. Campaign Builder Section
- Section heading: "Build Your Campaign"
- For each service, show a row with:
  - Service name
  - A toggle (switch) to include/exclude it
  - When enabled, a dropdown or slider to pick the tier/quantity
- Running total displayed in a sticky glass panel at the bottom of the viewport
- The total updates live as users adjust selections
- Show the example campaign tiers (Starter/Momentum/Full Release) as quick-select presets above the builder

### 4. Closing / CTA Section
- Compact version of ClosingSlide: headline + subline + branding

## Technical Details

### Files to Modify
- **`src/pages/Index.tsx`** -- Complete rewrite: remove slide engine, replace with a single scrollable layout containing the hero, accordion services list, campaign builder, and closing CTA
- **`src/index.css`** -- Remove slide-specific animations (slide-enter stagger classes), keep glass utilities. Add smooth scroll behavior

### New Components to Create
- **`src/components/ServiceAccordion.tsx`** -- Accordion-based service listing using Radix `Accordion`. Each item shows title + summary when collapsed, full description + pricing grid when expanded
- **`src/components/CampaignBuilder.tsx`** -- Interactive builder section. For each service: a switch to enable, a select/slider to choose tier. Computes and displays running total. Includes preset buttons for Starter/Momentum/Full Release campaigns

### Files to Remove (no longer needed)
- `src/components/deck/CoverSlide.tsx`
- `src/components/deck/HowToUseSlide.tsx`
- `src/components/deck/GoalSelectorSlide.tsx`
- `src/components/deck/ServiceSlide.tsx`
- `src/components/deck/CampaignBuildsSlide.tsx`
- `src/components/deck/ClosingSlide.tsx`
- `src/components/deck/Visualizer.tsx`

### Kept As-Is
- `src/data/services.ts` -- service data stays the same, will add numeric price values for builder calculations
- `src/components/deck/GlassPanel.tsx` -- reusable, keep it
- `src/components/deck/PricingCard.tsx` -- reusable inside accordion, keep it

### Data Update: `src/data/services.ts`
- Add a `numericPrice` (number) field to each `PricingItem` so the campaign builder can calculate totals (e.g., `{ label: "10K Streams", price: "$350", numericPrice: 350 }`)
- For percentage-based pricing (Instagram Seeding, Paid Amplification), the builder will use a budget input slider instead of tier selection

### Campaign Builder Logic
- Services with fixed tiers (Spotify, SoundCloud, Clipping, etc.): user picks a tier from a dropdown, price is the tier's `numericPrice`
- Services with percentage pricing (Instagram Seeding, Paid Amplification): user enters a budget amount via slider, fee is calculated automatically
- Monthly services (Fan Pages, UGC Accounts): user picks a tier, price shown as "/mo"
- Preset campaigns auto-select specific services and tiers matching the existing Starter/Momentum/Full Release examples

### Existing UI Components Used
- `@radix-ui/react-accordion` for service dropdowns
- `@radix-ui/react-switch` for enable/disable toggles
- `@radix-ui/react-select` for tier selection
- `@radix-ui/react-slider` for budget sliders
- Existing glass CSS classes for styling

