/**
 * Switch - W3C ARIA APG Pattern
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/switch/
 */

import React, { useCallback } from 'react';
import { useId } from './utils/useId';

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Checked state */
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Accessible label */
  label?: React.ReactNode;
  children?: React.ReactNode;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked = false,
      onCheckedChange,
      label,
      children,
      id: idProp,
      disabled,
      onClick,
      ...props
    },
    ref
  ) => {
    const id = useId(idProp);

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!disabled) {
          onCheckedChange?.(!checked);
        }
        onClick?.(e);
      },
      [checked, onCheckedChange, onClick, disabled]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          if (!disabled) onCheckedChange?.(!checked);
        }
      },
      [checked, onCheckedChange, disabled]
    );

    return (
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
        <button
          ref={ref}
          type="button"
          role="switch"
          aria-checked={checked}
          aria-disabled={disabled}
          id={id}
          disabled={disabled}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          {...props}
        >
          {children ?? null}
        </button>
        {label && (
          <label htmlFor={id} style={{ cursor: 'pointer' }}>
            {label}
          </label>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';
