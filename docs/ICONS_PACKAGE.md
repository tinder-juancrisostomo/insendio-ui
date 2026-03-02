# Icons Package

Icon components for the Insendio design system. SVG-based, consistent sizing.

---

## Overview

**Package:** `@design-system/icons`  
**Description:** Icon components for Insendio design system  
**Peer dependencies:** `react` >=18

The icons package provides React icon components (e.g. `SearchIcon`, `FilterIcon`, `ChevronDownIcon`) as inline SVGs. Used across insendio-app, charts, and styled packages.

---

## How It Works

- **SVG components** – Each icon is a React component rendering an SVG.
- **Size prop** – Icons accept `size` (e.g. 16, 20, 24) for consistent scaling.
- **className** – Supports Tailwind and token-based color overrides.

---

## Usage

```tsx
import { SearchIcon, FilterIcon, ChevronDownIcon } from '@design-system/icons';

<SearchIcon size={20} className="text-[var(--ds-text-muted)]" />
<FilterIcon size={18} />
```

---

## Icon Set

Icons are curated for the Insendio app: search, filter, navigation, actions, status, etc. See `packages/icons/src/index.tsx` for the full list.

---

## Consumers

`insendio-app`, `shadcn-radix`, `shadcn-ui`, `charts`, `docs`.

---

## Related

- [INSENDIO_APP_PACKAGE.md](INSENDIO_APP_PACKAGE.md) – Uses icons in layout and pages
- [DOCS_APP.md](DOCS_APP.md) – Icons section in docs
