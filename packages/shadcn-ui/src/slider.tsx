import React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@design-system/utils';

export interface SliderProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
  className?: string;
}

export const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
  (
    {
      value,
      defaultValue = 0,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      onChange,
      className,
      ...props
    },
    ref
  ) => {
    const valueArray = value !== undefined ? [value] : undefined;
    const defaultArray = defaultValue !== undefined ? [defaultValue] : [0];
    return (
      <SliderPrimitive.Root
        ref={ref}
        value={valueArray}
        defaultValue={defaultArray}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onValueChange={(v) => onChange?.(v[0] ?? 0)}
        className={cn(
          'relative flex w-full touch-none select-none items-center',
          'data-[disabled]:opacity-50',
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track
          className={cn(
            'relative h-2 w-full grow rounded-full bg-[var(--ds-bg-muted)]'
          )}
        >
          <SliderPrimitive.Range
            className={cn(
              'absolute h-full rounded-full bg-[var(--ds-text-link)]'
            )}
          />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className={cn(
            'block h-5 w-5 rounded-full border border-[var(--ds-border-default)] bg-[var(--ds-bg-surface)] shadow-sm',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-border-focus)]',
            'disabled:pointer-events-none'
          )}
        />
      </SliderPrimitive.Root>
    );
  }
);

Slider.displayName = 'Slider';
