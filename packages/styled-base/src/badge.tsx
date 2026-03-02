import React from 'react';
import { Badge as BaseBadge, type BadgeProps as BaseBadgeProps } from '@design-system/base';
import { cn } from '@design-system/utils';

export type BadgeVariant = 'active' | 'inactive' | 'draft' | 'scheduled' | 'paused' | 'neutral' | 'success' | 'info' | 'warning';

export interface BadgeProps extends BaseBadgeProps {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  active: 'bg-[#E8F5E9] text-[#2E7D32]',
  inactive: 'bg-[#F3E5F5] text-[#7B1FA2]',
  draft: 'bg-[#F5F5F5] text-[#616161]',
  scheduled: 'bg-[#E3F2FD] text-[#1565C0]',
  paused: 'bg-[#FFF3E0] text-[#D48806]',
  neutral: 'bg-[#F0F0F0] text-[#555555]',
  success: 'bg-[#E8F5E9] text-[#2E7D32]',
  info: 'bg-[#E3F2FD] text-[#1565C0]',
  warning: 'bg-[#FFF3E0] text-[#D48806]',
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'neutral', ...props }, ref) => (
    <BaseBadge
      ref={ref}
      className={cn('inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium', variantClasses[variant], className)}
      {...props}
    />
  )
);

Badge.displayName = 'Badge';
