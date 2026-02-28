import * as React from 'react';
import { Checkbox as HeroCheckbox } from '@heroui/react';
import type { CheckboxProps as HeroCheckboxProps } from '@heroui/react';

export interface CheckboxProps extends Omit<HeroCheckboxProps, 'onChange' | 'isSelected' | 'checked'> {
  checked?: boolean | 'indeterminate';
  onCheckedChange?: (checked: boolean) => void;
  label?: React.ReactNode;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ checked = false, onCheckedChange, ...props }, ref) => {
    const isIndeterminate = checked === 'indeterminate';
    const isChecked = isIndeterminate ? false : !!checked;

    const handleChange = React.useCallback(
      (value: boolean) => {
        if (!isIndeterminate) {
          onCheckedChange?.(value);
        }
      },
      [onCheckedChange, isIndeterminate]
    );

    return (
      <HeroCheckbox
        ref={ref}
        isSelected={isChecked}
        isIndeterminate={isIndeterminate}
        onValueChange={handleChange}
        {...props}
      />
    );
  }
);

Checkbox.displayName = 'Checkbox';
