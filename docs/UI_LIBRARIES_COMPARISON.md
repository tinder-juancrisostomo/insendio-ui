# UI Libraries Comparison

This document provides an overview of the UI libraries evaluated in this PoC, with pros, cons, and a recommendation for internal projects.

> **Different stack?** If your main styling stack is **styled-components** (not Tailwind), see [UI_LIBRARIES_STYLED_COMPONENTS.md](UI_LIBRARIES_STYLED_COMPONENTS.md) for the adjusted recommendation.

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
| **shadcn-ui-app** | 260.5 kB (83 kB gzip) | 41.6 kB | Recommended (copy-paste) |
| **styled-base-app** | 260.5 kB (83 kB gzip) | 41.6 kB | Baseline |
| **daisyui-app** | 259.2 kB (83 kB gzip) | 35.0 kB | Smallest CSS (plugin-only) |
| **hero-ui-app** | 260.5 kB (83 kB gzip) | 41.6 kB | Similar to Shadcn |
| **mui-app** | 260.5 kB (83 kB gzip) | 41.8 kB | Similar; our MUI package uses Tailwind/tokens |

*Note: In this PoC, all styled packages use Tailwind/tokens, so JS sizes are similar. A full MUI adoption (using @mui/material components directly) would show a larger JS bundle.*

---

## Shadcn (`@design-system/shadcn-ui`)

### Pros
- **Speed and reuse** – Components are pre-built; copy via CLI, no need to create from scratch
- **Battle-tested** – Radix UI primitives + Tailwind; accessible, widely adopted
- **You own the code** – Copy-paste means full control; customize as needed
- **Minimal footprint** – Only what you copy; no heavy runtime library
- **Tailwind-native** – Pure utility classes; easy to align with design tokens over time

### Cons
- **Radix dependency** – Adds Radix primitives (separate from our headless base)
- **Token alignment** – May need to replace default colors/values with design tokens
- **Upstream sync** – Manual updates when pulling fixes or new features from shadcn

### Best for
Teams that prioritize speed and reuse: get proven components fast, own the code, and adapt to design tokens as needed.

---

## Styled Base (`@design-system/styled-base`)

### Pros
- **Lightweight** – Tailwind + design tokens on headless base; no external UI library
- **Full control** – Components live in your codebase; no black box
- **Tailwind-native** – Pure utility classes; easy to customize and align with design tokens
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

For our next internal projects, **Shadcn** (`@design-system/shadcn-ui`) is the recommended choice.

### Why Shadcn?

We prioritize **speed and reuse**:

1. **Pre-built components** – Copy via CLI; no need to build dialogs, tabs, menus, etc. from scratch.
2. **Proven and accessible** – Radix UI + Tailwind; battle-tested, widely adopted.
3. **You own the code** – Copy-paste means full control; customize and adapt to design tokens as needed.
4. **Minimal footprint** – Only what you copy; no heavy runtime library.
5. **Fast iteration** – Get a full component set quickly; refine token alignment over time.

### When to choose alternatives

- **Styled Base** – When you want full control, a single headless base (no Radix), and no external component model.
- **DaisyUI** – For quick internal tools or when semantic theming and zero runtime cost are top priorities.
- **Hero UI** – When you need a full component library with minimal setup and modern look.
- **MUI** – When Material Design compliance or MUI’s advanced components (e.g. Data Grid) are required.

---

## Risk & Mitigation

| Library | Main Risk | Mitigation |
|---------|-----------|------------|
| **Shadcn** | Token alignment, upstream sync | Map tokens in copied components; document sync process |
| **Styled Base** | Manual maintenance | Version in monorepo; have fallback (Shadcn) if needed |
| **Hero UI** | Smaller ecosystem, newer | Monitor adoption; have fallback (Shadcn) if needed |
| **DaisyUI** | Override complexity, global styles | Use design tokens; limit DaisyUI to semantic layer; test overrides early |
| **MUI** | Heavy bundle, Emotion vs Tailwind | Use only if Material Design required; consider MUI Pigment for CSS |

---

## Quick Reference

| Criteria | Shadcn | Styled Base | Hero UI | DaisyUI | MUI |
|----------|--------|-------------|---------|---------|-----|
| Bundle size | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐ |
| Speed & reuse | ⭐⭐⭐ | ⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ |
| Customization | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐ |
| Theming | ⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| Ecosystem | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| Tailwind fit | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐ |
| Our fit | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐ |
