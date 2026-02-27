/**
 * Mobile-first breakpoints
 * Based on common viewport sizes from Insendio screenshots
 */

export const breakpoints = {
  /** 0px and up - Mobile first base */
  xs: 0,
  /** 480px - Large phones */
  sm: 480,
  /** 768px - Tablets */
  md: 768,
  /** 1024px - Small desktops */
  lg: 1024,
  /** 1280px - Desktops */
  xl: 1280,
  /** 1536px - Large desktops */
  '2xl': 1536,
} as const;

export type Breakpoint = keyof typeof breakpoints;

/** Media query strings for use in CSS */
export const mediaQueries = {
  sm: `@media (min-width: ${breakpoints.sm}px)`,
  md: `@media (min-width: ${breakpoints.md}px)`,
  lg: `@media (min-width: ${breakpoints.lg}px)`,
  xl: `@media (min-width: ${breakpoints.xl}px)`,
  '2xl': `@media (min-width: ${breakpoints['2xl']}px)`,
} as const;
