/**
 * Adapter: maps Insendio API to shadcn Button from src/components/ui/button
 */
import React from 'react';
import { Button as ShadcnButton } from './components/ui/button';
import type { ButtonProps as BaseButtonProps } from '@design-system/base';

export type ButtonVariant =
  | 'default'
  | 'secondary'
  | 'outline'
  | 'destructive'
  | 'ghost'
  | 'link';

export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

export interface ButtonProps extends Omit<BaseButtonProps, 'variant' | 'size'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => <ShadcnButton ref={ref} {...props} />
);

Button.displayName = 'Button';
