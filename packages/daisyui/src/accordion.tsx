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
  return <BaseAccordion className={cn('collapse collapse-arrow', className)} {...props} />;
}

export function AccordionItem({ className, ...props }: BaseAccordionItemProps) {
  return <BaseAccordionItem className={cn('collapse', className)} {...props} />;
}

export function AccordionHeader({ className, ...props }: BaseAccordionHeaderProps) {
  return (
    <BaseAccordionHeader
      className={cn(
        'collapse-title flex w-full items-center justify-between font-medium focus:outline-none',
        className
      )}
      {...props}
    />
  );
}

export function AccordionPanel({ className, ...props }: BaseAccordionPanelProps) {
  return <BaseAccordionPanel className={cn('collapse-content', className)} {...props} />;
}
