/**
 * Alert Dialog - W3C ARIA APG Pattern
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/
 */

import React, { useCallback } from 'react';

export interface AlertDialogProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

export const AlertDialog = React.forwardRef<HTMLDivElement, AlertDialogProps>(
  ({ children, open, onClose, ...props }, ref) => {
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
        }
      },
      [onClose]
    );

    if (!open) return null;

    return (
      <div
        ref={ref}
        role="alertdialog"
        aria-modal="true"
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AlertDialog.displayName = 'AlertDialog';
