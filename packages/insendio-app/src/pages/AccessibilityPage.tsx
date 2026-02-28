import { EyeIcon, InfoIcon } from '@design-system/icons';
import { Text } from '@design-system/typography';
import { useInsendioComponents } from '../components-context';
import { useAccessibility } from '../accessibility-context';
import { useTheme } from '../theme-context';
import { PageLayout, InsendioCard, InsendioInfoAlert } from '../components/insendio';

const a11yOptions = [
  {
    key: 'reduceMotion' as const,
    label: 'Reduce motion',
    description: 'Minimizes animations and transitions. Helps users with vestibular disorders or motion sensitivity.',
  },
  {
    key: 'highContrast' as const,
    label: 'High contrast',
    description: 'Increases contrast between text and backgrounds for better readability.',
  },
  {
    key: 'largeText' as const,
    label: 'Large text',
    description: 'Increases base font size across the app for easier reading.',
  },
  {
    key: 'reducedTransparency' as const,
    label: 'Reduced transparency',
    description: 'Uses solid backgrounds instead of transparency for clearer content.',
  },
  {
    key: 'focusVisible' as const,
    label: 'Enhanced focus indicators',
    description: 'Makes keyboard focus rings more visible for easier navigation.',
  },
  {
    key: 'preferChartTable' as const,
    label: 'Prefer data table for charts',
    description: 'Shows chart data as tables by default instead of visual charts. Helps screen reader users access data in a structured format.',
  },
] as const;

const themeOptions: { value: 'system' | 'light' | 'dark'; label: string }[] = [
  { value: 'system', label: 'Follow system (Mac)' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

export function AccessibilityPage() {
  const { Stack, Inline, Switch } = useInsendioComponents();
  const a11y = useAccessibility();
  const { preference, setPreference } = useTheme();

  return (
    <PageLayout title="Accessibility settings">
      <Stack gap={6}>
        <InsendioInfoAlert>
          <Inline gap={2} align="center">
            <InfoIcon size={20} />
            <span>
              These settings help customize the app for your needs. Changes apply immediately and are saved to your device.
            </span>
          </Inline>
        </InsendioInfoAlert>
        <InsendioCard className="p-6">
          <Stack gap={2} className="mb-4">
            <Text variant="h3">Color theme</Text>
            <Text variant="body-sm" className="text-[var(--ds-text-secondary)]">
              Match your Mac&apos;s appearance or choose light or dark
            </Text>
          </Stack>
          <Inline gap={2} wrap className="mb-6">
            {themeOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setPreference(opt.value)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  border border-[var(--ds-border-default)]
                  ${preference === opt.value
                    ? 'bg-[var(--ds-bg-active-tab)] text-[var(--ds-text-primary)]'
                    : 'bg-[var(--ds-bg-surface)] text-[var(--ds-text-secondary)] hover:bg-[var(--ds-bg-muted)]'}
                `}
                aria-pressed={preference === opt.value}
                aria-label={`Theme: ${opt.label}`}
              >
                {opt.label}
              </button>
            ))}
          </Inline>
          <Stack gap={2} className="mb-6">
            <Inline gap={2} align="center">
              <EyeIcon size={24} className="text-[var(--ds-text-secondary)]" />
              <Text variant="h3">Display & motion</Text>
            </Inline>
            <Text variant="body-sm" className="text-[var(--ds-text-secondary)]">
              Adjust visual and motion preferences
            </Text>
          </Stack>
          <Stack gap={4}>
            {a11yOptions.map(({ key, label, description }) => (
              <div
                key={key}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-4 border-b border-[var(--ds-border-default)] last:border-0 last:pb-0 first:pt-0"
              >
                <div className="min-w-0 flex-1">
                  <Text variant="body" className="font-medium">
                    {label}
                  </Text>
                  <Text variant="body-sm" className="text-[var(--ds-text-secondary)] mt-1">
                    {description}
                  </Text>
                </div>
                <div className="shrink-0">
                  <Switch
                    checked={a11y[key]}
                    onCheckedChange={(checked) => a11y.setPreference(key, checked)}
                    aria-label={`Toggle ${label}`}
                  />
                </div>
              </div>
            ))}
          </Stack>
        </InsendioCard>
      </Stack>
    </PageLayout>
  );
}
