import React from 'react';
import { Table as DaisyTable } from 'react-daisyui';
import { cn } from '@design-system/utils';

export const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <DaisyTable ref={ref} className={cn('w-full', className)} {...props} />
  )
);
Table.displayName = 'Table';

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn(className)} {...props} />
));
TableHeader.displayName = 'TableHeader';

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn(className)} {...props} />
));
TableBody.displayName = 'TableBody';

export const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr ref={ref} className={cn('hover', className)} {...props} />
));
TableRow.displayName = 'TableRow';

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  as?: 'td' | 'th';
}

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, as: Comp = 'td', ...props }, ref) => (
    <Comp ref={ref as any} className={cn(Comp === 'th' ? 'font-semibold' : '', className)} {...props} />
  )
);
TableCell.displayName = 'TableCell';
