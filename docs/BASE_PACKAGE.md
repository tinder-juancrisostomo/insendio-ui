# Base Package

Headless accessible UI components following W3C ARIA APG patterns. No styling—pure behavior and semantics.

---

## Overview

**Package:** `@design-system/base`  
**Description:** Headless accessible UI components - W3C ARIA APG patterns  
**Dependencies:** `@design-system/tokens`  
**Peer dependencies:** `react` >=18, `react-dom` >=18

The base package is the **foundation** for all styled packages. It provides unstyled, accessible components that implement keyboard navigation, focus management, and ARIA attributes. Styled packages (styled-base, daisyui, mui, etc.) wrap these with Tailwind or library-specific styling.

---

## How It Works

- **No visual styling** – Components render semantic HTML with minimal inline styles (e.g. flex for layout).
- **W3C ARIA APG** – Each component follows the corresponding [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/patterns/) pattern.
- **Keyboard support** – Arrow keys, Enter, Space, Escape, Home, End where applicable.
- **Design tokens** – Uses `@design-system/tokens` for spacing (`--ds-space-N`) in layout primitives.

---

## Component Categories

### Interactive Components (APG Patterns)

| Component | W3C Pattern | Keyboard |
|-----------|-------------|----------|
| Accordion | Accordion | Arrow keys, Home, End |
| Alert | Alert | - |
| AlertDialog | Alert Dialog | Escape |
| Breadcrumb | Breadcrumb | - |
| Button | Button | Enter, Space |
| Carousel | Carousel | Arrows, Home, End |
| Checkbox | Checkbox | Space |
| Combobox | Combobox | Arrows, Enter, Escape |
| Dialog | Dialog (Modal) | Escape |
| Disclosure | Disclosure | Enter, Space |
| Link | Link | Enter |
| Listbox | Listbox | Arrows, Enter, Space |
| Menu | Menu / Menu Button | Arrows, Enter, Escape |
| RadioGroup | Radio Group | Arrows, Space |
| Slider | Slider | Arrows, Home, End |
| Switch | Switch | Enter, Space |
| Table | Table | - |
| Tabs | Tabs | Arrows, Home, End |
| Toolbar | Toolbar | Arrows, Home, End |
| Tooltip | Tooltip | Focus/Hover |

### Layout Primitives

| Component | Purpose |
|-----------|---------|
| Box | Generic div passthrough |
| Container | Max-width container with size variants |
| Stack | Flex column/row with `gap: var(--ds-space-N)` |
| Inline | Stack with horizontal direction |
| Grid | CSS Grid wrapper |
| Spacer | Flexible space |
| Divider | Horizontal/vertical divider |
| Center | Centered content |

### Landmarks (ARIA)

| Component | Role |
|-----------|------|
| Banner | `banner` |
| Main | `main` |
| Nav | `navigation` |
| ContentInfo | `contentinfo` |
| Complementary | `complementary` |
| Region | `region` |
| Search | `search` |
| FormLandmark | `form` |

### Additional Patterns

| Component | Purpose |
|-----------|---------|
| RangeSlider | Dual-thumb range input |
| TreeView | Hierarchical tree |
| TreeGrid | Tree with grid layout |
| WindowSplitter | Resizable panes |

---

## Exports

All components, layout primitives, landmarks, and types are exported from the main entry. See `packages/base/src/index.tsx` for the full list.

---

## Usage

```tsx
import { Button, Tabs, TabList, Tab, TabPanel } from '@design-system/base';

// Headless - no styling
<Button onClick={handleClick}>Click me</Button>
<Tabs defaultSelectedId="tab1">
  <TabList>
    <Tab id="tab1">Tab 1</Tab>
  </TabList>
  <TabPanel tabId="tab1">Content</TabPanel>
</Tabs>
```

---

## Related

- [STYLING.md](STYLING.md) – How styled packages apply Tailwind/tokens to base
- [ARCHITECTURE.md](ARCHITECTURE.md) – Package layers and data flow
- [TERMS.md](TERMS.md) – Headless, design tokens
