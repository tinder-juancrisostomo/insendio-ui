import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '@design-system/utils';

export interface TooltipProps {
  children: React.ReactElement;
  content: React.ReactNode;
  delayDuration?: number;
  tooltipClassName?: string;
}

export function Tooltip({
  children,
  content,
  delayDuration = 300,
  tooltipClassName,
}: TooltipProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            sideOffset={5}
            className={cn(
              'z-50 overflow-hidden rounded-md bg-[var(--ds-text-primary)] px-2 py-1 text-xs text-[var(--ds-bg-surface)]',
              tooltipClassName
            )}
          >
            {content}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
