import * as React from 'react';
import MuiAlert from '@mui/material/Alert';
import type { AlertProps as MuiAlertProps } from '@mui/material/Alert';

export interface AlertProps extends Omit<MuiAlertProps, 'severity' | 'variant'> {
  children: React.ReactNode;
  /** Design system variant - maps to MUI severity */
  variant?: 'default' | 'destructive' | 'success';
  type?: 'polite' | 'assertive';
}

const severityMap = {
  default: 'info' as const,
  destructive: 'error' as const,
  success: 'success' as const,
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = 'default', type = 'polite', children, ...props }, ref) => {
    return (
      <MuiAlert
        ref={ref}
        severity={severityMap[variant]}
        role="alert"
        aria-live={type}
        aria-atomic
        {...props}
      >
        {children}
      </MuiAlert>
    );
  }
);

Alert.displayName = 'Alert';
