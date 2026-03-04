# UI Libraries: When Styled-Components Is the Stack

This document applies when your main styling stack is **styled-components** instead of Tailwind. It changes the recommendation from the main [UI_LIBRARIES_COMPARISON.md](UI_LIBRARIES_COMPARISON.md).

---

## Decision Criteria (Styled-Components Stack)

| Criterion | Weight | Description |
|-----------|--------|-------------|
| **Bundle size** | High | Impact on initial load; matters for internal tools and mobile |
| **Customization** | High | Ability to align with our design tokens and brand |
| **Styled-components fit** | High | Our stack is styled-components; minimal friction |
| **Ecosystem** | Medium | Docs, community, examples, long-term support |
| **Theming** | Medium | Light/dark, design system compliance |
| **Team fit** | Medium | Learning curve, existing skills, DX |

---

## How Each Library Fits Styled-Components

| Library | Styled-Components Fit | Notes |
|---------|------------------------|-------|
| **Shadcn** | ⭐ Poor | Tailwind-native; copy-paste components use utility classes. Would require rewriting all Tailwind classes to styled-components or adding Tailwind. |
| **Styled Base** | ⭐ Poor | Tailwind + CVA; same Tailwind dependency. |
| **DaisyUI** | ⭐ Poor | Tailwind plugin only; no standalone styled-components support. |
| **Hero UI** | ⭐ Poor | Tailwind-based; built for utility-first styling. |
| **MUI** | ⭐⭐⭐ Good | Native support for styled-components via `@mui/styled-engine-sc`. Uses `styled()` API and `sx` prop. |

---

## Recommendation: **MUI** (When Styled-Components Is the Stack)

For projects where **styled-components** is the main styling stack, **MUI** (`@design-system/mui`) is the recommended choice.

### Why MUI?

1. **Native styled-components support** – Use `@mui/styled-engine-sc` to swap Emotion for styled-components. MUI components work with your existing `styled()` API.
2. **No Tailwind required** – No need to introduce Tailwind or change your stack.
3. **Mature ecosystem** – Extensive docs, community, and third-party integrations.
4. **Design tokens** – MUI theme system maps well to design tokens via `createTheme()`.
5. **Feature-rich** – Data grid, date pickers, charts, etc.

### Setup (Already in this PoC)

The mui package and mui-app are already configured to use styled-components:

1. **Root `package.json`** – pnpm override: `"@mui/styled-engine": "npm:@mui/styled-engine-sc@^6.1.6"`
2. **`packages/mui`** – Dependencies: `@mui/styled-engine-sc`, `styled-components`
3. **`apps/mui-app`** – Dependencies: `@mui/styled-engine-sc`, `styled-components`; Vite alias: `@mui/styled-engine` → `@mui/styled-engine-sc`

Wrap your app with `DesignSystemThemeProvider` from `@design-system/mui`. See [MUI + styled-components](https://mui.com/material-ui/guides/interoperability/#styled-components).

### When to choose alternatives

- **Shadcn / Styled Base** – Only if you adopt Tailwind and migrate away from styled-components.
- **DaisyUI** – Not suitable for styled-components-only stacks.
- **Hero UI** – Not suitable for styled-components-only stacks.

---

## Migration Path: Styled-Components → Tailwind

If you later decide to adopt Tailwind:

1. The main [UI_LIBRARIES_COMPARISON.md](UI_LIBRARIES_COMPARISON.md) recommendation (Shadcn) would apply.
2. Plan a gradual migration: new features use Tailwind; legacy stays on styled-components until refactored.
3. Use the strangler pattern (see [POC_EVALUATION.md](POC_EVALUATION.md)).

---

## Quick Reference

| Criteria | MUI | Shadcn | Styled Base | Hero UI | DaisyUI |
|----------|-----|--------|-------------|---------|---------|
| Styled-components fit | ⭐⭐⭐ | ⭐ | ⭐ | ⭐ | ⭐ |
| Bundle size | ⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| Customization | ⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ |
| Ecosystem | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐⭐ |
| Our fit (styled-components) | ⭐⭐⭐ | ⭐ | ⭐ | ⭐ | ⭐ |

---

## Related

- [UI_LIBRARIES_COMPARISON.md](UI_LIBRARIES_COMPARISON.md) – Main comparison (Tailwind stack)
- [MUI_PACKAGE.md](MUI_PACKAGE.md) – MUI package details
- [POC_EVALUATION.md](POC_EVALUATION.md) – Adoption path, limitations
