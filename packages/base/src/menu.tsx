/**
 * Menu and Menu Button - W3C ARIA APG Patterns
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/menu/
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/menubutton/
 */

import React, { useState, useCallback } from 'react';
import { useId } from './utils/useId';

interface MenuContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
  menuId: string;
  buttonId: string;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  menuRef: React.MutableRefObject<HTMLUListElement | null>;
}

const MenuContext = React.createContext<MenuContextValue | null>(null);

export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Menu({ children, className, ...rest }: MenuProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const menuId = useId();
  const buttonId = useId();
  const menuRef = React.useRef<HTMLUListElement | null>(null);

  return (
    <MenuContext.Provider
      value={{
        open,
        setOpen,
        menuId,
        buttonId,
        activeIndex,
        setActiveIndex,
        menuRef,
      }}
    >
      <div className={className} {...rest}>{children}</div>
    </MenuContext.Provider>
  );
}

export interface MenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function MenuButton({ children, ...props }: MenuButtonProps) {
  const ctx = React.useContext(MenuContext);
  if (!ctx) throw new Error('MenuButton must be inside Menu');

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'Enter':
        case ' ':
        case 'ArrowDown':
          e.preventDefault();
          ctx.setOpen(true);
          ctx.setActiveIndex(0);
          break;
        case 'ArrowUp':
          e.preventDefault();
          ctx.setOpen(true);
          ctx.setActiveIndex(Number.POSITIVE_INFINITY);
          break;
      }
    },
    [ctx]
  );

  return (
    <button
      type="button"
      id={ctx.buttonId}
      aria-haspopup="menu"
      aria-expanded={ctx.open}
      aria-controls={ctx.menuId}
      onClick={() => ctx.setOpen(!ctx.open)}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </button>
  );
}

export interface MenuItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
  onSelect?: () => void;
  /** @internal */
  _index?: number;
}

export function MenuItem({ children, onSelect, ...props }: MenuItemProps) {
  const ctx = React.useContext(MenuContext);
  if (!ctx) throw new Error('MenuItem must be inside Menu');

  const index = (props as MenuItemProps)._index ?? 0;

  const handleClick = () => {
    onSelect?.();
    ctx.setOpen(false);
    queueMicrotask(() => document.getElementById(ctx.buttonId)?.focus());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const items = Array.from(ctx.menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []);
    const count = items.length || 1;
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleClick();
        break;
      case 'ArrowDown':
        e.preventDefault();
        ctx.setActiveIndex((i: number) => (i + 1) % count);
        break;
      case 'ArrowUp':
        e.preventDefault();
        ctx.setActiveIndex((i: number) => (i - 1 + count) % count);
        break;
      case 'Home':
        e.preventDefault();
        ctx.setActiveIndex(0);
        break;
      case 'End':
        e.preventDefault();
        ctx.setActiveIndex(count - 1);
        break;
      case 'Escape':
        e.preventDefault();
        ctx.setOpen(false);
        queueMicrotask(() => document.getElementById(ctx.buttonId)?.focus());
        break;
      case 'Tab':
        ctx.setOpen(false);
        break;
    }
  };

  return (
    <li
      role="menuitem"
      tabIndex={ctx.activeIndex === index ? 0 : -1}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </li>
  );
}

export interface MenuListProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
}

export function MenuList({ children, ...props }: MenuListProps) {
  const ctx = React.useContext(MenuContext);
  if (!ctx) throw new Error('MenuList must be inside Menu');

  const { open, activeIndex, setActiveIndex, menuRef } = ctx;

  const items = React.Children.toArray(children).map((child, i) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement<any>, { _index: i });
    }
    return child;
  });

  // Focus active item when opening or when activeIndex changes.
  React.useEffect(() => {
    if (!open) return;
    const menuEl = menuRef.current;
    if (!menuEl) return;
    const menuItems = Array.from(menuEl.querySelectorAll<HTMLElement>('[role="menuitem"]'));
    if (!menuItems.length) return;

    const raw = activeIndex;
    const idx =
      raw === Number.POSITIVE_INFINITY ? menuItems.length - 1 : Math.max(0, Math.min(raw, menuItems.length - 1));
    setActiveIndex(idx);
    queueMicrotask(() => menuItems[idx]?.focus());
  }, [open, activeIndex, setActiveIndex, menuRef]);

  if (!open) return null;

  return (
    <ul
      ref={menuRef}
      id={ctx.menuId}
      role="menu"
      aria-labelledby={ctx.buttonId}
      {...props}
    >
      {items}
    </ul>
  );
}
