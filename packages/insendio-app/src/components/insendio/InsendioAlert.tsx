import { InfoIcon } from '@design-system/icons';
import { useInsendioComponents } from '../../components-context';
import { cn } from '@design-system/utils';

const alertStyles = {
  info:
    'border border-[#2196F3] bg-[#E8F0FE] text-[#1565C0] dark:bg-[#1A2F4A] dark:border-[#64B5F6] dark:text-[var(--ds-text-primary)]',
  success:
    'border border-[#2E7D32] bg-[#E8F5E9] text-[#1B5E20] dark:bg-[#1A3D1F] dark:border-[#4CAF50] dark:text-[var(--ds-text-primary)]',
  warning:
    'border border-[#E65100] bg-[#FFF3E0] text-[#E65100] dark:bg-[#4A3520] dark:border-[#FFB74D] dark:text-[var(--ds-text-primary)]',
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
        <InfoIcon size={20} className="text-[#1565C0] dark:text-[var(--ds-text-link)]" />
        {children}
      </Inline>
    </InsendioAlert>
  );
}
