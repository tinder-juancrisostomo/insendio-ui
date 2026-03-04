/**
 * Adapter: maps Insendio API to shadcn Link from src/components/ui/link
 */
import React from 'react';
import { Link as ShadcnLink } from './components/ui/link';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'default' | 'muted';
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => <ShadcnLink ref={ref} {...props} />
);

Link.displayName = 'Link';
