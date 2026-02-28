import { Text } from '@design-system/typography';
import { CodeEditor } from './CodeEditor';
import { ExampleBlock } from './ExampleBlock';
import { getChartDoc, type ChartDocSpec } from '../content/chartDocs';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <Text variant="h3" as="h2">{title}</Text>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-5 space-y-1 text-[var(--ds-text-secondary)]">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}

function ChartDocContent({ doc, theme }: { doc: ChartDocSpec; theme: 'light' | 'dark' }) {
  return (
    <article>
      <header className="mb-8">
        <Text variant="h1" as="h1">{doc.title}</Text>
        <Text variant="body-sm" className="mt-2 block">{doc.description}</Text>
      </header>

      <ExampleBlock
        title="Example"
        code={`// ${doc.title} example\n// Package: @design-system/charts\n\n${doc.exampleCode}`}
      >
        {doc.render(theme)}
      </ExampleBlock>

      <Section title="Accessibility props">
        <Text variant="body-sm" className="mb-3 block">
          Charts include a built-in view switch (Chart | Table | Details) and auto-generate a data table. Pass props for W3C Complex Images compliance:
        </Text>
        <ul className="list-disc pl-5 space-y-1 text-sm text-[var(--ds-text-secondary)] mb-3">
          <li><code>aria-label</code> – Short description identifying the chart</li>
          <li><code>aria-describedby</code> – ID of element with long description</li>
          <li><code>longDescription</code> – Text summary (shown in Details view)</li>
          <li><code>caption</code> – Figure caption for the data table</li>
          <li><code>showViewSwitch</code> – Set to false to hide Chart/Table/Details toggle</li>
        </ul>
        <Text variant="body-sm" className="mb-3 block">
          The Table view shows the same data as a table. Details view shows table + longDescription.
        </Text>
      </Section>

      <Section title="Usage">
        <Text variant="body-sm" className="mb-3 block">
          Import from <code className="rounded bg-[var(--ds-bg-muted)] px-1 py-0.5">@design-system/charts</code> and pass theme from your theme context.
        </Text>
        <CodeEditor code={doc.usage} ariaLabel={`${doc.title} usage`} />
      </Section>

      <Section title="When to use">
        <BulletList items={doc.whenToUse} />
      </Section>

      <Section title="When not to use">
        <BulletList items={doc.whenNotToUse} />
      </Section>

      <Section title="Accessibility">
        <BulletList items={doc.a11y} />
      </Section>
    </article>
  );
}

export function ChartDoc({ chartId, theme }: { chartId: string; theme: 'light' | 'dark' }) {
  const normalizedId = chartId.toLowerCase().replace(/\s+/g, '-');
  const doc = getChartDoc(normalizedId);

  if (!doc) {
    return (
      <article>
        <Text variant="h1" as="h1">Chart not found</Text>
        <Text variant="body-sm" className="mt-2 block">
          No documentation for "{chartId}". Available charts: bar, line, pie, area, network-graph.
        </Text>
      </article>
    );
  }

  return <ChartDocContent doc={doc} theme={theme} />;
}
