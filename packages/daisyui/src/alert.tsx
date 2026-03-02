import React from 'react';
import { Alert as DaisyAlert } from 'react-daisyui';
import { cn } from '@design-system/utils';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive' | 'success';
}

const variantToStatus: Record<NonNullable<AlertProps['variant']>, string> = {
  default: 'info',
  destructive: 'error',
  success: 'success',
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', children, ...rest }, ref) => (
    <DaisyAlert
      ref={ref}
      status={variantToStatus[variant] as any}
      className={cn(className)}
      {...rest}
    >
      {children}
    </DaisyAlert>
  )
);
Alert.displayName = 'Alert';
