import React from 'react';
import { AlertDialog as BaseAlertDialog, type AlertDialogProps as BaseAlertDialogProps } from '@design-system/base';
import { cn } from '@design-system/utils';

export const AlertDialog = React.forwardRef<HTMLDivElement, BaseAlertDialogProps>(
  ({ className, children, open, onClose, ...rest }, ref) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" aria-hidden />
      <BaseAlertDialog
        ref={ref}
        open={open}
        onClose={onClose}
        className={cn(
          'relative z-50 w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-lg',
          className
        )}
        {...rest}
      >
        {children}
      </BaseAlertDialog>
    </div>
  )
);

AlertDialog.displayName = 'AlertDialog';
