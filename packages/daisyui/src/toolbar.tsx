import React from 'react';
import { Toolbar as BaseToolbar, type ToolbarProps as BaseToolbarProps } from '@design-system/base';
import { cn } from '@design-system/utils';

export const Toolbar = React.forwardRef<HTMLDivElement, BaseToolbarProps>(
  ({ className, ...props }, ref) => (
    <BaseToolbar
      ref={ref}
      className={cn('flex flex-wrap items-center gap-1 rounded-box border border-base-300 bg-base-200 p-1 [&_button]:btn [&_button]:btn-sm', className)}
      {...props}
    />
  )
);

Toolbar.displayName = 'Toolbar';
