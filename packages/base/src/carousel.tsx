/**
 * Carousel - W3C ARIA APG Pattern
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/carousel/
 *
 * Supports two variants per W3C examples:
 * - Basic: Auto-rotating carousel with prev/next buttons for slide control
 * - Tabbed: Auto-rotating carousel with tabs for slide control
 */

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useId } from './utils/useId';

export type CarouselVariant = 'basic' | 'tabbed';

export interface CarouselProps {
  children: React.ReactNode[];
  /** Accessible label for the carousel region */
  'aria-label'?: string;
  /** Variant: basic (prev/next buttons) or tabbed (tabs for slide picker) */
  variant?: CarouselVariant;
  /** Enable auto-rotation on page load */
  autoRotate?: boolean;
  /** Interval in ms between slide changes when auto-rotating (default 5000) */
  autoRotateInterval?: number;
  /** Custom labels for slides (e.g. ["Amsterdam", "Prague"]). Falls back to "Slide N" or "N of count" */
  slideLabels?: string[];
  /** Callback when active slide changes */
  onSlideChange?: (index: number) => void;
}

function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mq = globalThis.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return prefersReducedMotion;
}

export function Carousel({
  children,
  'aria-label': ariaLabel = 'Carousel',
  variant = 'basic',
  autoRotate = false,
  autoRotateInterval = 5000,
  slideLabels,
  onSlideChange,
}: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(autoRotate);
  const [isPausedByFocusOrHover, setIsPausedByFocusOrHover] = useState(false);
  const count = children.length;
  const baseId = useId();
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const effectiveRotating = isRotating && !isPausedByFocusOrHover && !prefersReducedMotion && count > 1;

  const goTo = useCallback(
    (i: number, wrap = false) => {
      const next = wrap ? ((i % count) + count) % count : Math.max(0, Math.min(i, count - 1));
      setActiveIndex(next);
      onSlideChange?.(next);
    },
    [count, onSlideChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          goTo(activeIndex - 1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          goTo(activeIndex + 1);
          break;
        case 'Home':
          e.preventDefault();
          goTo(0);
          break;
        case 'End':
          e.preventDefault();
          goTo(count - 1);
          break;
      }
    },
    [activeIndex, count, goTo]
  );

  // Auto-rotate timer (wraps to first slide after last)
  useEffect(() => {
    if (!effectiveRotating) return;
    const id = setInterval(() => goTo(activeIndex + 1, true), autoRotateInterval);
    return () => clearInterval(id);
  }, [effectiveRotating, activeIndex, autoRotateInterval, goTo]);

  // Pause on focus within carousel
  const handleFocusWithin = useCallback(() => setIsPausedByFocusOrHover(true), []);
  const handleBlurWithin = useCallback(() => setIsPausedByFocusOrHover(false), []);

  // Pause on hover
  const handleMouseEnter = useCallback(() => setIsPausedByFocusOrHover(true), []);
  const handleMouseLeave = useCallback(() => setIsPausedByFocusOrHover(false), []);

  const toggleRotation = useCallback(() => setIsRotating((r) => !r), []);

  const getSlideLabel = (index: number) => {
    if (slideLabels?.[index]) return slideLabels[index];
    return `Slide ${index + 1}`;
  };

  const itemsId = `${baseId}-items`;

  const liveRegionProps =
    autoRotate && count > 1
      ? { 'aria-live': 'off' as const, 'aria-atomic': false }
      : { 'aria-live': 'polite' as const, 'aria-atomic': false };

  const slideContent = (
    <div
      id={itemsId}
      role="group"
      aria-roledescription="slide"
      aria-label={slideLabels?.[activeIndex] ?? `${activeIndex + 1} of ${count}`}
      {...(variant === 'basic' ? liveRegionProps : {})}
    >
      {children[activeIndex]}
    </div>
  );

  const prevButton = (
    <button
      type="button"
      aria-label="Previous slide"
      aria-controls={itemsId}
      onClick={() => goTo(activeIndex - 1)}
    >
      Previous
    </button>
  );

  const nextButton = (
    <button
      type="button"
      aria-label="Next slide"
      aria-controls={itemsId}
      onClick={() => goTo(activeIndex + 1)}
    >
      Next
    </button>
  );

  const rotationControl =
    autoRotate && count > 1 && !prefersReducedMotion ? (
      <button
        type="button"
        aria-label={effectiveRotating ? 'Stop automatic slide show' : 'Start automatic slide show'}
        onClick={toggleRotation}
      >
        {effectiveRotating ? 'Stop' : 'Start'}
      </button>
    ) : null;

  const tabKeyDown = useCallback(
    (e: React.KeyboardEvent, currentIndex: number) => {
      let nextIndex: number;
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          nextIndex = Math.min(currentIndex + 1, count - 1);
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          nextIndex = Math.max(currentIndex - 1, 0);
          break;
        case 'Home':
          e.preventDefault();
          nextIndex = 0;
          break;
        case 'End':
          e.preventDefault();
          nextIndex = count - 1;
          break;
        default:
          return;
      }
      goTo(nextIndex);
      const nextTab = containerRef.current?.querySelector(
        `[id="${baseId}-tab-${nextIndex}"]`
      ) as HTMLButtonElement | null;
      nextTab?.focus();
    },
    [count, goTo, baseId]
  );

  if (variant === 'tabbed') {
    return (
      <section
        ref={containerRef}
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        onFocusCapture={handleFocusWithin}
        onBlurCapture={handleBlurWithin}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div>
          {rotationControl}
          <div role="tablist" aria-label="Choose slide to display">
            {children.map((child, i) => (
              <button
                key={`slide-${i}`}
                type="button"
                role="tab"
                id={`${baseId}-tab-${i}`}
                aria-selected={i === activeIndex}
                aria-controls={`${baseId}-panel-${i}`}
                aria-label={getSlideLabel(i)}
                tabIndex={i === activeIndex ? 0 : -1}
                onClick={() => goTo(i)}
                onKeyDown={(e) => tabKeyDown(e, i)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
        <div
          id={`${baseId}-panel-${activeIndex}`}
          role="tabpanel"
          aria-roledescription="slide"
          aria-label={slideLabels?.[activeIndex] ?? `${activeIndex + 1} of ${count}`}
          aria-labelledby={`${baseId}-tab-${activeIndex}`}
          {...liveRegionProps}
        >
          {children[activeIndex]}
        </div>
        <div>
          {prevButton}
          {nextButton}
        </div>
      </section>
    );
  }

  // Basic variant
  return (
    <section
      ref={containerRef}
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
      onFocusCapture={handleFocusWithin}
      onBlurCapture={handleBlurWithin}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div>
        {rotationControl}
        {prevButton}
        {nextButton}
      </div>
      {slideContent}
    </section>
  );
}
