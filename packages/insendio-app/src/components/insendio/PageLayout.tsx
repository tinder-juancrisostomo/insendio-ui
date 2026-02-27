import { useId } from 'react';
import { cn } from '@design-system/utils';
import { Text } from '@design-system/typography';
import { useInsendioComponents } from '../../components-context';

/**
 * Specialized page layout: full-width secondary header (title + optional tabs),
 * content limited to 1280px.
 */
export interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
  /** Rendered in the header bar after the title (e.g. InsendioTabList) */
  headerContent?: React.ReactNode;
  className?: string;
  titleClassName?: string;
}

export function PageLayout({ title, children, headerContent, className, titleClassName }: Readonly<PageLayoutProps>) {
  const { Stack } = useInsendioComponents();
  const titleId = useId();
  return (
    <Stack gap={0} className={cn('w-full min-w-0 flex-1', className)}>
      {/* Full-width secondary header */}
      <header className="w-full bg-[var(--ds-bg-surface)] border-b border-[var(--ds-border-default)]">
        <div className="w-full max-w-[1280px] mx-auto min-w-0 px-4 py-4 sm:px-6 sm:py-6">
          <Stack gap={4} className="min-w-0">
            <Text id={titleId} variant="h2" className={cn('text-xl sm:text-2xl', titleClassName)}>{title}</Text>
            <div className="min-w-0 w-full">
              {headerContent}
            </div>
          </Stack>
        </div>
      </header>
      {/* Content area - region labelled by page title */}
      <section aria-labelledby={titleId} className="w-full max-w-[1280px] mx-auto min-w-0 flex-1 px-4 py-4 sm:px-6 sm:py-6">
        {children}
      </section>
    </Stack>
  );
}
