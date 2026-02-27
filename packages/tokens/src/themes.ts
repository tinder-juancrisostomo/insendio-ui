/**
 * Light and Dark theme CSS variables
 * Maps design tokens to CSS custom properties for runtime theming
 */

export const lightTheme = {
  // Backgrounds
  '--ds-bg-page': '#F8F9FA',
  '--ds-bg-surface': '#FFFFFF',
  '--ds-bg-elevated': '#FFFFFF',
  '--ds-bg-muted': '#F0F0F0',
  '--ds-bg-input': '#FFFFFF',
  '--ds-bg-active-tab': '#EDE7F6',
  '--ds-bg-success': '#E8F5E9',
  '--ds-bg-info': '#E8F0FE',
  '--ds-bg-warning': '#FFF3E0',
  '--ds-bg-error': '#FFE0E0',

  // Text
  '--ds-text-primary': '#212529',
  '--ds-text-secondary': '#6C757D',
  '--ds-text-muted': '#888888',
  '--ds-text-inverse': '#FFFFFF',
  '--ds-text-link': '#1976D2',
  '--ds-text-link-hover': '#1565C0',

  // Borders
  '--ds-border-default': '#E0E0E0',
  '--ds-border-muted': '#EAEAEA',
  '--ds-border-focus': '#2196F3',

  // Interactive states
  '--ds-focus-ring': '0 0 0 2px rgba(33, 150, 243, 0.5)',
  '--ds-shadow-sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  '--ds-shadow-md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',

  // Status badges
  '--ds-badge-success-bg': '#E8F5E9',
  '--ds-badge-success-text': '#2E7D32',
  '--ds-badge-info-bg': '#E3F2FD',
  '--ds-badge-info-text': '#1565C0',
  '--ds-badge-warning-bg': '#FFF3E0',
  '--ds-badge-warning-text': '#D48806',
  '--ds-badge-error-bg': '#FFE0E0',
  '--ds-badge-error-text': '#C0392B',
  '--ds-badge-neutral-bg': '#F0F0F0',
  '--ds-badge-neutral-text': '#555555',

  // Checkmark/X in permission matrix
  '--ds-check-bg': '#E8F5E9',
  '--ds-check-icon': '#4CAF50',
  '--ds-cross-bg': '#E0E0E0',
  '--ds-cross-icon': '#9E9E9E',
} as const;

export const darkTheme = {
  // Backgrounds
  '--ds-bg-page': '#1A1A1A',
  '--ds-bg-surface': '#2D2D2D',
  '--ds-bg-elevated': '#383838',
  '--ds-bg-muted': '#404040',
  '--ds-bg-input': '#2D2D2D',
  '--ds-bg-active-tab': '#4A3F6B',
  '--ds-bg-success': '#1B3D1F',
  '--ds-bg-info': '#1A2F4A',
  '--ds-bg-warning': '#3D2E1A',
  '--ds-bg-error': '#3D1A1A',

  // Text
  '--ds-text-primary': '#FFFFFF',
  '--ds-text-secondary': '#B0B0B0',
  '--ds-text-muted': '#888888',
  '--ds-text-inverse': '#212529',
  '--ds-text-link': '#64B5F6',
  '--ds-text-link-hover': '#90CAF9',

  // Borders
  '--ds-border-default': '#444444',
  '--ds-border-muted': '#383838',
  '--ds-border-focus': '#64B5F6',

  // Interactive states
  '--ds-focus-ring': '0 0 0 2px rgba(100, 181, 246, 0.5)',
  '--ds-shadow-sm': '0 1px 2px 0 rgb(0 0 0 / 0.3)',
  '--ds-shadow-md': '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.3)',

  // Status badges
  '--ds-badge-success-bg': '#1B3D1F',
  '--ds-badge-success-text': '#81C784',
  '--ds-badge-info-bg': '#1A2F4A',
  '--ds-badge-info-text': '#64B5F6',
  '--ds-badge-warning-bg': '#3D2E1A',
  '--ds-badge-warning-text': '#FFB74D',
  '--ds-badge-error-bg': '#3D1A1A',
  '--ds-badge-error-text': '#E57373',
  '--ds-badge-neutral-bg': '#404040',
  '--ds-badge-neutral-text': '#B0B0B0',

  // Checkmark/X
  '--ds-check-bg': '#1B3D1F',
  '--ds-check-icon': '#81C784',
  '--ds-cross-bg': '#404040',
  '--ds-cross-icon': '#9E9E9E',
} as const;

export type Theme = 'light' | 'dark';
