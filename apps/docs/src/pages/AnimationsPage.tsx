import { useState } from 'react';
import { Text } from '@design-system/typography';
import { CodeEditor } from '../components/CodeEditor';
import { ExampleBlock } from '../components/ExampleBlock';

const ANIMATION_TOKENS = `/* Duration */
--ds-duration-instant: 0ms;
--ds-duration-fast: 150ms;
--ds-duration-normal: 200ms;
--ds-duration-slow: 300ms;

/* Easing */
--ds-ease-out: cubic-bezier(0.33, 1, 0.68, 1);
--ds-ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);`;

const ANIMATIONS_USAGE = `/* Import tokens (includes animation classes) */
import '@design-system/tokens/css';

/* Apply to any element */
<div className="ds-animate-fade-in">Fades in</div>
<div className="ds-animate-scale-in">Scales in</div>
<div className="ds-animate-slide-up">Slides up</div>
<div className="ds-animate-slide-in-left">Slides from left</div>

/* Stagger delays */
<div className="ds-animate-fade-in ds-animate-delay-0">First</div>
<div className="ds-animate-fade-in ds-animate-delay-1">Second</div>
<div className="ds-animate-fade-in ds-animate-delay-2">Third</div>`;

const STAGGER_CODE = [
  '<div className="ds-animate-fade-in ds-animate-delay-0">First</div>',
  '<div className="ds-animate-fade-in ds-animate-delay-1">Second</div>',
  '<div className="ds-animate-fade-in ds-animate-delay-2">Third</div>',
].join('\n');

function AnimatedDemo({
  className,
  label,
}: {
  className: string;
  label: string;
}) {
  const [key, setKey] = useState(0);
  return (
    <div className="flex flex-col gap-2">
      <div
        key={key}
        className={cn(
          'min-h-[80px] flex items-center justify-center rounded-lg border border-[var(--ds-border-default)] bg-[var(--ds-bg-surface)] p-4',
          className
        )}
      >
        <Text variant="body-sm" className="text-[var(--ds-text-secondary)]">
          {label}
        </Text>
      </div>
      <button
        type="button"
        onClick={() => setKey((k) => k + 1)}
        className="self-end text-sm text-[var(--ds-text-link)] hover:underline"
      >
        Replay
      </button>
    </div>
  );
}

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

function StaggerDemo() {
  const [key, setKey] = useState(0);
  return (
    <div className="flex flex-col gap-2">
      <div key={key} className="flex flex-col gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              'ds-animate-fade-in rounded-lg border border-[var(--ds-border-default)] bg-[var(--ds-bg-surface)] p-4',
              `ds-animate-delay-${i}`
            )}
          >
            <Text variant="body-sm">Card {i + 1}</Text>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setKey((k) => k + 1)}
        className="self-end text-sm text-[var(--ds-text-link)] hover:underline"
      >
        Replay
      </button>
    </div>
  );
}

export function AnimationsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <article>
        <header className="mb-8">
          <Text variant="h1" as="h1">
            Animations
          </Text>
          <Text variant="body-sm" className="mt-2 block">
            CSS animation utilities from @design-system/tokens. Used by Dialog, AlertDialog, and available for stats, cards, lists, and more. Respects prefers-reduced-motion.
          </Text>
        </header>

        <section className="mt-10">
          <Text variant="h3" as="h2" className="mb-4">
            Tokens
          </Text>
          <Text variant="body-sm" className="mb-4 text-[var(--ds-text-secondary)]">
            Duration and easing variables for consistent motion across the design system.
          </Text>
          <CodeEditor code={ANIMATION_TOKENS} ariaLabel="Animation tokens" />
        </section>

        <section className="mt-10">
          <Text variant="h3" as="h2" className="mb-4">
            Catalog
          </Text>
          <Text variant="body-sm" className="mb-6 text-[var(--ds-text-secondary)]">
            Click Replay to run the animation again.
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ExampleBlock
              title="Fade in"
              code={'className="ds-animate-fade-in"'}
            >
              <AnimatedDemo className="ds-animate-fade-in" label="Fade in" />
            </ExampleBlock>
            <ExampleBlock
              title="Scale in"
              code={'className="ds-animate-scale-in"'}
            >
              <AnimatedDemo className="ds-animate-scale-in" label="Scale in" />
            </ExampleBlock>
            <ExampleBlock
              title="Slide up"
              code={'className="ds-animate-slide-up"'}
            >
              <AnimatedDemo className="ds-animate-slide-up" label="Slide up" />
            </ExampleBlock>
            <ExampleBlock
              title="Slide in from left"
              code={'className="ds-animate-slide-in-left"'}
            >
              <AnimatedDemo className="ds-animate-slide-in-left" label="Slide in from left" />
            </ExampleBlock>
          </div>
        </section>

        <section className="mt-10">
          <Text variant="h3" as="h2" className="mb-4">
            Staggered animation
          </Text>
          <Text variant="body-sm" className="mb-4 text-[var(--ds-text-secondary)]">
            Use delay classes to sequence animations (e.g. stat cards, list items).
          </Text>
          <ExampleBlock
            title="Staggered fade"
            code={STAGGER_CODE}
          >
            <StaggerDemo />
          </ExampleBlock>
        </section>

        <section className="mt-10">
          <Text variant="h3" as="h2" className="mb-4">
            Usage
          </Text>
          <CodeEditor code={ANIMATIONS_USAGE} ariaLabel="Animations usage" />
        </section>

        <section className="mt-10">
          <Text variant="h3" as="h2" className="mb-4">
            Accessibility
          </Text>
          <ul className="list-disc pl-5 space-y-1 text-[var(--ds-text-secondary)]">
            <li>
              <strong>prefers-reduced-motion</strong>: When the user has reduced motion enabled, animations are disabled (duration set to 0.01ms).
            </li>
            <li>
              Dialog and AlertDialog use <code className="text-sm">ds-dialog-overlay-enter</code> and <code className="text-sm">ds-dialog-content-enter</code> internally.
            </li>
            <li>
              Use animation classes sparingly; avoid motion on critical content.
            </li>
          </ul>
        </section>
      </article>
    </div>
  );
}
