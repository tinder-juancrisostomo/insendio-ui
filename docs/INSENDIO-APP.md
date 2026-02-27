# Insendio App

The insendio-app is a demo application that showcases the design system with different component libraries. It uses a **polymorphic component** pattern and **specialization** for reusable, library-agnostic UI.

## Screenshots

**Home page** – AI assistant, suggested actions, and recent campaigns table:

<img src="assets/insendio-home.png" alt="Insendio Home (Shadcn)" style="width: 100%; height: auto;">

**Data page** – User Attributes with search, filters, and attribute cards:

<img src="assets/insendio-data.png" alt="Insendio Data - User Attributes (Shadcn)" style="width: 350px; height: auto;">

## Component Context

insendio-app does not import components from mui, daisyui, etc. Instead, it receives them via React Context:

```tsx
// packages/insendio-app/src/components-context.tsx
export interface InsendioComponents {
  library?: string;   // e.g. "MUI", "DaisyUI"
  Box: React.ComponentType<any>;
  Stack: React.ComponentType<any>;
  Button: React.ComponentType<any>;
  // ... all primitives
}

const InsendioComponentsContext = React.createContext<InsendioComponents | null>(null);
export function useInsendioComponents() { ... }
export const InsendioComponentsProvider = InsendioComponentsContext.Provider;
```

Each app provides the components:

```tsx
// apps/mui-app/App.tsx
const muiComponents: InsendioComponents = {
  library: 'MUI',
  Box, Stack, Button, Input, ...
};

<InsendioComponentsProvider value={muiComponents}>
  <InsendioApp />
</InsendioComponentsProvider>
```

## Specialization Pattern

Specialization is a React composition pattern: a **specialized** component wraps a **generic** one and passes down specific props or layout.

### Specialized Components

| Component | Wraps | Purpose |
|-----------|-------|---------|
| `PageLayout` | Stack | Page container with title |
| `InsendioTab` | Tab | Insendio tab styling (purple/sky/blue themes) |
| `InsendioTabList` | TabList | Standard tab list styling |
| `InsendioCard` | Box | Card styling (default/surface variants) |
| `InsendioPrimaryButton` | Button | Purple CTA button |
| `InsendioStatCard` | Box | Stat display (icon + label + value) |
| `InsendioNavLink` | NavLink | Sidebar nav styling |
| `InsendioAlert` | Alert | Info/success alert styling |
| `InsendioInfoAlert` | InsendioAlert | Info alert with icon |
| `InsendioTable` | Table | Table with Insendio styling |
| `InsendioTableToolbar` | Box | Table toolbar (filters, actions) |
| `InsendioList` / `InsendioListItem` | Box | List layout components |
| `InsendioRateLimitCard` | Box | Rate limit display card |

### Example: InsendioCard

```tsx
// Generic usage (repeated in every page)
<Box className="rounded-xl border border-[var(--ds-border-default)] bg-white shadow-sm">
  {content}
</Box>

// Specialized usage
<InsendioCard>{content}</InsendioCard>
```

InsendioCard wraps the generic Box from context and injects the standard card classes.

### Containment

Specialized components use `{children}` to fill the generic container:

```tsx
export function InsendioCard({ children, variant = 'default' }: InsendioCardProps) {
  const { Box } = useInsendioComponents();
  return (
    <Box className={cn('rounded-xl border ...', variant === 'surface' && 'bg-[var(--ds-bg-surface)]')}>
      {children}
    </Box>
  );
}
```

## App Structure

```
insendio-app/
├── src/
│   ├── InsendioApp.tsx       # Routes, lazy-loaded pages
│   ├── components-context.tsx
│   ├── theme-context.tsx
│   ├── accessibility-context.tsx
│   ├── mock-data.ts
│   ├── components/
│   │   ├── InsendioLayout.tsx
│   │   └── insendio/         # Specialized components
│   │       ├── PageLayout.tsx
│   │       ├── InsendioTab.tsx
│   │       ├── InsendioCard.tsx
│   │       ├── InsendioAlert.tsx
│   │       ├── InsendioTable.tsx
│   │       ├── InsendioTableToolbar.tsx
│   │       ├── InsendioList.tsx
│   │       ├── InsendioRateLimitCard.tsx
│   │       └── ...
│   └── pages/
│       ├── HomePage.tsx
│       ├── DataPage.tsx
│       ├── RolesPage.tsx
│       ├── AccessibilityPage.tsx
│       └── ...
```

## Library Title

The `library` field in the context is shown in the UI:

- Sidebar: "Insendio (MUI)" or "Insendio (DaisyUI)"
- Home hero: "Insendio AI (MUI)"

When `library` is not provided, the suffix is omitted.

## Running the App

```bash
pnpm dev:shadcn     # Shadcn components (recommended)
pnpm dev:daisyui    # DaisyUI components
pnpm dev:hero-ui    # Hero UI components
pnpm dev:mui        # MUI components
```

Each command runs the same Insendio app with a different component library injected via context. Use `pnpm dev:docs` for the docs app; `pnpm dev` runs all apps.
