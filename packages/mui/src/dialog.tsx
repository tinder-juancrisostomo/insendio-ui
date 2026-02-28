import * as React from 'react';
import MuiDialog from '@mui/material/Dialog';
import type { DialogProps as MuiDialogProps } from '@mui/material/Dialog';

export interface DialogProps extends Omit<MuiDialogProps, 'open' | 'onClose'> {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  ({ open, onClose, children, ...props }, ref) => {
    return (
      <MuiDialog
        ref={ref}
        open={open}
        onClose={onClose}
        slotProps={{
          backdrop: { onClick: onClose },
        }}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: 3,
          },
        }}
        {...props}
      >
        {children}
      </MuiDialog>
    );
  }
);

Dialog.displayName = 'Dialog';
