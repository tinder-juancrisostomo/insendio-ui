import React from 'react';
import type { SpaceToken } from './stack';

function spaceToCss(size: SpaceToken | string | undefined) {
  if (size === undefined) return undefined;
  if (typeof size === 'string') return size;
  if (size === 0) return '0px';
  return `var(--ds-space-${size})`;
}

export interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  axis?: 'horizontal' | 'vertical';
  size?: SpaceToken | string;
}

export const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(
  ({ axis = 'vertical', size = 3, style, ...props }, ref) => {
    const computedStyle: React.CSSProperties = {
      flexShrink: 0,
      width: axis === 'horizontal' ? spaceToCss(size) : 1,
      height: axis === 'vertical' ? spaceToCss(size) : 1,
      ...style,
    };
    return <div ref={ref} aria-hidden style={computedStyle} {...props} />;
  }
);

Spacer.displayName = 'Spacer';

