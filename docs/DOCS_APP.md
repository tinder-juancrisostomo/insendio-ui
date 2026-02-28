# Docs App

The docs app is a component showcase that lets you compare all four UI libraries (Shadcn, Hero UI, DaisyUI, MUI) and the headless base side by side. Use it to explore components, charts, typography, icons, animations, and evaluate styling differences.

## Running the Docs App

```bash
pnpm dev:docs
```

Or from the repo root: `pnpm --filter docs dev`

## What It Does

- **Library switcher** – Toggle between Base (headless), Shadcn, Hero UI, DaisyUI, and MUI
- **Component demos** – Each component has a live demo and code snippet (CodeMirror)
- **Charts** – Bar, Line, Pie, Area, and Network Graph with design tokens, accessibility (chart/table view switch)
- **Typography** – Text variants (h1–h4, body, body-sm, caption, overline) with design tokens
- **Icons** – SVG icon set with configurable size and styling
- **Animations** – CSS animation utilities (fade, scale, slide) that respect prefers-reduced-motion
- **Same components, different styling** – The same base components are rendered with each library's styles
- **Layout & landmarks** – Layout primitives (Box, Stack, etc.) and ARIA landmarks are also documented

## Routes

| Route | Description |
|-------|-------------|
| `/` | Home – overview and links to all sections |
| `/components/:id` | Component demos (Button, Tabs, Accordion, etc.) |
| `/charts/:id` | Chart demos (bar, line, pie, area, network-graph) |
| `/typography/*` | Typography variants |
| `/icons` | Icon gallery |
| `/animations` | Animation utilities |

## Structure

```
apps/docs/
├── src/
│   ├── App.tsx           # Routes, LibProvider
│   ├── context/
│   │   ├── LibContext.tsx    # Library switcher state (base, shadcn, hero-ui, daisyui, mui)
│   │   └── ThemeContext.tsx   # Light/dark/system theme
│   ├── components/
│   │   ├── Layout.tsx        # Shell, nav, library selector
│   │   ├── ChartDoc.tsx      # Chart demo with theme
│   │   └── CodeEditor.tsx    # Code snippet display
│   └── pages/
│       ├── HomePage.tsx      # Component list (Components, Charts, Typography, Icons, Animations, Layout, Landmarks)
│       ├── ComponentsPage.tsx # Per-component demo + code
│       ├── ChartsPage.tsx    # Chart demos (Bar, Line, Pie, Area, Network Graph)
│       ├── TypographyPage.tsx # Typography variants
│       ├── IconsPage.tsx     # Icon gallery
│       └── AnimationsPage.tsx # Animation utilities
├── tailwind.config.js
└── vite.config.ts
```

## Configuration

### Tailwind Content Paths

**Critical:** The docs app loads all four styled packages. `tailwind.config.js` must include their source paths in `content`, or Tailwind will purge their utility classes and components will appear unstyled:

```js
content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}',
  '../../packages/shadcn/src/**/*.{js,ts,jsx,tsx}',
  '../../packages/hero-ui/src/**/*.{js,ts,jsx,tsx}',
  '../../packages/daisyui/src/**/*.{js,ts,jsx,tsx}',
  '../../packages/mui/src/**/*.{js,ts,jsx,tsx}',
  '../../packages/charts/src/**/*.{js,ts,jsx,tsx}',
],
```

### Design Tokens

Import tokens in the app entry (e.g. `main.tsx`):

```ts
import '@design-system/tokens/css';
```

Apply theme class on the root for light/dark:

```html
<html class="ds-light">  <!-- or ds-dark -->
```

### Library Requirements

| Library | Requirements |
|---------|--------------|
| **Shadcn** | Tailwind + tokens.css |
| **Hero UI** | Tailwind + tokens.css |
| **DaisyUI** | Tailwind + DaisyUI plugin + tokens.css |
| **MUI** | Tailwind + tokens.css (package includes @mui/material) |

The docs app uses the DaisyUI plugin in `tailwind.config.js` because it renders DaisyUI components when that library is selected.

## Library Switching & Conflicts

- **All libraries are loaded** – ComponentDemo imports all four packages
- **DaisyUI plugin** is always active – its global styles apply when DaisyUI components render
- **Tailwind** compiles classes from all content paths – no conflict as long as class names don't collide
- **Tokens** (`--ds-*`) are shared – components using `var(--ds-text-link)` etc. stay consistent

**Potential conflicts:**
- DaisyUI's `btn`, `alert`, etc. could affect similarly-named elements if both libraries render on the same page
- MUI's Emotion styles are scoped; Tailwind is global

**Mitigation:** Each demo renders only the selected library's components, so conflicts are minimal.

## Build

```bash
pnpm build:docs
# or: pnpm --filter docs build
```

Output: `apps/docs/dist/`
