# Shadcn UI Package

Components copied from shadcn/ui via CLI. Radix + Tailwind + CVA—the copy-paste model. **Recommended** for new projects (speed and reuse).

---

## Overview

**Package:** `@design-system/shadcn-ui`  
**Description:** Components copied from shadcn/ui via CLI (Radix + Tailwind + CVA). The recommended choice for internal projects (see [UI_LIBRARIES_COMPARISON.md](UI_LIBRARIES_COMPARISON.md)).  
**Dependencies:** `@design-system/base`, `@design-system/icons`, `@design-system/tokens`, `@design-system/utils`, `class-variance-authority`, `@radix-ui/*`, `@radix-ui/react-slot`  
**Peer dependencies:** `react` >=18, `react-dom` >=18

This package uses the **shadcn copy-paste model**: run `npx shadcn add <component>` to copy component source into the package. Components live in `src/components/ui/`. Adapters map our Insendio API to the shadcn component APIs.

---

## How It Works

- **Copy-paste** – Component source is copied from shadcn/ui into this package.
- **Radix + Tailwind + CVA** – Same stack as shadcn/ui.
- **Adapters** – Our package exports wrap shadcn components to match Insendio API (variant, size, etc.).
- **Update flow** – Run `pnpm add:components` or `npx shadcn@latest add <component> --cwd packages/shadcn-ui --overwrite` to refresh.

---

## Component Sources

| Source | Components |
|--------|------------|
| **src/components/ui** (shadcn-style) | Button, Input, Badge, Alert, Link – CVA + Slot, no base |
| **Radix + Tailwind** (in src/) | Dialog, AlertDialog, Tabs, Menu, Switch, Accordion, Checkbox, etc. |
| **base** | Carousel, Breadcrumb, Combobox, Disclosure, Listbox, Slider, Toolbar, Tooltip, Layout, etc. |

---

## Scripts

```bash
pnpm add:components   # npx shadcn@latest add button input badge ... --cwd . --overwrite
```

Add or update components via the shadcn CLI. Adapters in `src/` map to our API.

---

## File Structure

```
packages/shadcn-ui/
├── components.json    # shadcn CLI config
├── src/
│   ├── components/ui/   # Copied shadcn components
│   ├── button.tsx       # Adapter
│   ├── accordion.tsx    # Adapter or Radix wrapper
│   └── index.tsx        # Exports
└── package.json
```

---

## Design System Integration

- **Tokens:** Applied via Tailwind config and component class overrides
- **Icons:** `@design-system/icons`
- **cn():** Class merging

---

## Related

- [SHADCN_RADIX_PACKAGE.md](SHADCN_RADIX_PACKAGE.md) – Radix + Tailwind (built in-house)
- [FAQ.md](FAQ.md) – "What is shadcn's real model?"
- [UI_LIBRARIES_COMPARISON.md](UI_LIBRARIES_COMPARISON.md)
