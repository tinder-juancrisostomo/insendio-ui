import React, { createContext, useContext, useState, useCallback } from 'react';

export type LibId = 'base' | 'styled-base' | 'hero-ui' | 'daisyui' | 'mui';

interface LibContextValue {
  lib: LibId;
  setLib: (lib: LibId) => void;
}

const LibContext = createContext<LibContextValue | null>(null);

const LIB_LABELS: Record<LibId, string> = {
  base: 'Base (Headless)',
  'styled-base': 'Styled Base',
  'hero-ui': 'HeroUI',
  daisyui: 'DaisyUI',
  mui: 'Material UI',
};

export function LibProvider({ children }: { children: React.ReactNode }) {
  const [lib, setLibState] = useState<LibId>('base');

  const setLib = useCallback((l: LibId) => setLibState(l), []);

  return (
    <LibContext.Provider value={{ lib, setLib }}>
      {children}
    </LibContext.Provider>
  );
}

export function useLib() {
  const ctx = useContext(LibContext);
  if (!ctx) throw new Error('useLib must be used within LibProvider');
  return ctx;
}

export { LIB_LABELS };
