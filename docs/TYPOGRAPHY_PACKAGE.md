# Typography Package

Typography components for the Insendio design system. Text variants, design tokens.

---

## Overview

**Package:** `@design-system/typography`  
**Description:** Typography components for Insendio design system  
**Dependencies:** `@design-system/tokens`  
**Peer dependencies:** `react` >=18  
**Exports:** `.` (JS/TS), `./css` (typography.css)

The typography package provides `<Text>` and related components with variant-based styling (h1, h2, h3, body, caption, etc.) using design tokens.

---

## How It Works

- **Text component** – Renders with `variant` prop mapping to font size, weight, line height.
- **Design tokens** – Uses `--ds-text-*` and typography scale from tokens.
- **CSS** – `typography.css` provides base typography styles.

---

## Usage

```tsx
import { Text } from '@design-system/typography';
import '@design-system/typography/css';

<Text variant="h1">Heading</Text>
<Text variant="body">Body text</Text>
<Text variant="caption" className="text-[var(--ds-text-muted)]">Caption</Text>
```

---

## Variants

| Variant | Use |
|---------|-----|
| h1, h2, h3, h4 | Headings |
| body, body-sm | Body text |
| caption | Small/secondary text |

---

## Consumers

`insendio-app`, `docs`, all demo apps. Used for consistent text styling across pages.

---

## Related

- [TOKENS_PACKAGE.md](TOKENS_PACKAGE.md) – Design tokens
- [STYLING.md](STYLING.md) – Typography in styling
