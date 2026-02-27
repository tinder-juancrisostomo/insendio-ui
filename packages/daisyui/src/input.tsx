import React from 'react';
import { Input as BaseInput, type InputProps as BaseInputProps } from '@design-system/base';
import { cn } from '@design-system/utils';

export interface InputProps extends BaseInputProps {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, iconLeft, iconRight, ...props }, ref) => {
    if (iconLeft || iconRight) {
      return (
        <div className={cn('relative flex items-center', className)}>
          {iconLeft && <span className="absolute left-3 flex text-[var(--ds-text-muted)]">{iconLeft}</span>}
          <BaseInput
            ref={ref}
            className={cn(
              'input input-bordered w-full rounded-lg px-3 py-2 text-sm',
              'focus:outline-none focus:ring-2 focus:ring-[var(--ds-border-focus)]',
              iconLeft && 'pl-10',
              iconRight && 'pr-10',
              className
            )}
            {...props}
          />
          {iconRight && <span className="absolute right-3 flex text-[var(--ds-text-muted)]">{iconRight}</span>}
        </div>
      );
    }
    return (
      <BaseInput
        ref={ref}
        className={cn(
          'input input-bordered w-full rounded-lg px-3 py-2 text-sm',
          'focus:outline-none focus:ring-2 focus:ring-[var(--ds-border-focus)]',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
