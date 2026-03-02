# @design-system/shadcn-ui

Components copied from [shadcn/ui](https://ui.shadcn.com) via the CLI. Uses Radix UI primitives + Tailwind + CVA.

## Adding components

To copy the latest shadcn components into this package:

```bash
pnpm add:components
```

Or add individual components:

```bash
cd packages/shadcn-ui
npx shadcn@latest add button
npx shadcn@latest add dialog
# etc.
```

Components are written to `src/components/ui/`. The package exports adapters that map our Insendio API to the shadcn component APIs.
