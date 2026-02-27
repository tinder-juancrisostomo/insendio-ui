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
  return <BaseTabs className="tabs w-full" {...props} />;
}

export function TabList({ className, ...props }: BaseTabListProps) {
  return (
    <BaseTabList
      className={cn('tabs-boxed tabs', className)}
      {...props}
    />
  );
}

export function Tab({ className, ...props }: BaseTabProps) {
  return (
    <BaseTab
      className={cn(
        'tab',
        'focus-visible:outline-none',
        'disabled:pointer-events-none disabled:opacity-50',
        'data-[state=active]:tab-active aria-selected:tab-active',
        className
      )}
      {...props}
    />
  );
}

export function TabPanel({ className, ...props }: BaseTabPanelProps) {
  return (
    <BaseTabPanel
      className={cn('mt-2 focus-visible:outline-none', className)}
      {...props}
    />
  );
}
