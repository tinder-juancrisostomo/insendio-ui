import { cn } from '@design-system/utils';

export interface InsendioListProps {
  children: React.ReactNode;
  className?: string;
  /** Gap between items (default: 2 = 0.5rem) */
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

const gapToClass: Record<number, string> = {
  0: 'gap-0',
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  5: 'gap-5',
  6: 'gap-6',
};

/**
 * Semantic list container: uses <ul> for accessibility.
 * Screen readers announce list structure and item count.
 */
export function InsendioList({ children, className, gap = 2 }: InsendioListProps) {
  return (
    <ul
      role="list"
      className={cn('flex flex-col list-none m-0 p-0', gapToClass[gap], className)}
    >
      {children}
    </ul>
  );
}

export interface InsendioListItemProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Semantic list item: uses <li> for accessibility.
 */
export function InsendioListItem({ children, className }: InsendioListItemProps) {
  return <li className={cn('list-none', className)}>{children}</li>;
}
