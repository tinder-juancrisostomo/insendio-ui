import React from 'react';
import { Link as BaseLink, type LinkProps as BaseLinkProps } from '@design-system/base';
import { cn } from '@design-system/utils';

export const Link = React.forwardRef<HTMLAnchorElement, BaseLinkProps>(
  ({ className, ...props }, ref) => (
    <BaseLink
      ref={ref}
      className={cn('text-purple-600 underline-offset-4 hover:underline', className)}
      {...props}
    />
  )
);

Link.displayName = 'Link';
