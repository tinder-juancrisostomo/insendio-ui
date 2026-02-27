import React from 'react';
import { Checkbox as BaseCheckbox, type CheckboxProps as BaseCheckboxProps } from '@design-system/base';
import { cn } from '@design-system/utils';

export const Checkbox = React.forwardRef<HTMLInputElement, BaseCheckboxProps>(
  ({ className, ...props }, ref) => (
    <BaseCheckbox
      ref={ref}
      className={cn('checkbox checkbox-primary', className)}
      {...props}
    />
  )
);

Checkbox.displayName = 'Checkbox';
