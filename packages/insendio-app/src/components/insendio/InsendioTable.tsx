import { useInsendioComponents } from '../../components-context';
import { cn } from '@design-system/utils';

export interface InsendioTableProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Reusable table container: wraps Table with InsendioCard styling.
 * Use for all data tables across the app for consistent appearance and dark mode support.
 */
export function InsendioTable({ children, className }: InsendioTableProps) {
  const { Box } = useInsendioComponents();
  return (
    <Box
      className={cn(
        'w-full min-w-0 rounded-xl border border-[var(--ds-border-default)] bg-[var(--ds-bg-surface)] shadow-sm overflow-x-auto',
        className
      )}
    >
      {children}
    </Box>
  );
}
