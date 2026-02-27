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
        'collapse-title flex w-full items-center justify-between rounded-t-box border border-base-300 bg-base-200 px-4 py-2 text-left font-medium hover:bg-base-300 focus:outline-none',
        className
      )}
      {...props}
    />
  );
}

export function DisclosurePanel({ className, ...props }: BaseDisclosurePanelProps) {
  return (
    <BaseDisclosurePanel
      className={cn('collapse-content rounded-b-box border border-t-0 border-base-300 bg-base-100 px-4 py-3', className)}
      {...props}
    />
  );
}
