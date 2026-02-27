/**
 * Tree View - W3C ARIA APG Pattern
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/treeview/
 *
 * Data-driven, headless tree view with roving tabindex and core keyboard interactions.
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export interface TreeNode {
  id: string;
  label: React.ReactNode;
  children?: TreeNode[];
  disabled?: boolean;
}

export interface TreeViewProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TreeNode[];
  /** Controlled expanded ids. */
  expandedIds?: string[];
  /** Uncontrolled default expanded ids. */
  defaultExpandedIds?: string[];
  onExpandedChange?: (expandedIds: string[]) => void;

  /** Controlled selected id (single-select). */
  selectedId?: string;
  /** Uncontrolled default selected id. */
  defaultSelectedId?: string;
  onSelectedChange?: (id: string) => void;

  /** Accessible label for the tree. */
  'aria-label'?: string;
}

type FlatNode = {
  id: string;
  labelText: string;
  disabled: boolean;
  hasChildren: boolean;
  parentId: string | null;
  level: number;
  posInSet: number;
  setSize: number;
  node: TreeNode;
};

function getText(node: React.ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  return '';
}

export function TreeView({
  items,
  expandedIds: expandedIdsProp,
  defaultExpandedIds = [],
  onExpandedChange,
  selectedId: selectedIdProp,
  defaultSelectedId,
  onSelectedChange,
  'aria-label': ariaLabel = 'Tree view',
  ...props
}: TreeViewProps) {
  const [expandedInternal, setExpandedInternal] = useState<Set<string>>(
    () => new Set(defaultExpandedIds)
  );
  const expandedSet = expandedIdsProp ? new Set(expandedIdsProp) : expandedInternal;
  const isExpandedControlled = expandedIdsProp !== undefined;

  const [selectedInternal, setSelectedInternal] = useState<string | undefined>(defaultSelectedId);
  const selectedId = selectedIdProp !== undefined ? selectedIdProp : selectedInternal;
  const isSelectedControlled = selectedIdProp !== undefined;

  const rootRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef(new Map<string, HTMLDivElement>());

  const flat = useMemo(() => {
    const out: FlatNode[] = [];

    const walk = (nodes: TreeNode[], parentId: string | null, level: number) => {
      const setSize = nodes.length;
      nodes.forEach((n, idx) => {
        const hasChildren = !!n.children?.length;
        out.push({
          id: n.id,
          labelText: getText(n.label).toLowerCase(),
          disabled: !!n.disabled,
          hasChildren,
          parentId,
          level,
          posInSet: idx + 1,
          setSize,
          node: n,
        });
        if (hasChildren && expandedSet.has(n.id)) {
          walk(n.children!, n.id, level + 1);
        }
      });
    };

    walk(items, null, 1);
    return out;
  }, [items, expandedSet]);

  const idToIndex = useMemo(() => {
    const m = new Map<string, number>();
    flat.forEach((n, i) => m.set(n.id, i));
    return m;
  }, [flat]);

  const firstEnabledId = useMemo(() => flat.find((n) => !n.disabled)?.id, [flat]);

  const [focusedId, setFocusedId] = useState<string | null>(null);

  useEffect(() => {
    if (!flat.length) return;
    setFocusedId((prev) => {
      if (prev && idToIndex.has(prev)) return prev;
      if (selectedId && idToIndex.has(selectedId)) return selectedId;
      return firstEnabledId ?? flat[0]!.id;
    });
  }, [flat, idToIndex, selectedId, firstEnabledId]);

  const setExpanded = useCallback(
    (next: Set<string>) => {
      if (!isExpandedControlled) setExpandedInternal(next);
      onExpandedChange?.([...next]);
    },
    [isExpandedControlled, onExpandedChange]
  );

  const setSelected = useCallback(
    (id: string) => {
      if (!isSelectedControlled) setSelectedInternal(id);
      onSelectedChange?.(id);
    },
    [isSelectedControlled, onSelectedChange]
  );

  const focusById = useCallback((id: string) => {
    setFocusedId(id);
    queueMicrotask(() => {
      itemRefs.current.get(id)?.focus();
    });
  }, []);

  const toggleExpand = useCallback(
    (id: string) => {
      const next = new Set(expandedSet);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      setExpanded(next);
    },
    [expandedSet, setExpanded]
  );

  const focusNext = useCallback(
    (currentId: string, dir: 1 | -1) => {
      const start = idToIndex.get(currentId);
      if (start === undefined) return;
      let i = start + dir;
      while (i >= 0 && i < flat.length) {
        if (!flat[i]!.disabled) {
          focusById(flat[i]!.id);
          return;
        }
        i += dir;
      }
    },
    [flat, idToIndex, focusById]
  );

  const focusFirst = useCallback(() => {
    const id = flat.find((n) => !n.disabled)?.id;
    if (id) focusById(id);
  }, [flat, focusById]);

  const focusLast = useCallback(() => {
    for (let i = flat.length - 1; i >= 0; i--) {
      if (!flat[i]!.disabled) {
        focusById(flat[i]!.id);
        return;
      }
    }
  }, [flat, focusById]);

  const typeaheadRef = useRef({ buffer: '', lastAt: 0 });

  const handleTypeahead = useCallback(
    (key: string, currentId: string) => {
      const now = Date.now();
      const state = typeaheadRef.current;
      if (now - state.lastAt > 700) state.buffer = '';
      state.lastAt = now;
      state.buffer += key.toLowerCase();

      const start = idToIndex.get(currentId) ?? 0;
      const look = [...flat.slice(start + 1), ...flat.slice(0, start + 1)];
      const hit = look.find((n) => !n.disabled && n.labelText && n.labelText.startsWith(state.buffer));
      if (hit) focusById(hit.id);
    },
    [flat, idToIndex, focusById]
  );

  const handleItemKeyDown = useCallback(
    (n: FlatNode) => (e: React.KeyboardEvent) => {
      if (n.disabled) return;

      // Type-ahead (printable chars without modifiers)
      if (
        e.key.length === 1 &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey
      ) {
        handleTypeahead(e.key, n.id);
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          focusNext(n.id, 1);
          return;
        case 'ArrowUp':
          e.preventDefault();
          focusNext(n.id, -1);
          return;
        case 'Home':
          e.preventDefault();
          focusFirst();
          return;
        case 'End':
          e.preventDefault();
          focusLast();
          return;
        case 'ArrowRight': {
          e.preventDefault();
          if (n.hasChildren && !expandedSet.has(n.id)) {
            toggleExpand(n.id);
            return;
          }
          // If expanded, move to first child.
          if (n.hasChildren && expandedSet.has(n.id)) {
            const idx = idToIndex.get(n.id);
            if (idx !== undefined && flat[idx + 1] && flat[idx + 1]!.parentId === n.id) {
              focusById(flat[idx + 1]!.id);
            }
          }
          return;
        }
        case 'ArrowLeft': {
          e.preventDefault();
          if (n.hasChildren && expandedSet.has(n.id)) {
            toggleExpand(n.id);
            return;
          }
          if (n.parentId) focusById(n.parentId);
          return;
        }
        case 'Enter':
        case ' ': {
          e.preventDefault();
          setSelected(n.id);
          return;
        }
      }
    },
    [
      expandedSet,
      toggleExpand,
      idToIndex,
      flat,
      focusById,
      focusNext,
      focusFirst,
      focusLast,
      setSelected,
      handleTypeahead,
    ]
  );

  const handleItemClick = useCallback(
    (n: FlatNode) => {
      if (n.disabled) return;
      setSelected(n.id);
      setFocusedId(n.id);
      if (n.hasChildren) toggleExpand(n.id);
    },
    [setSelected, toggleExpand]
  );

  return (
    <div
      ref={rootRef}
      role="tree"
      aria-label={ariaLabel}
      {...props}
    >
      {flat.map((n) => {
        const isSelected = selectedId === n.id;
        const isExpanded = n.hasChildren ? expandedSet.has(n.id) : undefined;
        const isFocused = focusedId === n.id;
        return (
          <div
            key={n.id}
            ref={(el) => {
              if (!el) itemRefs.current.delete(n.id);
              else itemRefs.current.set(n.id, el);
            }}
            role="treeitem"
            aria-level={n.level}
            aria-posinset={n.posInSet}
            aria-setsize={n.setSize}
            aria-selected={isSelected}
            aria-expanded={isExpanded}
            aria-disabled={n.disabled || undefined}
            tabIndex={n.disabled ? -1 : isFocused ? 0 : -1}
            onFocus={() => setFocusedId(n.id)}
            onClick={() => handleItemClick(n)}
            onKeyDown={handleItemKeyDown(n)}
            style={{
              paddingInlineStart: `calc(var(--ds-space-2) * ${n.level - 1})`,
              outline: 'none',
              cursor: n.disabled ? 'not-allowed' : 'pointer',
              opacity: n.disabled ? 0.6 : 1,
            }}
          >
            {n.hasChildren ? (
              <span aria-hidden style={{ marginInlineEnd: 'var(--ds-space-2)' }}>
                {expandedSet.has(n.id) ? '▾' : '▸'}
              </span>
            ) : (
              <span aria-hidden style={{ marginInlineEnd: 'var(--ds-space-2)' }} />
            )}
            {n.node.label}
          </div>
        );
      })}
    </div>
  );
}

