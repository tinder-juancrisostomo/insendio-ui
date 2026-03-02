import React from 'react';
import { Toggle as DaisyToggle } from 'react-daisyui';
import { cn } from '@design-system/utils';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'children' | 'color' | 'size'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, checked, defaultChecked, onCheckedChange, onChange, ...props }, ref) => (
    <DaisyToggle
      ref={ref}
      role="switch"
      aria-checked={checked}
      defaultChecked={defaultChecked}
      checked={checked}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e);
        onCheckedChange?.(e.target.checked);
      }}
      className={cn('toggle-primary', className)}
      {...(props as Record<string, unknown>)}
    />
  )
);
Switch.displayName = 'Switch';
