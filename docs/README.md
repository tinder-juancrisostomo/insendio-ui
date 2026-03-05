# UI libraries PoC AI - Documentation

Technical documentation for the UI libraries Proof of Concept monorepo.

## Documents

| Document | Description |
|----------|-------------|
| [UI_LIBRARIES_COMPARISON.md](UI_LIBRARIES_COMPARISON.md) | **Overview, pros, cons, and recommendation** (Tailwind stack) |
| [UI_LIBRARIES_STYLED_COMPONENTS.md](UI_LIBRARIES_STYLED_COMPONENTS.md) | **Recommendation when styled-components is the stack** |
| [TERMS.md](TERMS.md) | **Important terms** (headless, design tokens, etc.) |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Package layers, dependency flow, component polymorphism |
| [STYLING.md](STYLING.md) | Tailwind usage, MUI vs DaisyUI vs Shadcn, `cn()` utility |
| [CLASSNAMES.md](CLASSNAMES.md) | How `className` flows from insendio-app → styled package → DOM |
| [INSENDIO-APP.md](INSENDIO-APP.md) | Component context, pages (Dashboard, Segments, Settings), specialization pattern |
| [POC_EVALUATION.md](POC_EVALUATION.md) | **Limitations, adoption path, team fit, next steps** |
| [DOCS_APP.md](DOCS_APP.md) | **Docs app** – Components, Charts, Typography, Icons, Animations, Apps, library switcher |
| [CHARTS.md](CHARTS.md) | **Charts package** – Bar, Line, Pie, Area, Network Graph, accessibility |
| [FAQ.md](FAQ.md) | **Common technical and non-technical questions** |

## Package Documentation

One deep-dive doc per package. **Shadcn-radix, shadcn-ui, and styled-base** are the core three Tailwind-native packages—see [UI_LIBRARIES_COMPARISON.md](UI_LIBRARIES_COMPARISON.md#why-shadcn-radix-shadcn-ui-and-styled-base-are-the-core-three) for why.

| Package | Document |
|---------|----------|
| base | [BASE_PACKAGE.md](BASE_PACKAGE.md) |
| shadcn-ui (recommended) | [SHADCN_UI_PACKAGE.md](SHADCN_UI_PACKAGE.md) |
| styled-base | [STYLED_BASE_PACKAGE.md](STYLED_BASE_PACKAGE.md) |
| shadcn-radix | [SHADCN_RADIX_PACKAGE.md](SHADCN_RADIX_PACKAGE.md) |
| daisyui | [DAISYUI_PACKAGE.md](DAISYUI_PACKAGE.md) |
| hero-ui | [HERO_UI_PACKAGE.md](HERO_UI_PACKAGE.md) |
| mui | [MUI_PACKAGE.md](MUI_PACKAGE.md) |
| tokens | [TOKENS_PACKAGE.md](TOKENS_PACKAGE.md) |
| utils | [UTILS_PACKAGE.md](UTILS_PACKAGE.md) |
| typography | [TYPOGRAPHY_PACKAGE.md](TYPOGRAPHY_PACKAGE.md) |
| icons | [ICONS_PACKAGE.md](ICONS_PACKAGE.md) |
| charts | [CHARTS_PACKAGE.md](CHARTS_PACKAGE.md) |
| insendio-app | [INSENDIO_APP_PACKAGE.md](INSENDIO_APP_PACKAGE.md) |

## Quick Links

- [Main README](../README.md) - Project overview, quick start, components table
- [W3C ARIA APG Patterns](https://www.w3.org/WAI/ARIA/apg/patterns/) - Accessibility reference
