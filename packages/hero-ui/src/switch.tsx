import * as React from 'react';
import { Switch as HeroSwitch } from '@heroui/react';
import type { SwitchProps as HeroSwitchProps } from '@heroui/react';

export interface SwitchProps extends Omit<HeroSwitchProps, 'onChange' | 'isSelected'> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: React.ReactNode;
}

export const Switch = React.forwardRef<React.ComponentRef<typeof HeroSwitch>, SwitchProps>(
  ({ checked = false, onCheckedChange, ...props }, ref) => {
    const handleChange = React.useCallback(
      (value: boolean) => {
        onCheckedChange?.(value);
      },
      [onCheckedChange]
    );

    return (
      <HeroSwitch
        ref={ref}
        isSelected={checked}
        onValueChange={handleChange}
        {...props}
      />
    );
  }
);

Switch.displayName = 'Switch';
