import * as React from 'react';
import MuiSwitch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import type { SwitchProps as MuiSwitchProps } from '@mui/material/Switch';

export interface SwitchProps extends Omit<MuiSwitchProps, 'onChange'> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: React.ReactNode;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked = false, onCheckedChange, label, ...props }, ref) => {
    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onCheckedChange?.(e.target.checked);
      },
      [onCheckedChange]
    );

    const muiSwitch = (
      <MuiSwitch
        ref={ref}
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': label ? undefined : 'Toggle' }}
        {...props}
      />
    );

    if (label) {
      return <FormControlLabel control={muiSwitch} label={label} />;
    }
    return muiSwitch;
  }
);

Switch.displayName = 'Switch';
