import React from 'react';
import type { LibId } from '../context/LibContext';
import * as BaseDS from '@design-system/base';
import * as StyledBaseDS from '@design-system/styled-base';
import * as HeroDS from '@design-system/hero-ui';
import * as DaisyDS from '@design-system/daisyui';
import * as MuiDS from '@design-system/mui';

interface ComponentDemoProps {
  componentId: string;
  lib: LibId;
}

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

export function ComponentDemo({ componentId, lib }: ComponentDemoProps) {
  const normalizedId = componentId.toLowerCase().replace(/\s+/g, '-');
  const DS = getLibModule(lib);

  const title = normalizedId
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  let demo: React.ReactNode;
  try {
    demo = renderDemo(normalizedId, DS, lib);
  } catch (e) {
    demo = (
      <p className="text-[var(--ds-text-secondary)]">
        Demo not available: {(e as Error).message}
      </p>
    );
  }

  return (
    <section>
      <h1 className="text-2xl font-bold mb-6">{title}</h1>
      <div className="p-6 rounded-lg border border-[var(--ds-border-default)] bg-[var(--ds-bg-surface)]">
        {demo}
      </div>
    </section>
  );
}

function getButtonVariants(lib: LibId) {
  switch (lib) {
    case 'base':
      return {
        primary: { className: 'ds-btn ds-btn--primary' },
        secondary: { className: 'ds-btn ds-btn--secondary' },
        outline: { className: 'ds-btn ds-btn--outline' },
      };
    default:
      return {
        primary: { variant: 'default' as const },
        secondary: { variant: 'secondary' as const },
        outline: { variant: 'outline' as const },
      };
  }
}

function renderDemo(id: string, DS: Record<string, React.ComponentType<any>>, lib: LibId): React.ReactNode {
  switch (id) {
    case 'button': {
      const variants = getButtonVariants(lib);
      return (
        <div className="flex flex-wrap gap-3">
          <DS.Button {...variants.primary}>Primary Button</DS.Button>
          <DS.Button {...variants.secondary}>Secondary</DS.Button>
          <DS.Button {...variants.outline}>Outline</DS.Button>
        </div>
      );
    }
    case 'checkbox':
      return (
        <div className="flex flex-col gap-2">
          <DS.Checkbox label="Accept terms" />
          <DS.Checkbox label="Subscribe" checked />
        </div>
      );
    case 'switch':
      return (
        <div className="flex flex-wrap gap-6 items-center">
          <DS.Switch label="Enable notifications" />
          <DS.Switch label="Dark mode" checked />
        </div>
      );
    case 'tabs':
      return (
        <DS.Tabs defaultSelectedId="tab1">
          <DS.TabList className="flex gap-2 border-b mb-2">
            <DS.Tab id="tab1">Tab 1</DS.Tab>
            <DS.Tab id="tab2">Tab 2</DS.Tab>
          </DS.TabList>
          <DS.TabPanel tabId="tab1">Content for tab 1</DS.TabPanel>
          <DS.TabPanel tabId="tab2">Content for tab 2</DS.TabPanel>
        </DS.Tabs>
      );
    case 'disclosure':
      return (
        <DS.Disclosure defaultExpanded={false}>
          <div>
            <DS.DisclosureTrigger className="cursor-pointer font-medium">
              Toggle
            </DS.DisclosureTrigger>
            <DS.DisclosurePanel className="mt-2">
              Hidden content here.
            </DS.DisclosurePanel>
          </div>
        </DS.Disclosure>
      );
    case 'accordion':
      return (
        <DS.Accordion defaultExpanded={['h1']}>
          <DS.AccordionItem id="item1">
            <DS.AccordionHeader id="h1" panelId="p1">
              Section 1
            </DS.AccordionHeader>
            <DS.AccordionPanel id="p1" headerId="h1">
              Content 1
            </DS.AccordionPanel>
          </DS.AccordionItem>
          <DS.AccordionItem id="item2">
            <DS.AccordionHeader id="h2" panelId="p2">
              Section 2
            </DS.AccordionHeader>
            <DS.AccordionPanel id="p2" headerId="h2">
              Content 2
            </DS.AccordionPanel>
          </DS.AccordionItem>
        </DS.Accordion>
      );
    case 'alert':
      return <DS.Alert>This is an alert message.</DS.Alert>;
    case 'breadcrumb':
      return (
        <DS.Breadcrumb>
          <DS.BreadcrumbItem>
            <DS.BreadcrumbLink href="/">Home</DS.BreadcrumbLink>
          </DS.BreadcrumbItem>
          <DS.BreadcrumbItem>
            <DS.BreadcrumbLink href="/components" current>
              Components
            </DS.BreadcrumbLink>
          </DS.BreadcrumbItem>
        </DS.Breadcrumb>
      );
    case 'link':
      return <DS.Link href="/">Go to Home</DS.Link>;
    case 'radio-group':
      return (
        <DS.RadioGroup defaultValue="a" aria-label="Choose one">
          <DS.Radio value="a" label="Option A" />
          <DS.Radio value="b" label="Option B" />
        </DS.RadioGroup>
      );
    case 'combobox':
      return (
        <DS.Combobox
          options={[
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
          ]}
          aria-label="Select option"
        />
      );
    case 'listbox':
      return (
        <DS.Listbox
          options={[
            { value: '1', label: 'Item 1' },
            { value: '2', label: 'Item 2' },
          ]}
          aria-label="Select item"
        />
      );
    case 'table':
      return (
        <DS.Table>
          <DS.TableHeader>
            <DS.TableRow>
              <DS.TableCell as="th" scope="col">
                Name
              </DS.TableCell>
              <DS.TableCell as="th" scope="col">
                Value
              </DS.TableCell>
            </DS.TableRow>
          </DS.TableHeader>
          <DS.TableBody>
            <DS.TableRow>
              <DS.TableCell>A</DS.TableCell>
              <DS.TableCell>1</DS.TableCell>
            </DS.TableRow>
            <DS.TableRow>
              <DS.TableCell>B</DS.TableCell>
              <DS.TableCell>2</DS.TableCell>
            </DS.TableRow>
          </DS.TableBody>
        </DS.Table>
      );
    case 'toolbar':
      return (
        <DS.Toolbar aria-label="Actions">
          <DS.Button>Cut</DS.Button>
          <DS.Button>Copy</DS.Button>
          <DS.Button>Paste</DS.Button>
        </DS.Toolbar>
      );
    case 'carousel':
      return (
        <DS.Carousel>
          <div className="p-4 bg-gray-100 rounded">Slide 1</div>
          <div className="p-4 bg-gray-100 rounded">Slide 2</div>
        </DS.Carousel>
      );
    case 'slider':
      return <DS.Slider aria-label="Volume" defaultValue={50} />;
    case 'alert-dialog':
      return (
        <div>
          <DS.AlertDialog open={false} onClose={() => {}}>
            Alert dialog demo (closed)
          </DS.AlertDialog>
          <p className="text-sm text-[var(--ds-text-secondary)]">
            AlertDialog is typically controlled by a button. Open state: false.
          </p>
        </div>
      );
    case 'dialog':
      return (
        <div>
          <DS.Dialog open={false} onClose={() => {}}>
            Modal content
          </DS.Dialog>
          <p className="text-sm text-[var(--ds-text-secondary)]">
            Dialog is typically controlled. Open state: false.
          </p>
        </div>
      );
    case 'menu':
      return (
        <DS.Menu>
          <DS.MenuButton>Open Menu</DS.MenuButton>
          <DS.MenuList>
            <DS.MenuItem>Item 1</DS.MenuItem>
            <DS.MenuItem>Item 2</DS.MenuItem>
          </DS.MenuList>
        </DS.Menu>
      );
    case 'tooltip':
      return (
        <DS.Tooltip content="Tooltip text">
          <button type="button" className="underline">
            Hover or focus me
          </button>
        </DS.Tooltip>
      );
    default:
      return <p className="text-[var(--ds-text-secondary)]">No demo for this component.</p>;
  }
}
