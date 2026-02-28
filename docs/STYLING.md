# Styling

All styled packages use **Tailwind CSS** for styling. The difference between packages is which Tailwind utilities and/or plugins they use.

## Tailwind in Every App

Each app (mui-app, daisyui-app, etc.) has its own Tailwind config. The `content` array includes:

- The app's own source
- The chosen design system package (mui, daisyui, etc.)
- insendio-app
- typography package
- charts package (for apps using insendio-app, which includes the Dashboard with charts)

```js
// apps/mui-app/tailwind.config.js
content: [
  './src/**/*.{js,ts,jsx,tsx}',
  '../../packages/mui/src/**/*.{js,ts,jsx,tsx}',
  '../../packages/typography/src/**/*.{js,ts,jsx,tsx}',
  '../../packages/insendio-app/src/**/*.{js,ts,jsx,tsx}',
  '../../packages/charts/src/**/*.{js,ts,jsx,tsx}',
],
```

Tailwind scans these paths and generates CSS only for the utility classes that appear in the source. This keeps the bundle small.

## Package Styling Approaches

### MUI (`@design-system/mui`)

- **Styling**: Tailwind utility classes + design tokens (`ds-btn`, etc.)
- **Dependency**: Package includes `@mui/material` (adds bundle size; some components may use it)
- **Example** (Alert):

```tsx
const variantClasses = {
  default: 'rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900',
  destructive: 'rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-900',
  success: 'rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-900',
};
```

- Uses `cn()` to merge variant classes with `className` prop

### DaisyUI (`@design-system/daisyui`)

- **Styling**: Tailwind + **DaisyUI** component classes
- **DaisyUI**: Tailwind plugin that adds semantic classes (e.g. `alert`, `alert-info`)
- **Example** (Alert):

```tsx
const variantClasses = {
  default: 'alert alert-info',
  destructive: 'alert alert-error',
  success: 'alert alert-success',
};
```

- Apps using DaisyUI components must add the DaisyUI plugin in `tailwind.config.js`:

```js
plugins: [require('daisyui')],
```

### Shadcn (`@design-system/shadcn`)

- **Styling**: Tailwind utility classes (similar to MUI)
- **Naming**: Shadcn-inspired look (rounded, subtle borders)
- Uses same `cn()` merge pattern as MUI

### Hero UI (`@design-system/hero-ui`)

- **Styling**: Tailwind utility classes
- Same pattern as MUI and Shadcn

## The `cn()` Utility

All styled packages use `@design-system/utils` for class merging:

```ts
// packages/utils
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- **clsx**: Handles conditional classes (`cn('foo', isActive && 'active')`)
- **tailwind-merge**: Resolves Tailwind conflicts (e.g. `p-4` + `p-6` → `p-6`)

## Design Tokens

The `@design-system/tokens` package provides CSS variables:

```css
--ds-space-1, --ds-space-2, ...
--ds-text-primary, --ds-text-secondary, ...
--ds-border-default, --ds-bg-muted, ...
```

Use them in Tailwind via arbitrary values:

```tsx
className="border-[var(--ds-border-default)] bg-[var(--ds-bg-muted)]"
```

## Summary

| Package  | Tailwind | Plugins   | Class style          |
|----------|----------|-----------|----------------------|
| mui      | Yes      | None      | Utility classes      |
| daisyui  | Yes      | DaisyUI   | DaisyUI + utilities  |
| shadcn   | Yes      | None      | Utility classes      |
| hero-ui  | Yes      | None      | Utility classes      |
