import React from 'react';

export interface CenterProps extends React.HTMLAttributes<HTMLDivElement> {
  inline?: boolean;
  children?: React.ReactNode;
}

export const Center = React.forwardRef<HTMLDivElement, CenterProps>(
  ({ inline = false, style, ...props }, ref) => {
    const computedStyle: React.CSSProperties = {
      display: inline ? 'inline-flex' : 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...style,
    };
    return <div ref={ref} style={computedStyle} {...props} />;
  }
);

Center.displayName = 'Center';

