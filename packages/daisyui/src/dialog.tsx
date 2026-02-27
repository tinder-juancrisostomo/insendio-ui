import React from 'react';
import { Dialog as BaseDialog, type DialogProps as BaseDialogProps } from '@design-system/base';
import { cn } from '@design-system/utils';

export const Dialog = React.forwardRef<HTMLDivElement, BaseDialogProps>(
  ({ className, ...props }, ref) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" aria-hidden />
      <BaseDialog
        ref={ref}
        className={cn(
          'modal-box relative z-50 w-full max-w-lg',
          className
        )}
        {...props}
      />
    </div>
  )
);

Dialog.displayName = 'Dialog';
