/**
 * Radio Group - W3C ARIA APG Pattern
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/radio/
 */

import React, { createContext, useContext, useCallback } from 'react';
import { useId } from './utils/useId';

interface RadioGroupContextValue {
  name: string;
  value: string;
  onChange: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  'aria-label'?: string;
}

export function RadioGroup({
  children,
  value: controlledValue,
  defaultValue,
  onValueChange,
  name: nameProp,
  'aria-label': ariaLabel,
  className,
  ...rest
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? '');
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  const name = useId(nameProp);

  const onChange = useCallback(
    (v: string) => {
      if (!isControlled) setInternalValue(v);
      onValueChange?.(v);
    },
    [isControlled, onValueChange]
  );

  return (
    <RadioGroupContext.Provider value={{ name, value, onChange }}>
      <div
        role="radiogroup"
        aria-label={ariaLabel}
        className={className}
        {...rest}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'name'> {
  value: string;
  label?: React.ReactNode;
  /** Class for the wrapper div */
  wrapperClassName?: string;
}

export function Radio({ value, label, id: idProp, wrapperClassName, ...props }: RadioProps) {
  const ctx = useContext(RadioGroupContext);
  if (!ctx) throw new Error('Radio must be inside RadioGroup');

  const id = useId(idProp);
  const checked = ctx.value === value;

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === ' ') e.preventDefault();
  }, []);

  return (
    <div className={wrapperClassName}>
      <input
        type="radio"
        id={id}
        name={ctx.name}
        value={value}
        checked={checked}
        onChange={() => ctx.onChange(value)}
        onKeyDown={handleKeyDown}
        aria-checked={checked}
        {...props}
      />
      {label && <label htmlFor={id}>{label}</label>}
    </div>
  );
}
