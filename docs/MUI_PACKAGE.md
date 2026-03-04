# MUI Package

Design system components styled with MUI (Material UI). Enterprise-grade, Material Design.

---

## Overview

**Package:** `@design-system/mui`  
**Description:** Design system components styled with MUI + styled-components  
**Dependencies:** `@design-system/base`, `@design-system/tokens`, `@design-system/utils`, `@mui/material` ^6.1.6, `@mui/icons-material` ^6.1.6, `@mui/styled-engine-sc`, `styled-components`  
**Peer dependencies:** `react` >=18, `react-dom` >=18

The MUI package wraps base components and maps to MUI components. It uses **styled-components** (via `@mui/styled-engine-sc`) instead of Emotion. It includes a **theme** (`createTheme`) that applies our design tokens to MUI, plus **component wrappers** for the polymorphic Insendio API.

---

## How It Works

- **MUI theme** – `createTheme()` with our tokens (palette, typography, component overrides).
- **ThemeProvider** – Apps wrap with `DesignSystemThemeProvider` to apply the theme.
- **Component wrappers** – Map our API (`variant="outline"`) to MUI API (`variant="outlined"`).
- **styled-components** – MUI uses `@mui/styled-engine-sc` to use styled-components instead of Emotion. Root `package.json` has pnpm overrides; mui-app has Vite alias.

---

## Component Sources

| Source | Components |
|--------|------------|
| **MUI** | Button, TextField (Input), Chip (Badge), Dialog, Tabs, Menu, Switch, Table, etc. |
| **base** | Layout, Carousel, Breadcrumb, and components without MUI equivalents |

---

## Theme vs Wrappers

- **Theme** – Correct way to customize MUI; would remain even without polymorphic setup.
- **Wrappers** – Exist for the PoC so the same app code works with MUI, DaisyUI, styled-base, etc. After choosing MUI, wrappers could be removed and MUI used directly.

---

## Bundle Impact

`@mui/material` + `@mui/icons-material` add significant bundle size. See [UI_LIBRARIES_COMPARISON.md](UI_LIBRARIES_COMPARISON.md).

---

## Related

- [FAQ.md](FAQ.md) – "Why does the MUI package have both theme and wrappers?"
- [UI_LIBRARIES_COMPARISON.md](UI_LIBRARIES_COMPARISON.md) – MUI pros/cons
- [STYLING.md](STYLING.md) – MUI styling approach
