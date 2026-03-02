import React from 'react';
import { Badge as DaisyBadge } from 'react-daisyui';
import { cn } from '@design-system/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'neutral';
}

const variantToColor: Record<string, string> = {
  default: 'primary',
  secondary: 'secondary',
  outline: 'outline',
  destructive: 'error',
  neutral: 'neutral',
};

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <DaisyBadge
      ref={ref}
      color={variantToColor[variant] as any}
      className={cn(className)}
      {...props}
    />
  )
);
Badge.displayName = 'Badge';
