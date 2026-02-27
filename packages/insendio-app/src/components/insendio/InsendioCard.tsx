import { useInsendioComponents } from '../../components-context';
import { cn } from '@design-system/utils';

export interface InsendioCardProps {
  children: React.ReactNode;
  className?: string;
  /** 'default' = white bg, 'surface' = ds-bg-surface */
  variant?: 'default' | 'surface';
}

/**
 * Specialized Card: wraps generic Box with Insendio card styling.
 * Uses containment – children populate the card content.
 */
export function InsendioCard({
  children,
  className,
  variant = 'default',
}: InsendioCardProps) {
  const { Box } = useInsendioComponents();
  return (
    <Box
      className={cn(
        'rounded-xl border border-[var(--ds-border-default)] shadow-sm',
        variant === 'default' && 'bg-white',
        variant === 'surface' && 'bg-[var(--ds-bg-surface)]',
        className
      )}
    >
      {children}
    </Box>
  );
}
