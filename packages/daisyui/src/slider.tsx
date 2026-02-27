import React from 'react';
import { Slider as BaseSlider, type SliderProps as BaseSliderProps } from '@design-system/base';
import { cn } from '@design-system/utils';

export const Slider = React.forwardRef<HTMLDivElement, BaseSliderProps>(
  ({ className, ...props }, ref) => (
    <BaseSlider
      ref={ref}
      className={cn(
        'relative flex h-6 w-full touch-none items-center',
        'rounded-full bg-base-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        'aria-disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
);

Slider.displayName = 'Slider';
