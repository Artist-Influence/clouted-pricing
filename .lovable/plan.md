
## Remove Pricing from Select Dropdown Triggers

The user wants to hide the pricing information that appears in the blue trigger area of the Select components. Currently, when you look at each service dropdown, you see pricing like "$13 CPM", "$1,650", etc. displayed in the SelectValue area.

### Root Cause
The `SelectValue` component automatically displays the selected item's text content. In the dropdowns, the items contain pricing information (e.g., `{tier.label} — {tier.price}`), so the trigger shows that full text.

### Solution
Modify the Select components to use a custom `SelectValue` placeholder instead of letting it auto-display the selected item's text. This way:
- The trigger will show only a generic placeholder like "Select an option" or service-specific text
- The pricing will remain visible inside the dropdown menu items themselves
- This applies to three key Select components:
  1. **Clipping category selector** (line 399-401)
  2. **Tier-based service selector** (line 491-493)

### Implementation Details

**Clipping Category Select (line 395-409):**
- Change `<SelectValue />` to `<SelectValue placeholder="Select Category" />`

**Tier-based Service Select (line 485-502):**
- Change `<SelectValue />` to `<SelectValue placeholder="Select Tier" />`

The dropdown menu items will retain their pricing information (`{tier.label} — {tier.price}` and `{cat.label} — ${cat.cpm} CPM`), so users will see pricing when they open the dropdown. It just won't be visible in the closed trigger state.

