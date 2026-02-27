import { useInsendioComponents } from '../../components-context';
import { cn } from '@design-system/utils';

export interface InsendioTableToolbarProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Toolbar container for table headers: search bar + action buttons.
 * White background, border with border-radius for consistent styling.
 */
export function InsendioTableToolbar({ children, className }: InsendioTableToolbarProps) {
  const { Box } = useInsendioComponents();
  return (
    <Box
      className={cn(
        'rounded-xl border border-[var(--ds-border-default)] bg-[var(--ds-bg-surface)] p-3 sm:p-4',
        className
      )}
    >
      {children}
    </Box>
  );
}
