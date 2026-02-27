/**
 * Table - W3C ARIA APG Pattern
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/table/
 */

import React from 'react';

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  (props, ref) => <table ref={ref} {...props} />
);

Table.displayName = 'Table';

export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

export const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  (props, ref) => <thead ref={ref} {...props} />
);

TableHeader.displayName = 'TableHeader';

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

export const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  (props, ref) => <tbody ref={ref} {...props} />
);

TableBody.displayName = 'TableBody';

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
}

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  (props, ref) => <tr ref={ref} {...props} />
);

TableRow.displayName = 'TableRow';

export interface TableCellProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
  as?: 'th' | 'td';
  scope?: 'row' | 'col' | 'rowgroup' | 'colgroup';
}

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ as: Component = 'td', scope, children, ...props }, ref) => (
    <Component ref={ref} scope={scope} {...props}>
      {children}
    </Component>
  )
);

TableCell.displayName = 'TableCell';
