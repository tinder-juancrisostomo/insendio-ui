import React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '@design-system/utils';

export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: React.ReactNode;
}

export const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitive.Root>, SwitchProps>(
  ({ className, checked, onCheckedChange, label, ...props }, ref) => (
    <div className="inline-flex items-center gap-2">
      <SwitchPrimitive.Root
        ref={ref}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className={cn(
          'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-[var(--ds-bg-muted)] transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-border-focus)] focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'data-[state=checked]:bg-[var(--ds-text-link)]',
          className
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            'pointer-events-none block h-5 w-5 shrink-0 rounded-full bg-white shadow ring-0 transition-transform',
            'translate-x-0.5 data-[state=checked]:translate-x-5'
          )}
        />
      </SwitchPrimitive.Root>
      {label && <label className="cursor-pointer text-sm">{label}</label>}
    </div>
  )
);

Switch.displayName = 'Switch';
