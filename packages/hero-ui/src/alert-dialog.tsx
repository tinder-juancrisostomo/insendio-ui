import * as React from 'react';
import { Modal, ModalContent, ModalBody } from '@heroui/react';

export interface AlertDialogProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  className?: string;
}

export const AlertDialog = React.forwardRef<HTMLDivElement, AlertDialogProps>(
  ({ open, onClose, children, className, ...props }, ref) => {
    return (
      <Modal
        ref={ref}
        isOpen={open}
        onClose={onClose}
        isDismissable={false}
        hideCloseButton={false}
        classNames={{
          base: className,
        }}
        {...props}
      >
        <ModalContent>
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    );
  }
);

AlertDialog.displayName = 'AlertDialog';
