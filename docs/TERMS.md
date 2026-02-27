# Important Terms

A glossary of key concepts used in this PoC and its documentation.

---

## Headless

**Headless** components provide behavior (logic, accessibility, keyboard interaction) without visual styling. They expose a minimal API and render unstyled or minimally styled markup.

In this project, `@design-system/base` is the headless layer. It implements W3C ARIA patterns, focus management, and keyboard handling, but leaves appearance to the styled packages (Shadcn, DaisyUI, etc.). This separation lets you swap styling libraries without changing behavior.

---

## W3C ARIA APG

**W3C ARIA Authoring Practices Guide (APG)** is the official set of patterns for building accessible web components. It defines roles, states, keyboard behavior, and structure for components like accordions, dialogs, menus, and tabs.

Our base components follow these patterns so screen readers and keyboard users get correct semantics and interaction. See [w3.org/WAI/ARIA/apg/patterns/](https://www.w3.org/WAI/ARIA/apg/patterns/).

---

## Design Tokens

**Design tokens** are named variables that represent design decisions (colors, spacing, typography). Instead of hardcoding `#2196F3` or `16px`, you use `--ds-text-link` or `--ds-space-2`.

The `@design-system/tokens` package provides CSS variables (`--ds-*`) for light/dark themes and responsive breakpoints. Components reference these so theming stays consistent and maintainable.

---

## Polymorphism / Polymorphic Components

**Polymorphism** here means the same component interface can be backed by different implementations. The app code uses `Button`, `Tabs`, etc., but the actual implementation comes from whichever library is injected (MUI, Shadcn, etc.).

In insendio-app, `useInsendioComponents()` returns polymorphic components: the same API, different styling depending on the provider.

---

## Specialization Pattern

**Specialization** is a composition pattern where a **specialized** component wraps a **generic** one and adds domain-specific props or styling.

Example: `InsendioCard` wraps the generic `Box` and injects Insendio-specific classes (rounded corners, border, shadow). The app uses `InsendioCard` instead of repeating the same `Box` classes everywhere.

---

## Tailwind CSS

**Tailwind CSS** is a utility-first CSS framework. Instead of writing custom CSS, you apply pre-defined classes like `rounded-lg`, `px-4`, `bg-gray-100`. Styles are generated at build time from the classes found in your source.

All styled packages in this PoC use Tailwind. The difference is which utilities or plugins they rely on (e.g. DaisyUI adds semantic classes on top).

---

## cn() Utility

**cn()** (from `@design-system/utils`) merges class names for React components. It combines `clsx` (conditional classes) and `tailwind-merge` (conflict resolution).

Example: `cn('p-4', isActive && 'bg-blue-500', className)` — if both `p-4` and `p-6` appear, `tailwind-merge` keeps `p-6`. This makes `className` overrides predictable.

---

## Styled Package

A **styled package** wraps headless base components with visual styling. In this repo: `@design-system/shadcn`, `@design-system/hero-ui`, `@design-system/daisyui`, `@design-system/mui`.

Each exports the same component API (Button, Tabs, etc.) but applies different CSS via Tailwind classes or library-specific styles.

---

## Base Package

The **base package** (`@design-system/base`) is the headless layer. It contains accessible primitives (Button, Tabs, Dialog, etc.) with no styling. Styled packages import from base and add appearance.

---

## Component Context

**Component context** (React Context) is used to inject components into the app without direct imports. insendio-app receives `Box`, `Button`, `Tabs`, etc. via `InsendioComponentsProvider` instead of importing from a specific library. This enables the polymorphic setup: the same app code renders different UIs by swapping the provider value.

---

## Proof of Concept (PoC)

A **Proof of Concept** is a small project to validate an idea before committing to it. This repo is a PoC to compare UI libraries and decide which one to adopt for future internal projects.

---

## Mobile-First

**Mobile-first** means styles are written for small screens first, then enhanced for larger breakpoints. Our design tokens and Tailwind breakpoints follow this approach: base styles target mobile; `md:` and `lg:` add desktop refinements.

---

## CVA (Class Variance Authority)

**CVA** is a small library for defining component variants (e.g. `variant="primary"` vs `variant="outline"`). Shadcn uses it to compose Tailwind classes per variant. It keeps variant logic declarative and type-safe.

---

## DaisyUI

**DaisyUI** is a Tailwind plugin that adds semantic component classes (`btn`, `alert`, `card`, etc.). It provides themes and components without a runtime JS dependency—only CSS is generated at build time.

---

## Shadcn UI

**Shadcn UI** is a collection of copy-paste components built with Radix primitives and Tailwind. You add the code to your project instead of installing a package. Components are customizable because you own the source.

---

## MUI (Material UI)

**MUI** (formerly Material UI) is a React component library implementing Google’s Material Design. It uses Emotion for styling and includes many components (data grid, date pickers, etc.). In this PoC, the MUI package also depends on `@mui/material`.

---

## Hero UI

**Hero UI** (formerly NextUI) is a modern React component library with a clean design. It provides a full set of components and theming. In this PoC, the hero-ui package uses `@heroui/react`.
