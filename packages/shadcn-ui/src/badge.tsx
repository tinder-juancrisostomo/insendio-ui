/**
 * Adapter: maps Insendio API to shadcn Badge from src/components/ui/badge
 */
import React from 'react';
import { Badge as ShadcnBadge } from './components/ui/badge';

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

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (props, ref) => <ShadcnBadge ref={ref} {...props} />
);

Badge.displayName = 'Badge';
