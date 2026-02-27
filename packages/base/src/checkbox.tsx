/**
 * Checkbox - W3C ARIA APG Pattern
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/
 */

import React, { useCallback } from 'react';
import { useId } from './utils/useId';

export type CheckboxState = 'checked' | 'unchecked' | 'indeterminate';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'checked'> {
  /** Checked state - use 'indeterminate' for tri-state */
  checked?: boolean | 'indeterminate';
  onCheckedChange?: (checked: boolean) => void;
  /** Accessible label - use this or aria-label */
  label?: React.ReactNode;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked = false,
      onCheckedChange,
      onChange,
      label,
      id: idProp,
      disabled,
      ...props
    },
    ref
  ) => {
    const id = useId(idProp);
    const isIndeterminate = checked === 'indeterminate';

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isIndeterminate) return;
        const newChecked = e.target.checked;
        onCheckedChange?.(newChecked);
        onChange?.(e);
      },
      [onCheckedChange, onChange, isIndeterminate]
    );

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault();
      }
    }, []);

    return (
      <div>
        <input
          ref={(el) => {
            if (typeof ref === 'function') ref(el);
            else if (ref) ref.current = el;
            if (el) el.indeterminate = isIndeterminate;
          }}
          type="checkbox"
          id={id}
          checked={isIndeterminate ? false : !!checked}
          aria-checked={isIndeterminate ? 'mixed' : checked}
          aria-disabled={disabled}
          disabled={disabled}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          {...props}
        />
        {label && (
          <label htmlFor={id}>
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
