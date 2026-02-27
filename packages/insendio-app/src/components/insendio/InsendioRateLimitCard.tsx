import { Text } from '@design-system/typography';
import { useInsendioComponents } from '../../components-context';
import { cn } from '@design-system/utils';

export interface InsendioRateLimitCardProps {
  channel: string;
  icon: React.ReactNode;
  current: number;
  total: number;
  percent: number;
  className?: string;
}

/**
 * Reusable rate limit card: channel name, usage (current/total), percent, progress bar.
 * Theme-aware via design tokens.
 */
export function InsendioRateLimitCard({
  channel,
  icon,
  current,
  total,
  percent,
  className,
}: InsendioRateLimitCardProps) {
  const { Box } = useInsendioComponents();
  return (
    <Box
      className={cn(
        'rounded-xl border border-[var(--ds-border-default)] bg-[var(--ds-bg-surface)] p-4 shadow-sm',
        className
      )}
    >
      <Box className="flex items-center gap-2 mb-3">
        <Box className="p-2 rounded-lg bg-[var(--ds-bg-muted)]">{icon}</Box>
        <Text variant="body" className="font-medium text-[var(--ds-text-primary)]">
          {channel}
        </Text>
      </Box>
      <Text variant="h3" className="text-[var(--ds-text-primary)] mb-1">
        <span className="font-bold">{current.toLocaleString()}</span>
        <span className="text-[var(--ds-text-secondary)] font-normal"> / {total.toLocaleString()}</span>
      </Text>
      <Text variant="caption" className="text-[var(--ds-text-secondary)] mb-2">
        {percent}% sent
      </Text>
      <div
        className="h-2 rounded-full bg-[var(--ds-bg-muted)] overflow-hidden"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-[#4CAF50]"
          style={{ width: `${Math.min(percent, 100)}%` }}
        />
      </div>
    </Box>
  );
}
