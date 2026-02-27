import React from 'react';
import { CodeEditor } from './CodeEditor';

interface ExampleBlockProps {
  title: string;
  description?: string;
  code: string;
  children: React.ReactNode;
}

export function ExampleBlock({ title, description, code, children }: ExampleBlockProps) {
  return (
    <section className="mb-8">
      <h3 className="text-lg font-semibold text-[var(--ds-text-primary)]">{title}</h3>
      {description ? (
        <p className="mt-1 text-sm text-[var(--ds-text-secondary)]">{description}</p>
      ) : null}

      <div className="mt-3 rounded-lg border border-[var(--ds-border-default)] bg-[var(--ds-bg-surface)] p-4">
        {children}
      </div>

      <CodeEditor code={code} ariaLabel={`${title} code example`} />
    </section>
  );
}

