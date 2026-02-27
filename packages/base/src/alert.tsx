/**
 * Alert - W3C ARIA APG Pattern
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/alert/
 */

import React from 'react';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Alert type affects semantics */
  type?: 'polite' | 'assertive';
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ children, type = 'polite', ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      aria-live={type}
      aria-atomic="true"
      {...props}
    >
      {children}
    </div>
  )
);

Alert.displayName = 'Alert';
