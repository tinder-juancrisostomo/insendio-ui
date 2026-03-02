import React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { cn } from '@design-system/utils';

export interface AlertDialogProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

export const AlertDialog = React.forwardRef<HTMLDivElement, AlertDialogProps>(
  ({ open, onClose, className, children, ...props }, ref) => (
    <AlertDialogPrimitive.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <AlertDialogPrimitive.AlertDialogPortal>
        <AlertDialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-black/50" />
        <AlertDialogPrimitive.AlertDialogContent
          ref={ref}
          className={cn(
            'fixed left-[50%] top-[50%] z-[100] w-full max-w-md translate-x-[-50%] translate-y-[-50%] rounded-lg border border-[var(--ds-border-default)] bg-[var(--ds-bg-surface)] p-6 shadow-lg',
            className
          )}
          {...props}
        >
          {children}
        </AlertDialogPrimitive.AlertDialogContent>
      </AlertDialogPrimitive.AlertDialogPortal>
    </AlertDialogPrimitive.Root>
  )
);

AlertDialog.displayName = 'AlertDialog';
