import { useState, useEffect } from 'react';
import { Box, Button } from '@design-system/base';
import { cn } from '@design-system/utils';

export type ChartViewMode = 'chart' | 'table' | 'figcaption';

export interface ChartAccessibilityProps {
  /** Short description for aria-label (identifies the chart) */
  'aria-label'?: string;
  /** ID of element containing long description */
  'aria-describedby'?: string;
  /** Long description text (used when no table; otherwise table is the long description) */
  longDescription?: string;
  /** Caption for the figure */
  caption?: string;
  /** Show view switch (chart / table / figcaption). Default: true */
  showViewSwitch?: boolean;
  /** Initial view mode. Use 'table' for screen reader users who prefer tabular data. */
  defaultView?: ChartViewMode;
}

const viewModeLabels: Record<ChartViewMode, string> = {
  chart: 'Chart',
  table: 'Table',
  figcaption: 'Details',
};

export function ChartWrapper({
  children,
  dataTable,
  accessibilityProps = {},
  defaultView = 'chart',
}: {
  children: React.ReactNode;
  dataTable: React.ReactNode;
  accessibilityProps?: ChartAccessibilityProps;
  defaultView?: ChartViewMode;
}) {
  const {
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedby,
    longDescription,
    caption,
    showViewSwitch = true,
    defaultView: a11yDefaultView,
  } = accessibilityProps;

  const resolvedDefaultView = a11yDefaultView ?? defaultView;
  const [viewMode, setViewMode] = useState<ChartViewMode>(resolvedDefaultView);

  useEffect(() => {
    setViewMode(resolvedDefaultView);
  }, [resolvedDefaultView]);

  const visibleModes: ChartViewMode[] = longDescription
    ? ['chart', 'table', 'figcaption']
    : ['chart', 'table'];

  useEffect(() => {
    if (viewMode === 'figcaption' && !longDescription) {
      setViewMode('table');
    }
  }, [viewMode, longDescription]);

  const altContent = (
    <figcaption className="p-4 text-[var(--ds-font-size-sm)]">
      {caption ? (
        <p className="mb-2 font-semibold text-[var(--ds-text-primary)]">{caption}</p>
      ) : null}
      {dataTable}
      {viewMode === 'figcaption' && longDescription ? (
        <p className="mt-3 text-[var(--ds-text-secondary)]">{longDescription}</p>
      ) : null}
    </figcaption>
  );

  return (
    <figure
      role="group"
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
      className={cn(
        'chart-wrapper m-0 overflow-hidden rounded-[var(--ds-radius-md)] bg-[var(--ds-bg-surface)] p-0'
      )}
    >
      {showViewSwitch ? (
        <Box
          className="chart-wrapper-switch flex gap-1.5 px-3 py-2 text-[0.8125rem]"
          role="tablist"
          aria-label="Chart view"
        >
          {visibleModes.map((mode) => (
            <Button
              key={mode}
              type="button"
              role="tab"
              aria-selected={viewMode === mode}
              aria-label={`View as ${viewModeLabels[mode]}`}
              onClick={() => setViewMode(mode)}
              className={cn(
                'cursor-pointer rounded-[var(--ds-radius-sm)] px-2.5 py-1.5 text-[0.8125rem] transition-colors duration-150',
                viewMode === mode
                  ? 'bg-[var(--ds-bg-muted)] font-semibold text-[var(--ds-text-primary)]'
                  : 'bg-transparent font-normal text-[var(--ds-text-secondary)] hover:bg-[var(--ds-bg-muted)]/50'
              )}
            >
              {viewModeLabels[mode]}
            </Button>
          ))}
        </Box>
      ) : null}

      {viewMode === 'chart' ? (
        <Box role="img" aria-label={ariaLabel} aria-describedby={ariaDescribedby} className="p-4">
          {children}
        </Box>
      ) : (
        altContent
      )}
    </figure>
  );
}
