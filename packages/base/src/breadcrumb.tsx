/**
 * Breadcrumb - W3C ARIA APG Pattern
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/
 */

import React from 'react';

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  /** Accessible label for the breadcrumb */
  label?: string;
}

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ children, label = 'Breadcrumb', ...props }, ref) => (
    <nav ref={ref as React.Ref<HTMLDivElement>} aria-label={label} {...props}>
      <ol role="list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {children}
      </ol>
    </nav>
  )
);

Breadcrumb.displayName = 'Breadcrumb';

export interface BreadcrumbItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
}

export const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ children, ...props }, ref) => (
    <li ref={ref} {...props}>
      {children}
    </li>
  )
);

BreadcrumbItem.displayName = 'BreadcrumbItem';

export interface BreadcrumbLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
  current?: boolean;
}

export const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ children, href, current, ...props }, ref) => (
    <a
      ref={ref}
      href={href}
      aria-current={current ? 'page' : undefined}
      {...props}
    >
      {children}
    </a>
  )
);

BreadcrumbLink.displayName = 'BreadcrumbLink';
