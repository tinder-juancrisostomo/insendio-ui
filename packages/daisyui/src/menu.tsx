import React from 'react';
import { Dropdown } from 'react-daisyui';
import { cn } from '@design-system/utils';

export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Menu({ children, className, ...props }: MenuProps) {
  return (
    <Dropdown end className={cn(className)} {...props}>
      {children}
    </Dropdown>
  );
}

export interface MenuButtonProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export function MenuButton({ children, className, ...props }: MenuButtonProps) {
  return (
    <Dropdown.Toggle button className={cn(className)} {...props}>
      {children}
    </Dropdown.Toggle>
  );
}

export interface MenuListProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
}

export function MenuList({ children, className, ...props }: MenuListProps) {
  return (
    <Dropdown.Menu className={cn('z-50', className)} {...props}>
      {children}
    </Dropdown.Menu>
  );
}

export interface MenuItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
  onSelect?: () => void;
}

export function MenuItem({ children, className, onSelect, onClick, ...props }: MenuItemProps) {
  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    onClick?.(e);
    onSelect?.();
  };
  return (
    <li className={cn('cursor-pointer', className)} onClick={handleClick} {...props}>
      {children}
    </li>
  );
}
