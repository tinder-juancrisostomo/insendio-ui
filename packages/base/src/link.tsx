/**
 * Link - W3C ARIA APG Pattern
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/link/
 */

import React from 'react';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
  /** Indicates current page for nav links */
  current?: boolean | 'page' | 'step' | 'location' | 'date' | 'time';
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, href, current, ...props }, ref) => (
    <a ref={ref} href={href} aria-current={current} {...props}>
      {children}
    </a>
  )
);

Link.displayName = 'Link';
