import { Listbox as BaseListbox, type ListboxProps as BaseListboxProps } from '@design-system/base';
import { cn } from '@design-system/utils';

export function Listbox({ className, ...props }: BaseListboxProps & { className?: string }) {
  return (
    <div className={cn('w-full max-w-xs [&_ul]:rounded-md [&_ul]:border [&_ul]:border-gray-200 [&_ul]:bg-white [&_ul]:py-1 [&_li]:cursor-pointer [&_li]:px-3 [&_li]:py-2 [&_li]:text-sm [&_li:hover]:bg-gray-100 [&_li[aria-selected=true]]:bg-gray-100', className)}>
      <BaseListbox {...props} />
    </div>
  );
}
