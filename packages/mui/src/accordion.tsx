/**
 * Accordion - MUI Accordion with design system API compatibility
 */
import * as React from 'react';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  allowMultiple?: boolean;
  defaultExpanded?: string[];
}

const AccordionContext = React.createContext<{
  expandedIds: Set<string>;
  toggle: (id: string) => void;
  allowMultiple: boolean;
} | null>(null);

export function Accordion({
  children,
  allowMultiple = false,
  defaultExpanded = [],
  className,
  ...rest
}: AccordionProps) {
  const [expandedIds, setExpandedIds] = React.useState<Set<string>>(
    () => new Set(defaultExpanded)
  );

  const toggle = React.useCallback(
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
    <AccordionContext.Provider value={{ expandedIds, toggle, allowMultiple }}>
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

const ACCORDION_HEADER = Symbol('AccordionHeader');
const ACCORDION_PANEL = Symbol('AccordionPanel');

function isAccordionHeader(c: React.ReactNode): c is React.ReactElement<{ id: string; panelId: string; children?: React.ReactNode }> {
  return React.isValidElement(c) && (c.type as { _accordion?: symbol })?._accordion === ACCORDION_HEADER;
}

function isAccordionPanel(c: React.ReactNode): c is React.ReactElement<{ id: string; headerId: string; children?: React.ReactNode }> {
  return React.isValidElement(c) && (c.type as { _accordion?: symbol })?._accordion === ACCORDION_PANEL;
}

export function AccordionItem({ children, id, className }: AccordionItemProps) {
  const ctx = React.useContext(AccordionContext);
  if (!ctx) throw new Error('AccordionItem must be inside Accordion');

  const kids = React.Children.toArray(children);
  const headerEl = kids.find(isAccordionHeader);
  const panelEl = kids.find(isAccordionPanel);

  const headerId = headerEl?.props.id ?? `${id}-header`;
  const panelId = panelEl?.props.id ?? `${id}-panel`;

  const expanded = ctx.expandedIds.has(headerId);

  return (
    <MuiAccordion
      expanded={expanded}
      onChange={(_event: React.SyntheticEvent, _expanded: boolean) => ctx.toggle(headerId)}
      disableGutters
      elevation={0}
      className={className}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        '&:not(:last-child)': { borderBottom: 0 },
        '&::before': { display: 'none' },
      }}
    >
      <MuiAccordionSummary expandIcon={<ExpandMoreIcon />} id={headerId} aria-controls={panelId}>
        {headerEl && React.isValidElement(headerEl) ? headerEl.props.children : null}
      </MuiAccordionSummary>
      <MuiAccordionDetails id={panelId} aria-labelledby={headerId}>
        {panelEl && React.isValidElement(panelEl) ? panelEl.props.children : null}
      </MuiAccordionDetails>
    </MuiAccordion>
  );
}

export interface AccordionHeaderProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  id: string;
  panelId: string;
}

function AccordionHeaderImpl({ children }: AccordionHeaderProps) {
  return <>{children}</>;
}
(AccordionHeaderImpl as React.FC & { _accordion: symbol })._accordion = ACCORDION_HEADER;
export const AccordionHeader = AccordionHeaderImpl;

export interface AccordionPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  id: string;
  headerId: string;
}

function AccordionPanelImpl({ children }: AccordionPanelProps) {
  return <>{children}</>;
}
(AccordionPanelImpl as React.FC & { _accordion: symbol })._accordion = ACCORDION_PANEL;
export const AccordionPanel = AccordionPanelImpl;
