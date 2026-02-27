/**
 * Toolbar - W3C ARIA APG Pattern
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/
 */

import React, { useCallback } from 'react';

export interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Accessible label */
  'aria-label'?: string;
}

export const Toolbar = React.forwardRef<HTMLDivElement, ToolbarProps>(
  ({ children, ...props }, ref) => {
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const items = Array.from(
        (e.currentTarget as HTMLElement).querySelectorAll(
          'button, [role="button"], [tabindex="0"]'
        )
      ) as HTMLElement[];
      const index = items.indexOf(target);
      if (index === -1) return;

      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          items[Math.max(0, index - 1)]?.focus();
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          items[Math.min(items.length - 1, index + 1)]?.focus();
          break;
        case 'Home':
          e.preventDefault();
          items[0]?.focus();
          break;
        case 'End':
          e.preventDefault();
          items[items.length - 1]?.focus();
          break;
      }
    }, []);

    return (
      <div
        ref={ref}
        role="toolbar"
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Toolbar.displayName = 'Toolbar';
