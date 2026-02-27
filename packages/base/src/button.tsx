/**
 * Button - W3C ARIA APG Pattern
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/button/
 */

import React, { useCallback } from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  /** For toggle buttons: aria-pressed state */
  pressed?: boolean;
  /** Expandable buttons (e.g. menu trigger): aria-expanded */
  expanded?: boolean;
  /** aria-haspopup for buttons that open popups */
  hasPopup?: 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog' | true | false;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      pressed,
      expanded,
      hasPopup,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          (e.target as HTMLButtonElement).click();
        }
        onKeyDown?.(e);
      },
      [onKeyDown]
    );

    return (
      <button
        ref={ref}
        type="button"
        role={props.role ?? (pressed !== undefined ? 'button' : undefined)}
        aria-pressed={pressed}
        aria-expanded={expanded}
        aria-haspopup={hasPopup}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
