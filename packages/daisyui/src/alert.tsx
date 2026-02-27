import React from 'react';
import { Alert as BaseAlert, type AlertProps as BaseAlertProps } from '@design-system/base';
import { cn } from '@design-system/utils';

export interface AlertProps extends BaseAlertProps {
  variant?: 'default' | 'destructive' | 'success';
}

const variantClasses = {
  default: 'alert alert-info',
  destructive: 'alert alert-error',
  success: 'alert alert-success',
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', children, ...rest }, ref) => (
    <BaseAlert
      ref={ref}
      className={cn(variantClasses[variant], className)}
      {...rest}
    >
      {children}
    </BaseAlert>
  )
);

Alert.displayName = 'Alert';
