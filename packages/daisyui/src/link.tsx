import React from 'react';
import { Link as BaseLink, type LinkProps as BaseLinkProps } from '@design-system/base';
import { cn } from '@design-system/utils';

export const Link = React.forwardRef<HTMLAnchorElement, BaseLinkProps>(
  ({ className, ...props }, ref) => (
    <BaseLink
      ref={ref}
      className={cn('link link-primary', className)}
      {...props}
    />
  )
);

Link.displayName = 'Link';
