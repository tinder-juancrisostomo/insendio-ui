import React from 'react';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
  /** Horizontal padding for the container (CSS length). Defaults to token spacing. */
  paddingX?: string;
  children?: React.ReactNode;
}

const maxWidthBySize: Record<Exclude<ContainerSize, 'full'>, string> = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
};

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ size = 'lg', paddingX = 'var(--ds-space-4)', style, ...props }, ref) => {
    const computedStyle: React.CSSProperties = {
      width: '100%',
      marginInline: 'auto',
      paddingInline: paddingX,
      ...(size === 'full' ? null : { maxWidth: maxWidthBySize[size] }),
      ...style,
    };
    return <div ref={ref} style={computedStyle} {...props} />;
  }
);

Container.displayName = 'Container';

