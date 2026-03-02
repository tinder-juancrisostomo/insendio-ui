# Tokens Package

Design tokens for the Insendio design system. Light/dark modes, mobile-first spacing and colors.

---

## Overview

**Package:** `@design-system/tokens`  
**Description:** Design tokens for Insendio design system - light/dark modes, mobile-first  
**Dependencies:** None  
**Exports:** `.` (JS/TS), `./css` (tokens.css)

The tokens package provides CSS variables and a TypeScript API for design tokens. All styled packages and apps consume these for consistent theming.

---

## How It Works

- **CSS variables** – `--ds-space-1`, `--ds-space-2`, `--ds-text-primary`, `--ds-bg-surface`, etc.
- **Light/dark** – Token values change based on `ds-light` or `ds-dark` class on `:root`.
- **Mobile-first** – Spacing and typography scale for responsive design.

---

## Usage

```tsx
// Import CSS in app entry
import '@design-system/tokens/css';

// Set theme
document.documentElement.classList.add('ds-light');  // or 'ds-dark'

// Use in Tailwind or CSS
className="bg-[var(--ds-bg-surface)] text-[var(--ds-text-primary)]"
```

```ts
// JS/TS (if needed)
import { space, colors } from '@design-system/tokens';
```

---

## Token Categories

| Category | Examples |
|----------|----------|
| **Space** | `--ds-space-0` … `--ds-space-6` |
| **Colors** | `--ds-text-primary`, `--ds-bg-surface`, `--ds-border-default`, `--ds-btn-primary` |
| **Typography** | Font sizes, weights (via typography package) |
| **Component** | `--ds-check-bg`, `--ds-insendio-primary` |

---

## File Structure

```
packages/tokens/
├── src/
│   ├── index.ts      # Token definitions (JS)
│   └── tokens.css    # CSS variables for light/dark
└── dist/
    ├── index.js, index.mjs, index.d.ts
    └── tokens.css
```

---

## Related

- [STYLING.md](STYLING.md) – Design tokens in styling
- [ARCHITECTURE.md](ARCHITECTURE.md) – Token layer in package stack
- [TERMS.md](TERMS.md) – Design tokens definition
