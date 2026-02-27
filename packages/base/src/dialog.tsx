/**
 * Dialog (Modal) - W3C ARIA APG Pattern
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
 */

import React, { useEffect, useCallback } from 'react';

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
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
          return;
        }

        if (e.key === 'Tab') {
          const root = e.currentTarget as HTMLElement;
          const focusable = Array.from(
            root.querySelectorAll<HTMLElement>(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
          ).filter((el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true');

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
      const prev = document.activeElement as HTMLElement;
      const focusable = document.querySelector<HTMLElement>(
        '[role="dialog"] button, [role="dialog"] [href], [role="dialog"] input, [role="dialog"] select, [role="dialog"] textarea, [role="dialog"] [tabindex]:not([tabindex="-1"])'
      );
      focusable?.focus();
      return () => prev?.focus();
    }, [open]);

    if (!open) return null;

    return (
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Dialog.displayName = 'Dialog';
