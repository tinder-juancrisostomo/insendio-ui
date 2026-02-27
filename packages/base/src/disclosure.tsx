/**
 * Disclosure - W3C ARIA APG Pattern
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/
 */

import React, { useState, useCallback, createContext, useContext } from 'react';
import { useId } from './utils/useId';

interface DisclosureContextValue {
  expanded: boolean;
  toggle: () => void;
  triggerId: string;
  panelId: string;
}

const DisclosureContext = createContext<DisclosureContextValue | null>(null);

export interface DisclosureProps {
  children: React.ReactNode;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
}

export function Disclosure({
  children,
  expanded: controlledExpanded,
  defaultExpanded = false,
  onExpandedChange,
}: DisclosureProps) {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const isControlled = controlledExpanded !== undefined;
  const expanded = isControlled ? controlledExpanded : internalExpanded;
  const triggerId = useId();
  const panelId = useId();

  const toggle = useCallback(() => {
    const next = !expanded;
    if (!isControlled) setInternalExpanded(next);
    onExpandedChange?.(next);
  }, [expanded, isControlled, onExpandedChange]);

  return (
    <DisclosureContext.Provider
      value={{ expanded, toggle, triggerId, panelId }}
    >
      {children}
    </DisclosureContext.Provider>
  );
}

export interface DisclosureTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function DisclosureTrigger({ children, ...props }: DisclosureTriggerProps) {
  const ctx = useContext(DisclosureContext);
  if (!ctx) throw new Error('DisclosureTrigger must be inside Disclosure');

  return (
    <button
      type="button"
      aria-expanded={ctx.expanded}
      aria-controls={ctx.panelId}
      id={ctx.triggerId}
      onClick={ctx.toggle}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          ctx.toggle();
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
}

export interface DisclosurePanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function DisclosurePanel({ children, ...props }: DisclosurePanelProps) {
  const ctx = useContext(DisclosureContext);
  if (!ctx) throw new Error('DisclosurePanel must be inside Disclosure');

  return (
    <div
      id={ctx.panelId}
      role="region"
      aria-labelledby={ctx.triggerId}
      hidden={!ctx.expanded}
      {...props}
    >
      {children}
    </div>
  );
}
