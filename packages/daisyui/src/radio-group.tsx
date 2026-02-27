import {
  RadioGroup as BaseRadioGroup,
  Radio as BaseRadio,
  type RadioGroupProps as BaseRadioGroupProps,
  type RadioProps as BaseRadioProps,
} from '@design-system/base';
import { cn } from '@design-system/utils';

export function RadioGroup({ className, ...props }: BaseRadioGroupProps) {
  return <BaseRadioGroup className={cn('flex flex-col gap-2', className)} {...props} />;
}

export function Radio({ wrapperClassName, className, ...props }: BaseRadioProps & { wrapperClassName?: string; className?: string }) {
  return (
    <BaseRadio
      wrapperClassName={cn('flex items-center gap-2', wrapperClassName)}
      className={cn('radio radio-primary', className)}
      {...props}
    />
  );
}
