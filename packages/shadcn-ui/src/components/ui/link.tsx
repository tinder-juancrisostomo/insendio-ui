import * as React from 'react';
import { cn } from '@design-system/utils';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'default' | 'muted';
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        'text-[var(--ds-text-link)] underline-offset-4 hover:underline',
        variant === 'muted' && 'text-[var(--ds-text-muted)]',
        className
      )}
      {...props}
    />
  )
);
Link.displayName = 'Link';

export { Link };
