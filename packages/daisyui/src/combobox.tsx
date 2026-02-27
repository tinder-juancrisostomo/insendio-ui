import { Combobox as BaseCombobox, type ComboboxProps as BaseComboboxProps } from '@design-system/base';
import { cn } from '@design-system/utils';

export function Combobox({ className, ...props }: BaseComboboxProps & { className?: string }) {
  return (
    <div className={cn('relative w-full max-w-xs [&_input]:input [&_input]:input-bordered [&_input]:w-full [&_ul]:menu [&_ul]:mt-1 [&_ul]:max-h-60 [&_ul]:overflow-auto [&_ul]:rounded-box [&_ul]:bg-base-100 [&_ul]:p-1 [&_li]:cursor-pointer [&_li:hover]:bg-base-200 [&_li[aria-selected=true]]:bg-base-200', className)}>
      <BaseCombobox {...props} />
    </div>
  );
}
