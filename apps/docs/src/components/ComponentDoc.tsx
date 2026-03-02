import React from 'react';
import type { LibId } from '../context/LibContext';
import { Text } from '@design-system/typography';
import * as BaseDS from '@design-system/base';
import * as StyledBaseDS from '@design-system/styled-base';
import * as HeroDS from '@design-system/hero-ui';
import * as DaisyDS from '@design-system/daisyui';
import * as MuiDS from '@design-system/mui';
import { CodeEditor } from './CodeEditor';
import { ExampleBlock } from './ExampleBlock';
import {
  COMPONENT_DOCS,
  getFallbackDoc,
  packageNameForLib,
  type KeyboardItem,
  type DocVariant,
} from '../content/componentDocs';

const LIB_MODULES: Record<LibId, Record<string, React.ComponentType<any>>> = {
  base: BaseDS,
  'styled-base': StyledBaseDS,
  'hero-ui': HeroDS,
  daisyui: DaisyDS,
  mui: MuiDS,
};

function getLibModule(lib: LibId) {
  return LIB_MODULES[lib] ?? BaseDS;
}

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

function KeyboardList({ items }: { items: KeyboardItem[] }) {
  return (
    <div className="rounded-lg border border-[var(--ds-border-default)] overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 bg-[var(--ds-bg-muted)] text-sm font-medium">
        <div className="px-3 py-2 border-b sm:border-b-0 sm:border-r border-[var(--ds-border-default)]">Key</div>
        <div className="px-3 py-2">Action</div>
      </div>
      {items.map((it) => (
        <div key={`${it.key}-${it.action}`} className="grid grid-cols-1 sm:grid-cols-2 text-sm">
          <div className="px-3 py-2 border-t sm:border-r border-[var(--ds-border-default)] bg-[var(--ds-bg-surface)] font-mono">
            {it.key}
          </div>
          <div className="px-3 py-2 border-t border-[var(--ds-border-default)] text-[var(--ds-text-secondary)]">
            {it.action}
          </div>
        </div>
      ))}
    </div>
  );
}

function wrapExampleCode(pkg: string, componentTitle: string, snippet: string) {
  // For simple examples, provide a consistent wrapper.
  // (Some docs `usage()` already shows full imports; examples focus on the snippet.)
  return `// ${componentTitle} example\n// Package: ${pkg}\n\n${snippet}\n`;
}

export function ComponentDoc({ componentId, lib }: { componentId: string; lib: LibId }) {
  const normalizedId = componentId.toLowerCase().replace(/\s+/g, '-');
  const DS = getLibModule(lib);
  const doc = COMPONENT_DOCS[normalizedId] ?? getFallbackDoc(normalizedId);
  const pkg = packageNameForLib(lib);

  return (
    <article>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--ds-text-primary)]">{doc.title}</h1>
        <p className="mt-2 text-[var(--ds-text-secondary)]">{doc.description}</p>
      </header>

      {/* Overview example: first example in the list */}
      {doc.examples[0] ? (
        <ExampleBlock
          title="Example"
          description={doc.examples[0].description}
          code={wrapExampleCode(pkg, doc.title, doc.examples[0].code)}
        >
          {doc.examples[0].render(DS, lib)}
        </ExampleBlock>
      ) : null}

      {doc.variants && doc.variants.length > 0 ? (
        <Section title="Variants">
          <div className="space-y-3">
            {doc.variants.map((v: DocVariant) => (
              <div key={v.name} className="rounded-lg border border-[var(--ds-border-default)] p-4 bg-[var(--ds-bg-surface)]">
                <code className="text-sm font-medium text-[var(--ds-text-primary)]">{v.name}</code>
                <p className="mt-1 text-sm text-[var(--ds-text-secondary)]">{v.description}</p>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      <Section title="Usage">
        <p className="text-sm text-[var(--ds-text-secondary)]">
          Import from the selected library package and render the component.
        </p>
        <CodeEditor code={doc.usage(pkg)} ariaLabel={`${doc.title} usage`} />
      </Section>

      <Section title="Examples">
        <p className="text-sm text-[var(--ds-text-secondary)] mb-6">
          One example for each main prop / behavior.
        </p>
        {doc.examples.slice(1).map((ex) => (
          <ExampleBlock
            key={ex.title}
            title={ex.title}
            description={ex.description}
            code={wrapExampleCode(pkg, doc.title, ex.code)}
          >
            {ex.render(DS, lib)}
          </ExampleBlock>
        ))}
      </Section>

      <Section title="RTL">
        <BulletList items={doc.rtl} />
      </Section>

      <Section title="A11y comments">
        <BulletList items={doc.a11y} />
      </Section>

      <Section title="When to use">
        <BulletList items={doc.whenToUse} />
      </Section>

      <Section title="When not to use">
        <BulletList items={doc.whenNotToUse} />
      </Section>

      <Section title="Keyboard interaction">
        <KeyboardList items={doc.keyboard} />
      </Section>
    </article>
  );
}

