# Architecture

## Package Layers

```
┌─────────────────────────────────────────────────────────────────┐
│  Apps (mui-app, daisyui-app, shadcn-app, hero-ui-app)            │
│  - Consume design system packages                                 │
│  - Provide InsendioComponentsProvider with chosen library         │
│  - Tailwind content includes packages                             │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  insendio-app                                                    │
│  - Shared app structure (layout, pages, routes)                  │
│  - Specialized components (InsendioCard, InsendioTab, etc.)      │
│  - Uses useInsendioComponents() for polymorphic components        │
│  - Dashboard uses @design-system/charts                         │
└─────────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              ▼                               ▼
┌─────────────────────────────┐   ┌─────────────────────────────────┐
│  charts                      │   │  Styled packages (mui, daisyui,  │
│  - Bar, Line, Pie, Area,    │   │  shadcn, hero-ui)                │
│    NetworkGraph             │   │  - Wrap base components          │
│  - Uses base, utils, tokens  │   │  - Accept className, merge cn()  │
└─────────────────────────────┘   └─────────────────────────────────┘
              │                               │
              └───────────────┬───────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  base + tokens + utils + typography + icons                       │
│  - Headless accessible primitives (W3C ARIA APG)                 │
│  - Design tokens, cn() utility, Text, icons                       │
└─────────────────────────────────────────────────────────────────┘
```

## Dependency Flow

| Package | Depends On |
|---------|------------|
| `base` | React |
| `tokens` | - |
| `utils` | clsx, tailwind-merge |
| `typography` | base, tokens |
| `icons` | React |
| `mui` | base, tokens, utils |
| `daisyui` | base, tokens, utils |
| `shadcn` | base, tokens, utils |
| `hero-ui` | base, tokens, utils |
| `insendio-app` | base, icons, typography, utils, charts |
| `charts` | base, utils |
| `mui-app` | insendio-app, mui |

## Component Polymorphism

The insendio-app does **not** import components directly. Instead:

1. Each app (e.g. mui-app) provides components via `InsendioComponentsProvider`
2. insendio-app uses `useInsendioComponents()` to get Box, Stack, Button, etc.
3. The same app code renders different UIs depending on which library is injected

```tsx
// mui-app/App.tsx
<InsendioComponentsProvider value={muiComponents}>
  <InsendioApp />
</InsendioComponentsProvider>

// insendio-app/DataPage.tsx
const { Box, Stack, Button } = useInsendioComponents();
return <Stack><Button>...</Button></Stack>;
```

## Build & Bundling

- Packages are built with **tsup** (ESM + CJS)
- Apps use **Vite** for dev and build
- Tailwind runs in each app; `content` includes package source paths so utility classes from packages are included in the final CSS
