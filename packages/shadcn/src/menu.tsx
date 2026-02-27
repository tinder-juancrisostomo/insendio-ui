import {
  Menu as BaseMenu,
  MenuButton as BaseMenuButton,
  MenuList as BaseMenuList,
  MenuItem as BaseMenuItem,
  type MenuProps as BaseMenuProps,
  type MenuButtonProps as BaseMenuButtonProps,
  type MenuListProps as BaseMenuListProps,
  type MenuItemProps as BaseMenuItemProps,
} from '@design-system/base';
import { cn } from '@design-system/utils';

export function Menu(props: BaseMenuProps) {
  return <BaseMenu className="relative inline-block" {...props} />;
}

export function MenuButton({ className, ...props }: BaseMenuButtonProps) {
  return (
    <BaseMenuButton
      className={cn(
        'inline-flex h-10 items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
        className
      )}
      {...props}
    />
  );
}

export function MenuList({ className, ...props }: BaseMenuListProps) {
  return (
    <BaseMenuList
      className={cn(
        'absolute left-0 top-full z-50 mt-1 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white py-1 shadow-md',
        className
      )}
      {...props}
    />
  );
}

export function MenuItem({ className, ...props }: BaseMenuItemProps) {
  return (
    <BaseMenuItem
      className={cn(
        'relative flex cursor-pointer select-none items-center px-2 py-1.5 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100',
        className
      )}
      {...props}
    />
  );
}
