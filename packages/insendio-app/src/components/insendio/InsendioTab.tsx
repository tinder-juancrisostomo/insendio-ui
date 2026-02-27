import { useInsendioComponents } from '../../components-context';
import { cn } from '@design-system/utils';

const tabThemes = {
  purple: 'data-[state=active]:border-[#7B1FA2] data-[state=active]:text-[#7B1FA2]',
  sky: 'hover:text-[var(--ds-text-primary)] data-[state=active]:border-sky-500 data-[state=active]:text-sky-600 data-[state=active]:font-semibold',
  blue: 'data-[state=active]:border-[#2196F3] data-[state=active]:text-[#1565C0]',
} as const;

export type InsendioTabTheme = keyof typeof tabThemes;

export interface InsendioTabProps {
  id: string;
  children: React.ReactNode;
  theme?: InsendioTabTheme;
  className?: string;
}

/**
 * Specialized Tab: wraps generic Tab with Insendio tab styling.
 * Theme variants: purple (default), sky, blue.
 */
export function InsendioTab({ id, children, theme = 'purple', className }: InsendioTabProps) {
  const { Tab } = useInsendioComponents();
  return (
    <Tab
      id={id}
      className={cn(
        'px-4 py-3 text-sm font-medium border-b-2 border-transparent -mb-px flex items-center gap-2 transition-colors',
        tabThemes[theme],
        className
      )}
    >
      {children}
    </Tab>
  );
}

export interface InsendioTabListProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Specialized TabList: wraps generic TabList with standard Insendio styling.
 */
export function InsendioTabList({ children, className }: InsendioTabListProps) {
  const { TabList } = useInsendioComponents();
  return (
    <TabList
      className={cn('flex gap-1 border-b border-[var(--ds-border-default)] pb-0', className)}
    >
      {children}
    </TabList>
  );
}
