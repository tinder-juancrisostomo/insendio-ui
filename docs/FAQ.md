# Frequently Asked Questions

Common technical and non-technical questions about the design system and UI libraries PoC.

---

## Technical

### 1. Since our current codebase uses styled-components, can we use Shadcn with styled-components?

**Short answer:** Shadcn is built for Tailwind CSS, not styled-components. You can run both in the same project, but Shadcn components are not designed to be styled with styled-components.

**Details:**

- Shadcn components use **Tailwind utility classes** and **CSS variables** for styling. They are not built with styled-components and do not expose a styled-components API.
- Shadcn's approach is to copy components into your codebase and style them with `className` and Tailwind utilities. Theming is done via CSS variables (e.g. `--primary`, `--background`).
- If you tried to style Shadcn with styled-components, you'd have to replace or override Tailwind classes with styled-components CSS, which adds complexity and undermines Shadcn's design.

**Practical options:**

1. **Coexistence:** Use Shadcn for new components and keep styled-components for existing ones. Both can coexist in the same app; they produce different CSS output.
2. **Gradual migration:** Adopt Tailwind + Shadcn for new features while keeping existing styled-components until you migrate them. This PoC uses Tailwind throughout; migrating from styled-components means adopting Tailwind (or maintaining two styling systems during the transition).
3. **Full migration:** If you want Tailwind + Shadcn everywhere, plan a phased migration from styled-components to Tailwind (e.g. component by component or page by page).

See [STYLING.md](STYLING.md) for how styling works in this PoC.

### 2. Can we use MUI with styled-components?

**Short answer:** Yes. MUI officially supports styled-components via `@mui/styled-engine-sc`.

**Details:**

- By default, MUI uses **Emotion** for styling. To use styled-components instead, you swap the styled engine with `@mui/styled-engine-sc`, which implements the same `styled()` API.
- Configure your bundler to alias `@mui/styled-engine` → `@mui/styled-engine-sc` (yarn resolutions, webpack alias, or similar).
- Use `styled` from `@mui/system` when styling MUI components so theming and props integrate correctly.

**Caveats:**

- **SSR:** styled-components can have compatibility issues with MUI in server-rendered apps. MUI recommends Emotion for SSR projects.
- **Version:** `@mui/styled-engine-sc` supports styled-components v5; v6 may have edge cases.

**In this PoC:** Our MUI package uses Tailwind and design tokens, not Emotion or styled-components. See [STYLING.md](STYLING.md).

### 3. Does it make sense to force our own design system over MUI (or another UI library)?

**Short answer:** It depends. For a PoC evaluating multiple libraries: yes, you need a unified API. Once you choose one library: use its theming to apply your brand—don't add a parallel component abstraction.

**Details:**

- **During evaluation (this PoC):** We support MUI, Shadcn, DaisyUI, and Hero UI. The polymorphic architecture requires a consistent component API so the same app can run with any library. That's why we have wrappers that map our API (e.g. `variant="outline"`) to each library's native API.
- **After choosing a library:** If you standardize on MUI, you don't need to "force" a design system on top. MUI is already a design system (Material Design). Apply your brand via **MUI's theming**: use `createTheme()` with your design tokens (colors, typography, spacing) and wrap the app with `ThemeProvider`. That *is* your design system—no extra component layer required.
- **What to avoid:** Maintaining a separate package that wraps every MUI component with a different API. Once you've committed to one library, that adds complexity without benefit.

**Practical approach once you choose MUI:**

1. Define design tokens (e.g. in `packages/tokens`).
2. Create a MUI theme that maps tokens to `createTheme()`.
3. Use MUI components directly from `@mui/material`; the theme handles styling.
4. Remove the polymorphic layer (`InsendioComponentsProvider`, component wrappers) when you no longer need to swap libraries.

### 4. Why does the MUI package have both a theme and component wrappers?

**Short answer:** The theme applies our design tokens to MUI. The wrappers exist only for the polymorphic PoC—they normalize the API so the same app code works with MUI, Shadcn, DaisyUI, or Hero UI.

**Details:**

- **Theme (`theme.ts` + `ThemeProvider`):** Uses `createTheme()` with our tokens (palette, typography, shape, component overrides). This is the correct way to customize MUI and would remain even if we dropped the wrappers.
- **Component wrappers (Button, Input, etc.):** The app uses `useInsendioComponents()` to get components—it never imports from `@mui/material` directly. Each library implementation must expose the same interface (e.g. `variant="outline"`), but MUI uses `variant="outlined"`, Shadcn uses `variant="outline"`, etc. The wrappers map our unified API to each library's native API.
- **After choosing a library:** If we pick MUI, we can remove the wrappers and use MUI directly. The theme stays.

### 5. Why are we considering shadcn as an option to adopt for our internal projects?

**Short answer:** Shadcn was recommended in this PoC because it best aligns with our stack (Tailwind, design tokens, full control) and has minimal footprint. Shadcn is not a traditional npm package—it uses a **copy-paste model** built on **Radix UI + Tailwind**. We evaluate it in two ways:

1. **`@design-system/styled-base`** – Tailwind + design tokens on our headless base (no Radix). Lightweight, full control.
2. **`@design-system/shadcn-radix`** – Radix UI primitives + Tailwind + design tokens (shadcn's model).
3. **`@design-system/shadcn-ui`** – Components copied from shadcn/ui via CLI (Radix + Tailwind + CVA).

**What is "shadcn's real model" (Radix + Tailwind + copy-paste)?**

Shadcn/ui is *not* distributed as an npm component library. Instead, it uses three pillars:

1. **Radix UI** – Shadcn components are built on top of [Radix UI](https://www.radix-ui.com/) primitives. Radix provides accessible, unstyled building blocks. Shadcn adds the visual layer on top.

2. **Tailwind CSS** – All styling is done with Tailwind utility classes. No CSS-in-JS or custom styling engine.

3. **Copy-paste** – You run `npx shadcn add button` and the CLI copies component source code into your project. You own the code; you can modify, version, and maintain components yourself.

See [UI_LIBRARIES_COMPARISON.md](UI_LIBRARIES_COMPARISON.md) for the full evaluation and recommendation.

---

## Non-Technical

<!-- Add questions and answers here -->

---

## Contributing

Add new questions and answers here as they come up. Keep technical and non-technical sections separate for easier scanning.
