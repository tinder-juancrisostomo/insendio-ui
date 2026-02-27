import { Link } from 'react-router-dom';
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
        <h1 className="text-3xl font-bold text-[var(--ds-text-primary)] mb-2">
          Design System Component Library
        </h1>
        <p className="text-[var(--ds-text-secondary)] text-lg">
          Accessible UI components following W3C ARIA APG patterns. Switch libraries above to see
          the same components styled with Shadcn UI, HeroUI, DaisyUI, or Material UI.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Components</h2>
        <p className="text-[var(--ds-text-secondary)] mb-6">
          Currently viewing: <strong>{lib}</strong>
        </p>
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
        <h2 className="text-xl font-semibold mb-4">Layout</h2>
        <p className="text-[var(--ds-text-secondary)] mb-6">
          Layout primitives for spacing, alignment, and responsive structure.
        </p>
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
        <h2 className="text-xl font-semibold mb-4">Landmarks</h2>
        <p className="text-[var(--ds-text-secondary)] mb-6">
          Semantic page regions (banner, navigation, main, etc.) for accessible structure.
        </p>
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
