import * as React from 'react';
import { Alert as HeroAlert } from '@heroui/react';
import type { AlertProps as HeroAlertProps } from '@heroui/react';

export interface AlertProps extends Omit<HeroAlertProps, 'variant' | 'color'> {
  children: React.ReactNode;
  variant?: 'default' | 'destructive' | 'success';
  type?: 'polite' | 'assertive';
}

const colorMap = {
  default: 'primary' as const,
  destructive: 'danger' as const,
  success: 'success' as const,
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = 'default', type = 'polite', children, ...props }, ref) => {
    return (
      <HeroAlert
        ref={ref}
        color={colorMap[variant]}
        role="alert"
        aria-live={type}
        aria-atomic
        {...props}
      >
        {children}
      </HeroAlert>
    );
  }
);

Alert.displayName = 'Alert';
