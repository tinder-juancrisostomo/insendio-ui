import { Outlet, Link } from 'react-router-dom';
import { Banner, Main, Nav } from '@design-system/base';
import { Text } from '@design-system/typography';
import { useTheme } from '../context/ThemeContext';
import { useLib, LIB_LABELS, type LibId } from '../context/LibContext';

const THEME_OPTIONS: { value: 'system' | 'light' | 'dark'; label: string }[] = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

export function Layout() {
  const { preference, setPreference } = useTheme();
  const { lib, setLib } = useLib();

  return (
    <div className="min-h-screen flex flex-col">
      <Banner className="sticky top-0 z-50 w-full border-b bg-[var(--ds-bg-surface)] px-4 py-3 md:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Text variant="h3" as="span">Design System</Text>
            </Link>
            <Nav className="flex gap-4" aria-label="Main">
              <Link to="/" className="text-[var(--ds-text-secondary)] hover:text-[var(--ds-text-primary)]">
                Home
              </Link>
              <Link to="/components" className="text-[var(--ds-text-secondary)] hover:text-[var(--ds-text-primary)]">
                Components
              </Link>
              <Link to="/charts" className="text-[var(--ds-text-secondary)] hover:text-[var(--ds-text-primary)]">
                Charts
              </Link>
              <Link to="/typography" className="text-[var(--ds-text-secondary)] hover:text-[var(--ds-text-primary)]">
                Typography
              </Link>
              <Link to="/icons" className="text-[var(--ds-text-secondary)] hover:text-[var(--ds-text-primary)]">
                Icons
              </Link>
              <Link to="/animations" className="text-[var(--ds-text-secondary)] hover:text-[var(--ds-text-primary)]">
                Animations
              </Link>
              <Link to="/apps" className="text-[var(--ds-text-secondary)] hover:text-[var(--ds-text-primary)]">
                Apps
              </Link>
            </Nav>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Text variant="body-sm" as="span">Library:</Text>
              <select
                value={lib}
                onChange={(e) => setLib(e.target.value as LibId)}
                aria-label="Select component library"
                className="rounded border border-[var(--ds-border-default)] bg-[var(--ds-bg-input)] px-3 py-1.5 text-sm"
              >
                {(Object.keys(LIB_LABELS) as LibId[]).map((id) => (
                  <option key={id} value={id}>
                    {LIB_LABELS[id]}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-1">
              {THEME_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setPreference(opt.value)}
                  aria-label={`Theme: ${opt.label}`}
                  aria-pressed={preference === opt.value}
                  className={`rounded border px-3 py-1.5 text-sm transition-colors ${
                    preference === opt.value
                      ? 'border-[var(--ds-border-focus)] bg-[var(--ds-bg-active-tab)] text-[var(--ds-text-primary)]'
                      : 'border-[var(--ds-border-default)] bg-[var(--ds-bg-input)] text-[var(--ds-text-secondary)] hover:bg-[var(--ds-bg-muted)]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Banner>
      <Main className="flex-1 p-4 md:p-6">
        <Outlet />
      </Main>
    </div>
  );
}
