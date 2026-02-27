import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { InsendioLayout } from './components/InsendioLayout';

const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const NotificationsPage = lazy(() => import('./pages/NotificationsPage').then((m) => ({ default: m.NotificationsPage })));
const SegmentsPage = lazy(() => import('./pages/SegmentsPage').then((m) => ({ default: m.SegmentsPage })));
const MonitoringPage = lazy(() => import('./pages/MonitoringPage').then((m) => ({ default: m.MonitoringPage })));
const DataPage = lazy(() => import('./pages/DataPage').then((m) => ({ default: m.DataPage })));
const RolesPage = lazy(() => import('./pages/RolesPage').then((m) => ({ default: m.RolesPage })));

export function InsendioApp() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <Routes>
        <Route path="/" element={<InsendioLayout />}>
          <Route index element={<HomePage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="segments" element={<SegmentsPage />} />
          <Route path="monitoring" element={<MonitoringPage />} />
          <Route path="data" element={<DataPage />} />
          <Route path="roles" element={<RolesPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
