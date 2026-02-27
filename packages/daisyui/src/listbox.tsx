import { Listbox as BaseListbox, type ListboxProps as BaseListboxProps } from '@design-system/base';
import { cn } from '@design-system/utils';

export function Listbox({ className, ...props }: BaseListboxProps & { className?: string }) {
  return (
    <div className={cn('w-full max-w-xs [&_ul]:menu [&_ul]:rounded-box [&_ul]:bg-base-100 [&_ul]:p-1 [&_li]:cursor-pointer [&_li:hover]:bg-base-200 [&_li[aria-selected=true]]:bg-base-200', className)}>
      <BaseListbox {...props} />
    </div>
  );
}
