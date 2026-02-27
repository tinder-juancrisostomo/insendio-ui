import { useInsendioComponents } from '../../components-context';
import { cn } from '@design-system/utils';

const tabThemes = {
  purple:
    'aria-selected:text-[var(--ds-tab-active-purple)] aria-selected:relative aria-selected:after:content-[""] aria-selected:after:block aria-selected:after:absolute aria-selected:after:bottom-0 aria-selected:after:left-0 aria-selected:after:right-0 aria-selected:after:h-0.5 aria-selected:after:bg-[var(--ds-tab-active-purple)]',
  blue:
    'aria-selected:text-[var(--ds-tab-active-blue)] aria-selected:relative aria-selected:after:content-[""] aria-selected:after:block aria-selected:after:absolute aria-selected:after:bottom-0 aria-selected:after:left-0 aria-selected:after:right-0 aria-selected:after:h-0.5 aria-selected:after:bg-[var(--ds-tab-active-blue)]',
} as const;

export type InsendioTabTheme = keyof typeof tabThemes;

export interface InsendioTabProps {
  id: string;
  children: React.ReactNode;
  theme?: InsendioTabTheme;
  className?: string;
}

/**
 * Specialized Tab: wraps generic Tab with Insendio tab styling.
 * Theme variants: purple (default) for Data/Settings, blue for Notifications/Monitoring.
 */
export function InsendioTab({ id, children, theme = 'purple', className }: InsendioTabProps) {
  const { Tab } = useInsendioComponents();
  return (
    <Tab
      id={id}
      className={cn(
        'px-3 py-2.5 sm:px-4 sm:py-3 text-sm font-medium -mb-px flex items-center gap-2 transition-colors',
        tabThemes[theme],
        className
      )}
    >
      {children}
    </Tab>
  );
}

export type InsendioTabListAlign = 'left' | 'center' | 'right';

export interface InsendioTabListProps {
  children: React.ReactNode;
  /** Tab alignment (default: left). Overrides library defaults like MUI's justify-center. */
  align?: InsendioTabListAlign;
  className?: string;
}

const alignClasses: Record<InsendioTabListAlign, string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
};

/**
 * Specialized TabList: wraps generic TabList with standard Insendio styling.
 * Tabs are aligned left by default (overrides library defaults like MUI's justify-center).
 * Always scrollable on overflow (overflow-x-auto) for mobile; pb-1 prevents clipping the active indicator.
 */
export function InsendioTabList({ children, align = 'left', className }: InsendioTabListProps) {
  const { TabList } = useInsendioComponents();
  return (
    <TabList
      className={cn(
        'flex gap-1 border-b border-transparent bg-transparent flex-nowrap w-full min-w-0',
        'h-auto min-h-[44px] overflow-x-auto overflow-y-hidden pb-1 [-webkit-overflow-scrolling:touch]',
        alignClasses[align],
        className
      )}
    >
      {children}
    </TabList>
  );
}
