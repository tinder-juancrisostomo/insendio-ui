/**
 * Adapter: maps Insendio API to shadcn Alert from src/components/ui/alert
 */
import React from 'react';
import { Alert as ShadcnAlert } from './components/ui/alert';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive' | 'success';
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (props, ref) => <ShadcnAlert ref={ref} {...props} />
);

Alert.displayName = 'Alert';
