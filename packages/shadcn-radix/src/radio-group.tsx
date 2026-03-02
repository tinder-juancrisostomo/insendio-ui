import React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '@design-system/utils';

export interface RadioGroupProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>, 'onValueChange'> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export function RadioGroup({ className, ...props }: RadioGroupProps) {
  return (
    <RadioGroupPrimitive.Root
      className={cn('space-y-2', className)}
      {...props}
    />
  );
}

export interface RadioProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>, 'value'> {
  value: string;
  label?: React.ReactNode;
  wrapperClassName?: string;
}

export function Radio({ value, label, wrapperClassName, className, ...props }: RadioProps) {
  return (
    <div className={cn('flex items-center gap-2', wrapperClassName)}>
      <RadioGroupPrimitive.Item
        value={value}
        id={props.id ?? `radio-${value}`}
        className={cn(
          'aspect-square h-4 w-4 rounded-full border border-[var(--ds-border-default)] bg-[var(--ds-bg-surface)]',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-border-focus)]',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'data-[state=checked]:border-[var(--ds-text-link)]',
          className
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="relative flex h-full w-full items-center justify-center after:block after:h-2.5 after:w-2.5 after:rounded-full after:bg-[var(--ds-text-link)]" />
      </RadioGroupPrimitive.Item>
      {label && (
        <label
          htmlFor={props.id ?? `radio-${value}`}
          className="cursor-pointer text-sm"
        >
          {label}
        </label>
      )}
    </div>
  );
}
