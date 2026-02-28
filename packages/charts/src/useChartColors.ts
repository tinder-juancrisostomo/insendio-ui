import { useMemo } from 'react';

/** Chart palette from design tokens – adapts to light/dark theme */
export function useChartColors(theme: 'light' | 'dark' = 'light') {
  return useMemo(() => {
    if (typeof document === 'undefined') return ['#1976D2', '#7B1FA2', '#2E7D32', '#E65100', '#C62828'];
    const root = document.documentElement;
    const s = getComputedStyle(root);
    const get = (v: string, fallback: string) => s.getPropertyValue(v).trim() || fallback;
    return [
      get('--ds-text-link', '#1976D2'),
      get('--ds-insendio-primary', '#7B1FA2'),
      '#2E7D32',
      '#E65100',
      '#C62828',
    ];
  }, [theme]);
}
