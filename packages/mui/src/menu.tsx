import * as React from 'react';
import MuiMenu from '@mui/material/Menu';
import MuiMenuItem from '@mui/material/MenuItem';
import MuiButton from '@mui/material/Button';

interface MenuContextValue {
  anchorEl: HTMLElement | null;
  setAnchorEl: (el: HTMLElement | null) => void;
  open: boolean;
  close: () => void;
}

const MenuContext = React.createContext<MenuContextValue | null>(null);

export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Menu({ children, className, ...rest }: MenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const close = React.useCallback(() => setAnchorEl(null), []);

  return (
    <MenuContext.Provider value={{ anchorEl, setAnchorEl, open, close }}>
      <div className={className} {...rest}>
        {children}
      </div>
    </MenuContext.Provider>
  );
}

export interface MenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function MenuButton({ children, onClick, disabled, className }: MenuButtonProps) {
  const ctx = React.useContext(MenuContext);
  if (!ctx) throw new Error('MenuButton must be inside Menu');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    ctx.setAnchorEl(e.currentTarget);
    onClick?.(e);
  };

  return (
    <MuiButton
      id="menu-button"
      aria-controls={ctx.open ? 'menu' : undefined}
      aria-haspopup="true"
      aria-expanded={ctx.open ? 'true' : undefined}
      onClick={handleClick}
      variant="outlined"
      disabled={disabled}
      className={className}
    >
      {children}
    </MuiButton>
  );
}

export interface MenuListProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
}

export function MenuList({ children, ...props }: MenuListProps) {
  const ctx = React.useContext(MenuContext);
  if (!ctx) throw new Error('MenuList must be inside Menu');

  return (
    <MuiMenu
      id="menu"
      anchorEl={ctx.anchorEl}
      open={ctx.open}
      onClose={ctx.close}
      MenuListProps={{
        'aria-labelledby': 'menu-button',
        ...props,
      }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
    >
      {children}
    </MuiMenu>
  );
}

export interface MenuItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
  onSelect?: () => void;
}

export function MenuItem({ children, onSelect, onClick, ...props }: MenuItemProps) {
  const ctx = React.useContext(MenuContext);
  if (!ctx) throw new Error('MenuItem must be inside Menu');

  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    onSelect?.();
    ctx.close();
    onClick?.(e);
  };

  return (
    <MuiMenuItem onClick={handleClick} {...props}>
      {children}
    </MuiMenuItem>
  );
}
