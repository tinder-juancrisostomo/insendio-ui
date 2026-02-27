import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';

export interface AccessibilityPreferences {
  reduceMotion: boolean;
  highContrast: boolean;
  largeText: boolean;
  reducedTransparency: boolean;
  focusVisible: boolean;
}

const STORAGE_KEY = 'ds-accessibility';

const defaults: AccessibilityPreferences = {
  reduceMotion: false,
  highContrast: false,
  largeText: false,
  reducedTransparency: false,
  focusVisible: false,
};

const getDefaultPreferences = (): AccessibilityPreferences => {
  if (typeof window === 'undefined') return { ...defaults };
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return { ...defaults, ...JSON.parse(stored) };
    } catch {
      /* ignore */
    }
  }
  return {
    ...defaults,
    reduceMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  };
};

interface AccessibilityContextValue extends AccessibilityPreferences {
  setPreference: <K extends keyof AccessibilityPreferences>(
    key: K,
    value: AccessibilityPreferences[K]
  ) => void;
}

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [prefs, setPrefs] = useState<AccessibilityPreferences>(getDefaultPreferences);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    const root = document.documentElement;
    root.classList.toggle('ds-reduce-motion', prefs.reduceMotion);
    root.classList.toggle('ds-high-contrast', prefs.highContrast);
    root.classList.toggle('ds-large-text', prefs.largeText);
    root.classList.toggle('ds-reduced-transparency', prefs.reducedTransparency);
    root.classList.toggle('ds-focus-visible', prefs.focusVisible);
  }, [prefs]);

  const setPreference = useCallback(
    <K extends keyof AccessibilityPreferences>(key: K, value: AccessibilityPreferences[K]) => {
      setPrefs((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const value = useMemo(
    () => ({ ...prefs, setPreference }),
    [prefs, setPreference]
  );

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error('useAccessibility must be used within AccessibilityProvider');
  return ctx;
}
