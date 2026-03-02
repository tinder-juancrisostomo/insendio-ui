import React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@design-system/utils';

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onClose?: () => void;
}

export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
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
          role="dialog"
          className={cn('modal-box relative', className)}
          {...props}
        >
          {children}
        </div>
      </div>,
      document.body
    );
  }
);
Dialog.displayName = 'Dialog';
