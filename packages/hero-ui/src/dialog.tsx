import * as React from 'react';
import { Modal, ModalContent, ModalBody } from '@heroui/react';

export interface DialogProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  className?: string;
  'aria-labelledby'?: string;
  'aria-label'?: string;
}

export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  ({ open, onClose, children, className, ...props }, ref) => {
    return (
      <Modal
        ref={ref}
        isOpen={open}
        onClose={onClose}
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

Dialog.displayName = 'Dialog';
