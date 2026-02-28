import { Link } from 'react-router-dom';
import { Text } from '@design-system/typography';
import { useLib } from '../context/LibContext';

const COMPONENTS = [
  'Accordion',
  'Alert',
  'Alert Dialog',
  'Breadcrumb',
  'Button',
  'Carousel',
  'Checkbox',
  'Combobox',
  'Dialog',
  'Disclosure',
  'Link',
  'Listbox',
  'Menu',
  'Radio Group',
  'Slider',
  'Switch',
  'Table',
  'Tabs',
  'Toolbar',
  'Tooltip',
  'Tree View',
  'Treegrid',
  'Window Splitter',
];

const LAYOUT = ['Box', 'Container', 'Stack', 'Inline', 'Grid', 'Spacer', 'Divider', 'Center'];
const LANDMARKS = [
  'Banner',
  'Main',
  'Nav',
  'Content Info',
  'Complementary',
  'Region',
  'Search',
  'Form Landmark',
];

function toComponentId(name: string) {
  return name.toLowerCase().split(/\s+/g).join('-');
}

export function HomePage() {
  const { lib } = useLib();

  return (
    <div className="mx-auto max-w-4xl">
      <section className="mb-12">
        <Text variant="h1" as="h1" className="mb-2">
          Design System Component Library
        </Text>
        <Text variant="body" className="text-[var(--ds-text-secondary)] text-lg">
          Accessible UI components following W3C ARIA APG patterns. Switch libraries above to see
          the same components styled with Shadcn UI, HeroUI, DaisyUI, or Material UI.
        </Text>
      </section>

      <section>
        <Text variant="h3" as="h2" className="mb-4">Components</Text>
        <Text variant="body-sm" className="mb-6">
          Currently viewing: <strong>{lib}</strong>
        </Text>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {COMPONENTS.map((name) => (
            <Link
              key={name}
              to={`/components/${toComponentId(name)}`}
              className="block p-4 rounded-lg border border-[var(--ds-border-default)] bg-[var(--ds-bg-surface)] hover:border-[var(--ds-border-focus)] transition-colors"
            >
              {name}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <Text variant="h3" as="h2" className="mb-4">Layout</Text>
        <Text variant="body-sm" className="mb-6">
          Layout primitives for spacing, alignment, and responsive structure.
        </Text>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {LAYOUT.map((name) => (
            <Link
              key={name}
              to={`/components/${toComponentId(name)}`}
              className="block p-4 rounded-lg border border-[var(--ds-border-default)] bg-[var(--ds-bg-surface)] hover:border-[var(--ds-border-focus)] transition-colors"
            >
              {name}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <Text variant="h3" as="h2" className="mb-4">Typography</Text>
        <Text variant="body-sm" className="mb-6">
          Text component with design-token–driven variants (h1–h4, body, body-sm, caption, overline).
        </Text>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <Link
            to="/typography/h1"
            className="block p-4 rounded-lg border border-[var(--ds-border-default)] bg-[var(--ds-bg-surface)] hover:border-[var(--ds-border-focus)] transition-colors"
          >
            Typography
          </Link>
        </div>
      </section>

      <section className="mt-10">
        <Text variant="h3" as="h2" className="mb-4">Icons</Text>
        <Text variant="body-sm" className="mb-6">
          SVG icon components with configurable size and styling.
        </Text>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <Link
            to="/icons"
            className="block p-4 rounded-lg border border-[var(--ds-border-default)] bg-[var(--ds-bg-surface)] hover:border-[var(--ds-border-focus)] transition-colors"
          >
            Icons
          </Link>
        </div>
      </section>

      <section className="mt-10">
        <Text variant="h3" as="h2" className="mb-4">Animations</Text>
        <Text variant="body-sm" className="mb-6">
          CSS animation utilities (fade, scale, slide) for dialogs, stats, cards, and more. Respects prefers-reduced-motion.
        </Text>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <Link
            to="/animations"
            className="block p-4 rounded-lg border border-[var(--ds-border-default)] bg-[var(--ds-bg-surface)] hover:border-[var(--ds-border-focus)] transition-colors"
          >
            Animations
          </Link>
        </div>
      </section>

      <section className="mt-10">
        <Text variant="h3" as="h2" className="mb-4">Charts</Text>
        <Text variant="body-sm" className="mb-6">
          Sample charts and visualizations styled with design tokens (bar, line, pie, area, network).
        </Text>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <Link
            to="/charts/bar"
            className="block p-4 rounded-lg border border-[var(--ds-border-default)] bg-[var(--ds-bg-surface)] hover:border-[var(--ds-border-focus)] transition-colors"
          >
            Charts &amp; Visualizations
          </Link>
        </div>
      </section>

      <section className="mt-10">
        <Text variant="h3" as="h2" className="mb-4">Landmarks</Text>
        <Text variant="body-sm" className="mb-6">
          Semantic page regions (banner, navigation, main, etc.) for accessible structure.
        </Text>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {LANDMARKS.map((name) => (
            <Link
              key={name}
              to={`/components/${toComponentId(name)}`}
              className="block p-4 rounded-lg border border-[var(--ds-border-default)] bg-[var(--ds-bg-surface)] hover:border-[var(--ds-border-focus)] transition-colors"
            >
              {name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
