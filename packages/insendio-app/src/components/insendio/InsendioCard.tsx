import { useInsendioComponents } from '../../components-context';
import { cn } from '@design-system/utils';

export interface InsendioCardProps {
  children: React.ReactNode;
  className?: string;
  /** 'default' = surface bg (theme-aware), 'surface' = same */
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
        (variant === 'default' || variant === 'surface') && 'bg-[var(--ds-bg-surface)]',
        className
      )}
    >
      {children}
    </Box>
  );
}
