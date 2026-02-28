import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LibProvider } from './context/LibContext';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { DesignSystemThemeProvider } from '@design-system/mui';

const ComponentsPage = lazy(() => import('./pages/ComponentsPage').then((m) => ({ default: m.ComponentsPage })));
const ChartsPage = lazy(() => import('./pages/ChartsPage').then((m) => ({ default: m.ChartsPage })));
const TypographyPage = lazy(() => import('./pages/TypographyPage').then((m) => ({ default: m.TypographyPage })));
const IconsPage = lazy(() => import('./pages/IconsPage').then((m) => ({ default: m.IconsPage })));
const AnimationsPage = lazy(() => import('./pages/AnimationsPage').then((m) => ({ default: m.AnimationsPage })));

export default function App() {
  return (
    <DesignSystemThemeProvider>
      <LibProvider>
        <Suspense fallback={<div className="p-6">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="components" element={<Navigate to="/components/button" replace />} />
            <Route path="components/:componentId" element={<ComponentsPage />} />
            <Route path="charts" element={<Navigate to="/charts/bar" replace />} />
            <Route path="charts/:chartId" element={<ChartsPage />} />
            <Route path="typography/*" element={<TypographyPage />} />
            <Route path="icons" element={<IconsPage />} />
            <Route path="animations" element={<AnimationsPage />} />
          </Route>
        </Routes>
      </Suspense>
    </LibProvider>
    </DesignSystemThemeProvider>
  );
}
