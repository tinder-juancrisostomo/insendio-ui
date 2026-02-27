import React from 'react';
import { Slider as BaseSlider, type SliderProps as BaseSliderProps } from '@design-system/base';
import { cn } from '@design-system/utils';

export const Slider = React.forwardRef<HTMLDivElement, BaseSliderProps>(
  ({ className, ...props }, ref) => (
    <BaseSlider
      ref={ref}
      className={cn(
        'relative flex h-6 w-full touch-none items-center',
        'before:block before:h-2 before:w-full before:rounded-full before:bg-gray-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500',
        'aria-disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
);

Slider.displayName = 'Slider';
