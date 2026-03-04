import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@design-system/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--ds-border-focus)] focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-[var(--ds-bg-muted)] text-[var(--ds-text-primary)]',
        secondary:
          'border-transparent bg-[var(--ds-bg-muted)] text-[var(--ds-text-secondary)]',
        destructive:
          'border-transparent bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
        outline: 'text-[var(--ds-text-primary)]',
        active: 'border-transparent bg-[#E8F5E9] text-[#2E7D32]',
        inactive: 'border-transparent bg-[#F3E5F5] text-[#7B1FA2]',
        draft: 'border-transparent bg-[#F5F5F5] text-[#616161]',
        scheduled: 'border-transparent bg-[#E3F2FD] text-[#1565C0]',
        paused: 'border-transparent bg-[#FFF3E0] text-[#D48806]',
        neutral: 'border-transparent bg-[#F0F0F0] text-[#555555]',
        success: 'border-transparent bg-[#E8F5E9] text-[#2E7D32]',
        info: 'border-transparent bg-[#E3F2FD] text-[#1565C0]',
        warning: 'border-transparent bg-[#FFF3E0] text-[#D48806]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
);
Badge.displayName = 'Badge';

export { Badge, badgeVariants };
