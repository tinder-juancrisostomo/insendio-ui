import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LibProvider } from './context/LibContext';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';

const ComponentsPage = lazy(() => import('./pages/ComponentsPage').then((m) => ({ default: m.ComponentsPage })));

export default function App() {
  return (
    <LibProvider>
      <Suspense fallback={<div className="p-6">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="components" element={<Navigate to="/components/button" replace />} />
            <Route path="components/:componentId" element={<ComponentsPage />} />
          </Route>
        </Routes>
      </Suspense>
    </LibProvider>
  );
}
