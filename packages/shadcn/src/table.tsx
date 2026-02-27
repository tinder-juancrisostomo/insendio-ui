import React from 'react';
import {
  Table as BaseTable,
  TableHeader as BaseTableHeader,
  TableBody as BaseTableBody,
  TableRow as BaseTableRow,
  TableCell as BaseTableCell,
  type TableProps as BaseTableProps,
  type TableHeaderProps as BaseTableHeaderProps,
  type TableBodyProps as BaseTableBodyProps,
  type TableRowProps as BaseTableRowProps,
  type TableCellProps as BaseTableCellProps,
} from '@design-system/base';
import { cn } from '@design-system/utils';

export const Table = React.forwardRef<HTMLTableElement, BaseTableProps>(
  ({ className, ...props }, ref) => (
    <BaseTable ref={ref} className={cn('w-full caption-bottom text-sm', className)} {...props} />
  )
);
Table.displayName = 'Table';

export const TableHeader = React.forwardRef<HTMLTableSectionElement, BaseTableHeaderProps>(
  ({ className, ...props }, ref) => (
    <BaseTableHeader ref={ref} className={cn('border-b border-gray-200', className)} {...props} />
  )
);
TableHeader.displayName = 'TableHeader';

export const TableBody = React.forwardRef<HTMLTableSectionElement, BaseTableBodyProps>(
  ({ className, ...props }, ref) => (
    <BaseTableBody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />
  )
);
TableBody.displayName = 'TableBody';

export const TableRow = React.forwardRef<HTMLTableRowElement, BaseTableRowProps>(
  ({ className, ...props }, ref) => (
    <BaseTableRow
      ref={ref}
      className={cn('border-b border-gray-200 transition-colors hover:bg-gray-50', className)}
      {...props}
    />
  )
);
TableRow.displayName = 'TableRow';

export const TableCell = React.forwardRef<HTMLTableCellElement, BaseTableCellProps>(
  ({ className, ...props }, ref) => (
    <BaseTableCell
      ref={ref}
      className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)}
      {...props}
    />
  )
);
TableCell.displayName = 'TableCell';
