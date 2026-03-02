import React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@design-system/utils';

export interface AlertDialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onClose?: () => void;
}

export const AlertDialog = React.forwardRef<HTMLDivElement, AlertDialogProps>(
  ({ open, onClose, className, children, ...props }, ref) => {
    if (open !== true) return null;
    return createPortal(
      <div className="modal modal-open">
        <div
          className="modal-backdrop bg-black/50"
          aria-hidden
          onClick={onClose}
        />
        <div
          ref={ref}
          role="alertdialog"
          className={cn('modal-box modal-bottom sm:modal-middle relative', className)}
          {...props}
        >
          {children}
        </div>
      </div>,
      document.body
    );
  }
);
AlertDialog.displayName = 'AlertDialog';
