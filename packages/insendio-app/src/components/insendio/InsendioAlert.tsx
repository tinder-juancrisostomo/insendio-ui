import { InfoIcon } from '@design-system/icons';
import { useInsendioComponents } from '../../components-context';
import { cn } from '@design-system/utils';

const alertStyles = {
  info: 'border border-[#2196F3] bg-[#E8F0FE]',
  success: 'border border-[#2E7D32] bg-[#E8F5E9]',
} as const;

export type InsendioAlertVariant = keyof typeof alertStyles;

export interface InsendioAlertProps {
  variant: InsendioAlertVariant;
  children: React.ReactNode;
  className?: string;
}

/**
 * Specialized Alert: wraps generic Alert with Insendio info/success styling.
 * Uses containment – children populate the alert content (e.g. icon + text).
 */
export function InsendioAlert({ variant, children, className }: InsendioAlertProps) {
  const { Alert } = useInsendioComponents();
  return (
    <Alert
      variant="default"
      className={cn(alertStyles[variant], className)}
    >
      {children}
    </Alert>
  );
}

export interface InsendioInfoAlertProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Specialized InfoAlert: InsendioAlert with info variant + InfoIcon.
 * Convenience for the common "info message with icon" pattern.
 */
export function InsendioInfoAlert({ children, className }: InsendioInfoAlertProps) {
  const { Inline } = useInsendioComponents();
  return (
    <InsendioAlert variant="info" className={className}>
      <Inline gap={2} align="center">
        <InfoIcon size={20} className="text-[#1565C0]" />
        {children}
      </Inline>
    </InsendioAlert>
  );
}
