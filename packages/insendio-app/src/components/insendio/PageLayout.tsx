import { Text } from '@design-system/typography';
import { useInsendioComponents } from '../../components-context';

/**
 * Specialized page layout: wraps generic Stack with a standard page title.
 * Uses containment – children populate the generic container.
 */
export interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
}

export function PageLayout({ title, children, className, titleClassName }: PageLayoutProps) {
  const { Stack } = useInsendioComponents();
  return (
    <Stack gap={6} className={className}>
      <Text variant="h2" className={titleClassName}>{title}</Text>
      {children}
    </Stack>
  );
}
