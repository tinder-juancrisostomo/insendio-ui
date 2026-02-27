import React from 'react';
import type { IconProps } from './types';

export function createIcon(
  displayName: string,
  path: React.ReactNode,
  viewBox = '0 0 24 24'
) {
  const Icon = React.forwardRef<SVGSVGElement, IconProps>(
    ({ size = 24, className, ...props }, ref) => (
      <svg
        ref={ref}
        viewBox={viewBox}
        width={size}
        height={size}
        fill="currentColor"
        className={className}
        {...props}
      >
        {path}
      </svg>
    )
  );
  Icon.displayName = displayName;
  return Icon;
}
