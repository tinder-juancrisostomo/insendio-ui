import React from 'react';
import { Input as DaisyInput } from 'react-daisyui';
import { cn } from '@design-system/utils';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'color'> {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, iconLeft, iconRight, ...props }, ref) => {
    if (iconLeft || iconRight) {
      return (
        <div className={cn('relative flex items-center', className)}>
          {iconLeft && (
            <span className="absolute left-3 flex text-base-content/50 pointer-events-none">
              {iconLeft}
            </span>
          )}
          <DaisyInput
            ref={ref}
            className={cn(
              'input-bordered w-full',
              iconLeft && 'pl-10',
              iconRight && 'pr-10',
              className
            )}
            {...props}
          />
          {iconRight && (
            <span className="absolute right-3 flex text-base-content/50 pointer-events-none">
              {iconRight}
            </span>
          )}
        </div>
      );
    }
    return (
      <DaisyInput
        ref={ref}
        className={cn('input-bordered w-full', className)}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';
