/**
 * Accordion - W3C ARIA APG Pattern
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
 */

import React, { createContext, useContext, useState, useCallback } from 'react';

interface AccordionContextValue {
  expandedIds: Set<string>;
  toggle: (id: string) => void;
  allowMultiple?: boolean;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Allow multiple panels open */
  allowMultiple?: boolean;
  /** Default expanded panel ids */
  defaultExpanded?: string[];
}

export function Accordion({
  children,
  allowMultiple = false,
  defaultExpanded = [],
  className,
  ...rest
}: AccordionProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    () => new Set(defaultExpanded)
  );

  const toggle = useCallback(
    (id: string) => {
      setExpandedIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          if (!allowMultiple) next.clear();
          next.add(id);
        }
        return next;
      });
    },
    [allowMultiple]
  );

  return (
    <AccordionContext.Provider
      value={{ expandedIds, toggle, allowMultiple }}
    >
      <div role="region" aria-label="Accordion" className={className} {...rest}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  id: string;
}

export function AccordionItem({ children, id, className, ...rest }: AccordionItemProps) {
  return (
    <div data-accordion-item={id} className={className} {...rest}>
      {children}
    </div>
  );
}

export interface AccordionHeaderProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  id: string;
  panelId: string;
}

export function AccordionHeader({ children, id, panelId, className, ...rest }: AccordionHeaderProps) {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error('AccordionHeader must be inside Accordion');

  const isExpanded = ctx.expandedIds.has(id);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const current = e.currentTarget as HTMLButtonElement;
    const root = current.closest('[role="region"][aria-label="Accordion"]') as HTMLElement | null;
    const headers = Array.from(
      (root ?? document).querySelectorAll<HTMLButtonElement>('button[data-accordion-header="true"]')
    );
    const index = headers.indexOf(current);
    if (index === -1) return;

    const focusAt = (i: number) => {
      const next = headers[(i + headers.length) % headers.length];
      next?.focus();
    };

    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        e.preventDefault();
        focusAt(index + 1);
        return;
      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault();
        focusAt(index - 1);
        return;
      case 'Home':
        e.preventDefault();
        headers[0]?.focus();
        return;
      case 'End':
        e.preventDefault();
        headers[headers.length - 1]?.focus();
        return;
    }
  };

  return (
    <h3>
      <button
        type="button"
        id={id}
        data-accordion-header="true"
        aria-expanded={isExpanded}
        aria-controls={panelId}
        onClick={() => ctx.toggle(id)}
        onKeyDown={handleKeyDown}
        className={className}
        {...rest}
      >
        {children}
      </button>
    </h3>
  );
}

export interface AccordionPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  id: string;
  headerId: string;
}

export function AccordionPanel({ children, id, headerId, className, ...rest }: AccordionPanelProps) {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error('AccordionPanel must be inside Accordion');

  const isExpanded = ctx.expandedIds.has(headerId);

  if (!isExpanded) return null;

  return (
    <div
      id={id}
      role="region"
      aria-labelledby={headerId}
      hidden={!isExpanded}
      className={className}
      {...rest}
    >
      {children}
    </div>
  );
}
