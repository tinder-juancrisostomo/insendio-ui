/**
 * Slider (Multi-Thumb) - W3C ARIA APG Pattern
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/slider-multithumb/
 *
 * Headless implementation that renders multiple slider thumbs.
 * Styling is expected to be applied by consuming packages.
 */

import React, { useCallback, useMemo, useRef, useState } from 'react';

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function snapToStep(value: number, min: number, step: number) {
  if (!step || step <= 0) return value;
  const steps = Math.round((value - min) / step);
  const snapped = min + steps * step;
  // Avoid floating point noise.
  const decimals = String(step).includes('.') ? String(step).split('.')[1]!.length : 0;
  return Number(snapped.toFixed(decimals));
}

export interface RangeSliderProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'onChange' | 'children' | 'defaultValue' | 'value'
  > {
  /** Controlled values (one per thumb). */
  value?: number[];
  /** Uncontrolled default values. */
  defaultValue?: number[];
  min?: number;
  max?: number;
  step?: number;
  /** Minimum distance between adjacent thumbs, in value units. */
  minDistance?: number;
  disabled?: boolean;
  onChange?: (values: number[]) => void;
  /** Accessible label for the slider group. */
  'aria-label'?: string;
  /** Optional accessible labels for each thumb (same length as values). */
  thumbLabels?: string[];
}

export const RangeSlider = React.forwardRef<HTMLDivElement, RangeSliderProps>(
  (
    {
      value: controlledValue,
      defaultValue = [25, 75],
      min = 0,
      max = 100,
      step = 1,
      minDistance = 0,
      disabled = false,
      onChange,
      'aria-label': ariaLabel,
      thumbLabels,
      style,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState<number[]>(defaultValue);
    const isControlled = controlledValue !== undefined;
    const values = (isControlled ? controlledValue : internalValue) ?? defaultValue;

    const rootRef = useRef<HTMLDivElement | null>(null);
    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        rootRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref]
    );

    const sortedValues = useMemo(() => {
      const v = values.slice();
      v.sort((a, b) => a - b);
      return v.map((n) => clamp(snapToStep(n, min, step), min, max));
    }, [values, min, max, step]);

    const update = useCallback(
      (nextValues: number[]) => {
        const normalized = nextValues
          .slice()
          .sort((a, b) => a - b)
          .map((n) => clamp(snapToStep(n, min, step), min, max));

        // Enforce minDistance.
        for (let i = 1; i < normalized.length; i++) {
          if (normalized[i] < normalized[i - 1] + minDistance) {
            normalized[i] = normalized[i - 1] + minDistance;
          }
        }
        for (let i = normalized.length - 2; i >= 0; i--) {
          if (normalized[i] > normalized[i + 1] - minDistance) {
            normalized[i] = normalized[i + 1] - minDistance;
          }
        }

        for (let i = 0; i < normalized.length; i++) {
          normalized[i] = clamp(normalized[i], min, max);
        }

        if (!isControlled) setInternalValue(normalized);
        onChange?.(normalized);
      },
      [isControlled, min, max, step, minDistance, onChange]
    );

    const percentFor = useCallback(
      (v: number) => ((v - min) / (max - min)) * 100,
      [min, max]
    );

    const valueFromClientX = useCallback(
      (clientX: number) => {
        const el = rootRef.current;
        if (!el) return min;
        const rect = el.getBoundingClientRect();
        const ratio = rect.width > 0 ? clamp((clientX - rect.left) / rect.width, 0, 1) : 0;
        const raw = min + ratio * (max - min);
        return clamp(snapToStep(raw, min, step), min, max);
      },
      [min, max, step]
    );

    const pickNearestThumb = useCallback(
      (clientX: number) => {
        const v = valueFromClientX(clientX);
        let best = 0;
        let bestDist = Infinity;
        for (let i = 0; i < sortedValues.length; i++) {
          const d = Math.abs(sortedValues[i]! - v);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        }
        return best;
      },
      [sortedValues, valueFromClientX]
    );

    const dragIndexRef = useRef<number | null>(null);

    const startDrag = useCallback(
      (index: number, e: React.PointerEvent) => {
        if (disabled) return;
        dragIndexRef.current = index;
        (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
      },
      [disabled]
    );

    const handlePointerMove = useCallback(
      (e: React.PointerEvent) => {
        const idx = dragIndexRef.current;
        if (idx === null || disabled) return;
        const next = sortedValues.slice();
        next[idx] = valueFromClientX(e.clientX);
        update(next);
      },
      [disabled, sortedValues, update, valueFromClientX]
    );

    const endDrag = useCallback(() => {
      dragIndexRef.current = null;
    }, []);

    const handleTrackPointerDown = useCallback(
      (e: React.PointerEvent) => {
        if (disabled) return;
        const idx = pickNearestThumb(e.clientX);
        const next = sortedValues.slice();
        next[idx] = valueFromClientX(e.clientX);
        update(next);
        startDrag(idx, e);
      },
      [disabled, pickNearestThumb, sortedValues, update, valueFromClientX, startDrag]
    );

    const handleThumbKeyDown = useCallback(
      (index: number) => (e: React.KeyboardEvent) => {
        if (disabled) return;
        const current = sortedValues[index] ?? min;
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
          case 'PageUp':
            delta = step * 10;
            break;
          case 'PageDown':
            delta = -step * 10;
            break;
          case 'Home': {
            e.preventDefault();
            const next = sortedValues.slice();
            next[index] = min;
            update(next);
            return;
          }
          case 'End': {
            e.preventDefault();
            const next = sortedValues.slice();
            next[index] = max;
            update(next);
            return;
          }
          default:
            return;
        }
        if (delta) {
          e.preventDefault();
          const next = sortedValues.slice();
          next[index] = current + delta;
          update(next);
        }
      },
      [disabled, sortedValues, min, max, step, update]
    );

    const computedStyle: React.CSSProperties = {
      position: 'relative',
      touchAction: 'none',
      userSelect: 'none',
      ...style,
    };

    const left = percentFor(sortedValues[0] ?? min);
    const right = percentFor(sortedValues[sortedValues.length - 1] ?? min);
    const rangeLeft = Math.min(left, right);
    const rangeWidth = Math.max(0, Math.abs(right - left));

    return (
      <div
        ref={setRefs}
        role="group"
        aria-label={ariaLabel}
        aria-disabled={disabled}
        style={computedStyle}
        onPointerDown={handleTrackPointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        {...props}
      >
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
            left: `${rangeLeft}%`,
            width: `${rangeWidth}%`,
            top: '50%',
            height: 2,
            transform: 'translateY(-50%)',
            background: 'var(--ds-border-focus)',
          }}
        />
        {sortedValues.map((v, i) => (
          <div
            key={`thumb-${i}`}
            role="slider"
            tabIndex={disabled ? -1 : 0}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={v}
            aria-label={thumbLabels?.[i]}
            aria-disabled={disabled}
            onKeyDown={handleThumbKeyDown(i)}
            onPointerDown={(e) => startDrag(i, e)}
            style={{
              position: 'absolute',
              left: `${percentFor(v)}%`,
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
        ))}
      </div>
    );
  }
);

RangeSlider.displayName = 'RangeSlider';

