

## Split Dedicated Accounts into Fan Accounts + Managed UGC Program

### What Changes

The current single "Dedicated Accounts" service gets replaced by two separate services:

**1. Fan Accounts (Min 3 Months)**
- $8,000/mo -- 5 Unique Accounts (x3 platforms = 15 total) / 300 Unique Videos (900 Total)
- $15,000/mo -- 10 Unique Accounts (x3 platforms = 30 total) / 600 Unique Videos (1,200 Total)
- $21,000/mo -- 15 Unique Accounts (x3 platforms = 45 total) / 900 Unique Videos (1,800 Total)

**2. Managed UGC Program (Min 3 Months)**
- $30,000/mo -- 10 Creators / 1,200 Videos across TikTok, Instagram (600 Unique)
- $60,000/mo -- 20 Creators / 2,400 Videos across TikTok, Instagram (1,200 Unique)

Both remain monthly/recurring with a 3-month minimum, and show as tier-select dropdowns in the Campaign Builder (same UX pattern as the old Dedicated Accounts).

### Technical Details

**File: `src/data/services.ts`**
- Remove the existing `dedicated-accounts` service entry
- Add two new service entries at the top of the array:
  - `fan-accounts` with 3 tiers ($8K, $15K, $21K), all `isMonthly: true`, with detail strings describing accounts/videos
  - `managed-ugc` with 2 tiers ($30K, $60K), all `isMonthly: true`, with detail strings describing creators/videos
- Both keep `timeframe: "3-month minimum"` and `visualizer: "network"`

**File: `src/components/CampaignBuilder.tsx`**
- No structural changes needed -- both new services use the existing tier-select dropdown pattern (non-budget-based, non-flat, with selectable tiers)
- The state initializer already handles new service IDs dynamically from the `services` array

**File: `src/components/ServiceAccordion.tsx`**
- No changes needed -- it renders from the `services` array automatically, and both new services will use the card-based pricing display (not `tableDisplay`)

