import React from 'react';
import { createPortal } from 'react-dom';
import { AlertDialog as BaseAlertDialog, type AlertDialogProps as BaseAlertDialogProps } from '@design-system/base';
import { cn } from '@design-system/utils';

export const AlertDialog = React.forwardRef<HTMLDivElement, BaseAlertDialogProps>(
  ({ className, children, open, onClose, ...rest }, ref) => {
    if (open !== true) return null;
    return createPortal(
      <div className="fixed inset-0 z-[100] flex items-center justify-center">
        <div className="ds-dialog-overlay-enter fixed inset-0 bg-black/50" aria-hidden />
        <BaseAlertDialog
          ref={ref}
          open={open}
          onClose={onClose}
          className={cn(
            'ds-dialog-content-enter modal-box relative z-50 w-full max-w-md',
            className
          )}
          {...rest}
        >
          {children}
        </BaseAlertDialog>
      </div>,
      document.body
    );
  }
);

AlertDialog.displayName = 'AlertDialog';
