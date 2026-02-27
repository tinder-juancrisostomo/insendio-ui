import React from 'react';
import { Badge as BaseBadge, type BadgeProps as BaseBadgeProps } from '@design-system/base';
import { cn } from '@design-system/utils';

export type BadgeVariant = 'active' | 'inactive' | 'draft' | 'scheduled' | 'paused' | 'neutral' | 'success' | 'info' | 'warning';

export interface BadgeProps extends BaseBadgeProps {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  active: 'bg-emerald-100 text-emerald-800',
  inactive: 'bg-violet-100 text-violet-800',
  draft: 'bg-slate-100 text-slate-600',
  scheduled: 'bg-sky-100 text-sky-700',
  paused: 'bg-amber-100 text-amber-800',
  neutral: 'bg-slate-100 text-slate-600',
  success: 'bg-emerald-100 text-emerald-800',
  info: 'bg-sky-100 text-sky-700',
  warning: 'bg-amber-100 text-amber-800',
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'neutral', ...props }, ref) => (
    <BaseBadge
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
);

Badge.displayName = 'Badge';
