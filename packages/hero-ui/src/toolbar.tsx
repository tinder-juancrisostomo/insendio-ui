import React from 'react';
import { Toolbar as BaseToolbar, type ToolbarProps as BaseToolbarProps } from '@design-system/base';
import { cn } from '@design-system/utils';

export const Toolbar = React.forwardRef<HTMLDivElement, BaseToolbarProps>(
  ({ className, ...props }, ref) => (
    <BaseToolbar
      ref={ref}
      className={cn('flex flex-wrap items-center gap-1 rounded-md border border-gray-200 bg-gray-50 p-1', className)}
      {...props}
    />
  )
);

Toolbar.displayName = 'Toolbar';
