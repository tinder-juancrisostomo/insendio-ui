import React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cn } from '@design-system/utils';

export interface AccordionProps {
  children: React.ReactNode;
  className?: string;
  allowMultiple?: boolean;
  defaultExpanded?: string[];
}

export function Accordion({
  allowMultiple = false,
  defaultExpanded = [],
  className,
  children,
}: AccordionProps) {
  const multiValue = defaultExpanded;
  const singleValue = defaultExpanded[0] ?? '';
  return allowMultiple ? (
    <AccordionPrimitive.Root
      type="multiple"
      defaultValue={multiValue}
      className={cn('divide-y divide-[var(--ds-border-default)]', className)}
    >
      {children}
    </AccordionPrimitive.Root>
  ) : (
    <AccordionPrimitive.Root
      type="single"
      defaultValue={singleValue}
      collapsible
      className={cn('divide-y divide-[var(--ds-border-default)]', className)}
    >
      {children}
    </AccordionPrimitive.Root>
  );
}

export interface AccordionItemProps extends Omit<React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>, 'value'> {
  id: string;
}

export function AccordionItem({ id, className, ...props }: AccordionItemProps) {
  return <AccordionPrimitive.Item value={id} className={cn('py-2', className)} {...props} />;
}

export interface AccordionHeaderProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
  id: string;
  panelId?: string;
}

export function AccordionHeader({ id, panelId, children, className, ...props }: AccordionHeaderProps) {
  return (
    <AccordionPrimitive.Header>
      <AccordionPrimitive.Trigger
        className={cn(
          'flex w-full items-center justify-between py-2 text-left font-medium transition-colors',
          'hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-border-focus)]',
          className
        )}
        {...props}
      >
        {children}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export interface AccordionPanelProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {
  id: string;
  headerId: string;
}

export function AccordionPanel({ id, headerId, className, ...props }: AccordionPanelProps) {
  return (
    <AccordionPrimitive.Content
      className={cn('overflow-hidden pb-2 pt-0', className)}
      {...props}
    />
  );
}
