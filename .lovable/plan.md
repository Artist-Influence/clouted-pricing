

## Dedicated Accounts Detail + Remove Presets

### 1. Update Dedicated Accounts pricing data
In `src/data/services.ts`, update the `detail` field on each tier to clearly show accounts and posts:
- Basic: "9 total accounts (3 per platform) | 270 posts"
- Plus: "15 total accounts (5 per platform) | 450 posts"
- Pro: "24 total accounts (8 per platform) | 720 posts"
- Scale: "30 total accounts (10 per platform) | 900 posts"

These already mostly match but will be verified and corrected to use the exact wording with pipe separators.

### 2. Display account/post details in the Campaign Builder
In `src/components/CampaignBuilder.tsx`, when Dedicated Accounts is enabled and a tier is selected, show the tier's `detail` text (accounts + posts) beneath the dropdown so users see what's included at a glance.

### 3. Remove preset buttons
In `src/components/CampaignBuilder.tsx`, remove the entire "Presets" section (the Starter, Momentum, Full Release, and Clear All buttons block at lines 192-216). The preset data and `applyPreset` function can also be cleaned up since they'll no longer be used.

