# Styling Configuration

## Overview

The design system uses **design tokens** (`packages/tokens`) for consistent theming. Each UI package (Shadcn, HeroUI, DaisyUI, MUI) applies its own styling on top of the headless base components.

## Required Configuration

### 1. Tailwind Content Paths

**Critical:** The docs app's `tailwind.config.js` must include all package source paths in `content`, or Tailwind will purge their utility classes and components will appear unstyled:

```js
content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}',
  '../../packages/shadcn/src/**/*.{js,ts,jsx,tsx}',
  '../../packages/hero-ui/src/**/*.{js,ts,jsx,tsx}',
  '../../packages/daisyui/src/**/*.{js,ts,jsx,tsx}',
  '../../packages/mui/src/**/*.{js,ts,jsx,tsx}',
],
```

### 2. Design Tokens

Import tokens CSS in your app entry (e.g. `main.tsx`):

```ts
import '@design-system/tokens/css';
```

Apply theme class to root for light/dark:

```html
<html class="ds-light">  <!-- or ds-dark -->
```

### 3. Library-Specific Setup

| Library | Requirements |
|---------|--------------|
| **Shadcn** | Tailwind + tokens.css |
| **HeroUI** | Tailwind + tokens.css |
| **DaisyUI** | Tailwind + DaisyUI plugin + tokens.css |
| **MUI** | Tailwind + tokens.css (package includes @mui/material) |

## Library Switching & Conflicts

When switching libraries in the docs app:

- **All libraries are loaded** – ComponentDemo imports all four packages
- **DaisyUI plugin** is always active – its global styles apply when DaisyUI components render
- **Tailwind** compiles classes from all content paths – no conflict as long as class names don't collide
- **Tokens** (`--ds-*`) are shared – components using `var(--ds-text-link)` etc. stay consistent

**Potential conflicts:**
- DaisyUI's `btn`, `alert`, etc. could affect similarly-named elements if both libraries render on the same page
- MUI's Emotion styles are scoped; Tailwind is global

**Mitigation:** Each demo renders only the selected library's components, so conflicts are minimal.
