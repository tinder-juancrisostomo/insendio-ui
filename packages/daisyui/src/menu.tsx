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
  return <BaseMenu className="dropdown dropdown-end" {...props} />;
}

export function MenuButton({ className, ...props }: BaseMenuButtonProps) {
  return (
    <BaseMenuButton
      className={cn('btn', className)}
      {...props}
    />
  );
}

export function MenuList({ className, ...props }: BaseMenuListProps) {
  return (
    <BaseMenuList
      className={cn(
        'dropdown-content menu z-50 mt-1 min-w-[8rem] rounded-box bg-base-100 p-1 shadow',
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
        'menu-item flex cursor-pointer items-center px-2 py-1.5 text-sm outline-none hover:bg-base-200 focus:bg-base-200',
        className
      )}
      {...props}
    />
  );
}
