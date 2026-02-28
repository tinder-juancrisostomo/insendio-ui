import * as React from 'react';
import { Chip as HeroChip } from '@heroui/react';
import type { ChipProps } from '@heroui/react';

export type BadgeVariant =
  | 'active'
  | 'inactive'
  | 'draft'
  | 'scheduled'
  | 'paused'
  | 'neutral'
  | 'success'
  | 'info'
  | 'warning';

export interface BadgeProps extends Omit<ChipProps, 'color' | 'variant'> {
  variant?: BadgeVariant;
}

const colorMap: Record<BadgeVariant, ChipProps['color']> = {
  active: 'success',
  inactive: 'secondary',
  draft: 'default',
  scheduled: 'primary',
  paused: 'warning',
  neutral: 'default',
  success: 'success',
  info: 'primary',
  warning: 'warning',
};

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ variant = 'neutral', children, ...props }, ref) => {
    return (
      <HeroChip
        ref={ref}
        color={colorMap[variant]}
        size="sm"
        variant="flat"
        {...props}
      >
        {children}
      </HeroChip>
    );
  }
);

Badge.displayName = 'Badge';
