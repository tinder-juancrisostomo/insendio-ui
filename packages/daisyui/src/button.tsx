import React from 'react';
import { Button as BaseButton, type ButtonProps as BaseButtonProps } from '@design-system/base';
import { cn } from '@design-system/utils';

export interface ButtonProps extends BaseButtonProps {
  variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const variantClass: Record<NonNullable<ButtonProps['variant']>, string> = {
  default: 'ds-btn ds-btn--primary',
  secondary: 'ds-btn ds-btn--secondary',
  outline: 'ds-btn ds-btn--outline',
  destructive: 'ds-btn ds-btn--destructive',
  ghost: 'ds-btn ds-btn--ghost',
  link: 'ds-btn ds-btn--link',
};

const sizeClass: Record<NonNullable<ButtonProps['size']>, string> = {
  default: '',
  sm: 'ds-btn--sm',
  lg: 'ds-btn--lg',
  icon: 'ds-btn--icon',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => (
    <BaseButton
      ref={ref}
      className={cn(variantClass[variant], sizeClass[size], className)}
      {...props}
    />
  )
);

Button.displayName = 'Button';
