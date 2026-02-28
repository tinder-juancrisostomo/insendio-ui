import {
  Box,
  Stack,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from '@design-system/base';
import { cn } from '@design-system/utils';
import type { ChartData, NetworkGraphData } from './types';

const tableCaptionClass =
  'absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0 [clip:rect(0,0,0,0)]';
const tableClass =
  'w-full text-[var(--ds-font-size-sm)] text-left border-collapse';
const thClass =
  'px-3 py-2 font-semibold text-[var(--ds-text-primary)]';
const tdClass = 'px-3 py-2 text-[var(--ds-text-secondary)]';
const rowBorderClass = 'border-b border-[var(--ds-border-default)]';

export function ChartDataTable({ data, caption }: { data: ChartData; caption: string }) {
  const headerCols =
    data.datasets.length > 1
      ? ['Category', ...data.datasets.map((d) => d.name ?? 'Value')]
      : ['Category', data.datasets[0]?.name ?? 'Value'];

  const rows =
    data.datasets.length > 1
      ? data.labels.map((label, i) => [label, ...data.datasets.map((d) => d.values[i])])
      : data.labels.map((label, i) => [label, data.datasets[0].values[i]]);

  return (
    <Box className="overflow-x-auto">
      <Table className={tableClass}>
        <caption className={tableCaptionClass}>{caption}</caption>
        <TableHeader>
          <TableRow className={rowBorderClass}>
            {headerCols.map((col) => (
              <TableCell key={col} as="th" scope="col" className={cn(thClass, 'font-semibold')}>
                {col}
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i} className={rowBorderClass}>
              {row.map((cell, j) => (
                <TableCell key={j} className={tdClass}>
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

export function PieChartDataTable({ data, caption }: { data: ChartData; caption: string }) {
  const total = data.datasets[0].values.reduce((a, b) => a + b, 0);
  const rows = data.labels.map((label, i) => {
    const val = data.datasets[0].values[i];
    const pct = total > 0 ? Math.round((val / total) * 100) : 0;
    return [label, val, `${pct}%`];
  });

  return (
    <Box className="overflow-x-auto">
      <Table className={tableClass}>
        <caption className={tableCaptionClass}>{caption}</caption>
        <TableHeader>
          <TableRow className={rowBorderClass}>
            <TableCell as="th" scope="col" className={thClass}>
              Category
            </TableCell>
            <TableCell as="th" scope="col" className={thClass}>
              Value
            </TableCell>
            <TableCell as="th" scope="col" className={thClass}>
              Share
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i} className={rowBorderClass}>
              {row.map((cell, j) => (
                <TableCell key={j} className={tdClass}>
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

export function NetworkGraphDataTable({ data, caption }: { data: NetworkGraphData; caption: string }) {
  const nodeRows = data.nodes.map((n) => [n.id, n.label ?? '', n.title ?? '']);
  const edgeRows = data.edges.map((e) => {
    const fromNode = data.nodes.find((n) => n.id === e.from);
    const toNode = data.nodes.find((n) => n.id === e.to);
    return [fromNode?.label ?? e.from, toNode?.label ?? e.to];
  });

  return (
    <Stack direction="vertical" gap={4}>
      <Box>
        <h4 className="m-0 mb-2 text-[var(--ds-font-size-sm)] font-semibold text-[var(--ds-text-primary)]">
          Nodes
        </h4>
        <Box className="overflow-x-auto">
          <Table className={tableClass}>
            <caption className={tableCaptionClass}>{caption} – Nodes</caption>
            <TableHeader>
              <TableRow className={rowBorderClass}>
                <TableCell as="th" scope="col" className={thClass}>
                  ID
                </TableCell>
                <TableCell as="th" scope="col" className={thClass}>
                  Label
                </TableCell>
                <TableCell as="th" scope="col" className={thClass}>
                  Description
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {nodeRows.map((row, i) => (
                <TableRow key={i} className={rowBorderClass}>
                  {row.map((cell, j) => (
                    <TableCell key={j} className={tdClass}>
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
      <Box>
        <h4 className="m-0 mb-2 text-[var(--ds-font-size-sm)] font-semibold text-[var(--ds-text-primary)]">
          Connections
        </h4>
        <Box className="overflow-x-auto">
          <Table className={tableClass}>
            <caption className={tableCaptionClass}>{caption} – Edges</caption>
            <TableHeader>
              <TableRow className={rowBorderClass}>
                <TableCell as="th" scope="col" className={thClass}>
                  From
                </TableCell>
                <TableCell as="th" scope="col" className={thClass}>
                  To
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {edgeRows.map((row, i) => (
                <TableRow key={i} className={rowBorderClass}>
                  {row.map((cell, j) => (
                    <TableCell key={j} className={tdClass}>
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </Stack>
  );
}
