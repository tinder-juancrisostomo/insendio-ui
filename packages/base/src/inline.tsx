import React from 'react';
import { Stack, type StackProps } from './stack';

export interface InlineProps extends Omit<StackProps, 'direction'> {}

export const Inline = React.forwardRef<HTMLDivElement, InlineProps>((props, ref) => {
  return <Stack ref={ref} direction="horizontal" {...props} />;
});

Inline.displayName = 'Inline';

