import React from 'react';
import { Switch as BaseSwitch, type SwitchProps as BaseSwitchProps } from '@design-system/base';
import { cn } from '@design-system/utils';

const thumb = (
  <span
    className="pointer-events-none block h-5 w-5 shrink-0 rounded-full bg-white shadow ring-0 transition-transform translate-x-0.5 group-aria-[checked=true]:translate-x-5"
    aria-hidden
  />
);

export const Switch = React.forwardRef<HTMLButtonElement, BaseSwitchProps>(
  ({ className, ...props }, ref) => (
    <BaseSwitch
      ref={ref}
      className={cn(
        'group relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-base-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 aria-checked:bg-primary',
        className
      )}
      {...props}
    >
      {thumb}
    </BaseSwitch>
  )
);

Switch.displayName = 'Switch';
