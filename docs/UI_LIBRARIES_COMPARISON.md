# UI Libraries Comparison

This document provides an overview of the four UI libraries evaluated in this PoC, with pros, cons, and a recommendation for internal projects.

## Decision Criteria

We evaluated each library against:

| Criterion | Weight | Description |
|-----------|--------|-------------|
| **Bundle size** | High | Impact on initial load; matters for internal tools and mobile |
| **Customization** | High | Ability to align with our design tokens and brand |
| **Tailwind fit** | High | Our stack is Tailwind-first; minimal friction |
| **Ecosystem** | Medium | Docs, community, examples, long-term support |
| **Theming** | Medium | Light/dark, design system compliance |
| **Team fit** | Medium | Learning curve, existing skills, DX |

## Why These Four Libraries?

We chose **Shadcn**, **Hero UI**, **DaisyUI**, and **MUI** because they represent distinct approaches:

- **Shadcn** – Copy-paste, Tailwind-native, minimal deps; industry favorite
- **Hero UI** – Full component library, modern design; NextUI successor
- **DaisyUI** – Tailwind plugin, zero runtime; fast iteration
- **MUI** – Enterprise standard, Material Design; baseline for comparison

We did not include Chakra, Ant Design, or Radix-only because we wanted to compare complete styling solutions, not headless-only or different paradigms.

## Overview

| Library | Styling Approach | Key Dependencies | Bundle Impact |
|---------|------------------|------------------|---------------|
| **Shadcn** | Tailwind + CVA | `class-variance-authority` | Minimal |
| **Hero UI** | Tailwind + HeroUI | `@heroui/react` | Moderate |
| **DaisyUI** | Tailwind plugin | `daisyui` (dev/build) | Minimal (no runtime) |
| **MUI** | Tailwind + Material | `@mui/material` | Heavy |

All four wrap the same headless base (`@design-system/base`) with W3C ARIA APG patterns, so accessibility is consistent across variants.

## Bundle Size (Production Build)

Measured after `pnpm build` for each app (Insendio demo, same pages):

| App | JS (main chunk) | CSS | Notes |
|-----|-----------------|-----|-------|
| **shadcn-app** | 260.5 kB (83 kB gzip) | 41.6 kB | Baseline |
| **daisyui-app** | 259.2 kB (83 kB gzip) | 35.0 kB | Smallest CSS (plugin-only) |
| **hero-ui-app** | 260.5 kB (83 kB gzip) | 41.6 kB | Similar to Shadcn |
| **mui-app** | 260.5 kB (83 kB gzip) | 41.8 kB | Similar; our MUI package uses Tailwind/tokens |

*Note: In this PoC, all styled packages use Tailwind/tokens, so JS sizes are similar. A full MUI adoption (using @mui/material components directly) would show a larger JS bundle.*

---

## Shadcn (`@design-system/shadcn`)

### Pros
- **Lightweight** – Only adds `class-variance-authority` (CVA) for variant composition; no heavy runtime
- **Copy-paste philosophy** – Components live in your codebase; full control, no black box
- **Tailwind-native** – Pure utility classes; easy to customize and align with design tokens
- **Strong ecosystem** – Very popular; large community, many examples and Radix-based primitives
- **Predictable** – No global styles or plugin side effects; explicit class application

### Cons
- **More boilerplate** – You own the component code; upgrades require manual sync
- **Less out-of-the-box** – Fewer pre-built complex components than MUI/Hero UI

### Best for
Teams that want full control, minimal dependencies, and a Tailwind-first workflow.

---

## Hero UI (`@design-system/hero-ui`)

### Pros
- **Rich component set** – Built on NextUI; many polished components (modals, dropdowns, etc.)
- **Modern design** – Clean, contemporary look
- **Good theming** – Built-in theme support

### Cons
- **Extra dependency** – `@heroui/react` adds to bundle size
- **Less Tailwind-pure** – Mix of library styles and Tailwind; can complicate overrides
- **Smaller ecosystem** – Newer than Shadcn/MUI; fewer resources

### Best for
Projects that need a full-featured component library with minimal setup and modern aesthetics.

---

## DaisyUI (`@design-system/daisyui`)

### Pros
- **Zero runtime cost** – Tailwind plugin only; no JS bundle impact
- **Semantic classes** – `btn`, `alert`, `card`; readable and consistent
- **Built-in theming** – Easy light/dark and theme switching via config
- **Fast iteration** – Add plugin, use classes; no component wrappers for basic styling

### Cons
- **Global styles** – Plugin adds global CSS; can conflict with custom designs
- **Less granular control** – Semantic classes may not map 1:1 to your design tokens
- **Override complexity** – Overriding DaisyUI defaults sometimes requires `!` or specificity

### Best for
Rapid prototyping, internal tools, and projects where semantic theming is more important than pixel-perfect customization.

---

## MUI (`@design-system/mui`)

### Pros
- **Mature ecosystem** – Extensive docs, community, and third-party integrations
- **Material Design** – Familiar, consistent patterns; good for enterprise UIs
- **Feature-rich** – Data grid, date pickers, charts, etc.

### Cons
- **Heavy bundle** – `@mui/material` + Emotion add significant size
- **Styling paradigm** – Emotion/sx vs Tailwind; can clash with Tailwind-first setups
- **Overkill for this PoC** – In our setup, we use Tailwind/tokens; MUI dependency adds weight without full benefit

### Best for
Projects that need Material Design compliance or rely heavily on MUI’s advanced components (data grid, etc.).

---

## Recommendation: **Shadcn** (Winner)

For our next internal projects, **Shadcn** is the recommended choice.

### Why Shadcn?

1. **Alignment with our stack** – Tailwind-first, design tokens, and headless base fit naturally with Shadcn’s approach.
2. **Minimal footprint** – No heavy runtime deps; CVA is small and focused.
3. **Full ownership** – Components live in our repo; we can adapt them to our design system without fighting library defaults.
4. **Future-proof** – Copy-paste model means we’re not locked to a vendor; we control upgrades and maintenance.
5. **Consistency** – Our base already provides accessibility; Shadcn adds styling without introducing a parallel component model.

### When to choose alternatives

- **DaisyUI** – For quick internal tools or when semantic theming and zero runtime cost are top priorities.
- **Hero UI** – When you need a full component library with minimal setup and modern look.
- **MUI** – When Material Design compliance or MUI’s advanced components (e.g. Data Grid) are required.

---

## Risk & Mitigation

| Library | Main Risk | Mitigation |
|---------|-----------|------------|
| **Shadcn** | Manual sync for upgrades | Treat as source of truth; version in monorepo; document sync process |
| **Hero UI** | Smaller ecosystem, newer | Monitor adoption; have fallback (Shadcn) if needed |
| **DaisyUI** | Override complexity, global styles | Use design tokens; limit DaisyUI to semantic layer; test overrides early |
| **MUI** | Heavy bundle, Emotion vs Tailwind | Use only if Material Design required; consider MUI Pigment for CSS |

---

## Quick Reference

| Criteria | Shadcn | Hero UI | DaisyUI | MUI |
|----------|--------|---------|---------|-----|
| Bundle size | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐ |
| Customization | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐ |
| Theming | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| Ecosystem | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| Tailwind fit | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐ |
| Our fit | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐ |
