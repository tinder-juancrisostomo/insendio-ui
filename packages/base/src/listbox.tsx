/**
 * Listbox - W3C ARIA APG Pattern
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/listbox/
 */

import React, { useState, useCallback } from 'react';
import { useId } from './utils/useId';

export interface ListboxOption {
  value: string;
  label: string;
}

export interface ListboxProps {
  options: ListboxOption[];
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  multiple?: boolean;
  'aria-label'?: string;
  disabled?: boolean;
}

export function Listbox({
  options,
  value: controlledValue,
  defaultValue,
  onValueChange,
  multiple = false,
  'aria-label': ariaLabel,
  disabled = false,
}: ListboxProps) {
  const [internalValue, setInternalValue] = useState<string | string[]>(
    defaultValue ?? (multiple ? [] : '')
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  const listboxId = useId();

  const typeaheadRef = React.useRef({ buffer: '', lastAt: 0 });

  const isSelected = useCallback(
    (opt: ListboxOption) =>
      multiple
        ? (value as string[]).includes(opt.value)
        : (value as string) === opt.value,
    [value, multiple]
  );

  const select = useCallback(
    (opt: ListboxOption) => {
      if (multiple) {
        const arr = (value as string[]).slice();
        const i = arr.indexOf(opt.value);
        if (i >= 0) arr.splice(i, 1);
        else arr.push(opt.value);
        if (!isControlled) setInternalValue(arr);
        onValueChange?.(arr);
      } else {
        if (!isControlled) setInternalValue(opt.value);
        onValueChange?.(opt.value);
      }
    },
    [multiple, value, isControlled, onValueChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;

      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const now = Date.now();
        const st = typeaheadRef.current;
        if (now - st.lastAt > 700) st.buffer = '';
        st.lastAt = now;
        st.buffer += e.key.toLowerCase();

        const start = activeIndex;
        const look = [...options.slice(start + 1), ...options.slice(0, start + 1)];
        const hit = look.findIndex((o) => o.label.toLowerCase().startsWith(st.buffer));
        if (hit >= 0) {
          const nextIndex = (start + 1 + hit) % options.length;
          setActiveIndex(nextIndex);
        }
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex((i) => Math.min(i + 1, options.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex((i) => Math.max(i - 1, 0));
          break;
        case 'Home':
          e.preventDefault();
          setActiveIndex(0);
          break;
        case 'End':
          e.preventDefault();
          setActiveIndex(options.length - 1);
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (options[activeIndex]) select(options[activeIndex]);
          break;
      }
    },
    [disabled, options, activeIndex, select]
  );

  return (
    <ul
      id={listboxId}
      role="listbox"
      aria-multiselectable={multiple}
      aria-label={ariaLabel}
      aria-activedescendant={`${listboxId}-${activeIndex}`}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={handleKeyDown}
    >
      {options.map((opt, i) => (
        <li
          key={opt.value}
          id={`${listboxId}-${i}`}
          role="option"
          aria-selected={isSelected(opt)}
          onClick={() => !disabled && select(opt)}
        >
          {opt.label}
        </li>
      ))}
    </ul>
  );
}
