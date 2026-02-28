import React from 'react';
import { createPortal } from 'react-dom';
import { Dialog as BaseDialog, type DialogProps as BaseDialogProps } from '@design-system/base';
import { cn } from '@design-system/utils';

export const Dialog = React.forwardRef<HTMLDivElement, BaseDialogProps>(
  ({ open, onClose, className, ...props }, ref) => {
    if (open !== true) return null;
    return createPortal(
      <div className="fixed inset-0 z-[100] flex items-center justify-center">
        <div
          className="ds-dialog-overlay-enter fixed inset-0 bg-black/50"
          aria-hidden
          onClick={onClose}
        />
        <BaseDialog
          ref={ref}
          open={open}
          className={cn(
            'ds-dialog-content-enter modal-box relative z-50 w-full max-w-lg',
            className
          )}
          onClose={onClose}
          {...props}
        />
      </div>,
      document.body
    );
  }
);

Dialog.displayName = 'Dialog';
