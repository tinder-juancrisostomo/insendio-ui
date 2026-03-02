import React, { createContext, useContext, useState, useCallback } from 'react';
import { Tabs as DaisyTabs } from 'react-daisyui';

const DaisyTab = (DaisyTabs as any).Tab;
import { cn } from '@design-system/utils';

interface TabsContextValue {
  selectedId: string;
  select: (id: string) => void;
  tabIds: string[];
  registerTab: (id: string) => void;
  registerTabEl: (id: string, el: HTMLButtonElement | null) => void;
  focusTab: (id: string) => void;
  panelId: (tabId: string) => string;
  handleKeyDown?: (e: React.KeyboardEvent, currentIndex: number) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  selectedId?: string;
  defaultSelectedId?: string;
  onSelectedChange?: (id: string) => void;
}

export function Tabs({
  children,
  selectedId: controlledId,
  defaultSelectedId,
  onSelectedChange,
  className,
  ...rest
}: TabsProps) {
  const [internalId, setInternalId] = useState(defaultSelectedId ?? '');
  const [tabIds, setTabIds] = useState<string[]>([]);
  const isControlled = controlledId !== undefined;
  const selectedId = isControlled ? controlledId : internalId;
  const tabElsRef = React.useRef(new Map<string, HTMLButtonElement>());

  const select = useCallback(
    (id: string) => {
      if (!isControlled) setInternalId(id);
      onSelectedChange?.(id);
    },
    [isControlled, onSelectedChange]
  );

  const registerTab = useCallback((id: string) => {
    setTabIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const registerTabEl = useCallback((id: string, el: HTMLButtonElement | null) => {
    if (!el) tabElsRef.current.delete(id);
    else tabElsRef.current.set(id, el);
  }, []);

  const focusTab = useCallback((id: string) => {
    tabElsRef.current.get(id)?.focus();
  }, []);

  const panelId = useCallback((tabId: string) => `${tabId}-panel`, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, currentIndex: number) => {
      let nextIndex = currentIndex;
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          nextIndex = Math.min(currentIndex + 1, tabIds.length - 1);
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          nextIndex = Math.max(currentIndex - 1, 0);
          break;
        case 'Home':
          e.preventDefault();
          nextIndex = 0;
          break;
        case 'End':
          e.preventDefault();
          nextIndex = tabIds.length - 1;
          break;
        default:
          return;
      }
      const nextId = tabIds[nextIndex];
      if (nextId) {
        select(nextId);
        focusTab(nextId);
      }
    },
    [tabIds, select, focusTab]
  );

  return (
    <TabsContext.Provider
      value={{
        selectedId,
        select,
        tabIds,
        registerTab,
        registerTabEl,
        focusTab,
        panelId,
        handleKeyDown,
      }}
    >
      <div className={cn('tabs-boxed tabs w-full', className)} {...rest}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export interface TabListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function TabList({ children, ...props }: TabListProps) {
  return <div role="tablist" {...props}>{children}</div>;
}

export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  id: string;
}

export function Tab({ children, id, className, ...props }: TabProps) {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tab must be inside Tabs');

  React.useEffect(() => {
    ctx.registerTab(id);
  }, [id, ctx]);

  const index = ctx.tabIds.indexOf(id);
  const isSelected = ctx.selectedId === id;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    ctx.handleKeyDown?.(e, index);
  };

  return (
    <DaisyTab
      ref={(el: HTMLButtonElement | null) => ctx.registerTabEl(id, el)}
      role="tab"
      aria-selected={isSelected}
      aria-controls={ctx.panelId(id)}
      tabIndex={isSelected ? 0 : -1}
      active={isSelected}
      onClick={() => ctx.select(id)}
      onKeyDown={handleKeyDown}
      className={cn('tab', className)}
      {...props}
    >
      {children}
    </DaisyTab>
  );
}

export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  tabId: string;
  unmountWhenInactive?: boolean;
}

export function TabPanel({
  children,
  tabId,
  unmountWhenInactive = true,
  ...props
}: TabPanelProps) {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('TabPanel must be inside Tabs');

  const isSelected = ctx.selectedId === tabId;
  const shouldRender = isSelected || !unmountWhenInactive;

  return (
    <div
      role="tabpanel"
      id={ctx.panelId(tabId)}
      aria-labelledby={tabId}
      hidden={!isSelected}
      tabIndex={0}
      {...props}
    >
      {shouldRender ? children : null}
    </div>
  );
}
