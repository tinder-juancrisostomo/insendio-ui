/**
 * MUI theme using design system tokens
 */
import { createTheme } from '@mui/material/styles';
import { tokens } from '@design-system/tokens';

export const designSystemTheme = createTheme({
  palette: {
    primary: {
      main: tokens.color.primary[600],
      light: tokens.color.primary[400],
      dark: tokens.color.primary[800],
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: tokens.color.secondary[600],
      light: tokens.color.secondary[400],
      dark: tokens.color.secondary[800],
      contrastText: '#FFFFFF',
    },
    error: {
      main: tokens.color.error[500],
      light: tokens.color.error[400],
      dark: tokens.color.error[700],
    },
    warning: {
      main: tokens.color.warning[500],
      light: tokens.color.warning[400],
      dark: tokens.color.warning[700],
    },
    success: {
      main: tokens.color.success[500],
      light: tokens.color.success[400],
      dark: tokens.color.success[700],
    },
    info: {
      main: tokens.color.info[600],
      light: tokens.color.info[400],
      dark: tokens.color.info[800],
    },
    background: {
      default: tokens.color.neutral[50],
      paper: '#FFFFFF',
    },
    text: {
      primary: tokens.color.neutral[900],
      secondary: tokens.color.neutral[600],
      disabled: tokens.color.neutral[400],
    },
  },
  typography: {
    fontFamily: tokens.typography.fontFamily.sans,
    fontSize: 14,
    h1: { fontSize: tokens.typography.fontSize['3xl'], fontWeight: 700 },
    h2: { fontSize: tokens.typography.fontSize['2xl'], fontWeight: 700 },
    h3: { fontSize: tokens.typography.fontSize.xl, fontWeight: 600 },
    h4: { fontSize: tokens.typography.fontSize.lg, fontWeight: 600 },
    body1: { fontSize: tokens.typography.fontSize.base },
    body2: { fontSize: tokens.typography.fontSize.sm },
  },
  shape: {
    borderRadius: parseInt(tokens.borderRadius.md, 10) || 6,
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          '&:before': { display: 'none' },
          '&.Mui-expanded': { margin: 0 },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: tokens.borderRadius.lg,
          boxShadow: tokens.shadow.lg,
        },
      },
    },
  },
});
