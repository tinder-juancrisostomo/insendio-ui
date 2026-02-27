import {
  Tabs as BaseTabs,
  TabList as BaseTabList,
  Tab as BaseTab,
  TabPanel as BaseTabPanel,
  type TabsProps as BaseTabsProps,
  type TabListProps as BaseTabListProps,
  type TabProps as BaseTabProps,
  type TabPanelProps as BaseTabPanelProps,
} from '@design-system/base';
import { cn } from '@design-system/utils';

export function Tabs(props: BaseTabsProps) {
  return <BaseTabs className="w-full" {...props} />;
}

export function TabList({ className, ...props }: BaseTabListProps) {
  return (
    <BaseTabList
      className={cn('inline-flex h-10 items-center justify-start rounded-md bg-[var(--ds-bg-muted)] p-1', className)}
      {...props}
    />
  );
}

export function Tab({ className, ...props }: BaseTabProps) {
  return (
    <BaseTab
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-border-focus)] disabled:pointer-events-none disabled:opacity-50',
        'data-[state=active]:bg-[var(--ds-bg-surface)] data-[state=active]:text-[var(--ds-text-primary)] data-[state=active]:shadow-sm',
        'aria-selected:bg-[var(--ds-bg-surface)] aria-selected:text-[var(--ds-text-primary)] aria-selected:shadow-sm',
        'text-[var(--ds-text-secondary)] hover:text-[var(--ds-text-primary)]',
        className
      )}
      {...props}
    />
  );
}

export function TabPanel({ className, ...props }: BaseTabPanelProps) {
  return (
    <BaseTabPanel
      className={cn('mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500', className)}
      {...props}
    />
  );
}
