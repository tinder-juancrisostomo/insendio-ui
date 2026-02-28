import * as React from 'react';
import MuiTextField from '@mui/material/TextField';
import type { TextFieldProps } from '@mui/material/TextField';

export interface InputProps extends Omit<TextFieldProps, 'variant'> {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLDivElement, InputProps>(
  ({ iconLeft, iconRight, InputProps: inputPropsProp, ...props }, ref) => {
    return (
      <MuiTextField
        ref={ref}
        variant="outlined"
        size="small"
        fullWidth
        InputProps={{
          startAdornment: iconLeft,
          endAdornment: iconRight,
          ...inputPropsProp,
        }}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
