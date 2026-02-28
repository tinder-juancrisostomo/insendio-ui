import { useParams, Link } from 'react-router-dom';
import { Text } from '@design-system/typography';
import { ChartDoc } from '../components/ChartDoc';
import { useTheme } from '../context/ThemeContext';
import { CHART_IDS } from '../content/chartDocs';

export function ChartsPage() {
  const { chartId } = useParams();
  const { theme } = useTheme();
  const activeId = chartId ?? 'bar';

  const linkClass = (id: string) =>
    `w-full px-3 py-1.5 rounded text-sm text-left transition-colors ${
      activeId === id
        ? 'bg-[var(--ds-bg-active-tab)] text-[var(--ds-text-primary)]'
        : 'text-[var(--ds-text-secondary)] hover:bg-[var(--ds-bg-elevated)]'
    }`;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="lg:flex lg:gap-10">
        <aside className="lg:w-64 lg:flex-none">
          <nav
            className="lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:overflow-auto rounded-lg border border-[var(--ds-border-default)] bg-[var(--ds-bg-surface)] p-4"
            aria-label="Chart list"
          >
            <Text variant="overline" as="h2" className="block">Charts</Text>
            <div className="mt-2 flex flex-col gap-1">
              {CHART_IDS.map((id) => (
                <Link
                  key={id}
                  to={`/charts/${id}`}
                  className={linkClass(id)}
                  aria-current={activeId === id ? 'page' : undefined}
                >
                  {id === 'network-graph' ? 'Network graph' : id.charAt(0).toUpperCase() + id.slice(1)}
                </Link>
              ))}
            </div>
          </nav>
        </aside>

        <main className="min-w-0 flex-1 pt-8 lg:pt-0" aria-label="Chart documentation">
          <ChartDoc chartId={activeId} theme={theme} />
        </main>
      </div>
    </div>
  );
}
