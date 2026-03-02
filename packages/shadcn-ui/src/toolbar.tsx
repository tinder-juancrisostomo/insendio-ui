import React from 'react';
import * as ToolbarPrimitive from '@radix-ui/react-toolbar';
import { cn } from '@design-system/utils';

export interface ToolbarProps
  extends React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Root> {}

export const Toolbar = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Root>,
  ToolbarProps
>(({ className, ...props }, ref) => (
  <ToolbarPrimitive.Root
    ref={ref}
    className={cn(
      'flex flex-wrap items-center gap-1 rounded-md border border-[var(--ds-border-default)] bg-[var(--ds-bg-muted)] p-1',
      className
    )}
    {...props}
  />
));

Toolbar.displayName = 'Toolbar';
