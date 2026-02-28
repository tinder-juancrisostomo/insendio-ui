/**
 * MUI ThemeProvider with design system theme.
 * Wrap your app with this when using @design-system/mui components.
 */
import * as React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { designSystemTheme } from './theme';

export function DesignSystemThemeProvider({ children }: { children: React.ReactNode }) {
  return <MuiThemeProvider theme={designSystemTheme}>{children}</MuiThemeProvider>;
}
