/**
 * Landmarks - W3C ARIA APG Pattern
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/
 *
 * Reusable landmark components for page structure. Use ≤7 landmarks per page.
 * All page content should be contained within an appropriate landmark.
 */

import React from 'react';

// ---------------------------------------------------------------------------
// Banner - Top-level header (logo, site-wide nav, search)
// ---------------------------------------------------------------------------

export interface BannerProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export const Banner = React.forwardRef<HTMLElement, BannerProps>((props, ref) => {
  return <header ref={ref} role="banner" {...props} />;
});

Banner.displayName = 'Banner';

// ---------------------------------------------------------------------------
// Main - Primary content of the page
// ---------------------------------------------------------------------------

export interface MainProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export const Main = React.forwardRef<HTMLElement, MainProps>((props, ref) => {
  return <main ref={ref} {...props} />;
});

Main.displayName = 'Main';

// ---------------------------------------------------------------------------
// Nav - Navigation landmark (requires aria-label for multiple nav regions)
// ---------------------------------------------------------------------------

export interface NavProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  /** Accessible name for the navigation region. Required when page has multiple nav landmarks. */
  'aria-label'?: string;
}

export const Nav = React.forwardRef<HTMLElement, NavProps>(
  ({ 'aria-label': ariaLabel, ...props }, ref) => {
    return <nav ref={ref} aria-label={ariaLabel} {...props} />;
  }
);

Nav.displayName = 'Nav';

// ---------------------------------------------------------------------------
// ContentInfo - Footer (copyright, legal, contact)
// ---------------------------------------------------------------------------

export interface ContentInfoProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export const ContentInfo = React.forwardRef<HTMLElement, ContentInfoProps>(
  (props, ref) => {
    return <footer ref={ref} role="contentinfo" {...props} />;
  }
);

ContentInfo.displayName = 'ContentInfo';

// ---------------------------------------------------------------------------
// Complementary - Sidebar, related content
// ---------------------------------------------------------------------------

export interface ComplementaryProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  /** Accessible name when the complementary content needs a label */
  'aria-label'?: string;
}

export const Complementary = React.forwardRef<HTMLElement, ComplementaryProps>(
  (props, ref) => {
    return <aside ref={ref} {...props} />;
  }
);

Complementary.displayName = 'Complementary';

// ---------------------------------------------------------------------------
// Region - Named region (requires aria-label or aria-labelledby)
// ---------------------------------------------------------------------------

export interface RegionProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  /** Accessible name for the region */
  'aria-label'?: string;
  /** ID of element that labels the region */
  'aria-labelledby'?: string;
}

export const Region = React.forwardRef<HTMLElement, RegionProps>(
  ({ 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby, ...props }, ref) => {
    return (
      <section
        ref={ref}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        {...props}
      />
    );
  }
);

Region.displayName = 'Region';

// ---------------------------------------------------------------------------
// Search - Search region
// ---------------------------------------------------------------------------

export interface SearchProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children?: React.ReactNode;
  /** Accessible name for the search region */
  'aria-label'?: string;
}

export const Search = React.forwardRef<HTMLFormElement, SearchProps>(
  ({ 'aria-label': ariaLabel = 'Search', ...props }, ref) => {
    return <form ref={ref} role="search" aria-label={ariaLabel} {...props} />;
  }
);

Search.displayName = 'Search';

// ---------------------------------------------------------------------------
// FormLandmark - Form region (for forms that are distinct page sections)
// ---------------------------------------------------------------------------

export interface FormLandmarkProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children?: React.ReactNode;
  /** Accessible name for the form region */
  'aria-label'?: string;
}

export const FormLandmark = React.forwardRef<HTMLFormElement, FormLandmarkProps>(
  ({ 'aria-label': ariaLabel, ...props }, ref) => {
    return <form ref={ref} aria-label={ariaLabel} {...props} />;
  }
);

FormLandmark.displayName = 'FormLandmark';
