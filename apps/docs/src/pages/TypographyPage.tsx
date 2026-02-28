import { Routes, Route, Navigate } from 'react-router-dom';
import { TypographyDoc } from '../components/TypographyDoc';

export function TypographyPage() {
  return (
    <Routes>
      <Route index element={<Navigate to="/typography/h1" replace />} />
      <Route path=":variantId" element={<TypographyDoc />} />
    </Routes>
  );
}
