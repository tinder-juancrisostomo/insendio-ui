import {
  Disclosure as BaseDisclosure,
  DisclosureTrigger as BaseDisclosureTrigger,
  DisclosurePanel as BaseDisclosurePanel,
  type DisclosureProps as BaseDisclosureProps,
  type DisclosureTriggerProps as BaseDisclosureTriggerProps,
  type DisclosurePanelProps as BaseDisclosurePanelProps,
} from '@design-system/base';
import { cn } from '@design-system/utils';

export function Disclosure(props: BaseDisclosureProps) {
  return <BaseDisclosure {...props} />;
}

export function DisclosureTrigger({ className, ...props }: BaseDisclosureTriggerProps) {
  return (
    <BaseDisclosureTrigger
      className={cn(
        'flex w-full items-center justify-between rounded-md border border-gray-200 bg-gray-50 px-4 py-2 text-left font-medium hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500',
        className
      )}
      {...props}
    />
  );
}

export function DisclosurePanel({ className, ...props }: BaseDisclosurePanelProps) {
  return (
    <BaseDisclosurePanel
      className={cn('rounded-b-md border border-t-0 border-gray-200 bg-white px-4 py-3', className)}
      {...props}
    />
  );
}
