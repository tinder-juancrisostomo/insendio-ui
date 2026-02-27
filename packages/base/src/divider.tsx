import React from 'react';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  thickness?: number;
}

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ orientation = 'horizontal', thickness = 1, style, ...props }, ref) => {
    const computedStyle: React.CSSProperties = {
      backgroundColor: 'var(--ds-border-default)',
      ...(orientation === 'horizontal'
        ? { height: thickness, width: '100%' }
        : { width: thickness, height: '100%' }),
      ...style,
    };
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        style={computedStyle}
        {...props}
      />
    );
  }
);

Divider.displayName = 'Divider';

