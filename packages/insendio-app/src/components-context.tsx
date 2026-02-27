import React from 'react';

export interface InsendioComponents {
  /** Library name shown in the app title (e.g. "DaisyUI", "MUI") */
  library?: string;
  Box: React.ComponentType<any>;
  Stack: React.ComponentType<any>;
  Inline: React.ComponentType<any>;
  Button: React.ComponentType<any>;
  Input: React.ComponentType<any>;
  Badge: React.ComponentType<any>;
  Table: React.ComponentType<any>;
  TableHeader: React.ComponentType<any>;
  TableBody: React.ComponentType<any>;
  TableRow: React.ComponentType<any>;
  TableCell: React.ComponentType<any>;
  Tabs: React.ComponentType<any>;
  TabList: React.ComponentType<any>;
  Tab: React.ComponentType<any>;
  TabPanel: React.ComponentType<any>;
  Menu: React.ComponentType<any>;
  MenuButton: React.ComponentType<any>;
  MenuList: React.ComponentType<any>;
  MenuItem: React.ComponentType<any>;
  Alert: React.ComponentType<any>;
  Switch: React.ComponentType<any>;
}

const InsendioComponentsContext = React.createContext<InsendioComponents | null>(null);

export function useInsendioComponents() {
  const ctx = React.useContext(InsendioComponentsContext);
  if (!ctx) {
    throw new Error('useInsendioComponents must be used within InsendioComponentsProvider');
  }
  return ctx;
}

export const InsendioComponentsProvider = InsendioComponentsContext.Provider;
