/**
 * Adapter: maps Insendio API to shadcn Input from src/components/ui/input
 */
import React from 'react';
import { Input as ShadcnInput } from './components/ui/input';
import { cn } from '@design-system/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, iconLeft, iconRight, ...props }, ref) => {
    if (iconLeft || iconRight) {
      return (
        <div className={cn('relative flex items-center', className)}>
          {iconLeft && (
            <span className="absolute left-3 flex text-[var(--ds-text-muted)]">
              {iconLeft}
            </span>
          )}
          <ShadcnInput
            ref={ref}
            className={cn(iconLeft && 'pl-10', iconRight && 'pr-10')}
            {...props}
          />
          {iconRight && (
            <span className="absolute right-3 flex text-[var(--ds-text-muted)]">
              {iconRight}
            </span>
          )}
        </div>
      );
    }
    return <ShadcnInput ref={ref} className={className} {...props} />;
  }
);

Input.displayName = 'Input';
