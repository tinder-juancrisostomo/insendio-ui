import { Text } from '@design-system/typography';
import { useInsendioComponents } from '../../components-context';
import { cn } from '@design-system/utils';

export interface InsendioStatCardProps {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  iconBg?: string;
  valueClassName?: string;
  /** 'default' = h1/3xl, 'compact' = h2 for smaller stats */
  size?: 'default' | 'compact';
  className?: string;
}

/**
 * Specialized StatCard: wraps generic Box with standard stat display layout.
 * Icon + label + value pattern used across Segments, Monitoring, etc.
 */
export function InsendioStatCard({
  label,
  value,
  icon,
  iconBg = 'bg-[var(--ds-bg-muted)]',
  valueClassName,
  size = 'default',
  className,
}: InsendioStatCardProps) {
  const { Box, Stack, Inline } = useInsendioComponents();
  return (
    <Box
      className={cn(
        'flex-1 min-w-[180px] rounded-xl border border-[var(--ds-border-default)] bg-white shadow-sm p-6',
        size === 'compact' && 'min-w-[180px] rounded-lg p-4 bg-[var(--ds-bg-surface)]',
        className
      )}
    >
      <Stack gap={2}>
        {icon ? (
          <Inline gap={2} align="center" className="mb-0">
            <Box className={cn('p-2 rounded-lg', iconBg)}>{icon}</Box>
            <Text variant="caption">{label}</Text>
          </Inline>
        ) : (
          <Text variant="caption" className="block mb-1">{label}</Text>
        )}
        <Text
          variant={size === 'compact' ? 'h2' : 'h1'}
          className={cn(size === 'default' && 'text-3xl font-bold', valueClassName)}
        >
          {value}
        </Text>
      </Stack>
    </Box>
  );
}
