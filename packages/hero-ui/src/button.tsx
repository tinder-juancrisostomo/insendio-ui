import * as React from 'react';
import { Button as HeroButton } from '@heroui/react';
import type { ButtonProps as HeroButtonProps } from '@heroui/react';

export type ButtonVariant =
  | 'default'
  | 'secondary'
  | 'outline'
  | 'destructive'
  | 'ghost'
  | 'link';

export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

export interface ButtonProps extends Omit<HeroButtonProps, 'variant' | 'color' | 'size'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantMap: Record<ButtonVariant, HeroButtonProps['variant']> = {
  default: 'solid',
  secondary: 'flat',
  outline: 'bordered',
  destructive: 'solid',
  ghost: 'ghost',
  link: 'light',
};

const colorMap: Record<ButtonVariant, HeroButtonProps['color']> = {
  default: 'primary',
  secondary: 'default',
  outline: 'primary',
  destructive: 'danger',
  ghost: 'default',
  link: 'primary',
};

const sizeMap: Record<ButtonSize, HeroButtonProps['size']> = {
  default: 'md',
  sm: 'sm',
  lg: 'lg',
  icon: 'md',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', size = 'default', children, ...props }, ref) => {
    const isIconOnly = size === 'icon';
    return (
      <HeroButton
        ref={ref}
        variant={variantMap[variant]}
        color={colorMap[variant]}
        size={sizeMap[size]}
        isIconOnly={isIconOnly}
        {...props}
      >
        {children}
      </HeroButton>
    );
  }
);

Button.displayName = 'Button';
