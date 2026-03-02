import React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@design-system/utils';

export interface TabsProps extends Omit<React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>, 'value' | 'defaultValue' | 'onValueChange'> {
  selectedId?: string;
  defaultSelectedId?: string;
  onSelectedChange?: (id: string) => void;
}

export function Tabs({
  selectedId,
  defaultSelectedId,
  onSelectedChange,
  children,
  className,
  ...props
}: TabsProps) {
  return (
    <TabsPrimitive.Root
      value={selectedId}
      defaultValue={defaultSelectedId}
      onValueChange={onSelectedChange}
      className={className}
      {...props}
    >
      {children}
    </TabsPrimitive.Root>
  );
}

export interface TabListProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {}

export function TabList({ className, ...props }: TabListProps) {
  return (
    <TabsPrimitive.List
      className={cn(
        'inline-flex h-10 items-center justify-start rounded-md bg-[var(--ds-bg-muted)] p-1',
        className
      )}
      {...props}
    />
  );
}

export interface TabProps extends Omit<React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>, 'id' | 'value'> {
  id: string;
}

export function Tab({ id, className, ...props }: TabProps) {
  return (
    <TabsPrimitive.Trigger
      value={id}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-border-focus)] disabled:pointer-events-none disabled:opacity-50',
        'data-[state=active]:bg-[var(--ds-bg-surface)] data-[state=active]:text-[var(--ds-text-primary)] data-[state=active]:shadow-sm',
        'text-[var(--ds-text-secondary)] hover:text-[var(--ds-text-primary)]',
        className
      )}
      {...props}
    />
  );
}

export interface TabPanelProps extends Omit<React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>, 'value' | 'forceMount'> {
  tabId: string;
  unmountWhenInactive?: boolean;
}

export function TabPanel({ tabId, unmountWhenInactive = true, className, ...props }: TabPanelProps) {
  return (
    <TabsPrimitive.Content
      value={tabId}
      forceMount={unmountWhenInactive ? undefined : true}
      className={cn('mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-border-focus)]', className)}
      {...props}
    />
  );
}
