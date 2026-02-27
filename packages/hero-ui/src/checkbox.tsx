import React from 'react';
import { Checkbox as BaseCheckbox, type CheckboxProps as BaseCheckboxProps } from '@design-system/base';
import { cn } from '@design-system/utils';

export const Checkbox = React.forwardRef<HTMLInputElement, BaseCheckboxProps>(
  ({ className, ...props }, ref) => (
    <BaseCheckbox
      ref={ref}
      className={cn('h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-2 focus:ring-purple-500', className)}
      {...props}
    />
  )
);

Checkbox.displayName = 'Checkbox';
