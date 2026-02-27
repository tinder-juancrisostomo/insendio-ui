/**
 * Badge - Status/tag display component
 */

import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (props, ref) => <span ref={ref} {...props} />
);

Badge.displayName = 'Badge';
