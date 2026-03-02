import React from 'react';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { cn } from '@design-system/utils';

export interface DisclosureProps {
  children: React.ReactNode;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
}

export function Disclosure({
  children,
  expanded,
  defaultExpanded = false,
  onExpandedChange,
}: DisclosureProps) {
  return (
    <CollapsiblePrimitive.Root
      open={expanded}
      defaultOpen={defaultExpanded}
      onOpenChange={onExpandedChange}
    >
      {children}
    </CollapsiblePrimitive.Root>
  );
}

export interface DisclosureTriggerProps
  extends React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger> {
  children: React.ReactNode;
}

export function DisclosureTrigger({ className, ...props }: DisclosureTriggerProps) {
  return (
    <CollapsiblePrimitive.Trigger
      className={cn(
        'flex w-full items-center justify-between rounded-md border border-[var(--ds-border-default)] bg-[var(--ds-bg-muted)] px-4 py-2 text-left font-medium',
        'hover:bg-[var(--ds-bg-muted)]/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-border-focus)]',
        className
      )}
      {...props}
    />
  );
}

export interface DisclosurePanelProps
  extends React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content> {
  children: React.ReactNode;
}

export function DisclosurePanel({ className, ...props }: DisclosurePanelProps) {
  return (
    <CollapsiblePrimitive.Content
      className={cn(
        'rounded-b-md border border-t-0 border-[var(--ds-border-default)] bg-[var(--ds-bg-surface)] px-4 py-3',
        className
      )}
      {...props}
    />
  );
}
