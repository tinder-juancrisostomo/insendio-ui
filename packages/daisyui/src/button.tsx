import React from 'react';
import { Button as DaisyButton } from 'react-daisyui';
import { cn } from '@design-system/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const variantToColor: Record<NonNullable<ButtonProps['variant']>, string> = {
  default: 'primary',
  secondary: 'secondary',
  outline: 'ghost',
  destructive: 'error',
  ghost: 'ghost',
  link: 'link',
};

const sizeMap: Record<NonNullable<ButtonProps['size']>, string> = {
  default: 'md',
  sm: 'sm',
  lg: 'lg',
  icon: 'sm',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', children, ...props }, ref) => {
    const color = variant === 'outline' ? undefined : variantToColor[variant];
    const isOutline = variant === 'outline';
    const isLink = variant === 'link';
    return (
      <DaisyButton
        ref={ref}
        color={color as any}
        variant={isOutline ? 'outline' : isLink ? 'link' : undefined}
        size={sizeMap[size] as any}
        className={cn(
          size === 'icon' && 'btn-square btn-circle',
          className
        )}
        {...props}
      >
        {children}
      </DaisyButton>
    );
  }
);
Button.displayName = 'Button';
