# Utils Package

Shared utility functions for the Insendio design system. Class merging (cn), helpers.

---

## Overview

**Package:** `@design-system/utils`  
**Description:** Shared utility functions for Insendio design system  
**Dependencies:** `clsx` ^2.1.1, `tailwind-merge` ^3.5.0

The utils package provides the `cn()` function used by all styled packages for merging Tailwind classes. It combines `clsx` (conditional classes) and `tailwind-merge` (conflict resolution).

---

## How It Works

```ts
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- **clsx** – Handles `cn('foo', isActive && 'active')`, arrays, objects.
- **tailwind-merge** – Resolves conflicts: `cn('p-4', 'p-6')` → `p-6`.

---

## Usage

```tsx
import { cn } from '@design-system/utils';

<button className={cn('btn', variant === 'primary' && 'btn-primary', className)}>
  {children}
</button>
```

---

## Consumers

All styled packages: `styled-base`, `daisyui`, `shadcn-radix`, `shadcn-ui`, `hero-ui`, `mui`, `insendio-app`.

---

## Related

- [STYLING.md](STYLING.md) – The cn() utility
- [CLASSNAMES.md](CLASSNAMES.md) – How className flows through components
