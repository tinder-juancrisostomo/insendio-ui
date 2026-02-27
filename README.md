# Design System AI - Component Library Monorepo

A custom UI component library monorepo with multiple styling variants, built on W3C ARIA APG patterns for accessibility.

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

## Documentation

| Document | Description |
|----------|-------------|
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Monorepo structure, package layers, data flow |
| [docs/STYLING.md](docs/STYLING.md) | Tailwind, MUI, DaisyUI, Shadcn styling approach |
| [docs/CLASSNAMES.md](docs/CLASSNAMES.md) | How `className` flows through the component stack |
| [docs/INSENDIO-APP.md](docs/INSENDIO-APP.md) | Insendio app, specialization pattern, component context |

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
