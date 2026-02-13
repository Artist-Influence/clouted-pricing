

## Industry Selection Gate

### Overview
Before showing the main page, users will see a simple selection screen asking if they're in the **Music** industry or **another industry**. Based on their choice, the services shown in both the accordion and campaign builder will be filtered.

### Industry Filter Logic

**Music** -- Show all services EXCEPT Managed UGC Program:
- Fan Accounts, Clipping, Creator Flood, Top 50 Trending, Paid Amplification, Spotify, SoundCloud, YouTube, Instagram Seeding

**Other Industries** -- Show only:
- Managed UGC Program, Clipping, Paid Amplification

### Implementation

**1. New file: `src/components/IndustryGate.tsx`**
- A full-screen overlay/splash with the CLOUTED logo and two large buttons: "Music" and "Other Industries"
- Styled with the same aurora background and glass-card aesthetic
- On selection, calls a callback with the chosen industry

**2. Update `src/pages/Index.tsx`**
- Add state: `const [industry, setIndustry] = useState<"music" | "other" | null>(null)`
- If `industry` is null, render `<IndustryGate onSelect={setIndustry} />`
- Otherwise render the current page content
- Pass `industry` down to `ServiceAccordion` and `CampaignBuilder`

**3. Update `src/data/services.ts`**
- Add an `industry` tag to each service: `"music"`, `"other"`, or `"both"`
  - `fan-accounts`: `"music"`
  - `managed-ugc`: `"other"`
  - `marketplace` (Clipping): `"both"`
  - `creator-flood`: `"music"`
  - `trending`: `"music"`
  - `paid-amplification`: `"both"`
  - `spotify`: `"music"`
  - `soundcloud`: `"music"`
  - `youtube`: `"music"`
  - `instagram`: `"music"`

**4. Update `src/components/ServiceAccordion.tsx`**
- Accept an `industry` prop
- Filter services: show if service.industry === industry OR service.industry === "both"

**5. Update `src/components/CampaignBuilder.tsx`**
- Accept an `industry` prop
- Filter the services array the same way before rendering rows and computing totals
- For Clipping in non-music mode, default the category to a non-music option

