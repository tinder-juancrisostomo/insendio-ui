/**
 * Window Splitter - W3C ARIA APG Pattern
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/
 *
 * Provides a focusable separator with keyboard + pointer resizing behavior.
 * This component does not enforce any layout; consumers should size panes based on `value`.
 */

import React, { useCallback, useRef, useState } from 'react';

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export interface WindowSplitterProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue' | 'value'> {
  /** Percentage (0-100) of the first pane, controlled. */
  value?: number;
  /** Percentage (0-100) of the first pane, uncontrolled. */
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  orientation?: 'vertical' | 'horizontal';
  onChange?: (value: number) => void;
}

export const WindowSplitter = React.forwardRef<HTMLDivElement, WindowSplitterProps>(
  (
    {
      value: controlledValue,
      defaultValue = 50,
      min = 10,
      max = 90,
      step = 2,
      disabled = false,
      orientation = 'vertical',
      onChange,
      style,
      ...props
    },
    ref
  ) => {
    const [internal, setInternal] = useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const value = clamp(isControlled ? controlledValue! : internal, min, max);

    const rootRef = useRef<HTMLDivElement | null>(null);
    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        rootRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref]
    );

    const update = useCallback(
      (v: number) => {
        const next = clamp(v, min, max);
        if (!isControlled) setInternal(next);
        onChange?.(next);
      },
      [isControlled, min, max, onChange]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return;
        const isVertical = orientation === 'vertical';
        let delta = 0;

        switch (e.key) {
          case 'ArrowLeft':
            if (isVertical) delta = -step;
            break;
          case 'ArrowRight':
            if (isVertical) delta = step;
            break;
          case 'ArrowUp':
            if (!isVertical) delta = -step;
            break;
          case 'ArrowDown':
            if (!isVertical) delta = step;
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
            delta = -step * 5;
            break;
          case 'PageDown':
            delta = step * 5;
            break;
          default:
            return;
        }

        if (delta) {
          e.preventDefault();
          update(value + delta);
        }
      },
      [disabled, orientation, step, min, max, value, update]
    );

    const dragState = useRef<{ startValue: number; startX: number; startY: number } | null>(null);

    const handlePointerDown = useCallback(
      (e: React.PointerEvent) => {
        if (disabled) return;
        dragState.current = { startValue: value, startX: e.clientX, startY: e.clientY };
        (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
      },
      [disabled, value]
    );

    const handlePointerMove = useCallback(
      (e: React.PointerEvent) => {
        if (disabled) return;
        const st = dragState.current;
        const el = rootRef.current;
        if (!st || !el) return;
        const parent = el.parentElement;
        if (!parent) return;
        const rect = parent.getBoundingClientRect();
        const isVertical = orientation === 'vertical';
        const deltaPx = isVertical ? e.clientX - st.startX : e.clientY - st.startY;
        const sizePx = isVertical ? rect.width : rect.height;
        if (!sizePx) return;
        const deltaPct = (deltaPx / sizePx) * 100;
        update(st.startValue + deltaPct);
      },
      [disabled, orientation, update]
    );

    const endDrag = useCallback(() => {
      dragState.current = null;
    }, []);

    const computedStyle: React.CSSProperties = {
      display: 'block',
      touchAction: 'none',
      userSelect: 'none',
      cursor: disabled ? 'not-allowed' : orientation === 'vertical' ? 'col-resize' : 'row-resize',
      background: 'var(--ds-border-default)',
      ...(orientation === 'vertical' ? { width: 4, height: '100%' } : { height: 4, width: '100%' }),
      ...style,
    };

    return (
      <div
        ref={setRefs}
        role="separator"
        aria-orientation={orientation}
        tabIndex={disabled ? -1 : 0}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-disabled={disabled}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        style={computedStyle}
        {...props}
      />
    );
  }
);

WindowSplitter.displayName = 'WindowSplitter';

