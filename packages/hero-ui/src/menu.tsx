import * as React from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@heroui/react';

const MENU_BUTTON = Symbol('MenuButton');
const MENU_LIST = Symbol('MenuList');
const MENU_ITEM = Symbol('MenuItem');

function isMenuButton(c: React.ReactNode): c is React.ReactElement<{ children: React.ReactNode }> {
  return React.isValidElement(c) && (c.type as { _menu?: symbol })?._menu === MENU_BUTTON;
}

function isMenuList(c: React.ReactNode): c is React.ReactElement<{ children: React.ReactNode }> {
  return React.isValidElement(c) && (c.type as { _menu?: symbol })?._menu === MENU_LIST;
}

function isMenuItem(c: React.ReactNode): c is React.ReactElement<{ children: React.ReactNode; onSelect?: () => void }> {
  return React.isValidElement(c) && (c.type as { _menu?: symbol })?._menu === MENU_ITEM;
}

export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Menu({ children, className, ...rest }: MenuProps) {
  const kids = React.Children.toArray(children);
  const buttonEl = kids.find(isMenuButton);
  const listEl = kids.find(isMenuList);

  const buttonContent = buttonEl && React.isValidElement(buttonEl) ? buttonEl.props.children : null;
  const menuItems = listEl && React.isValidElement(listEl)
    ? React.Children.toArray(listEl.props.children).filter(isMenuItem)
    : [];

  return (
    <Dropdown className={className} {...rest}>
      <DropdownTrigger>
        <Button variant="bordered">{buttonContent}</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Menu">
        {menuItems.map((item, i) => {
          if (React.isValidElement(item) && isMenuItem(item)) {
            return (
              <DropdownItem
                key={i}
                onAction={() => item.props.onSelect?.()}
              >
                {item.props.children}
              </DropdownItem>
            );
          }
          return null;
        })}
      </DropdownMenu>
    </Dropdown>
  );
}

function MenuButtonImpl({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
(MenuButtonImpl as React.FC & { _menu: symbol })._menu = MENU_BUTTON;
export const MenuButton = MenuButtonImpl;

function MenuListImpl({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
(MenuListImpl as React.FC & { _menu: symbol })._menu = MENU_LIST;
export const MenuList = MenuListImpl;

function MenuItemImpl({ children }: { children: React.ReactNode; onSelect?: () => void }) {
  return <>{children}</>;
}
(MenuItemImpl as React.FC & { _menu: symbol })._menu = MENU_ITEM;
export const MenuItem = MenuItemImpl;
