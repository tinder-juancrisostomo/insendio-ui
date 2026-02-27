import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './theme-context';
import { AccessibilityProvider } from './accessibility-context';
import { InsendioLayout } from './components/InsendioLayout';

const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const NotificationsPage = lazy(() => import('./pages/NotificationsPage').then((m) => ({ default: m.NotificationsPage })));
const SegmentsPage = lazy(() => import('./pages/SegmentsPage').then((m) => ({ default: m.SegmentsPage })));
const MonitoringPage = lazy(() => import('./pages/MonitoringPage').then((m) => ({ default: m.MonitoringPage })));
const DataPage = lazy(() => import('./pages/DataPage').then((m) => ({ default: m.DataPage })));
const RolesPage = lazy(() => import('./pages/RolesPage').then((m) => ({ default: m.RolesPage })));
const AccessibilityPage = lazy(() => import('./pages/AccessibilityPage').then((m) => ({ default: m.AccessibilityPage })));

export function InsendioApp() {
  return (
    <ThemeProvider>
      <AccessibilityProvider>
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
          <Routes>
            <Route path="/" element={<InsendioLayout />}>
              <Route index element={<HomePage />} />
              <Route path="notifications" element={<NotificationsPage />} />
              <Route path="segments" element={<SegmentsPage />} />
              <Route path="monitoring" element={<MonitoringPage />} />
              <Route path="data" element={<DataPage />} />
              <Route path="roles" element={<RolesPage />} />
              <Route path="accessibility" element={<AccessibilityPage />} />
            </Route>
          </Routes>
        </Suspense>
      </AccessibilityProvider>
    </ThemeProvider>
  );
}
