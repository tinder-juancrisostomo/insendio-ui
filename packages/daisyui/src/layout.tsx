import React from 'react';

export type SpaceToken = 0 | 1 | 2 | 3 | 4 | 5 | 6;

function spaceToCss(gap: SpaceToken | string | undefined) {
  if (gap === undefined) return undefined;
  if (typeof gap === 'string') return gap;
  if (gap === 0) return '0px';
  return `var(--ds-space-${gap})`;
}

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const Box = React.forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  return <div ref={ref} {...props} />;
});
Box.displayName = 'Box';

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'vertical' | 'horizontal';
  gap?: SpaceToken | string;
  align?: React.CSSProperties['alignItems'];
  justify?: React.CSSProperties['justifyContent'];
  wrap?: boolean;
  children?: React.ReactNode;
}

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      direction = 'vertical',
      gap = 3,
      align,
      justify,
      wrap = false,
      style,
      ...props
    },
    ref
  ) => {
    const computedStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: direction === 'vertical' ? 'column' : 'row',
      gap: spaceToCss(gap),
      alignItems: align,
      justifyContent: justify,
      flexWrap: wrap ? 'wrap' : undefined,
      ...style,
    };
    return <div ref={ref} style={computedStyle} {...props} />;
  }
);
Stack.displayName = 'Stack';

export interface InlineProps extends Omit<StackProps, 'direction'> {}

export const Inline = React.forwardRef<HTMLDivElement, InlineProps>((props, ref) => {
  return <Stack ref={ref} direction="horizontal" {...props} />;
});
Inline.displayName = 'Inline';
