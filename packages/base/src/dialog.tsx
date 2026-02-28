/**
 * Dialog (Modal) - W3C ARIA APG Pattern
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
 *
 * A11y: focus trap, Escape to close, focus first focusable on open, return focus to trigger on close.
 * Click-outside-to-close is handled by the themed wrappers (backdrop onClick).
 */

import React, { useEffect, useCallback, useRef } from 'react';

function getFocusableElements(root: HTMLElement): HTMLElement[] {
  return Array.from(
    root.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  ).filter((el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true');
}

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  /** Accessible title for the dialog */
  'aria-labelledby'?: string;
  /** Or use aria-label for simple cases */
  'aria-label'?: string;
}

export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  ({ children, open, onClose, ...props }, ref) => {
    const rootRef = useRef<HTMLDivElement>(null);

    const setRefs = useCallback(
      (el: HTMLDivElement | null) => {
        (rootRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        if (typeof ref === 'function') ref(el);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
      },
      [ref]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
          return;
        }

        if (e.key === 'Tab') {
          const root = e.currentTarget as HTMLElement;
          const focusable = getFocusableElements(root);

          if (focusable.length === 0) {
            e.preventDefault();
            root.focus();
            return;
          }

          const first = focusable[0]!;
          const last = focusable[focusable.length - 1]!;
          const active = document.activeElement as HTMLElement | null;

          if (e.shiftKey) {
            if (!active || active === first || !root.contains(active)) {
              e.preventDefault();
              last.focus();
            }
          } else if (active === last) {
            e.preventDefault();
            first.focus();
          }
        }
      },
      [onClose]
    );

    useEffect(() => {
      if (!open) return;
      const prev = document.activeElement as HTMLElement | null;
      const root = rootRef.current;
      if (root) {
        const focusable = getFocusableElements(root);
        (focusable[0] ?? root).focus();
      }
      return () => prev?.focus();
    }, [open]);

    if (!open) return null;

    return (
      <div
        ref={setRefs}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Dialog.displayName = 'Dialog';
