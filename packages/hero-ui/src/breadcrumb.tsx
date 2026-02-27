import React from 'react';
import {
  Breadcrumb as BaseBreadcrumb,
  BreadcrumbItem as BaseBreadcrumbItem,
  BreadcrumbLink as BaseBreadcrumbLink,
  type BreadcrumbProps as BaseBreadcrumbProps,
  type BreadcrumbItemProps as BaseBreadcrumbItemProps,
  type BreadcrumbLinkProps as BaseBreadcrumbLinkProps,
} from '@design-system/base';
import { cn } from '@design-system/utils';

export const Breadcrumb = React.forwardRef<HTMLElement, BaseBreadcrumbProps>(
  ({ className, children, ...rest }, ref) => (
    <BaseBreadcrumb
      ref={ref as React.Ref<HTMLDivElement>}
      className={cn('text-sm text-gray-600', className)}
      {...rest}
    >
      {children}
    </BaseBreadcrumb>
  )
);
Breadcrumb.displayName = 'Breadcrumb';

export const BreadcrumbItem = React.forwardRef<HTMLLIElement, BaseBreadcrumbItemProps>(
  ({ className, children, ...rest }, ref) => (
    <BaseBreadcrumbItem
      ref={ref}
      className={cn('inline-flex items-center gap-1', className)}
      {...rest}
    >
      {children}
    </BaseBreadcrumbItem>
  )
);
BreadcrumbItem.displayName = 'BreadcrumbItem';

export const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BaseBreadcrumbLinkProps>(
  ({ className, children, href, ...rest }, ref) => (
    <BaseBreadcrumbLink
      ref={ref}
      href={href}
      className={cn(
        'text-purple-600 hover:underline aria-[current=page]:font-medium aria-[current=page]:text-gray-900',
        className
      )}
      {...rest}
    >
      {children}
    </BaseBreadcrumbLink>
  )
);
BreadcrumbLink.displayName = 'BreadcrumbLink';
