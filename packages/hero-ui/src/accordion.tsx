import {
  Accordion as BaseAccordion,
  AccordionItem as BaseAccordionItem,
  AccordionHeader as BaseAccordionHeader,
  AccordionPanel as BaseAccordionPanel,
  type AccordionProps as BaseAccordionProps,
  type AccordionItemProps as BaseAccordionItemProps,
  type AccordionHeaderProps as BaseAccordionHeaderProps,
  type AccordionPanelProps as BaseAccordionPanelProps,
} from '@design-system/base';
import { cn } from '@design-system/utils';


export function Accordion(props: BaseAccordionProps) {
  return <BaseAccordion className="w-full" {...props} />;
}

export function AccordionItem({ className, ...props }: BaseAccordionItemProps) {
  return <BaseAccordionItem className={cn('py-2', className)} {...props} />;
}

export function AccordionHeader({ className, ...props }: BaseAccordionHeaderProps) {
  return (
    <BaseAccordionHeader
      className={cn(
        'flex w-full cursor-pointer items-center justify-between rounded-md px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-[var(--ds-bg-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-border-focus)]',
        className
      )}
      {...props}
    />
  );
}

export function AccordionPanel({ className, ...props }: BaseAccordionPanelProps) {
  return <BaseAccordionPanel className={cn('pb-2 pt-0', className)} {...props} />;
}
