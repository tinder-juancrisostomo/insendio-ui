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

export function Accordion({ className, ...props }: BaseAccordionProps) {
  return <BaseAccordion className={cn('divide-y divide-gray-200', className)} {...props} />;
}

export function AccordionItem({ className, ...props }: BaseAccordionItemProps) {
  return <BaseAccordionItem className={cn('py-2', className)} {...props} />;
}

export function AccordionHeader({ className, ...props }: BaseAccordionHeaderProps) {
  return (
    <BaseAccordionHeader
      className={cn(
        'flex w-full items-center justify-between py-2 text-left font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
        className
      )}
      {...props}
    />
  );
}

export function AccordionPanel({ className, ...props }: BaseAccordionPanelProps) {
  return <BaseAccordionPanel className={cn('pb-2 pt-0', className)} {...props} />;
}
