import React from 'react';
import type { SpaceToken } from './stack';

function spaceToCss(gap: SpaceToken | string | undefined) {
  if (gap === undefined) return undefined;
  if (typeof gap === 'string') return gap;
  if (gap === 0) return '0px';
  return `var(--ds-space-${gap})`;
}

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: number;
  gap?: SpaceToken | string;
  minColumnWidth?: string;
  children?: React.ReactNode;
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ columns = 3, gap = 3, minColumnWidth, style, ...props }, ref) => {
    const computedStyle: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: minColumnWidth
        ? `repeat(auto-fit, minmax(${minColumnWidth}, 1fr))`
        : `repeat(${Math.max(1, columns)}, minmax(0, 1fr))`,
      gap: spaceToCss(gap),
      ...style,
    };
    return <div ref={ref} style={computedStyle} {...props} />;
  }
);

Grid.displayName = 'Grid';

