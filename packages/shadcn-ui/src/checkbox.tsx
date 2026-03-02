import React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from '@design-system/icons';
import { cn } from '@design-system/utils';

export interface CheckboxProps
  extends Omit<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, 'checked'> {
  checked?: boolean | 'indeterminate';
  onCheckedChange?: (checked: boolean) => void;
  label?: React.ReactNode;
}

export const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ checked = false, onCheckedChange, label, className, ...props }, ref) => {
    const isIndeterminate = checked === 'indeterminate';
    return (
      <div className="inline-flex items-center gap-2">
        <CheckboxPrimitive.Root
          ref={ref}
          checked={isIndeterminate ? 'indeterminate' : checked}
          onCheckedChange={(c) => {
            if (c === 'indeterminate') return;
            onCheckedChange?.(c === true);
          }}
          className={cn(
            'peer h-4 w-4 shrink-0 rounded border border-[var(--ds-border-default)] bg-[var(--ds-bg-surface)]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-border-focus)]',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'data-[state=checked]:bg-[var(--ds-text-link)] data-[state=checked]:border-[var(--ds-text-link)]',
            'data-[state=indeterminate]:bg-[var(--ds-text-link)] data-[state=indeterminate]:border-[var(--ds-text-link)]',
            className
          )}
          {...props}
        >
          <CheckboxPrimitive.Indicator className="flex items-center justify-center text-white">
            {isIndeterminate ? (
              <span className="h-0.5 w-2.5 bg-current" />
            ) : (
              <CheckIcon size={12} />
            )}
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        {label && (
          <label className="cursor-pointer text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
