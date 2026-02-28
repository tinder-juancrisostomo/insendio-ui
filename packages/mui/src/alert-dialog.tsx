import * as React from 'react';
import MuiDialog from '@mui/material/Dialog';
import type { DialogProps as MuiDialogProps } from '@mui/material/Dialog';

export interface AlertDialogProps extends Omit<MuiDialogProps, 'open' | 'onClose'> {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

export const AlertDialog = React.forwardRef<HTMLDivElement, AlertDialogProps>(
  ({ open, onClose, children, ...props }, ref) => {
    const handleClose = React.useCallback(
      (_: object, reason: string) => {
        if (reason !== 'backdropClick') onClose();
      },
      [onClose]
    );
    return (
      <MuiDialog
        ref={ref}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: 3,
            minWidth: 320,
            maxWidth: 448,
          },
        }}
        {...props}
      >
        {children}
      </MuiDialog>
    );
  }
);

AlertDialog.displayName = 'AlertDialog';
