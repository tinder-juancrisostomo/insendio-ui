import * as React from 'react';
import MuiChip from '@mui/material/Chip';
import type { ChipProps } from '@mui/material/Chip';

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
  scheduled: 'info',
  paused: 'warning',
  neutral: 'default',
  success: 'success',
  info: 'info',
  warning: 'warning',
};

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ variant = 'neutral', label, children, ...props }, ref) => {
    return (
      <MuiChip
        ref={ref}
        label={label ?? children}
        color={colorMap[variant]}
        size="small"
        variant="filled"
        sx={{
          '&.MuiChip-colorDefault': {
            bgcolor: 'action.hover',
            color: 'text.secondary',
          },
        }}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';
