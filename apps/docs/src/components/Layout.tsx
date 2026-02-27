import { Outlet, Link } from 'react-router-dom';
import { Banner, Main, Nav } from '@design-system/base';
import { useTheme } from '../context/ThemeContext';
import { useLib, LIB_LABELS, type LibId } from '../context/LibContext';

export function Layout() {
  const { theme, toggleTheme } = useTheme();
  const { lib, setLib } = useLib();

  return (
    <div className="min-h-screen flex flex-col">
      <Banner className="sticky top-0 z-50 w-full border-b bg-[var(--ds-bg-surface)] px-4 py-3 md:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-xl font-bold text-[var(--ds-text-primary)]">
              Design System
            </Link>
            <Nav className="flex gap-4" aria-label="Main">
              <Link to="/" className="text-[var(--ds-text-secondary)] hover:text-[var(--ds-text-primary)]">
                Home
              </Link>
              <Link to="/components" className="text-[var(--ds-text-secondary)] hover:text-[var(--ds-text-primary)]">
                Components
              </Link>
            </Nav>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-[var(--ds-text-secondary)]">Library:</span>
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
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              className="rounded border border-[var(--ds-border-default)] bg-[var(--ds-bg-input)] px-3 py-1.5 text-sm"
            >
              {theme === 'light' ? 'Dark' : 'Light'}
            </button>
          </div>
        </div>
      </Banner>
      <Main className="flex-1 p-4 md:p-6">
        <Outlet />
      </Main>
    </div>
  );
}
