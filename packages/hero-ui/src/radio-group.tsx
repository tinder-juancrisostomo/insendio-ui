import {
  RadioGroup as BaseRadioGroup,
  Radio as BaseRadio,
  type RadioGroupProps as BaseRadioGroupProps,
  type RadioProps as BaseRadioProps,
} from '@design-system/base';
import { cn } from '@design-system/utils';

export function RadioGroup({ className, ...props }: BaseRadioGroupProps) {
  return <BaseRadioGroup className={cn('space-y-2', className)} {...props} />;
}

export function Radio({ wrapperClassName, className, ...props }: BaseRadioProps & { wrapperClassName?: string; className?: string }) {
  return (
    <BaseRadio
      wrapperClassName={cn('flex items-center gap-2', wrapperClassName)}
      className={cn('h-4 w-4 border-gray-300 text-purple-600 focus:ring-2 focus:ring-purple-500', className)}
      {...props}
    />
  );
}
