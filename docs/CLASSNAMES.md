# How Class Names Flow Through the Component Stack

This document explains how `className` propagates from insendio-app specialized components down to the DOM when using MUI (or any styled package).

## The Flow

```
InsendioAlert (insendio-app)
    │  className={cn(alertStyles[variant], className)}
    │  e.g. "border border-[#2196F3] bg-[#E8F0FE]"
    ▼
Alert (mui / daisyui / shadcn / hero-ui)
    │  className={cn(variantClasses[variant], className)}
    │  e.g. "rounded-lg border border-gray-200 ..." + Insendio classes
    ▼
BaseAlert (base)
    │  <div role="alert" className={...} />
    ▼
DOM
```

## Step-by-Step Example: InsendioInfoAlert with MUI

### 1. InsendioAlert passes Insendio-specific classes

```tsx
// packages/insendio-app/src/components/insendio/InsendioAlert.tsx
const alertStyles = {
  info: 'border border-[#2196F3] bg-[#E8F0FE]',
  success: 'border border-[#2E7D32] bg-[#E8F5E9]',
};

<Alert variant="default" className={cn(alertStyles[variant], className)}>
  {children}
</Alert>
```

For `variant="info"`, this passes: `"border border-[#2196F3] bg-[#E8F0FE]"`

### 2. MUI Alert merges with its own variant classes

```tsx
// packages/mui/src/alert.tsx
const variantClasses = {
  default: 'rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900',
  // ...
};

<BaseAlert
  className={cn(variantClasses[variant], className)}
  {...rest}
>
```

Result: `"rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 border border-[#2196F3] bg-[#E8F0FE]"`

### 3. Base Alert renders the div

```tsx
// packages/base/src/alert.tsx
<div role="alert" aria-live="polite" aria-atomic="true" {...props}>
```

The merged `className` is in `props` and ends up on the `<div>`.

### 4. Tailwind + tailwind-merge

- **Tailwind** generates CSS for all utilities used in the project.
- **tailwind-merge** (inside `cn()`) resolves conflicts: when both `bg-gray-50` and `bg-[#E8F0FE]` are present, the later one wins (Insendio blue background).

## Override Order

When multiple layers pass `className`:

1. **Base package** – minimal or no classes
2. **Styled package** (MUI, DaisyUI, etc.) – default variant styles
3. **insendio-app** – Insendio-specific overrides
4. **Caller** – optional `className` prop for one-off overrides

Later classes override earlier ones for the same property (thanks to tailwind-merge).

## With DaisyUI

DaisyUI uses semantic classes like `alert alert-info`. The flow is the same:

```
InsendioAlert → "border border-[#2196F3] bg-[#E8F0FE]"
DaisyUI Alert → "alert alert-info" + Insendio classes
BaseAlert     → <div className="alert alert-info border border-[#2196F3] bg-[#E8F0FE]">
```

DaisyUI’s `alert` provides structure; Insendio classes can override colors and borders.

## Key Points

- **All packages accept `className`** and merge it with `cn()`.
- **Tailwind runs in the app**, which includes package paths in `content`.
- **tailwind-merge** ensures predictable overrides when classes conflict.
- **insendio-app** never imports a specific library; it receives components via context and passes class names through.
