import { Text } from '@design-system/typography';

const APPS = [
  { name: 'MUI', path: '/mui/' },
  { name: 'Hero UI', path: '/hero-ui/' },
  { name: 'Styled Base', path: '/styled-base/' },
  { name: 'Shadcn Radix', path: '/shadcn-redix/' },
  { name: 'Shadcn UI', path: '/shadcn-ui/' },
  { name: 'Daisy UI', path: '/daisy-ui/' },
] as const;

export function AppsPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <section className="mb-12">
        <Text variant="h1" as="h1" className="mb-2">
          Design System Apps
        </Text>
        <Text variant="body" className="text-[var(--ds-text-secondary)] text-lg">
          Full Insendio demo apps, each using a different UI library. Select an app to explore.
        </Text>
      </section>

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {APPS.map((app) => (
            <a
              key={app.path}
              href={app.path}
              className="block p-4 rounded-lg border border-[var(--ds-border-default)] bg-[var(--ds-bg-surface)] hover:border-[var(--ds-border-focus)] transition-colors"
            >
              {app.name}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
