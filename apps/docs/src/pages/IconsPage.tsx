import { Text } from '@design-system/typography';
import { BellIcon } from '@design-system/icons';
import { CodeEditor } from '../components/CodeEditor';
import { ExampleBlock } from '../components/ExampleBlock';
import { ICON_SPECS, ICONS_USAGE } from '../content/iconsDocs';

export function IconsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <article>
        <header className="mb-8">
          <Text variant="h1" as="h1">
            Icons
          </Text>
          <Text variant="body-sm" className="mt-2 block">
            SVG icon components from @design-system/icons. All icons use currentColor and support size and className props.
          </Text>
        </header>

        <section className="mt-10">
          <Text variant="h3" as="h2" className="mb-4">
            Icon grid
          </Text>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {ICON_SPECS.map(({ id, name, component: Icon }) => (
              <div
                key={id}
                className="flex flex-col items-center gap-2 p-4 rounded-lg border border-[var(--ds-border-default)] bg-[var(--ds-bg-surface)] hover:border-[var(--ds-border-focus)] transition-colors"
              >
                <Icon size={28} className="text-[var(--ds-text-primary)]" aria-hidden />
                <Text variant="caption" className="text-center font-mono text-[10px] break-all">
                  {name}
                </Text>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <Text variant="h3" as="h2" className="mb-4">
            Sizes
          </Text>
          <ExampleBlock
            title="Icon sizes"
            code={`import { BellIcon } from '@design-system/icons';

<BellIcon size={16} />
<BellIcon size={24} />
<BellIcon size={32} />`}
          >
            <div className="flex items-end gap-6">
              <div className="flex flex-col items-center gap-2">
                <BellIcon size={16} className="text-[var(--ds-text-primary)]" aria-hidden />
                <Text variant="caption">16px</Text>
              </div>
              <div className="flex flex-col items-center gap-2">
                <BellIcon size={24} className="text-[var(--ds-text-primary)]" aria-hidden />
                <Text variant="caption">24px</Text>
              </div>
              <div className="flex flex-col items-center gap-2">
                <BellIcon size={32} className="text-[var(--ds-text-primary)]" aria-hidden />
                <Text variant="caption">32px</Text>
              </div>
            </div>
          </ExampleBlock>
        </section>

        <section className="mt-10">
          <Text variant="h3" as="h2" className="mb-4">
            Usage
          </Text>
          <CodeEditor code={ICONS_USAGE} ariaLabel="Icons usage" />
        </section>
      </article>
    </div>
  );
}
