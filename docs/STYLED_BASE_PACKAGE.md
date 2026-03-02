# Styled Base Package

Tailwind + design tokens on our headless base. No external UI library—full control, minimal footprint.

---

## Overview

**Package:** `@design-system/styled-base`  
**Description:** Tailwind + design tokens on our headless base (no external UI lib)  
**Dependencies:** `@design-system/base`, `@design-system/tokens`, `@design-system/utils`, `class-variance-authority`  
**Peer dependencies:** `react` >=18, `react-dom` >=18

Styled Base wraps every base component with Tailwind utility classes and design tokens. It uses **CVA** (class-variance-authority) for variant composition. This is the **recommended** package for new projects (see [UI_LIBRARIES_COMPARISON.md](UI_LIBRARIES_COMPARISON.md)).

---

## How It Works

- **Base + Tailwind** – All components from `@design-system/base` are wrapped with Tailwind classes.
- **Design tokens** – Uses `--ds-*` CSS variables from `@design-system/tokens` for colors, spacing, borders.
- **CVA** – Variant/size props map to class combinations via `cva()`.
- **cn()** – Class merging with `@design-system/utils` for `className` overrides.

---

## Component Sources

| Source | Components |
|--------|------------|
| **base + Tailwind** | Button, Alert, Badge, Input, Switch, Table, Tabs, Menu, Dialog, AlertDialog, Accordion, Breadcrumb, Carousel, Checkbox, Combobox, Disclosure, Link, Listbox, RadioGroup, Slider, Toolbar, Tooltip |
| **base (re-export)** | Box, Container, Stack, Inline, Grid, Spacer, Divider, Center, RangeSlider, TreeView, TreeGrid, WindowSplitter, Landmarks |

All styled components extend base with Tailwind classes. Example (Button):

```tsx
const buttonVariants = cva('rounded-lg font-medium ...', {
  variants: {
    variant: { default: 'bg-primary ...', outline: 'border ...', ... },
    size: { default: 'h-10 px-4', sm: 'h-8 px-3', ... },
  },
});
<BaseButton className={cn(buttonVariants({ variant, size }), className)} {...props} />
```

---

## Design System Integration

- **Tokens:** `--ds-btn-*`, `--ds-bg-*`, `--ds-text-*`, `--ds-border-*`, `--ds-space-*`
- **Dark mode:** Token values switch via `ds-light` / `ds-dark` on root
- **Overrides:** `className` prop merged with `cn()` for app-level customization

---

## App Setup

1. Import tokens: `import '@design-system/tokens/css'`
2. Set theme: `document.documentElement.classList.add('ds-light')` or `ds-dark`
3. Tailwind content must include `../../packages/styled-base/src/**/*.{js,ts,jsx,tsx}`

---

## Related

- [UI_LIBRARIES_COMPARISON.md](UI_LIBRARIES_COMPARISON.md) – Recommendation: Styled Base
- [STYLING.md](STYLING.md) – Tailwind, tokens, cn()
- [BASE_PACKAGE.md](BASE_PACKAGE.md) – Headless foundation
