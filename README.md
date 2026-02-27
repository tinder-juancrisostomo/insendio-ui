# UI libraries PoC AI

A **Proof of Concept** to analyze which UI library best fits our next internal projects. This monorepo compares four styling approaches (Shadcn, Hero UI, DaisyUI, MUI) on top of a shared headless base, built on W3C ARIA APG patterns for accessibility.

## Executive Summary

| | |
|---|---|
| **Goal** | Choose a UI library for our next internal projects |
| **Options** | Shadcn, Hero UI, DaisyUI, MUI |
| **Recommendation** | **Shadcn** – lightweight, Tailwind-native, full control |
| **Key risks** | Manual component sync; mitigated by versioning in monorepo |
| **Next step** | Pilot in one greenfield project (1–2 sprints) |

See [docs/UI_LIBRARIES_COMPARISON.md](docs/UI_LIBRARIES_COMPARISON.md) for the full analysis and [docs/POC_EVALUATION.md](docs/POC_EVALUATION.md) for adoption path and limitations.

## Structure

```
design-system-ai/
├── packages/
│   ├── tokens/        # Design tokens (light/dark, mobile-first)
│   ├── base/          # Headless accessible components (W3C ARIA)
│   ├── utils/         # cn() - Tailwind class merging (clsx + tailwind-merge)
│   ├── typography/    # Text components
│   ├── icons/         # Icon set
│   │
│   ├── shadcn/        # Components styled with Shadcn UI (Tailwind)
│   ├── hero-ui/       # Components styled with HeroUI (Tailwind)
│   ├── daisyui/       # Components styled with DaisyUI (Tailwind + DaisyUI plugin)
│   ├── mui/           # Components styled with Tailwind (MUI-inspired)
│   └── insendio-app/  # Insendio demo app + specialized components
│
└── apps/
    ├── mui-app/       # Insendio app with MUI components
    ├── daisyui-app/   # Insendio app with DaisyUI components
    ├── shadcn-app/    # Insendio app with Shadcn components
    ├── hero-ui-app/   # Insendio app with Hero UI components
    └── docs/          # Documentation app
```

## PoC Purpose

This PoC evaluates **Shadcn**, **Hero UI**, **DaisyUI**, and **MUI** to help decide which UI library to adopt for our next internal projects. See [docs/UI_LIBRARIES_COMPARISON.md](docs/UI_LIBRARIES_COMPARISON.md) for the full analysis and recommendation.

## Features

- **Design tokens** extracted from Insendio UI screenshots
- **Light and dark mode** support
- **Mobile-first** responsive breakpoints
- **W3C ARIA APG patterns** for all components
- **Keyboard interaction** (arrows, Enter, Space, Escape, etc.)
- **Multiple styling variants**: Base (headless), Shadcn, HeroUI, DaisyUI, MUI
- **Specialization pattern** in insendio-app (InsendioCard, InsendioTab, etc.)

## Quick Start

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run demo apps (Insendio with different component libraries)
pnpm dev:mui        # MUI-styled
pnpm dev:daisyui    # DaisyUI-styled
pnpm dev:shadcn     # Shadcn-styled
pnpm dev:hero-ui    # Hero UI-styled

# Run docs app
pnpm dev
```

## Try It Yourself

To evaluate the libraries side by side:

1. Run each app and compare the same Insendio demo:
   ```bash
   pnpm dev:shadcn     # Recommended
   pnpm dev:daisyui
   pnpm dev:hero-ui
   pnpm dev:mui
   ```
2. Check bundle size: `pnpm build` and inspect `apps/*/dist/` (see [docs/UI_LIBRARIES_COMPARISON.md](docs/UI_LIBRARIES_COMPARISON.md#bundle-size-production-build)).
3. Read the comparison doc and recommendation.

## Documentation

| Document | Description |
|----------|-------------|
| [docs/UI_LIBRARIES_COMPARISON.md](docs/UI_LIBRARIES_COMPARISON.md) | **Overview, pros, cons, and recommendation** |
| [docs/TERMS.md](docs/TERMS.md) | **Important terms** (headless, design tokens, etc.) |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Monorepo structure, package layers, data flow |
| [docs/STYLING.md](docs/STYLING.md) | Tailwind, MUI, DaisyUI, Shadcn styling approach |
| [docs/CLASSNAMES.md](docs/CLASSNAMES.md) | How `className` flows through the component stack |
| [docs/INSENDIO-APP.md](docs/INSENDIO-APP.md) | Insendio app, specialization pattern, component context |
| [docs/POC_EVALUATION.md](docs/POC_EVALUATION.md) | **Limitations, adoption path, team fit, next steps** |

## Next Steps

1. **Review** – Share this PoC with the team; discuss the recommendation.
2. **Pilot** – Pick a greenfield project; use Shadcn for 1–2 sprints.
3. **Retro** – After pilot, confirm or adjust the choice.
4. **Standardize** – Add Shadcn to our design system; update templates and docs.

See [docs/POC_EVALUATION.md](docs/POC_EVALUATION.md) for details.

## Components

| Component | W3C Pattern | Keyboard |
|-----------|-------------|----------|
| Accordion | [Accordion](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/) | Arrow keys, Home, End |
| Alert | [Alert](https://www.w3.org/WAI/ARIA/apg/patterns/alert/) | - |
| Alert Dialog | [Alert Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/) | Escape |
| Breadcrumb | [Breadcrumb](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/) | - |
| Button | [Button](https://www.w3.org/WAI/ARIA/apg/patterns/button/) | Enter, Space |
| Carousel | [Carousel](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) | Arrows, Home, End |
| Checkbox | [Checkbox](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/) | Space |
| Combobox | [Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) | Arrows, Enter, Escape |
| Dialog | [Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) | Escape |
| Disclosure | [Disclosure](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/) | Enter, Space |
| Link | [Link](https://www.w3.org/WAI/ARIA/apg/patterns/link/) | Enter |
| Listbox | [Listbox](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) | Arrows, Enter, Space |
| Menu | [Menu](https://www.w3.org/WAI/ARIA/apg/patterns/menu/) | Arrows, Enter, Escape |
| Radio Group | [Radio Group](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) | Arrows, Space |
| Slider | [Slider](https://www.w3.org/WAI/ARIA/apg/patterns/slider/) | Arrows, Home, End |
| Switch | [Switch](https://www.w3.org/WAI/ARIA/apg/patterns/switch/) | Enter, Space |
| Table | [Table](https://www.w3.org/WAI/ARIA/apg/patterns/table/) | - |
| Tabs | [Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) | Arrows, Home, End |
| Toolbar | [Toolbar](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) | Arrows, Home, End |
| Tooltip | [Tooltip](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/) | Focus/Hover |

## Usage

```tsx
// Base (headless)
import { Button, Tabs } from '@design-system/base';

// Shadcn-styled
import { Button, Tabs } from '@design-system/shadcn';

// HeroUI-styled
import { Button } from '@design-system/hero-ui';

// DaisyUI-styled
import { Button } from '@design-system/daisyui';

// MUI-styled
import { Button } from '@design-system/mui';
```

## Theming

Apply tokens to your app:

```tsx
// Add tokens CSS
import '@design-system/tokens/css';

// Toggle theme on root
document.documentElement.classList.add('ds-light'); // or 'ds-dark'
```

## License

MIT
