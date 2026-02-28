import { useParams, Link } from 'react-router-dom';
import { Text } from '@design-system/typography';
import { CodeEditor } from './CodeEditor';
import { ExampleBlock } from './ExampleBlock';
import {
  TYPOGRAPHY_VARIANTS,
  TYPOGRAPHY_USAGE,
  TYPOGRAPHY_WHEN_TO_USE,
  TYPOGRAPHY_WHEN_NOT_TO_USE,
  TYPOGRAPHY_A11Y,
} from '../content/typographyDocs';

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-5 space-y-1 text-[var(--ds-text-secondary)]">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}

export function TypographyDoc() {
  const { variantId } = useParams();
  const activeId = (variantId ?? 'h1') as (typeof TYPOGRAPHY_VARIANTS)[number]['id'];
  const variant = TYPOGRAPHY_VARIANTS.find((v) => v.id === activeId) ?? TYPOGRAPHY_VARIANTS[0];

  const linkClass = (id: string) =>
    `w-full px-3 py-1.5 rounded text-sm text-left transition-colors ${
      activeId === id
        ? 'bg-[var(--ds-bg-active-tab)] text-[var(--ds-text-primary)]'
        : 'text-[var(--ds-text-secondary)] hover:bg-[var(--ds-bg-elevated)]'
    }`;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="lg:flex lg:gap-10">
        <aside className="lg:w-64 lg:flex-none">
          <nav
            className="lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:overflow-auto rounded-lg border border-[var(--ds-border-default)] bg-[var(--ds-bg-surface)] p-4"
            aria-label="Typography variants"
          >
            <Text variant="overline" as="h2" className="block">
              Variants
            </Text>
            <div className="mt-2 flex flex-col gap-1">
              {TYPOGRAPHY_VARIANTS.map((v) => (
                <Link
                  key={v.id}
                  to={`/typography/${v.id}`}
                  className={linkClass(v.id)}
                  aria-current={activeId === v.id ? 'page' : undefined}
                >
                  {v.label}
                </Link>
              ))}
            </div>
          </nav>
        </aside>

        <main className="min-w-0 flex-1 pt-8 lg:pt-0" aria-label="Typography documentation">
          <article>
            <header className="mb-8">
              <Text variant="h1" as="h1">
                {variant.label}
              </Text>
              <Text variant="body-sm" className="mt-2 block">
                {variant.description}
              </Text>
            </header>

            <section className="mt-10">
              <Text variant="h3" as="h2" className="mb-4">
                Example
              </Text>
              <div className="rounded-lg border border-[var(--ds-border-default)] bg-[var(--ds-bg-surface)] p-6">
                <Text variant={variant.id} as={variant.defaultTag as 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'}>
                  {variant.sampleText}
                </Text>
              </div>
            </section>

            <section className="mt-10">
              <Text variant="h3" as="h2" className="mb-4">
                Usage
              </Text>
              <CodeEditor
                code={`<Text variant="${variant.id}">${variant.sampleText}</Text>`}
                ariaLabel={`${variant.label} usage`}
              />
            </section>

            <section className="mt-10">
              <Text variant="h3" as="h2" className="mb-4">
                All variants
              </Text>
              <ExampleBlock
                title="Text component"
                code={`// Package: @design-system/typography\n\n${TYPOGRAPHY_USAGE}`}
              >
                <div className="flex flex-col gap-6">
                  {TYPOGRAPHY_VARIANTS.map((v) => (
                    <div key={v.id} className="flex flex-col gap-1">
                      <Text variant="caption" className="text-[var(--ds-text-muted)]">
                        variant="{v.id}"
                      </Text>
                      <Text variant={v.id} as={v.defaultTag as 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'}>
                        {v.sampleText}
                      </Text>
                    </div>
                  ))}
                </div>
              </ExampleBlock>
            </section>

            <section className="mt-10">
              <Text variant="h3" as="h2" className="mb-4">
                When to use
              </Text>
              <BulletList items={TYPOGRAPHY_WHEN_TO_USE} />
            </section>

            <section className="mt-10">
              <Text variant="h3" as="h2" className="mb-4">
                When not to use
              </Text>
              <BulletList items={TYPOGRAPHY_WHEN_NOT_TO_USE} />
            </section>

            <section className="mt-10">
              <Text variant="h3" as="h2" className="mb-4">
                Accessibility
              </Text>
              <BulletList items={TYPOGRAPHY_A11Y} />
            </section>
          </article>
        </main>
      </div>
    </div>
  );
}
