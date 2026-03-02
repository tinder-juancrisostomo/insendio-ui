import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '@design-system/utils';

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  'aria-labelledby'?: string;
  'aria-label'?: string;
}

export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  ({ open, onClose, className, children, ...props }, ref) => (
    <DialogPrimitive.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-black/50" />
        <DialogPrimitive.Content
          ref={ref}
          className={cn(
            'fixed left-[50%] top-[50%] z-[100] w-full max-w-lg translate-x-[-50%] translate-y-[-50%] rounded-lg border border-[var(--ds-border-default)] bg-[var(--ds-bg-surface)] p-6 shadow-lg',
            className
          )}
          {...props}
        >
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
);

Dialog.displayName = 'Dialog';
