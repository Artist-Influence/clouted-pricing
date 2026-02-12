

# Campaign Builder Enhancements

## Changes Overview

Four targeted improvements to the Campaign Builder section:

### 1. Rename "Marketplace Campaigns" to "Clipping"
- Change `title` in `src/data/services.ts` from "Marketplace Campaigns" to "Clipping"
- Update description to match the clipping service context

### 2. Clipping (Marketplace) -- dynamic min budget + estimated views
- The category's `minBudget` already drives the slider minimum (Music = $1K, others = $2K) -- this works today but the slider `max` is 50K; change to **$30K**
- When budget changes, also clamp it to the new category's `minBudget` on category switch
- Show **estimated views** below the slider: `views = (budget / cpm) * 1000` (since CPM = cost per 1,000 impressions)
- Display like: "Est. ~2,500,000 views"

### 3. Paid Amplification -- slider to $100K + spend/fee breakdown
- Change slider `max` from 25K to **$100K**, step to $500
- Show a clear breakdown below the slider:
  - "Ad Spend: $X" (the slider value)
  - "Management Fee: $Y" (calculated with tiered rates: 30% on first $5K, 20% on next $5K, 10% on remainder)
  - "Creative Fee: $1,000"
  - "Total: $Z"
- Fix the fee calculation to be **tiered** (not flat rate): first $5K at 30%, $5K-$10K at 20%, $10K+ at 10% -- currently it uses a single flat rate which is incorrect

### 4. YouTube -- budget slider + multi-select ad types
- Change YouTube from a tier-dropdown service to a **multi-select + slider** service
- Add checkboxes (or toggle chips) for each ad type (USA Traffic, LATAM Traffic, etc.)
- Add a budget slider per selected ad type, or a single budget slider with the CPM applied per type
- Show estimated views per selected type: `views = (budget / cpm) * 1000`
- This requires a new selection model for YouTube since it needs multiple ad types enabled simultaneously

## Technical Details

### `src/data/services.ts`
- Rename marketplace title to "Clipping"
- Add `multiSelect?: boolean` flag to Service interface for YouTube
- Add `cpmValue?: number` to PricingItem for YouTube tiers (e.g., USA = 13, LATAM = 5.6) to calculate views from budget

### `src/components/CampaignBuilder.tsx`

**Data model changes:**
- Extend `ServiceSelection` with:
  - `youtubeAdTypes: Record<number, { enabled: boolean; budget: number }>` for multi-ad-type support

**Clipping row:**
- Change slider max to 30000
- On category change, clamp budget to new minBudget
- Show estimated views: `Math.round((budget / cpm) * 1000).toLocaleString()`

**Paid Amplification row:**
- Slider max to 100000, step 500
- Fix `calcServiceCost` to use tiered fee calculation:
  ```
  fee = min(spend, 5000) * 0.30
     + min(max(spend - 5000, 0), 5000) * 0.20
     + max(spend - 10000, 0) * 0.10
  ```
- Show itemized breakdown (Ad Spend, Fee, Creative Fee, Total)

**YouTube row:**
- Render a list of ad type toggles (checkboxes or small switches)
- Each enabled ad type gets a budget slider (min $13-based on CPM, max $5000, step $10)
- Show est. views per type
- Total YouTube cost = sum of all enabled ad type budgets
- Update `calcServiceCost` to sum across enabled YouTube ad types

**Preset updates:**
- Update presets to use the new YouTube multi-select model where applicable
