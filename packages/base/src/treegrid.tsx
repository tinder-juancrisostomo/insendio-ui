/**
 * Treegrid - W3C ARIA APG Pattern
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/treegrid/
 *
 * Data-driven, headless treegrid with core keyboard navigation and row expansion.
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export interface TreeGridColumn {
  id: string;
  header: React.ReactNode;
}

export interface TreeGridRow {
  id: string;
  cells: React.ReactNode[];
  children?: TreeGridRow[];
  disabled?: boolean;
}

export interface TreeGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns: TreeGridColumn[];
  rows: TreeGridRow[];
  /** Accessible label for the treegrid. */
  'aria-label'?: string;

  expandedRowIds?: string[];
  defaultExpandedRowIds?: string[];
  onExpandedChange?: (expandedIds: string[]) => void;
}

type FlatRow = {
  id: string;
  level: number;
  parentId: string | null;
  posInSet: number;
  setSize: number;
  hasChildren: boolean;
  disabled: boolean;
  row: TreeGridRow;
};

export function TreeGrid({
  columns,
  rows,
  'aria-label': ariaLabel = 'Treegrid',
  expandedRowIds: expandedRowIdsProp,
  defaultExpandedRowIds = [],
  onExpandedChange,
  ...props
}: TreeGridProps) {
  const [expandedInternal, setExpandedInternal] = useState<Set<string>>(
    () => new Set(defaultExpandedRowIds)
  );
  const expandedSet = expandedRowIdsProp ? new Set(expandedRowIdsProp) : expandedInternal;
  const isExpandedControlled = expandedRowIdsProp !== undefined;

  const setExpanded = useCallback(
    (next: Set<string>) => {
      if (!isExpandedControlled) setExpandedInternal(next);
      onExpandedChange?.([...next]);
    },
    [isExpandedControlled, onExpandedChange]
  );

  const flatRows = useMemo(() => {
    const out: FlatRow[] = [];
    const walk = (nodes: TreeGridRow[], parentId: string | null, level: number) => {
      const setSize = nodes.length;
      nodes.forEach((r, idx) => {
        const hasChildren = !!r.children?.length;
        out.push({
          id: r.id,
          level,
          parentId,
          posInSet: idx + 1,
          setSize,
          hasChildren,
          disabled: !!r.disabled,
          row: r,
        });
        if (hasChildren && expandedSet.has(r.id)) {
          walk(r.children!, r.id, level + 1);
        }
      });
    };
    walk(rows, null, 1);
    return out;
  }, [rows, expandedSet]);

  const rowIndexById = useMemo(() => {
    const m = new Map<string, number>();
    flatRows.forEach((r, i) => m.set(r.id, i));
    return m;
  }, [flatRows]);

  const cellRefs = useRef(new Map<string, HTMLDivElement>());
  const keyFor = (rowId: string, colIndex: number) => `${rowId}::${colIndex}`;

  const [focus, setFocus] = useState<{ rowId: string; col: number } | null>(null);

  useEffect(() => {
    if (!flatRows.length || !columns.length) return;
    setFocus((prev) => {
      if (prev && rowIndexById.has(prev.rowId)) return prev;
      return { rowId: flatRows[0]!.id, col: 0 };
    });
  }, [flatRows, columns.length, rowIndexById]);

  const focusCell = useCallback((rowId: string, col: number) => {
    setFocus({ rowId, col });
    queueMicrotask(() => {
      cellRefs.current.get(keyFor(rowId, col))?.focus();
    });
  }, []);

  const toggleRow = useCallback(
    (rowId: string) => {
      const next = new Set(expandedSet);
      if (next.has(rowId)) next.delete(rowId);
      else next.add(rowId);
      setExpanded(next);
    },
    [expandedSet, setExpanded]
  );

  const moveRow = useCallback(
    (fromRowId: string, dir: 1 | -1) => {
      const start = rowIndexById.get(fromRowId);
      if (start === undefined) return null;
      let i = start + dir;
      while (i >= 0 && i < flatRows.length) {
        const r = flatRows[i]!;
        if (!r.disabled) return r.id;
        i += dir;
      }
      return null;
    },
    [flatRows, rowIndexById]
  );

  const handleCellKeyDown = useCallback(
    (rowMeta: FlatRow, colIndex: number) => (e: React.KeyboardEvent) => {
      if (!focus) return;
      const currentRowId = rowMeta.id;
      const currentCol = colIndex;

      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault();
          const nextRowId = moveRow(currentRowId, 1);
          if (nextRowId) focusCell(nextRowId, currentCol);
          return;
        }
        case 'ArrowUp': {
          e.preventDefault();
          const prevRowId = moveRow(currentRowId, -1);
          if (prevRowId) focusCell(prevRowId, currentCol);
          return;
        }
        case 'ArrowRight': {
          e.preventDefault();
          if (currentCol === 0 && rowMeta.hasChildren && !expandedSet.has(rowMeta.id)) {
            toggleRow(rowMeta.id);
            return;
          }
          const nextCol = Math.min(columns.length - 1, currentCol + 1);
          focusCell(currentRowId, nextCol);
          return;
        }
        case 'ArrowLeft': {
          e.preventDefault();
          if (currentCol === 0 && rowMeta.hasChildren && expandedSet.has(rowMeta.id)) {
            toggleRow(rowMeta.id);
            return;
          }
          const prevCol = Math.max(0, currentCol - 1);
          focusCell(currentRowId, prevCol);
          return;
        }
        case 'Home': {
          e.preventDefault();
          focusCell(currentRowId, 0);
          return;
        }
        case 'End': {
          e.preventDefault();
          focusCell(currentRowId, columns.length - 1);
          return;
        }
        case 'Enter':
        case ' ': {
          if (currentCol === 0 && rowMeta.hasChildren) {
            e.preventDefault();
            toggleRow(rowMeta.id);
          }
          return;
        }
        default:
          return;
      }
    },
    [columns.length, expandedSet, focus, focusCell, moveRow, toggleRow]
  );

  return (
    <div role="treegrid" aria-label={ariaLabel} {...props}>
      <div role="rowgroup">
        <div role="row">
          {columns.map((c) => (
            <div
              key={c.id}
              role="columnheader"
              tabIndex={-1}
              style={{ fontWeight: 600 }}
            >
              {c.header}
            </div>
          ))}
        </div>
      </div>
      <div role="rowgroup">
        {flatRows.map((r) => {
          const isExpanded = r.hasChildren ? expandedSet.has(r.id) : undefined;
          return (
            <div
              key={r.id}
              role="row"
              aria-level={r.level}
              aria-posinset={r.posInSet}
              aria-setsize={r.setSize}
              aria-expanded={isExpanded}
              aria-disabled={r.disabled || undefined}
            >
              {columns.map((c, colIndex) => {
                const isFocused = focus?.rowId === r.id && focus?.col === colIndex;
                const cellContent = r.row.cells[colIndex] ?? null;
                return (
                  <div
                    key={keyFor(r.id, colIndex)}
                    ref={(el) => {
                      const k = keyFor(r.id, colIndex);
                      if (!el) cellRefs.current.delete(k);
                      else cellRefs.current.set(k, el);
                    }}
                    role="gridcell"
                    tabIndex={r.disabled ? -1 : isFocused ? 0 : -1}
                    onFocus={() => setFocus({ rowId: r.id, col: colIndex })}
                    onKeyDown={handleCellKeyDown(r, colIndex)}
                    onDoubleClick={() => colIndex === 0 && r.hasChildren && toggleRow(r.id)}
                    style={{
                      outline: 'none',
                      paddingInlineStart:
                        colIndex === 0 ? `calc(var(--ds-space-2) * ${r.level - 1})` : undefined,
                      cursor: colIndex === 0 && r.hasChildren ? 'pointer' : undefined,
                      opacity: r.disabled ? 0.6 : 1,
                    }}
                  >
                    {colIndex === 0 && r.hasChildren ? (
                      <span aria-hidden style={{ marginInlineEnd: 'var(--ds-space-2)' }}>
                        {expandedSet.has(r.id) ? '▾' : '▸'}
                      </span>
                    ) : colIndex === 0 ? (
                      <span aria-hidden style={{ marginInlineEnd: 'var(--ds-space-2)' }} />
                    ) : null}
                    {cellContent}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

