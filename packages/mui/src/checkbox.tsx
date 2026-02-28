import * as React from 'react';
import MuiCheckbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import type { CheckboxProps as MuiCheckboxProps } from '@mui/material/Checkbox';

export interface CheckboxProps extends Omit<MuiCheckboxProps, 'onChange' | 'checked'> {
  checked?: boolean | 'indeterminate';
  onCheckedChange?: (checked: boolean) => void;
  label?: React.ReactNode;
}

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ checked = false, onCheckedChange, label, ...props }, ref) => {
    const isIndeterminate = checked === 'indeterminate';

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isIndeterminate) {
          onCheckedChange?.(e.target.checked);
        }
      },
      [onCheckedChange, isIndeterminate]
    );

    const muiChecked = isIndeterminate ? false : !!checked;

    const checkbox = (
      <MuiCheckbox
        ref={ref}
        checked={muiChecked}
        indeterminate={isIndeterminate}
        onChange={handleChange}
        {...props}
      />
    );

    if (label) {
      return <FormControlLabel control={checkbox} label={label} />;
    }
    return checkbox;
  }
);

Checkbox.displayName = 'Checkbox';
