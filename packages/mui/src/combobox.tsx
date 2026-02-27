import { Combobox as BaseCombobox, type ComboboxProps as BaseComboboxProps } from '@design-system/base';
import { cn } from '@design-system/utils';

export function Combobox({ className, ...props }: BaseComboboxProps & { className?: string }) {
  return (
    <div className={cn('relative w-full max-w-xs [&_input]:w-full [&_input]:rounded-md [&_input]:border [&_input]:border-gray-300 [&_input]:px-3 [&_input]:py-2 [&_input]:text-sm [&_ul]:mt-1 [&_ul]:max-h-60 [&_ul]:overflow-auto [&_ul]:rounded-md [&_ul]:border [&_ul]:border-gray-200 [&_ul]:bg-white [&_ul]:py-1 [&_li]:cursor-pointer [&_li]:px-3 [&_li]:py-2 [&_li]:text-sm [&_li:hover]:bg-gray-100 [&_li[aria-selected=true]]:bg-gray-100', className)}>
      <BaseCombobox {...props} />
    </div>
  );
}
