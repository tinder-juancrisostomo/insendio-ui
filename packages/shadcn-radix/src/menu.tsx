import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { cn } from '@design-system/utils';

export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Menu({ children, className, ...rest }: MenuProps) {
  return (
    <DropdownMenu.Root>
      <div className={cn('relative inline-block', className)} {...rest}>
        {children}
      </div>
    </DropdownMenu.Root>
  );
}

export interface MenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function MenuButton({ children, className, ...props }: MenuButtonProps) {
  return (
    <DropdownMenu.Trigger asChild>
      <button
        type="button"
        className={cn(
          'inline-flex h-10 items-center justify-center rounded-md border border-[var(--ds-border-default)] bg-[var(--ds-bg-surface)] px-4 py-2 text-sm font-medium hover:bg-[var(--ds-bg-muted)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-border-focus)]',
          className
        )}
        {...props}
      >
        {children}
      </button>
    </DropdownMenu.Trigger>
  );
}

export interface MenuListProps extends React.ComponentPropsWithoutRef<typeof DropdownMenu.Content> {
  children: React.ReactNode;
}

export function MenuList({ children, className, ...props }: MenuListProps) {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        className={cn(
          'z-50 min-w-[8rem] overflow-hidden rounded-md border border-[var(--ds-border-default)] bg-[var(--ds-bg-surface)] p-1 shadow-md',
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          className
        )}
        {...props}
      >
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  );
}

export interface MenuItemProps extends React.ComponentPropsWithoutRef<typeof DropdownMenu.Item> {
  children: React.ReactNode;
  onSelect?: () => void;
}

export function MenuItem({ children, onSelect, className, ...props }: MenuItemProps) {
  return (
    <DropdownMenu.Item
      className={cn(
        'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-[var(--ds-bg-muted)] focus:bg-[var(--ds-bg-muted)]',
        className
      )}
      onSelect={(e) => {
        e.preventDefault();
        onSelect?.();
      }}
      {...props}
    >
      {children}
    </DropdownMenu.Item>
  );
}
