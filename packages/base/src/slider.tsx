/**
 * Slider - W3C ARIA APG Pattern
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/slider/
 */

import React, { useCallback } from 'react';

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function snapToStep(value: number, min: number, step: number) {
  if (!step || step <= 0) return value;
  const steps = Math.round((value - min) / step);
  const snapped = min + steps * step;
  const decimals = String(step).includes('.') ? String(step).split('.')[1]!.length : 0;
  return Number(snapped.toFixed(decimals));
}

export interface SliderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
  'aria-label'?: string;
  'aria-valuetext'?: string;
}

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value: controlledValue,
      defaultValue = 0,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      onChange,
      'aria-label': ariaLabel,
      'aria-valuetext': ariaValueText,
      children,
      ...props
    },
    ref
  ) => {
    const rootRef = React.useRef<HTMLDivElement | null>(null);
    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        rootRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref]
    );

    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    const update = useCallback(
      (v: number) => {
        const clamped = clamp(snapToStep(v, min, step), min, max);
        if (!isControlled) setInternalValue(clamped);
        onChange?.(clamped);
      },
      [min, max, step, isControlled, onChange]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return;
        let delta = 0;
        switch (e.key) {
          case 'ArrowRight':
          case 'ArrowUp':
            delta = step;
            break;
          case 'ArrowLeft':
          case 'ArrowDown':
            delta = -step;
            break;
          case 'Home':
            e.preventDefault();
            update(min);
            return;
          case 'End':
            e.preventDefault();
            update(max);
            return;
          case 'PageUp':
            delta = step * 10;
            break;
          case 'PageDown':
            delta = -step * 10;
            break;
          default:
            return;
        }
        if (delta) {
          e.preventDefault();
          update(value + delta);
        }
      },
      [value, step, min, max, disabled, update]
    );

    const dragRef = React.useRef<{ pointerId: number } | null>(null);

    const valueFromClientX = useCallback(
      (clientX: number) => {
        const rect = rootRef.current?.getBoundingClientRect();
        if (!rect || rect.width <= 0) return min;
        const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
        return clamp(snapToStep(min + ratio * (max - min), min, step), min, max);
      },
      [min, max, step]
    );

    const onPointerDown = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        if (disabled) return;
        dragRef.current = { pointerId: e.pointerId };
        (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
        update(valueFromClientX(e.clientX));
      },
      [disabled, update, valueFromClientX]
    );

    const onPointerMove = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        if (disabled) return;
        if (!dragRef.current || dragRef.current.pointerId !== e.pointerId) return;
        update(valueFromClientX(e.clientX));
      },
      [disabled, update, valueFromClientX]
    );

    const onPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragRef.current || dragRef.current.pointerId !== e.pointerId) return;
      dragRef.current = null;
    }, []);

    const percent =
      max > min ? ((clamp(value, min, max) - min) / (max - min)) * 100 : 0;

    return (
      <div
        ref={setRefs}
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={ariaValueText}
        aria-label={ariaLabel}
        aria-disabled={disabled}
        onKeyDown={handleKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        {...props}
      >
        {children ?? (
          <>
            {/* Track (unstyled) */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: '50%',
                height: 2,
                transform: 'translateY(-50%)',
                background: 'var(--ds-border-default)',
              }}
            />
            {/* Range (unstyled) */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                left: 0,
                width: `${percent}%`,
                top: '50%',
                height: 2,
                transform: 'translateY(-50%)',
                background: 'var(--ds-border-focus)',
              }}
            />
            {/* Thumb (unstyled) */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                left: `${percent}%`,
                top: '50%',
                width: 18,
                height: 18,
                transform: 'translate(-50%, -50%)',
                borderRadius: 999,
                background: 'var(--ds-bg-surface)',
                border: '1px solid var(--ds-border-default)',
                boxShadow: 'var(--ds-shadow-sm)',
              }}
            />
          </>
        )}
      </div>
    );
  }
);

Slider.displayName = 'Slider';
