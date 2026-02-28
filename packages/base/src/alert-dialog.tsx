/**
 * Alert Dialog - W3C ARIA APG Pattern
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/
 *
 * A11y: focus trap, Escape to close, focus first focusable on open, return focus to trigger on close.
 * Does NOT close on click outside (requires explicit user action).
 */

import React, { useCallback, useEffect, useRef } from 'react';

function getFocusableElements(root: HTMLElement): HTMLElement[] {
  return Array.from(
    root.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  ).filter((el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true');
}

export interface AlertDialogProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

export const AlertDialog = React.forwardRef<HTMLDivElement, AlertDialogProps>(
  ({ children, open, onClose, ...props }, ref) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLElement | null>(null);

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
          const root = rootRef.current;
          if (!root) return;
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
      triggerRef.current = document.activeElement as HTMLElement | null;
      const root = rootRef.current;
      if (root) {
        const focusable = getFocusableElements(root);
        (focusable[0] ?? root).focus();
      }
      return () => {
        triggerRef.current?.focus();
      };
    }, [open]);

    if (!open) return null;

    return (
      <div
        ref={setRefs}
        role="alertdialog"
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

AlertDialog.displayName = 'AlertDialog';
