import { useParams, Link } from 'react-router-dom';
import { useLib } from '../context/LibContext';
import { ComponentDoc } from '../components/ComponentDoc';

const COMPONENT_IDS = [
  'accordion',
  'alert',
  'alert-dialog',
  'breadcrumb',
  'button',
  'carousel',
  'checkbox',
  'combobox',
  'dialog',
  'disclosure',
  'link',
  'listbox',
  'menu',
  'radio-group',
  'slider',
  'switch',
  'table',
  'tabs',
  'toolbar',
  'tooltip',
  'tree-view',
  'treegrid',
  'window-splitter',
];

const LAYOUT_IDS = ['box', 'container', 'stack', 'inline', 'grid', 'spacer', 'divider', 'center'];

const LANDMARK_IDS = [
  'banner',
  'main',
  'nav',
  'content-info',
  'complementary',
  'region',
  'search',
  'form-landmark',
];

export function ComponentsPage() {
  const { componentId } = useParams();
  const { lib } = useLib();
  const activeId = componentId ?? 'button';

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
            aria-label="Component list"
          >
            <h2 className="text-xs font-semibold tracking-wide text-[var(--ds-text-secondary)]">Components</h2>
            <div className="mt-2 flex flex-col gap-1">
              {COMPONENT_IDS.map((id) => (
                <Link
                  key={id}
                  to={`/components/${id}`}
                  className={linkClass(id)}
                  aria-current={activeId === id ? 'page' : undefined}
                >
                  {id.split('-').join(' ')}
                </Link>
              ))}
            </div>

            <h2 className="mt-6 text-xs font-semibold tracking-wide text-[var(--ds-text-secondary)]">Layout</h2>
            <div className="mt-2 flex flex-col gap-1">
              {LAYOUT_IDS.map((id) => (
                <Link
                  key={id}
                  to={`/components/${id}`}
                  className={linkClass(id)}
                  aria-current={activeId === id ? 'page' : undefined}
                >
                  {id.split('-').join(' ')}
                </Link>
              ))}
            </div>

            <h2 className="mt-6 text-xs font-semibold tracking-wide text-[var(--ds-text-secondary)]">Landmarks</h2>
            <div className="mt-2 flex flex-col gap-1">
              {LANDMARK_IDS.map((id) => (
                <Link
                  key={id}
                  to={`/components/${id}`}
                  className={linkClass(id)}
                  aria-current={activeId === id ? 'page' : undefined}
                >
                  {id.split('-').join(' ')}
                </Link>
              ))}
            </div>
          </nav>
        </aside>

        <main className="min-w-0 flex-1 pt-8 lg:pt-0" aria-label="Component documentation">
          <ComponentDoc componentId={activeId} lib={lib} />
        </main>
      </div>
    </div>
  );
}
