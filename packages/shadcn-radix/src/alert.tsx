import React from 'react';
import { Alert as BaseAlert, type AlertProps as BaseAlertProps } from '@design-system/base';
import { cn } from '@design-system/utils';

export interface AlertProps extends BaseAlertProps {
  variant?: 'default' | 'destructive' | 'success';
}

const variantClasses = {
  default: 'rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900',
  destructive: 'rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-900',
  success: 'rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-900',
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
