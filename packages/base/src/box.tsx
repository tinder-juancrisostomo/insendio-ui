import React from 'react';

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const Box = React.forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  return <div ref={ref} {...props} />;
});

Box.displayName = 'Box';

