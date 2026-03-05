# DaisyUI Package Analysis

A comprehensive guide to the `@design-system/daisyui` package: how it works, how our design system is applied, component sources (react-daisyui vs base), and evaluation criteria for adoption.

---

## Overview

The `@design-system/daisyui` package provides UI components for the Insendio design system using **react-daisyui** (real DaisyUI React components) where available, and **@design-system/base** (headless W3C ARIA components) for the rest. DaisyUI is a Tailwind CSS plugin that adds semantic component classes (`btn`, `alert`, `modal`, etc.).

**Package:** `@design-system/daisyui`  
**Version:** 1.0.0  
**Dependencies:** `react-daisyui` ^5.0.5, `@design-system/base`, `@design-system/utils`  
**Peer dependencies:** `react` >=18, `react-dom` >=18, `daisyui` >=4.0

---

## Why react-daisyui vs. DaisyUI Plugin Classes Only?

DaisyUI is a **Tailwind plugin** that adds semantic CSS classes (`btn`, `alert`, `modal`, etc.). You could use those classes directly on native elements or base components—as we do for Accordion, Breadcrumb, Checkbox, and others. So why do we also use **react-daisyui** for Button, Badge, Input, Menu, etc.?

**Current rationale (historical):**

- **Speed** – react-daisyui provides pre-built React components; no need to wire base + DaisyUI classes for each one.
- **API mapping** – react-daisyui props (`color`, `variant`, `size`) map easily to our Insendio API.
- **Official bindings** – react-daisyui is the community React layer for DaisyUI.

**Could we use only the plugin?** Yes. Simple components (Button, Badge, Input, Alert) could use native elements + DaisyUI classes (e.g. `btn btn-primary`). Complex ones (Menu, Switch, Tabs) could use base for behavior + DaisyUI classes—the same pattern as Accordion. That would:

- Remove the react-daisyui dependency (~35–40 KB)
- Align with the zero-runtime nature of the DaisyUI plugin
- Match the base + classes approach used for Accordion, Breadcrumb, etc.

The current split is a pragmatic choice, not a technical requirement. A future refactor could standardize on plugin + base only.

---

## How It Works

### Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│  App (daisyui-app, docs)                                         │
│  - Tailwind + daisyui plugin                                     │
│  - InsendioComponentsProvider with daisyui components            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  @design-system/daisyui                                          │
│  - Adapters mapping Insendio API → react-daisyui / base          │
│  - cn() for class merging                                        │
└─────────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              ▼                               ▼
┌─────────────────────────┐     ┌─────────────────────────┐
│  react-daisyui         │     │  @design-system/base   │
│  Button, Alert, Badge,  │     │  Accordion, Breadcrumb,│
│  Input, Table, Toggle,  │     │  Carousel, Checkbox,   │
│  Dropdown, Tabs.Tab     │     │  Combobox, Disclosure, │
│                         │     │  Link, Listbox, etc.   │
└─────────────────────────┘     └─────────────────────────┘
```

### API Adapter Pattern

The Insendio app uses a **polymorphic component API** (e.g. `variant="outline"`, `size="sm"`). react-daisyui uses different prop names (`color`, `size` with different values). Our package provides **adapters** that map our API to react-daisyui:

| Our API | react-daisyui API |
|---------|-------------------|
| `variant="outline"` | `variant="outline"` |
| `variant="destructive"` | `color="error"` |
| `variant="default"` | `color="primary"` |
| `size="sm"` | `size="sm"` |
| `checked` / `onCheckedChange` | `checked` / `onChange` |

---

## Component Sources

### From react-daisyui (Real DaisyUI Components)

These components are **wrappers around react-daisyui** with API adapters:

| Component | react-daisyui Source | Adapter Notes |
|-----------|----------------------|---------------|
| **Button** | `Button` | Maps `variant` → `color`/`variant`, `size` → `size` |
| **Alert** | `Alert` | Maps `variant` → `status` (info, error, success) |
| **Badge** | `Badge` | Maps `variant` → `color` |
| **Input** | `Input` | Adds `iconLeft`/`iconRight` support via wrapper div |
| **Switch** | `Toggle` | Maps `onCheckedChange` → `onChange`, adds `role="switch"` |
| **Table** | `Table` | Uses DaisyTable for base; TableHeader/Body/Row/Cell are semantic HTML with DaisyUI table context |
| **Menu** | `Dropdown` | Menu → Dropdown, MenuButton → Dropdown.Toggle, MenuList → Dropdown.Menu |
| **Tabs** | `Tabs.Tab` | Custom Tabs context (keyboard nav, TabPanel) + react-daisyui Tab for styling |

### Custom (DaisyUI Classes, No react-daisyui)

These use **DaisyUI CSS classes** directly (modal, modal-box, modal-backdrop) but are implemented with React + createPortal:

| Component | Implementation | Notes |
|-----------|-----------------|-------|
| **Dialog** | `createPortal` + `modal`, `modal-box`, `modal-backdrop` | open/onClose API; backdrop click closes |
| **AlertDialog** | Same as Dialog | `role="alertdialog"` for semantics |

### From @design-system/base (Styled with DaisyUI Classes)

These wrap **headless base components** and apply DaisyUI classes:

| Component | Base Source | DaisyUI Classes Applied |
|-----------|-------------|-------------------------|
| **Accordion** | Accordion, AccordionItem, etc. | `collapse`, `collapse-arrow`, `collapse-title`, `collapse-content` |
| **Breadcrumb** | Breadcrumb, BreadcrumbItem, BreadcrumbLink | DaisyUI breadcrumb classes |
| **Carousel** | Carousel | DaisyUI carousel classes |
| **Checkbox** | Checkbox | `checkbox`, `checkbox-primary` |
| **Combobox** | Combobox | DaisyUI select/input classes |
| **Disclosure** | Disclosure, DisclosureTrigger, DisclosurePanel | `collapse` pattern |
| **Link** | Link | `link` |
| **Listbox** | Listbox | DaisyUI list/select classes |
| **RadioGroup** | RadioGroup, Radio | DaisyUI radio classes |
| **Slider** | Slider | DaisyUI range classes |
| **Toolbar** | Toolbar | DaisyUI toolbar/join classes |
| **Tooltip** | Tooltip | DaisyUI tooltip classes |

### Layout (No External Dependency)

| Component | Implementation |
|-----------|----------------|
| **Box** | `<div>` passthrough |
| **Stack** | Flex column/row with `gap: var(--ds-space-N)` |
| **Inline** | Stack with `direction="horizontal"` |

### Re-exported from Base (Unstyled / Headless)

These are passed through without DaisyUI styling:

- **Container, Grid, Spacer, Divider, Center**
- **RangeSlider, TreeView, TreeGrid, WindowSplitter**
- **Banner, Main, Nav, ContentInfo, Complementary, Region, Search, FormLandmark**

---

## Design System Integration

### Design Tokens

Our design tokens (`@design-system/tokens`) are used sparingly in the daisyui package:

| Token Usage | Where |
|-------------|-------|
| `var(--ds-space-N)` | Stack, Inline `gap` prop (layout.tsx) |

DaisyUI has its own theming system (CSS variables like `--p`, `--s`, `--a` for primary, secondary, accent). Our tokens are **not** applied to react-daisyui components by default. Custom styling (e.g. Insendio purple) is applied at the **app level** via `className` overrides (e.g. `!bg-[var(--ds-insendio-primary)]` in InsendioPrimaryButton).

### Class Merging

All components use `cn()` from `@design-system/utils` (clsx + tailwind-merge) to merge `className` with component classes, allowing app-level overrides.

### App Setup

For an app to use `@design-system/daisyui`:

1. **Install:** `daisyui` (Tailwind plugin), `@design-system/daisyui`
2. **Tailwind config:**
   ```js
   plugins: [require('daisyui')],
   content: [
     // ... app + package paths
     './node_modules/react-daisyui/dist/**/*.js',
     './node_modules/daisyui/dist/**/*.js',
   ],
   ```
3. **Provider:** Wrap the app with `InsendioComponentsProvider` and pass daisyui components.

---

## Insendio App Components

The Insendio demo app uses these components from the daisyui package:

| Component | Used In | Source |
|-----------|---------|--------|
| Box, Stack, Inline | Layout, cards, stat cards | layout.tsx (custom) |
| Button | Primary button, filters, actions | react-daisyui Button |
| Input | Search, forms | react-daisyui Input |
| Badge | Role badges, segment type | react-daisyui Badge |
| Table, TableHeader, TableBody, TableRow, TableCell | Roles matrix, data tables | react-daisyui Table + semantic HTML |
| Tabs, TabList, Tab, TabPanel | Data/Settings, Notifications/Monitoring | Custom Tabs + react-daisyui Tab |
| Menu, MenuButton, MenuList, MenuItem | Env selector, actions | react-daisyui Dropdown |
| Alert | Info alerts | react-daisyui Alert |
| Switch | Accessibility toggles | react-daisyui Toggle |
| Dialog | Edit modals | Custom (DaisyUI modal classes) |
| AlertDialog | Delete confirmations | Custom (DaisyUI modal classes) |

---

## Evaluation Criteria for Adoption

### Pros

| Criterion | Assessment |
|-----------|------------|
| **Real components** | Uses react-daisyui (24K+ weekly downloads); not just CSS classes |
| **Tailwind-native** | DaisyUI is a Tailwind plugin; fits our stack |
| **Semantic theming** | `btn-primary`, `alert-info`; easy light/dark via DaisyUI themes |
| **Zero runtime (core)** | DaisyUI plugin = build-time CSS; react-daisyui adds minimal JS |
| **API compatibility** | Adapters provide unified Insendio API across libraries |

### Cons

| Criterion | Assessment |
|-----------|------------|
| **Dual dependency** | Both `@design-system/base` and `react-daisyui`; some components from each |
| **Token alignment** | DaisyUI themes vs our tokens; custom overrides needed for brand colors |
| **Override complexity** | DaisyUI defaults may require `!` or specificity to override |
| **Component coverage** | react-daisyui doesn't cover all our patterns; base used for Accordion, Carousel, etc. |

### Bundle Impact

- **react-daisyui:** ~35–40 KB (minified) for component set
- **daisyui (plugin):** No runtime; CSS generated at build
- **daisyui-app build:** ~330 KB JS (main chunk), ~240 KB CSS (includes DaisyUI theme)

### Maintenance

- **Upgrades:** react-daisyui and daisyui version independently; adapter layer may need updates
- **New components:** Add to base or create react-daisyui adapter; document in this file

---

## File Structure

```
packages/daisyui/
├── package.json
├── src/
│   ├── index.tsx          # Exports
│   ├── layout.tsx         # Box, Stack, Inline (design tokens for gap)
│   ├── button.tsx         # react-daisyui Button adapter
│   ├── alert.tsx          # react-daisyui Alert adapter
│   ├── badge.tsx          # react-daisyui Badge adapter
│   ├── input.tsx          # react-daisyui Input + iconLeft/iconRight
│   ├── switch.tsx         # react-daisyui Toggle adapter
│   ├── table.tsx          # react-daisyui Table + semantic elements
│   ├── menu.tsx           # react-daisyui Dropdown adapter
│   ├── tabs.tsx           # Custom Tabs + react-daisyui Tab
│   ├── dialog.tsx         # Custom modal (DaisyUI classes)
│   ├── alert-dialog.tsx   # Custom alertdialog (DaisyUI classes)
│   ├── accordion.tsx      # base + DaisyUI collapse classes
│   ├── breadcrumb.tsx     # base + DaisyUI classes
│   ├── carousel.tsx       # base + DaisyUI classes
│   ├── checkbox.tsx       # base + DaisyUI classes
│   ├── combobox.tsx       # base + DaisyUI classes
│   ├── disclosure.tsx     # base + DaisyUI classes
│   ├── link.tsx           # base + DaisyUI classes
│   ├── listbox.tsx        # base + DaisyUI classes
│   ├── radio-group.tsx    # base + DaisyUI classes
│   ├── slider.tsx         # base + DaisyUI classes
│   ├── toolbar.tsx        # base + DaisyUI classes
│   └── tooltip.tsx        # base + DaisyUI classes
└── dist/                  # Built output
```

---

## Related Documentation

- [STYLING.md](STYLING.md) – Tailwind, DaisyUI plugin, design tokens
- [UI_LIBRARIES_COMPARISON.md](UI_LIBRARIES_COMPARISON.md) – DaisyUI pros/cons vs other libraries
- [ARCHITECTURE.md](ARCHITECTURE.md) – Monorepo structure, package layers
- [TERMS.md](TERMS.md) – Headless, design tokens, polymorphic components
