import * as React from 'react';
import MuiButton from '@mui/material/Button';
import type { ButtonProps as MuiButtonProps } from '@mui/material/Button';

export type ButtonVariant =
  | 'default'
  | 'secondary'
  | 'outline'
  | 'destructive'
  | 'ghost'
  | 'link';

export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

export interface ButtonProps extends Omit<MuiButtonProps, 'variant' | 'size'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantMap: Record<ButtonVariant, MuiButtonProps['variant']> = {
  default: 'contained',
  secondary: 'contained',
  outline: 'outlined',
  destructive: 'contained',
  ghost: 'text',
  link: 'text',
};

const colorMap: Record<ButtonVariant, MuiButtonProps['color']> = {
  default: 'primary',
  secondary: 'secondary',
  outline: 'primary',
  destructive: 'error',
  ghost: 'primary',
  link: 'primary',
};

const sizeMap: Record<ButtonSize, MuiButtonProps['size']> = {
  default: 'medium',
  sm: 'small',
  lg: 'large',
  icon: 'small',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', size = 'default', sx, ...props }, ref) => {
    const muiVariant = variantMap[variant];
    const muiColor = colorMap[variant];
    const muiSize = sizeMap[size];
    const isIconOnly = size === 'icon';

    return (
      <MuiButton
        ref={ref}
        variant={muiVariant}
        color={muiColor}
        size={muiSize}
        sx={{
          ...(variant === 'secondary' && {
            backgroundColor: 'action.hover',
            color: 'text.primary',
            '&:hover': {
              backgroundColor: 'action.selected',
            },
          }),
          ...(variant === 'ghost' && {
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }),
          ...(variant === 'link' && {
            textDecoration: 'underline',
            textUnderlineOffset: 4,
            '&:hover': {
              backgroundColor: 'transparent',
              textDecoration: 'underline',
            },
          }),
          ...(isIconOnly && {
            minWidth: 40,
            padding: 1,
          }),
          ...sx,
        }}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
