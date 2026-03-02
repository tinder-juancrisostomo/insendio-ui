# Shadcn Radix Package

Shadcn's model: Radix UI primitives + Tailwind + design tokens. Uses Radix for behavior, Tailwind for styling.

---

## Overview

**Package:** `@design-system/shadcn-radix`  
**Description:** Shadcn's model: Radix UI primitives + Tailwind + design tokens  
**Dependencies:** `@design-system/base`, `@design-system/icons`, `@design-system/tokens`, `@design-system/utils`, `class-variance-authority`, `@radix-ui/*` (accordion, alert-dialog, checkbox, collapsible, dialog, dropdown-menu, radio-group, select, slider, switch, tabs, toolbar, tooltip)  
**Peer dependencies:** `react` >=18, `react-dom` >=18

This package implements the **shadcn model**: Radix UI primitives for accessibility and behavior, Tailwind for styling, CVA for variants. Components are built in this package (not copied from shadcn/ui CLI).

---

## How It Works

- **Radix primitives** – Replaces base for Accordion, Dialog, AlertDialog, Tabs, Menu, Switch, Checkbox, RadioGroup, Slider, Tooltip, etc.
- **Tailwind + tokens** – Styling via utility classes and `--ds-*` variables.
- **CVA** – Variant composition.
- **API compatibility** – Same Insendio API (variant, size, etc.) as other styled packages.

---

## Component Sources

| Source | Components |
|--------|------------|
| **Radix UI** | Accordion, AlertDialog, Dialog, Tabs, Menu (DropdownMenu), Switch, Checkbox, RadioGroup, Slider, Tooltip, Toolbar, Disclosure (Collapsible), Listbox/Combobox (Select) |
| **base** | Carousel, Breadcrumb, Link, Layout, RangeSlider, TreeView, TreeGrid, WindowSplitter, Landmarks |

Radix provides the interactive behavior (keyboard, focus, ARIA); we add Tailwind classes for appearance.

---

## Radix Dependencies

```
@radix-ui/react-accordion
@radix-ui/react-alert-dialog
@radix-ui/react-checkbox
@radix-ui/react-collapsible
@radix-ui/react-dialog
@radix-ui/react-dropdown-menu
@radix-ui/react-radio-group
@radix-ui/react-select
@radix-ui/react-slider
@radix-ui/react-switch
@radix-ui/react-tabs
@radix-ui/react-toolbar
@radix-ui/react-tooltip
```

---

## Design System Integration

- **Tokens:** `--ds-*` for colors, spacing, borders
- **Icons:** `@design-system/icons` for icon support in components
- **cn():** Class merging for overrides

---

## Related

- [SHADCN_UI_PACKAGE.md](SHADCN_UI_PACKAGE.md) – Copy-paste shadcn/ui components
- [UI_LIBRARIES_COMPARISON.md](UI_LIBRARIES_COMPARISON.md) – Shadcn model evaluation
- [FAQ.md](FAQ.md) – "What is shadcn's real model?"
