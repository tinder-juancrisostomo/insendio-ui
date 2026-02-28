import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';

type Theme = 'light' | 'dark';
type ThemePreference = Theme | 'system';

interface ThemeContextValue {
  theme: Theme;
  preference: ThemePreference;
  setTheme: (theme: Theme) => void;
  setPreference: (pref: ThemePreference) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('ds-theme') as ThemePreference | null;
      return stored === 'light' || stored === 'dark' ? stored : 'system';
    }
    return 'system';
  });

  const [systemTheme, setSystemTheme] = useState<Theme>(getSystemTheme);

  const theme: Theme = preference === 'system' ? systemTheme : preference;

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => setSystemTheme(getSystemTheme());
    mq.addEventListener('change', handleChange);
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') setSystemTheme(getSystemTheme());
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      mq.removeEventListener('change', handleChange);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove('ds-light', 'ds-dark');
    document.documentElement.classList.add(`ds-${theme}`);
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem('ds-theme', preference);
  }, [theme, preference]);

  const setTheme = useCallback((t: Theme) => setPreferenceState(t), []);
  const setPreference = useCallback((p: ThemePreference) => setPreferenceState(p), []);
  const toggleTheme = useCallback(() => {
    setPreferenceState((prev) => {
      if (prev === 'system') return systemTheme === 'light' ? 'dark' : 'light';
      return prev === 'light' ? 'dark' : 'light';
    });
  }, [systemTheme]);

  const value = useMemo(
    () => ({ theme, preference, setTheme, setPreference, toggleTheme }),
    [theme, preference, setTheme, setPreference, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
