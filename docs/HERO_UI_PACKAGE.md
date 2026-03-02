# Hero UI Package

Design system components styled with HeroUI (@heroui/react). Full component library with modern design.

---

## Overview

**Package:** `@design-system/hero-ui`  
**Description:** Design system components styled with HeroUI  
**Dependencies:** `@design-system/base`, `@design-system/tokens`, `@design-system/utils`, `@heroui/react` ^2.4.0  
**Peer dependencies:** `react` >=18, `react-dom` >=18

Hero UI wraps base components and maps to HeroUI (NextUI successor) where applicable. HeroUI provides a full component library with built-in theming and modern aesthetics.

---

## How It Works

- **HeroUI components** – Uses `@heroui/react` for styled components.
- **Base fallback** – Some components may wrap base when HeroUI doesn't provide a direct equivalent.
- **API adapters** – Maps Insendio API (variant, size) to HeroUI props.
- **Tailwind** – HeroUI is Tailwind-based; our tokens can be applied via overrides.

---

## Component Sources

| Source | Components |
|--------|------------|
| **HeroUI** | Button, Input, Badge, Modal, Dropdown, etc. (varies by implementation) |
| **base** | Layout, Carousel, Breadcrumb, and components without HeroUI equivalents |

---

## Bundle Impact

`@heroui/react` adds moderate bundle size. See [UI_LIBRARIES_COMPARISON.md](UI_LIBRARIES_COMPARISON.md) for bundle size comparison.

---

## Related

- [UI_LIBRARIES_COMPARISON.md](UI_LIBRARIES_COMPARISON.md) – Hero UI pros/cons
- [STYLING.md](STYLING.md) – Tailwind in styled packages
