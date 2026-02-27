/**
 * Combobox - W3C ARIA APG Pattern
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
 */

import React, { useState, useCallback } from 'react';
import { useId } from './utils/useId';

export interface ComboboxOption {
  value: string;
  label: string;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  'aria-label'?: string;
  placeholder?: string;
  disabled?: boolean;
}

export function Combobox({
  options,
  value: controlledValue,
  defaultValue,
  onValueChange,
  'aria-label': ariaLabel,
  placeholder = 'Select...',
  disabled = false,
}: ComboboxProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const [expanded, setExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  const listboxId = useId();
  const inputId = useId();

  const selectedOption = options.find((o) => o.value === value);
  const displayValue = selectedOption?.label ?? '';

  const typeaheadRef = React.useRef({ buffer: '', lastAt: 0 });

  const select = useCallback(
    (opt: ComboboxOption) => {
      if (!isControlled) setInternalValue(opt.value);
      onValueChange?.(opt.value);
      setExpanded(false);
      setActiveIndex(-1);
    },
    [isControlled, onValueChange]
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

        const start = Math.max(activeIndex, 0);
        const look = [...options.slice(start + 1), ...options.slice(0, start + 1)];
        const hit = look.findIndex((o) => o.label.toLowerCase().startsWith(st.buffer));
        if (hit >= 0) {
          const nextIndex = (start + 1 + hit) % options.length;
          if (!expanded) setExpanded(true);
          setActiveIndex(nextIndex);
        }
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (!expanded) setExpanded(true);
          setActiveIndex((i) => Math.min(i + 1, options.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (!expanded) {
            setExpanded(true);
            setActiveIndex(options.length - 1);
          } else {
            setActiveIndex((i) => Math.max(i - 1, 0));
          }
          break;
        case 'Home':
          if (!expanded) return;
          e.preventDefault();
          setActiveIndex(0);
          break;
        case 'End':
          if (!expanded) return;
          e.preventDefault();
          setActiveIndex(options.length - 1);
          break;
        case 'Enter':
          e.preventDefault();
          if (expanded && options[activeIndex]) {
            select(options[activeIndex]);
          } else {
            setExpanded(!expanded);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setExpanded(false);
          setActiveIndex(-1);
          break;
        case 'Tab':
          setExpanded(false);
          break;
      }
    },
    [disabled, expanded, activeIndex, options, select]
  );

  return (
    <div>
      <input
        id={inputId}
        role="combobox"
        aria-expanded={expanded}
        aria-controls={listboxId}
        aria-autocomplete="list"
        aria-activedescendant={
          expanded && options[activeIndex]
            ? `${listboxId}-${activeIndex}`
            : undefined
        }
        aria-label={ariaLabel}
        value={displayValue}
        placeholder={placeholder}
        readOnly
        disabled={disabled}
        onKeyDown={handleKeyDown}
        onClick={() => !disabled && setExpanded(!expanded)}
      />
      {expanded && (
        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={inputId}
        >
          {options.map((opt, i) => (
            <li
              key={opt.value}
              id={`${listboxId}-${i}`}
              role="option"
              aria-selected={opt.value === value}
              onClick={() => select(opt)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
