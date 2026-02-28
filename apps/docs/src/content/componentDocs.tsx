import React from 'react';
import type { LibId } from '../context/LibContext';

export type KeyboardItem = { key: string; action: string };

export type DocVariant = { name: string; description: string };

export interface DocExample {
  title: string;
  description?: string;
  code: string;
  render: (DS: Record<string, React.ComponentType<any>>, lib: LibId) => React.ReactNode;
}

export interface ComponentDocSpec {
  title: string;
  description: string;
  usage: (pkg: string) => string;
  examples: DocExample[];
  /** Optional list of variants to display (e.g. basic, tabbed) */
  variants?: DocVariant[];
  rtl: string[];
  a11y: string[];
  whenToUse: string[];
  whenNotToUse: string[];
  keyboard: KeyboardItem[];
}

export function packageNameForLib(lib: LibId) {
  switch (lib) {
    case 'shadcn':
      return '@design-system/shadcn';
    case 'hero-ui':
      return '@design-system/hero-ui';
    case 'daisyui':
      return '@design-system/daisyui';
    case 'mui':
      return '@design-system/mui';
    default:
      return '@design-system/base';
  }
}

const RTL_GENERIC = [
  'Set `dir=\"rtl\"` on a parent container to test RTL.',
  'For components that use Left/Right arrows (Tabs, Carousel), the expected direction may be reversed in RTL. Ensure the behavior matches your product requirements.',
];

const A11Y_GENERIC = [
  'Provide accessible labels (`aria-label`, `aria-labelledby`, or visible text) for interactive controls.',
  'Ensure focus is visible and keyboard navigation works end-to-end.',
  'Don’t remove required ARIA attributes added by the base components.',
];

const A11Y_LANDMARKS_PRINCIPLES = [
  'Landmarks provide a powerful way to identify the organization and structure of a web page for assistive technologies.',
  'If using landmarks, all perceivable content should reside in a semantically meaningful landmark so content is not missed.',
  '`banner`, `main`, `complementary`, and `contentinfo` landmarks should be top-level landmarks.',
  'Landmark roles can be nested to identify parent/child relationships between page areas.',
  'If a landmark role is used more than once on a page, each instance should have a unique accessible name (`aria-label` or `aria-labelledby`).',
  'Avoid using the landmark role as part of the label (e.g., label “Site” not “Site Navigation”).',
  'Avoid wrapping modal dialog content in landmarks; the dialog already provides a named container and boundaries while open.',
];

function DemoHint({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm text-[var(--ds-text-secondary)]">
      {children}
    </p>
  );
}

function StatefulDialogExample({
  DS,
  kind,
}: {
  DS: Record<string, React.ComponentType<any>>;
  kind: 'dialog' | 'alert-dialog';
}) {
  const [open, setOpen] = React.useState(false);
  const DialogComponent = kind === 'dialog' ? DS.Dialog : DS.AlertDialog;
  const title = kind === 'dialog' ? 'Dialog' : 'AlertDialog';

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3 flex-wrap items-center">
        <DS.Button onClick={() => setOpen(true)} variant="default">
          Open {title}
        </DS.Button>
        <DS.Button onClick={() => setOpen(false)} variant="secondary">
          Close
        </DS.Button>
      </div>

      <DialogComponent open={open} onClose={() => setOpen(false)} aria-label={`${title} example`}>
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-[var(--ds-text-secondary)]">
            This is an example {title.toLowerCase()}.
          </p>
          <div className="flex gap-2 flex-wrap">
            <DS.Button onClick={() => setOpen(false)} variant="default">
              Confirm
            </DS.Button>
            <DS.Button onClick={() => setOpen(false)} variant="outline">
              Cancel
            </DS.Button>
          </div>
        </div>
      </DialogComponent>

      <DemoHint>
        Tip: press <span className="font-mono">Esc</span> to close when open.
      </DemoHint>
    </div>
  );
}

function StatefulSliderExample({ DS }: { DS: Record<string, React.ComponentType<any>> }) {
  const [value, setValue] = React.useState(40);
  return (
    <div className="flex flex-col gap-3">
      <DS.Slider aria-label="Volume" value={value} onChange={setValue} min={0} max={100} step={5} />
      <div className="text-sm text-[var(--ds-text-secondary)]">Value: {value}</div>
      <DemoHint>Use arrow keys to adjust the slider when focused.</DemoHint>
    </div>
  );
}

function StatefulSwitchExample({ DS }: { DS: Record<string, React.ComponentType<any>> }) {
  const [checked, setChecked] = React.useState(false);
  return (
    <div className="flex flex-wrap items-center gap-6">
      <DS.Switch label="Enable notifications" checked={checked} onCheckedChange={setChecked} />
      <div className="text-sm text-[var(--ds-text-secondary)]">Checked: {String(checked)}</div>
    </div>
  );
}

function StatefulComboboxExample({ DS }: { DS: Record<string, React.ComponentType<any>> }) {
  const [value, setValue] = React.useState('1');
  return (
    <div className="flex flex-col gap-3">
      <DS.Combobox
        aria-label="Select option"
        options={[
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
          { value: '3', label: 'Option 3' },
        ]}
        value={value}
        onValueChange={setValue}
      />
      <div className="text-sm text-[var(--ds-text-secondary)]">Value: {value}</div>
    </div>
  );
}

export const COMPONENT_DOCS: Record<string, ComponentDocSpec> = {
  button: {
    title: 'Button',
    description:
      'A button is a widget that enables users to trigger an action or event, such as submitting a form, opening a dialog, canceling an action, or performing a delete operation.',
    usage: (pkg) => `import { Button } from '${pkg}';\n\nexport function Example() {\n  return <Button variant=\"default\">Save</Button>;\n}\n`,
    examples: [
      {
        title: 'Basic',
        description: 'Default (primary) button.',
        code: `<Button variant=\"default\">Primary</Button>`,
        render: (DS) => <DS.Button variant="default">Primary</DS.Button>,
      },
      {
        title: 'Secondary',
        description: 'Use for less prominent actions.',
        code: `<Button variant=\"secondary\">Secondary</Button>`,
        render: (DS) => <DS.Button variant="secondary">Secondary</DS.Button>,
      },
      {
        title: 'Outline',
        description: 'Use when you want a low-emphasis button with a border.',
        code: `<Button variant=\"outline\">Outline</Button>`,
        render: (DS) => <DS.Button variant="outline">Outline</DS.Button>,
      },
      {
        title: 'Disabled',
        description: 'Use to indicate an action is unavailable.',
        code: `<Button disabled>Disabled</Button>`,
        render: (DS) => <DS.Button disabled>Disabled</DS.Button>,
      },
      {
        title: 'Sizes',
        description: 'Adjust density based on context.',
        code: `<>\n  <Button size=\"sm\">Small</Button>\n  <Button size=\"default\">Default</Button>\n  <Button size=\"lg\">Large</Button>\n</>`,
        render: (DS) => (
          <div className="flex flex-wrap gap-3 items-center">
            <DS.Button size="sm">Small</DS.Button>
            <DS.Button size="default">Default</DS.Button>
            <DS.Button size="lg">Large</DS.Button>
          </div>
        ),
      },
    ],
    rtl: RTL_GENERIC,
    a11y: [
      ...A11Y_GENERIC,
      'Use clear button text. Avoid icon-only buttons unless you provide an accessible name.',
    ],
    whenToUse: [
      'Use for in-page actions that trigger an immediate event (submit, save, open dialog).',
      'Use a primary variant for the most important action and secondary/outline for alternatives.',
    ],
    whenNotToUse: [
      'Don’t use Buttons for navigation—use a Link for navigation.',
      'Don’t use multiple primary buttons in the same area unless truly necessary.',
    ],
    keyboard: [
      { key: 'Tab / Shift+Tab', action: 'Moves focus to/from the button.' },
      { key: 'Enter / Space', action: 'Activates the button.' },
    ],
  },

  switch: {
    title: 'Switch',
    description: 'A switch is an input widget that allows users to choose one of two values: on or off.',
    usage: (pkg) => `import { Switch } from '${pkg}';\n\nexport function Example() {\n  return <Switch label=\"Enable notifications\" />;\n}\n`,
    examples: [
      {
        title: 'Basic',
        description: 'Uncontrolled switch with a label.',
        code: `<Switch label=\"Enable notifications\" />`,
        render: (DS) => <DS.Switch label="Enable notifications" />,
      },
      {
        title: 'Checked',
        description: 'Controlled checked state.',
        code: `const [checked, setChecked] = useState(false);\n\n<Switch label=\"Enable notifications\" checked={checked} onCheckedChange={setChecked} />`,
        render: (DS) => <StatefulSwitchExample DS={DS} />,
      },
      {
        title: 'Disabled',
        description: 'Prevents interaction.',
        code: `<Switch label=\"Experimental\" disabled />`,
        render: (DS) => <DS.Switch label="Experimental" disabled />,
      },
    ],
    rtl: RTL_GENERIC,
    a11y: [
      ...A11Y_GENERIC,
      'Always provide a visible label or an accessible name for the switch.',
    ],
    whenToUse: [
      'Use for binary settings that take effect immediately.',
      'Use when the label describes a persistent preference (on/off).',
    ],
    whenNotToUse: [
      'Don’t use a switch for actions that are not binary; use Checkbox or Select/RadioGroup.',
      'Don’t use for actions that require confirmation; use a button + confirmation dialog.',
    ],
    keyboard: [
      { key: 'Tab / Shift+Tab', action: 'Moves focus to/from the switch.' },
      { key: 'Space / Enter', action: 'Toggles the switch.' },
      { key: 'Esc', action: 'No effect (switch remains focused).' },
    ],
  },

  checkbox: {
    title: 'Checkbox',
    description:
      'WAI-ARIA supports two types of checkbox widgets: dual-state checkboxes toggle between two choices (checked and not checked) and tri-state checkboxes, which allow a third partially checked state.',
    usage: (pkg) => `import { Checkbox } from '${pkg}';\n\nexport function Example() {\n  return <Checkbox label=\"Accept terms\" />;\n}\n`,
    examples: [
      {
        title: 'Basic',
        code: `<Checkbox label=\"Accept terms\" />`,
        render: (DS) => <DS.Checkbox label="Accept terms" />,
      },
      {
        title: 'Checked',
        code: `<Checkbox label=\"Subscribe\" checked />`,
        render: (DS) => <DS.Checkbox label="Subscribe" checked />,
      },
      {
        title: 'Indeterminate',
        description: 'Use for “some selected” in a group.',
        code: `<Checkbox label=\"Select all\" checked=\"indeterminate\" />`,
        render: (DS) => <DS.Checkbox label="Select all" checked="indeterminate" />,
      },
      {
        title: 'Disabled',
        code: `<Checkbox label=\"Disabled\" disabled />`,
        render: (DS) => <DS.Checkbox label="Disabled" disabled />,
      },
    ],
    rtl: RTL_GENERIC,
    a11y: [
      ...A11Y_GENERIC,
      'Use `checked=\"indeterminate\"` only when you can also represent the actual underlying partial selection state.',
    ],
    whenToUse: [
      'Use for selecting one or more items in a set (multi-select).',
      'Use indeterminate to represent partial selection (e.g., “Select all”).',
    ],
    whenNotToUse: [
      'Don’t use Checkbox for mutually exclusive choices; use RadioGroup.',
    ],
    keyboard: [
      { key: 'Tab / Shift+Tab', action: 'Moves focus.' },
      { key: 'Space', action: 'Toggles checked state.' },
    ],
  },

  tabs: {
    title: 'Tabs',
    description:
      'Tabs are a set of layered sections of content, known as tab panels, that display one panel of content at a time.',
    usage: (pkg) => `import { Tabs, TabList, Tab, TabPanel } from '${pkg}';\n\nexport function Example() {\n  return (\n    <Tabs defaultSelectedId=\"tab1\">\n      <TabList>\n        <Tab id=\"tab1\">Tab 1</Tab>\n        <Tab id=\"tab2\">Tab 2</Tab>\n      </TabList>\n      <TabPanel tabId=\"tab1\">Content 1</TabPanel>\n      <TabPanel tabId=\"tab2\">Content 2</TabPanel>\n    </Tabs>\n  );\n}\n`,
    examples: [
      {
        title: 'Basic',
        code: `<Tabs defaultSelectedId=\"tab1\">\n  <TabList>\n    <Tab id=\"tab1\">Tab 1</Tab>\n    <Tab id=\"tab2\">Tab 2</Tab>\n  </TabList>\n  <TabPanel tabId=\"tab1\">Content 1</TabPanel>\n  <TabPanel tabId=\"tab2\">Content 2</TabPanel>\n</Tabs>`,
        render: (DS) => (
          <DS.Tabs defaultSelectedId="tab1">
            <DS.TabList className="flex gap-2 border-b mb-2">
              <DS.Tab id="tab1">Tab 1</DS.Tab>
              <DS.Tab id="tab2">Tab 2</DS.Tab>
            </DS.TabList>
            <DS.TabPanel tabId="tab1">Content 1</DS.TabPanel>
            <DS.TabPanel tabId="tab2">Content 2</DS.TabPanel>
          </DS.Tabs>
        ),
      },
      {
        title: 'Controlled',
        description: 'Control selection from state.',
        code: `const [selected, setSelected] = useState('tab1');\n\n<Tabs selectedId={selected} onSelectedChange={setSelected}>...</Tabs>`,
        render: () => (
          <p className="text-sm text-[var(--ds-text-secondary)]">
            Controlled example: see code. (This demo keeps examples non-interactive for simplicity.)
          </p>
        ),
      },
    ],
    rtl: [
      ...RTL_GENERIC,
      'Tabs commonly use Left/Right arrows. Verify arrow direction behavior in RTL matches expectation.',
    ],
    a11y: [
      ...A11Y_GENERIC,
      'Tabs must have a `tablist`, and each tab should have an associated `tabpanel`.',
    ],
    whenToUse: [
      'Use to switch between related views of the same content without navigating away.',
      'Use when users expect to explore sections one at a time (and keyboard support matters).',
    ],
    whenNotToUse: [
      'Don’t use Tabs for deeply nested navigation; prefer dedicated pages/routes.',
      'Don’t hide critical content behind tabs if users must compare items side-by-side.',
    ],
    keyboard: [
      { key: 'Tab / Shift+Tab', action: 'Moves focus into/out of the tablist and panels.' },
      { key: 'ArrowLeft / ArrowRight', action: 'Moves selection between tabs.' },
      { key: 'Home / End', action: 'Jumps to first/last tab.' },
    ],
  },

  accordion: {
    title: 'Accordion',
    description:
      'An accordion is a vertically stacked set of interactive headings that each contain a title, content snippet, or thumbnail representing a section of content.',
    usage: (pkg) =>
      `import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from '${pkg}';\n\nexport function Example() {\n  return (\n    <Accordion defaultExpanded={['h1']}>\n      <AccordionItem id=\"item1\">\n        <AccordionHeader id=\"h1\" panelId=\"p1\">Section 1</AccordionHeader>\n        <AccordionPanel id=\"p1\" headerId=\"h1\">Content 1</AccordionPanel>\n      </AccordionItem>\n    </Accordion>\n  );\n}\n`,
    examples: [
      {
        title: 'Basic',
        description: 'A single-open accordion with a default expanded panel.',
        code: `<Accordion defaultExpanded={['h1']}>\n  <AccordionItem id=\"item1\">\n    <AccordionHeader id=\"h1\" panelId=\"p1\">Section 1</AccordionHeader>\n    <AccordionPanel id=\"p1\" headerId=\"h1\">Content 1</AccordionPanel>\n  </AccordionItem>\n</Accordion>`,
        render: (DS) => (
          <DS.Accordion defaultExpanded={['h1']}>
            <DS.AccordionItem id="item1">
              <DS.AccordionHeader id="h1" panelId="p1">Section 1</DS.AccordionHeader>
              <DS.AccordionPanel id="p1" headerId="h1">Content 1</DS.AccordionPanel>
            </DS.AccordionItem>
          </DS.Accordion>
        ),
      },
      {
        title: 'Allow multiple',
        description: 'Allow more than one panel to be expanded at the same time.',
        code: `<Accordion allowMultiple defaultExpanded={['h1','h2']}>...</Accordion>`,
        render: (DS) => (
          <DS.Accordion allowMultiple defaultExpanded={['h1', 'h2']}>
            <DS.AccordionItem id="item1">
              <DS.AccordionHeader id="h1" panelId="p1">Section 1</DS.AccordionHeader>
              <DS.AccordionPanel id="p1" headerId="h1">Content 1</DS.AccordionPanel>
            </DS.AccordionItem>
            <DS.AccordionItem id="item2">
              <DS.AccordionHeader id="h2" panelId="p2">Section 2</DS.AccordionHeader>
              <DS.AccordionPanel id="p2" headerId="h2">Content 2</DS.AccordionPanel>
            </DS.AccordionItem>
          </DS.Accordion>
        ),
      },
    ],
    rtl: RTL_GENERIC,
    a11y: [
      ...A11Y_GENERIC,
      'Headers should be short and descriptive.',
    ],
    whenToUse: [
      'Use to progressively disclose sections and reduce scrolling.',
      'Use when content is naturally grouped into collapsible headings.',
    ],
    whenNotToUse: [
      'Don’t use an accordion to hide critical content that users must compare side-by-side.',
      'Don’t nest complex interactive components inside accordion headers.',
    ],
    keyboard: [
      { key: 'Tab / Shift+Tab', action: 'Moves focus between accordion headers and focusable content.' },
      { key: 'Enter / Space', action: 'Toggles the focused panel.' },
      { key: 'ArrowUp / ArrowDown', action: 'Moves focus between headers (behavior may vary by implementation).' },
    ],
  },

  alert: {
    title: 'Alert',
    description:
      "An alert is an element that displays a brief, important message in a way that attracts the user's attention without interrupting the user's task.",
    usage: (pkg) => `import { Alert } from '${pkg}';\n\nexport function Example() {\n  return <Alert type=\"polite\">Saved</Alert>;\n}\n`,
    examples: [
      {
        title: 'Basic',
        description: 'Polite alert for non-urgent status.',
        code: `<Alert type=\"polite\">Saved successfully</Alert>`,
        render: (DS) => <DS.Alert type="polite">Saved successfully</DS.Alert>,
      },
      {
        title: 'Assertive',
        description: 'Use for urgent messages (errors, blockers).',
        code: `<Alert type=\"assertive\">Something went wrong</Alert>`,
        render: (DS) => <DS.Alert type="assertive">Something went wrong</DS.Alert>,
      },
    ],
    rtl: RTL_GENERIC,
    a11y: [
      ...A11Y_GENERIC,
      'Use `type=\"assertive\"` sparingly—screen readers may interrupt users.',
    ],
    whenToUse: [
      'Use for status feedback after an action (saved, error, warning).',
      'Use `type=\"assertive\"` for urgent messages that must be announced immediately.',
    ],
    whenNotToUse: [
      'Don’t use an alert for validation hints that belong inline with a form field.',
    ],
    keyboard: [{ key: 'N/A', action: 'Alerts are not typically interactive.' }],
  },

  'alert-dialog': {
    title: 'Alert Dialog',
    description:
      "An alert dialog is a modal dialog that interrupts the user's workflow to communicate an important message and acquire a response.",
    usage: (pkg) => `import { AlertDialog } from '${pkg}';\n\nexport function Example({ open, onClose }) {\n  return (\n    <AlertDialog open={open} onClose={onClose}>\n      Confirm action\n    </AlertDialog>\n  );\n}\n`,
    examples: [
      {
        title: 'Basic',
        description: 'Open and close an alert dialog with state.',
        code: `const [open, setOpen] = useState(false);\n\n<Button onClick={() => setOpen(true)}>Open</Button>\n<AlertDialog open={open} onClose={() => setOpen(false)}>\n  ...\n</AlertDialog>`,
        render: (DS, lib) => <StatefulDialogExample key={lib} DS={DS} kind="alert-dialog" />,
      },
    ],
    rtl: RTL_GENERIC,
    a11y: [
      ...A11Y_GENERIC,
      'AlertDialog should describe the consequence and provide clear actions.',
      'Ensure focus moves into the dialog when opened and returns to the trigger when closed.',
    ],
    whenToUse: [
      'Use to confirm destructive, irreversible, or high-impact actions.',
      'Use when the user must respond before continuing.',
    ],
    whenNotToUse: [
      'Don’t use an alert dialog for non-critical information; use a regular Dialog or an Alert.',
    ],
    keyboard: [
      { key: 'Esc', action: 'Closes the alert dialog (if enabled by implementation).' },
      { key: 'Tab / Shift+Tab', action: 'Moves focus between focusable elements inside the dialog.' },
      { key: 'Enter / Space', action: 'Activates focused buttons/controls.' },
    ],
  },

  breadcrumb: {
    title: 'Breadcrumb',
    description:
      'A breadcrumb trail consists of a list of links to the parent pages of the current page in hierarchical order.',
    usage: (pkg) => `import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '${pkg}';\n\nexport function Example() {\n  return (\n    <Breadcrumb>\n      <BreadcrumbItem><BreadcrumbLink href=\"/\">Home</BreadcrumbLink></BreadcrumbItem>\n      <BreadcrumbItem><BreadcrumbLink href=\"/docs\" current>Docs</BreadcrumbLink></BreadcrumbItem>\n    </Breadcrumb>\n  );\n}\n`,
    examples: [
      {
        title: 'Basic',
        code: `<Breadcrumb>\n  <BreadcrumbItem>\n    <BreadcrumbLink href=\"/\">Home</BreadcrumbLink>\n  </BreadcrumbItem>\n  <BreadcrumbItem>\n    <BreadcrumbLink href=\"/components\" current>Components</BreadcrumbLink>\n  </BreadcrumbItem>\n</Breadcrumb>`,
        render: (DS) => (
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
        ),
      },
      {
        title: 'Custom label',
        description: 'Set an accessible label for the breadcrumb nav.',
        code: `<Breadcrumb label=\"You are here\">...</Breadcrumb>`,
        render: (DS) => (
          <DS.Breadcrumb label="You are here">
            <DS.BreadcrumbItem>
              <DS.BreadcrumbLink href="/">Home</DS.BreadcrumbLink>
            </DS.BreadcrumbItem>
            <DS.BreadcrumbItem>
              <DS.BreadcrumbLink href="/docs" current>Docs</DS.BreadcrumbLink>
            </DS.BreadcrumbItem>
          </DS.Breadcrumb>
        ),
      },
    ],
    rtl: RTL_GENERIC,
    a11y: [
      ...A11Y_GENERIC,
      'Use `current` on the current page item so screen readers announce the active location.',
    ],
    whenToUse: [
      'Use to show the user’s location in a hierarchy and provide shortcuts to parent levels.',
      'Use in deep information architectures (often 3+ levels) where “Back” isn’t enough context.',
    ],
    whenNotToUse: ['Don’t use breadcrumbs when the hierarchy is shallow or unclear.'],
    keyboard: [{ key: 'Tab / Shift+Tab', action: 'Moves focus through breadcrumb links.' }],
  },

  carousel: {
    title: 'Carousel',
    description:
      'A carousel presents a set of items, referred to as slides, by sequentially displaying a subset of one or more slides.',
    variants: [
      { name: 'basic', description: 'Prev/next buttons for slide control. Supports optional auto-rotation.' },
      { name: 'tabbed', description: 'Tabs for slide picker. Single tab stop, arrow keys between tabs. Supports optional auto-rotation.' },
    ],
    usage: (pkg) =>
      `import { Carousel } from '${pkg}';\n\nexport function Example() {\n  return (\n    <Carousel aria-label="Featured" variant="basic">\n      <div>Slide 1</div>\n      <div>Slide 2</div>\n    </Carousel>\n  );\n}\n`,
    examples: [
      {
        title: 'Basic variant – Auto-rotating with buttons',
        description:
          'Prev/next buttons for slide control. Auto-rotation pauses when focus enters or mouse hovers. Rotation control toggles auto-rotation. Respects prefers-reduced-motion.',
        code: `<Carousel aria-label="Featured" variant="basic" autoRotate autoRotateInterval={5000}>\n  <div>Slide 1</div>\n  <div>Slide 2</div>\n  <div>Slide 3</div>\n</Carousel>`,
        render: (DS) => (
          <DS.Carousel aria-label="Featured" variant="basic" autoRotate autoRotateInterval={5000}>
            <div className="p-4 rounded border border-[var(--ds-border-default)] bg-[var(--ds-bg-muted)]">Slide 1</div>
            <div className="p-4 rounded border border-[var(--ds-border-default)] bg-[var(--ds-bg-muted)]">Slide 2</div>
            <div className="p-4 rounded border border-[var(--ds-border-default)] bg-[var(--ds-bg-muted)]">Slide 3</div>
          </DS.Carousel>
        ),
      },
      {
        title: 'Tabbed variant – Auto-rotating with tabs',
        description:
          'Tabs to pick a specific slide. Each tab shows slide number; arrow keys navigate tabs. Same auto-rotation and pause behavior as the basic variant.',
        code: `<Carousel aria-label="Featured" variant="tabbed" autoRotate autoRotateInterval={5000}>\n  <div>Slide 1</div>\n  <div>Slide 2</div>\n  <div>Slide 3</div>\n</Carousel>`,
        render: (DS) => (
          <DS.Carousel aria-label="Featured" variant="tabbed" autoRotate autoRotateInterval={5000}>
            <div className="p-4 rounded border border-[var(--ds-border-default)] bg-[var(--ds-bg-muted)]">Slide 1</div>
            <div className="p-4 rounded border border-[var(--ds-border-default)] bg-[var(--ds-bg-muted)]">Slide 2</div>
            <div className="p-4 rounded border border-[var(--ds-border-default)] bg-[var(--ds-bg-muted)]">Slide 3</div>
          </DS.Carousel>
        ),
      },
      {
        title: 'Manual (no auto-rotate)',
        description: 'Carousel without auto-rotation. Use arrow keys or buttons to change slides.',
        code: `<Carousel aria-label="Featured">\n  <div>Slide 1</div>\n  <div>Slide 2</div>\n</Carousel>`,
        render: (DS) => (
          <DS.Carousel aria-label="Featured">
            <div className="p-4 rounded border border-[var(--ds-border-default)] bg-[var(--ds-bg-muted)]">Slide 1</div>
            <div className="p-4 rounded border border-[var(--ds-border-default)] bg-[var(--ds-bg-muted)]">Slide 2</div>
          </DS.Carousel>
        ),
      },
    ],
    rtl: [
      ...RTL_GENERIC,
      'Verify Left/Right arrow direction feels natural in RTL for your locale.',
    ],
    a11y: [
      ...A11Y_GENERIC,
      'Always provide `aria-label` to describe the carousel content.',
      'When auto-rotating: rotation control is first in tab order; rotation pauses on focus/hover.',
      'Use `slideLabels` for custom slide names when slides have meaningful titles.',
    ],
    whenToUse: [
      'Use for a small set of featured, non-critical items (highlights, promos).',
      'Use when one-at-a-time browsing is acceptable and controls are accessible.',
      'Use tabbed variant when users benefit from jumping directly to a slide.',
    ],
    whenNotToUse: [
      'Don’t hide critical content in a carousel; users may miss it.',
      'Avoid carousels for dense information or tasks requiring comparison.',
    ],
    keyboard: [
      { key: 'ArrowLeft / ArrowRight', action: 'Previous/Next slide.' },
      { key: 'Home / End', action: 'First/Last slide.' },
      { key: 'Enter / Space (rotation control)', action: 'Toggle auto-rotation.' },
      { key: 'Tabbed: Arrow keys on tabs', action: 'Navigate between slide picker tabs.' },
    ],
  },

  combobox: {
    title: 'Combobox',
    description: 'A combobox is an input widget that has an associated popup.',
    usage: (pkg) => `import { Combobox } from '${pkg}';\n\nexport function Example() {\n  return (\n    <Combobox\n      aria-label=\"Select option\"\n      options={[{ value: '1', label: 'One' }, { value: '2', label: 'Two' }]}\n    />\n  );\n}\n`,
    examples: [
      {
        title: 'Basic',
        code: `<Combobox aria-label=\"Select option\" options={[...]} />`,
        render: (DS) => (
          <DS.Combobox
            aria-label="Select option"
            options={[
              { value: '1', label: 'One' },
              { value: '2', label: 'Two' },
            ]}
          />
        ),
      },
      {
        title: 'Controlled value',
        description: 'Control selection from state.',
        code: `const [value, setValue] = useState('1');\n\n<Combobox value={value} onValueChange={setValue} options={[...]} />`,
        render: (DS) => <StatefulComboboxExample DS={DS} />,
      },
      {
        title: 'Disabled',
        code: `<Combobox disabled options={[...]} />`,
        render: (DS) => (
          <DS.Combobox
            disabled
            aria-label="Disabled combobox"
            options={[
              { value: '1', label: 'One' },
              { value: '2', label: 'Two' },
            ]}
          />
        ),
      },
    ],
    rtl: RTL_GENERIC,
    a11y: [
      ...A11Y_GENERIC,
      'Provide `aria-label` if there is no visible label.',
    ],
    whenToUse: [
      'Use when there are many options and type-to-filter helps users find items.',
      'Use when you want select-like behavior with search/autocomplete.',
    ],
    whenNotToUse: [
      'Don’t use a combobox when there are only a few options; use a Select/Listbox.',
    ],
    keyboard: [
      { key: 'ArrowDown / ArrowUp', action: 'Moves active option / opens list.' },
      { key: 'Enter', action: 'Selects active option / toggles list.' },
      { key: 'Esc', action: 'Closes the list.' },
      { key: 'Tab', action: 'Moves focus away (closes the list).' },
    ],
  },

  dialog: {
    title: 'Dialog',
    description: 'A dialog is a window overlaid on either the primary window or another dialog window.',
    usage: (pkg) => `import { Dialog } from '${pkg}';\n\nexport function Example({ open, onClose }) {\n  return (\n    <Dialog open={open} onClose={onClose} aria-label=\"Example dialog\">\n      Modal content\n    </Dialog>\n  );\n}\n`,
    examples: [
      {
        title: 'Basic',
        description: 'Open and close a dialog with state.',
        code: `const [open, setOpen] = useState(false);\n\n<Button onClick={() => setOpen(true)}>Open</Button>\n<Dialog open={open} onClose={() => setOpen(false)}>...</Dialog>`,
        render: (DS, lib) => <StatefulDialogExample key={lib} DS={DS} kind="dialog" />,
      },
    ],
    rtl: RTL_GENERIC,
    a11y: [
      ...A11Y_GENERIC,
      'Provide `aria-label` or `aria-labelledby` to name the dialog.',
      'Ensure focus management matches your accessibility requirements.',
    ],
    whenToUse: [
      'Use for short, focused tasks or details without leaving the current page.',
      'Use when the user can complete the task quickly and return to context.',
    ],
    whenNotToUse: [
      'Don’t use dialogs for content that belongs on a page.',
      'Avoid multi-step flows in a dialog; use a full page if complex.',
    ],
    keyboard: [
      { key: 'Esc', action: 'Closes the dialog (if enabled by implementation).' },
      { key: 'Tab / Shift+Tab', action: 'Moves focus between focusable elements.' },
    ],
  },

  disclosure: {
    title: 'Disclosure',
    description: 'A disclosure is a widget that enables content to be either collapsed (hidden) or expanded (visible).',
    usage: (pkg) => `import { Disclosure, DisclosureTrigger, DisclosurePanel } from '${pkg}';\n\nexport function Example() {\n  return (\n    <Disclosure>\n      <DisclosureTrigger>Details</DisclosureTrigger>\n      <DisclosurePanel>Hidden content</DisclosurePanel>\n    </Disclosure>\n  );\n}\n`,
    examples: [
      {
        title: 'Basic',
        code: `<Disclosure defaultExpanded={false}>\n  <DisclosureTrigger>Toggle</DisclosureTrigger>\n  <DisclosurePanel>Hidden content</DisclosurePanel>\n</Disclosure>`,
        render: (DS) => (
          <DS.Disclosure defaultExpanded={false}>
            <div>
              <DS.DisclosureTrigger>Toggle</DS.DisclosureTrigger>
              <DS.DisclosurePanel className="mt-2">Hidden content</DS.DisclosurePanel>
            </div>
          </DS.Disclosure>
        ),
      },
      {
        title: 'Default expanded',
        code: `<Disclosure defaultExpanded>\n  ...\n</Disclosure>`,
        render: (DS) => (
          <DS.Disclosure defaultExpanded>
            <div>
              <DS.DisclosureTrigger>Expanded by default</DS.DisclosureTrigger>
              <DS.DisclosurePanel className="mt-2">Visible content</DS.DisclosurePanel>
            </div>
          </DS.Disclosure>
        ),
      },
    ],
    rtl: RTL_GENERIC,
    a11y: [...A11Y_GENERIC],
    whenToUse: [
      'Use for inline “show more” / details toggles within a section.',
      'Use when content can be hidden by default without harming discoverability.',
    ],
    whenNotToUse: [
      'Don’t use disclosure when content must always be visible.',
    ],
    keyboard: [
      { key: 'Enter / Space', action: 'Toggles the panel.' },
      { key: 'Tab / Shift+Tab', action: 'Moves focus through trigger and panel content.' },
    ],
  },

  link: {
    title: 'Link',
    description: 'A link widget provides an interactive reference to a resource.',
    usage: (pkg) => `import { Link } from '${pkg}';\n\nexport function Example() {\n  return <Link href=\"/docs\">Docs</Link>;\n}\n`,
    examples: [
      {
        title: 'Basic',
        code: `<Link href=\"/\">Go home</Link>`,
        render: (DS) => <DS.Link href="/">Go home</DS.Link>,
      },
      {
        title: 'Current page',
        description: 'Use `current` for nav links representing the current page.',
        code: `<Link href=\"/docs\" current>Docs</Link>`,
        render: (DS) => <DS.Link href="/docs" current>Docs</DS.Link>,
      },
    ],
    rtl: RTL_GENERIC,
    a11y: [
      ...A11Y_GENERIC,
      'Link text should describe the destination.',
    ],
    whenToUse: [
      'Use for navigation to another page/route, anchor, or external destination.',
      'Use for actions that change the URL or open a resource (download, new tab).',
    ],
    whenNotToUse: [
      'Don’t use a link to trigger an in-page action; use a Button.',
    ],
    keyboard: [
      { key: 'Tab / Shift+Tab', action: 'Moves focus between links.' },
      { key: 'Enter', action: 'Activates the link.' },
    ],
  },

  listbox: {
    title: 'Listbox',
    description:
      'A listbox widget presents a list of options and allows a user to select one or more of them.',
    usage: (pkg) => `import { Listbox } from '${pkg}';\n\nexport function Example() {\n  return <Listbox aria-label=\"Select item\" options={[{ value: '1', label: 'Item 1' }]} />;\n}\n`,
    examples: [
      {
        title: 'Single select',
        code: `<Listbox aria-label=\"Select item\" options={[...]} />`,
        render: (DS) => (
          <DS.Listbox
            aria-label="Select item"
            options={[
              { value: '1', label: 'Item 1' },
              { value: '2', label: 'Item 2' },
              { value: '3', label: 'Item 3' },
            ]}
          />
        ),
      },
      {
        title: 'Multiple',
        description: 'Enable multiple selection.',
        code: `<Listbox multiple defaultValue={['1']} options={[...]} />`,
        render: (DS) => (
          <DS.Listbox
            multiple
            aria-label="Select items"
            defaultValue={['1']}
            options={[
              { value: '1', label: 'Item 1' },
              { value: '2', label: 'Item 2' },
              { value: '3', label: 'Item 3' },
            ]}
          />
        ),
      },
      {
        title: 'Disabled',
        code: `<Listbox disabled options={[...]} />`,
        render: (DS) => (
          <DS.Listbox
            disabled
            aria-label="Disabled listbox"
            options={[
              { value: '1', label: 'Item 1' },
              { value: '2', label: 'Item 2' },
            ]}
          />
        ),
      },
    ],
    rtl: RTL_GENERIC,
    a11y: [...A11Y_GENERIC],
    whenToUse: [
      'Use for selecting from a visible list of options (single or multiple).',
      'Use when you want a keyboard-friendly list without an input field.',
    ],
    whenNotToUse: [
      'Don’t use listbox for long lists without search; use Combobox.',
    ],
    keyboard: [
      { key: 'ArrowDown / ArrowUp', action: 'Moves active option.' },
      { key: 'Home / End', action: 'Jumps to first/last option.' },
      { key: 'Enter / Space', action: 'Selects active option.' },
    ],
  },

  menu: {
    title: 'Menu',
    description:
      'A menu is a widget that offers a list of choices to the user, such as a set of actions or functions.',
    usage: (pkg) => `import { Menu, MenuButton, MenuList, MenuItem } from '${pkg}';\n\nexport function Example() {\n  return (\n    <Menu>\n      <MenuButton>Open</MenuButton>\n      <MenuList>\n        <MenuItem>Item 1</MenuItem>\n      </MenuList>\n    </Menu>\n  );\n}\n`,
    examples: [
      {
        title: 'Basic',
        code: `<Menu>\n  <MenuButton>Open Menu</MenuButton>\n  <MenuList>\n    <MenuItem onSelect={() => {}}>Item 1</MenuItem>\n    <MenuItem onSelect={() => {}}>Item 2</MenuItem>\n  </MenuList>\n</Menu>`,
        render: (DS) => (
          <DS.Menu>
            <DS.MenuButton>Open Menu</DS.MenuButton>
            <DS.MenuList>
              <DS.MenuItem onSelect={() => {}}>Item 1</DS.MenuItem>
              <DS.MenuItem onSelect={() => {}}>Item 2</DS.MenuItem>
            </DS.MenuList>
          </DS.Menu>
        ),
      },
    ],
    rtl: RTL_GENERIC,
    a11y: [...A11Y_GENERIC],
    whenToUse: [
      'Use to group a small set of related actions under a single trigger.',
      'Use for contextual actions (e.g., “More” or overflow menus).',
    ],
    whenNotToUse: [
      'Don’t use a menu for navigation with many destinations; use a dedicated nav.',
    ],
    keyboard: [
      { key: 'Enter / Space / ArrowDown', action: 'Opens menu (from MenuButton).' },
      { key: 'ArrowUp / ArrowDown', action: 'Moves between menu items.' },
      { key: 'Esc', action: 'Closes the menu.' },
    ],
  },

  'radio-group': {
    title: 'Radio Group',
    description:
      'A radio group is a set of checkable buttons, known as radio buttons, where no more than one of the buttons can be checked at a time.',
    usage: (pkg) => `import { RadioGroup, Radio } from '${pkg}';\n\nexport function Example() {\n  return (\n    <RadioGroup defaultValue=\"a\" aria-label=\"Choose one\">\n      <Radio value=\"a\" label=\"Option A\" />\n      <Radio value=\"b\" label=\"Option B\" />\n    </RadioGroup>\n  );\n}\n`,
    examples: [
      {
        title: 'Basic',
        code: `<RadioGroup defaultValue=\"a\" aria-label=\"Choose one\">\n  <Radio value=\"a\" label=\"Option A\" />\n  <Radio value=\"b\" label=\"Option B\" />\n</RadioGroup>`,
        render: (DS) => (
          <DS.RadioGroup defaultValue="a" aria-label="Choose one">
            <DS.Radio value="a" label="Option A" />
            <DS.Radio value="b" label="Option B" />
          </DS.RadioGroup>
        ),
      },
      {
        title: 'Controlled',
        description: 'Control selection from state.',
        code: `const [value, setValue] = useState('a');\n\n<RadioGroup value={value} onValueChange={setValue}>...</RadioGroup>`,
        render: () => <DemoHint>Controlled example: see code.</DemoHint>,
      },
    ],
    rtl: RTL_GENERIC,
    a11y: [...A11Y_GENERIC],
    whenToUse: [
      'Use when exactly one option must be selected from a set.',
      'Use for mutually exclusive choices presented together.',
    ],
    whenNotToUse: ['Don’t use radio group when users may select multiple items; use Checkbox.'],
    keyboard: [
      { key: 'Tab / Shift+Tab', action: 'Moves focus into/out of the group.' },
      { key: 'ArrowLeft / ArrowUp', action: 'Moves selection to previous option.' },
      { key: 'ArrowRight / ArrowDown', action: 'Moves selection to next option.' },
      { key: 'Space', action: 'Selects the focused option.' },
    ],
  },

  slider: {
    title: 'Slider',
    description: 'A slider is an input where the user selects a value from within a given range.',
    usage: (pkg) => `import { Slider } from '${pkg}';\n\nexport function Example() {\n  return <Slider aria-label=\"Volume\" defaultValue={50} min={0} max={100} step={5} />;\n}\n`,
    examples: [
      {
        title: 'Basic',
        code: `<Slider aria-label=\"Volume\" defaultValue={50} min={0} max={100} step={5} />`,
        render: (DS) => <DS.Slider aria-label="Volume" defaultValue={50} min={0} max={100} step={5} />,
      },
      {
        title: 'Controlled',
        description: 'Keep the value in state.',
        code: `const [value, setValue] = useState(40);\n\n<Slider value={value} onChange={setValue} />`,
        render: (DS) => <StatefulSliderExample DS={DS} />,
      },
      {
        title: 'Horizontal multi-thumb (range)',
        description: 'Two thumbs represent a selected range (e.g., price range).',
        code: `<RangeSlider\n  aria-label=\"Price range\"\n  defaultValue={[20, 80]}\n  min={0}\n  max={100}\n  step={5}\n  thumbLabels={[\"Min\", \"Max\"]}\n/>`,
        render: (DS) => (
          <div className="pt-4">
            <DS.RangeSlider
              aria-label="Price range"
              defaultValue={[20, 80]}
              min={0}
              max={100}
              step={5}
              thumbLabels={['Min', 'Max']}
              style={{ height: 24 }}
            />
          </div>
        ),
      },
      {
        title: 'Disabled',
        code: `<Slider disabled defaultValue={30} />`,
        render: (DS) => <DS.Slider disabled aria-label="Disabled slider" defaultValue={30} />,
      },
    ],
    rtl: RTL_GENERIC,
    a11y: [...A11Y_GENERIC],
    whenToUse: [
      'Use to adjust a value within a range where relative position matters (volume, brightness).',
      'Use when quick coarse adjustment is preferred over typing an exact number.',
    ],
    whenNotToUse: [
      'Don’t use sliders for precise values when a numeric input is better.',
    ],
    keyboard: [
      { key: 'Tab / Shift+Tab', action: 'Moves focus to the slider (and between thumbs in multi-thumb sliders).' },
      { key: 'ArrowLeft / ArrowDown', action: 'Decreases value by step.' },
      { key: 'ArrowRight / ArrowUp', action: 'Increases value by step.' },
      { key: 'PageDown / PageUp', action: 'Decreases/Increases value by larger step.' },
      { key: 'Home / End', action: 'Sets to min/max.' },
    ],
  },

  table: {
    title: 'Table',
    description:
      'Like an HTML table element, a WAI-ARIA table is a static tabular structure containing one or more rows that each contain one or more cells; it is not an interactive widget.',
    usage: (pkg) => `import { Table, TableHeader, TableBody, TableRow, TableCell } from '${pkg}';\n\nexport function Example() {\n  return (\n    <Table>\n      <TableHeader>\n        <TableRow>\n          <TableCell as=\"th\" scope=\"col\">Name</TableCell>\n          <TableCell as=\"th\" scope=\"col\">Value</TableCell>\n        </TableRow>\n      </TableHeader>\n      <TableBody>\n        <TableRow>\n          <TableCell>A</TableCell>\n          <TableCell>1</TableCell>\n        </TableRow>\n      </TableBody>\n    </Table>\n  );\n}\n`,
    examples: [
      {
        title: 'Basic',
        code: `<Table>...</Table>`,
        render: (DS) => (
          <DS.Table>
            <DS.TableHeader>
              <DS.TableRow>
                <DS.TableCell as="th" scope="col">Name</DS.TableCell>
                <DS.TableCell as="th" scope="col">Value</DS.TableCell>
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
        ),
      },
      {
        title: 'Header cells',
        description: 'Use `as=\"th\"` and `scope` for headers.',
        code: `<TableCell as=\"th\" scope=\"col\">Header</TableCell>`,
        render: (DS) => (
          <DS.Table>
            <DS.TableHeader>
              <DS.TableRow>
                <DS.TableCell as="th" scope="col">Header</DS.TableCell>
                <DS.TableCell as="th" scope="col">Header</DS.TableCell>
              </DS.TableRow>
            </DS.TableHeader>
            <DS.TableBody>
              <DS.TableRow>
                <DS.TableCell>Row</DS.TableCell>
                <DS.TableCell>Row</DS.TableCell>
              </DS.TableRow>
            </DS.TableBody>
          </DS.Table>
        ),
      },
    ],
    rtl: RTL_GENERIC,
    a11y: [
      ...A11Y_GENERIC,
      'Use proper `<th scope>` for row/column headers when applicable.',
    ],
    whenToUse: [
      'Use to present data in rows/columns with meaningful headers.',
      'Use when users need to scan, compare, or read structured datasets.',
    ],
    whenNotToUse: ['Don’t use tables for layout; use CSS grid/flex instead.'],
    keyboard: [{ key: 'Tab', action: 'Moves focus through interactive elements inside cells (if any).' }],
  },

  toolbar: {
    title: 'Toolbar',
    description:
      'A toolbar is a container for grouping a set of controls, such as buttons, menubuttons, or checkboxes.',
    usage: (pkg) => `import { Toolbar } from '${pkg}';\n\nexport function Example() {\n  return (\n    <Toolbar aria-label=\"Actions\">\n      <Button>Cut</Button>\n      <Button>Copy</Button>\n      <Button>Paste</Button>\n    </Toolbar>\n  );\n}\n`,
    examples: [
      {
        title: 'Basic',
        code: `<Toolbar aria-label=\"Actions\">\n  <Button>Cut</Button>\n  <Button>Copy</Button>\n  <Button>Paste</Button>\n</Toolbar>`,
        render: (DS) => (
          <DS.Toolbar aria-label="Actions">
            <DS.Button variant="secondary">Cut</DS.Button>
            <DS.Button variant="secondary">Copy</DS.Button>
            <DS.Button variant="secondary">Paste</DS.Button>
          </DS.Toolbar>
        ),
      },
    ],
    rtl: RTL_GENERIC,
    a11y: [...A11Y_GENERIC],
    whenToUse: [
      'Use to group a set of related controls that act on the same content region.',
      'Use when roving focus (arrow keys between controls) improves keyboard ergonomics.',
    ],
    whenNotToUse: ['Don’t use a toolbar for a single control; a button is enough.'],
    keyboard: [
      { key: 'ArrowLeft / ArrowUp', action: 'Moves focus to previous item.' },
      { key: 'ArrowRight / ArrowDown', action: 'Moves focus to next item.' },
      { key: 'Home / End', action: 'Moves focus to first/last item.' },
    ],
  },

  tooltip: {
    title: 'Tooltip',
    description:
      'A tooltip is a popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
    usage: (pkg) => `import { Tooltip } from '${pkg}';\n\nexport function Example() {\n  return (\n    <Tooltip content=\"Helpful info\">\n      <button type=\"button\">Hover me</button>\n    </Tooltip>\n  );\n}\n`,
    examples: [
      {
        title: 'Basic',
        code: `<Tooltip content=\"Helpful info\">\n  <button type=\"button\">Hover me</button>\n</Tooltip>`,
        render: (DS) => (
          <DS.Tooltip content="Helpful info">
            <button type="button" className="ds-btn ds-btn--outline">Hover or focus me</button>
          </DS.Tooltip>
        ),
      },
      {
        title: 'Delay',
        description: 'Control how quickly the tooltip appears.',
        code: `<Tooltip content=\"Info\" delay={600}>...</Tooltip>`,
        render: (DS) => (
          <DS.Tooltip content="Appears after 600ms" delay={600}>
            <button type="button" className="ds-btn ds-btn--outline">Delayed tooltip</button>
          </DS.Tooltip>
        ),
      },
    ],
    rtl: RTL_GENERIC,
    a11y: [
      ...A11Y_GENERIC,
      'Tooltip content should be supplemental; don’t put critical info only in tooltips.',
    ],
    whenToUse: [
      'Use for short supplementary hints or clarifications for an element.',
      'Use for icon-only UI to provide extra context (still provide an accessible name).',
    ],
    whenNotToUse: [
      'Don’t use tooltips on mobile-only UIs where hover does not exist; provide inline help instead.',
    ],
    keyboard: [
      { key: 'Tab / Shift+Tab', action: 'Focusing the trigger shows tooltip (after delay).' },
      { key: 'Esc', action: 'Often used to dismiss tooltip (varies by implementation).' },
    ],
  },

  'tree-view': {
    title: 'Tree View',
    description: 'A tree view widget presents a hierarchical list.',
    usage: (pkg) => `import { TreeView } from '${pkg}';\n\nexport function Example() {\n  return (\n    <TreeView\n      aria-label=\"Files\"\n      items={[{ id: 'docs', label: 'Docs', children: [{ id: 'readme', label: 'README.md' }] }]}\n    />\n  );\n}\n`,
    examples: [
      {
        title: 'Basic',
        description: 'Expand/collapse with Arrow keys and select items.',
        code: `<TreeView\n  aria-label=\"Files\"\n  defaultExpandedIds={[\"docs\"]}\n  defaultSelectedId=\"readme\"\n  items={[\n    { id: 'docs', label: 'Docs', children: [\n      { id: 'readme', label: 'README.md' },\n      { id: 'changelog', label: 'CHANGELOG.md' }\n    ]},\n    { id: 'src', label: 'src', children: [\n      { id: 'app', label: 'App.tsx' },\n      { id: 'pages', label: 'pages', children: [{ id: 'home', label: 'HomePage.tsx' }] }\n    ]}\n  ]}\n/>`,
        render: (DS) => (
          <div className="rounded-lg border border-[var(--ds-border-default)] bg-[var(--ds-bg-surface)] p-3">
            <DS.TreeView
              aria-label="Files"
              defaultExpandedIds={['docs', 'src', 'pages']}
              defaultSelectedId="readme"
              items={[
                {
                  id: 'docs',
                  label: 'Docs',
                  children: [
                    { id: 'readme', label: 'README.md' },
                    { id: 'changelog', label: 'CHANGELOG.md' },
                  ],
                },
                {
                  id: 'src',
                  label: 'src',
                  children: [
                    { id: 'app', label: 'App.tsx' },
                    {
                      id: 'pages',
                      label: 'pages',
                      children: [{ id: 'home', label: 'HomePage.tsx' }],
                    },
                  ],
                },
              ]}
            />
          </div>
        ),
      },
    ],
    rtl: RTL_GENERIC,
    a11y: [
      ...A11Y_GENERIC,
      'Use Tree View for hierarchical navigation; keep labels short and descriptive.',
      'Ensure expansion state is communicated via `aria-expanded` on items with children.',
    ],
    whenToUse: [
      'Use to present hierarchical lists (folders/files, categories, outline navigation).',
      'Use when keyboard users benefit from arrow-key navigation through a hierarchy.',
    ],
    whenNotToUse: [
      'Don’t use for flat lists—use Listbox or a simple list.',
      'Don’t use for app-wide navigation with many destinations; use a dedicated navigation UI.',
    ],
    keyboard: [
      { key: 'ArrowUp / ArrowDown', action: 'Moves focus to previous/next visible tree item.' },
      { key: 'ArrowRight', action: 'Expands item (if collapsed) or moves focus to first child.' },
      { key: 'ArrowLeft', action: 'Collapses item (if expanded) or moves focus to parent.' },
      { key: 'Home / End', action: 'Moves focus to first/last visible item.' },
      { key: 'Enter / Space', action: 'Selects the focused item.' },
      { key: 'Type letters', action: 'Moves focus to the next item that matches typed prefix (typeahead).' },
    ],
  },

  treegrid: {
    title: 'Treegrid',
    description:
      'A treegrid widget presents a hierarchical data grid consisting of tabular information that is editable or interactive.',
    usage: (pkg) => `import { TreeGrid } from '${pkg}';\n\nexport function Example() {\n  return (\n    <TreeGrid\n      aria-label=\"Data\"\n      columns={[{ id: 'name', header: 'Name' }, { id: 'value', header: 'Value' }]}\n      rows={[{ id: 'r1', cells: ['Parent', '1'], children: [{ id: 'r1-1', cells: ['Child', '2'] }] }]}\n    />\n  );\n}\n`,
    examples: [
      {
        title: 'Basic',
        description: 'Arrow keys move between cells; expand/collapse hierarchical rows.',
        code: `<TreeGrid\n  aria-label=\"Data\"\n  columns={[{ id: 'name', header: 'Name' }, { id: 'value', header: 'Value' }]}\n  defaultExpandedRowIds={[\"r1\"]}\n  rows={[{ id: 'r1', cells: ['Parent', '1'], children: [{ id: 'r1-1', cells: ['Child', '2'] }] }]}\n/>`,
        render: (DS) => (
          <div className="rounded-lg border border-[var(--ds-border-default)] bg-[var(--ds-bg-surface)] p-3">
            <DS.TreeGrid
              aria-label="Data"
              columns={[
                { id: 'name', header: 'Name' },
                { id: 'value', header: 'Value' },
              ]}
              defaultExpandedRowIds={['r1']}
              rows={[
                {
                  id: 'r1',
                  cells: ['Parent', '1'],
                  children: [
                    { id: 'r1-1', cells: ['Child', '2'] },
                    { id: 'r1-2', cells: ['Child', '3'] },
                  ],
                },
                { id: 'r2', cells: ['Standalone', '9'] },
              ]}
            />
          </div>
        ),
      },
    ],
    rtl: RTL_GENERIC,
    a11y: [
      ...A11Y_GENERIC,
      'Ensure headers and cell roles are correct (`columnheader`, `gridcell`) and hierarchy is represented (`aria-level`, `aria-expanded`).',
    ],
    whenToUse: [
      'Use when you need a grid/table with hierarchical rows (e.g., folders + files with columns).',
      'Use when arrow-key navigation between cells is desired.',
    ],
    whenNotToUse: [
      'Don’t use for static tabular data; use Table.',
      'Don’t use for hierarchy without columns; use Tree View.',
    ],
    keyboard: [
      { key: 'Arrow keys', action: 'Move focus between cells (rows/columns).' },
      { key: 'Home / End', action: 'Move focus to first/last cell in the row.' },
      { key: 'Enter / Space (first column)', action: 'Toggles row expansion when the row has children.' },
      { key: 'ArrowRight / ArrowLeft (first column)', action: 'Expand/collapse a row when it has children.' },
    ],
  },

  'window-splitter': {
    title: 'Window Splitter',
    description:
      'A window splitter is a moveable separator between two sections, or panes, of a window that enables users to change the relative size of the panes.',
    usage: (pkg) => `import { WindowSplitter } from '${pkg}';\n\nexport function Example() {\n  return <WindowSplitter aria-label=\"Resize panes\" />;\n}\n`,
    examples: [
      {
        title: 'Basic (vertical split)',
        description: 'Drag the splitter or use arrow keys to resize panes.',
        code: `const [pct, setPct] = useState(50);\n\n<div style={{ display: 'flex', height: 160 }}>\n  <div style={{ width: pct + '%'}} />\n  <WindowSplitter orientation=\"vertical\" value={pct} onChange={setPct} />\n  <div style={{ flex: 1 }} />\n</div>`,
        render: (DS) => {
          const Example = () => {
            const [pct, setPct] = React.useState(50);
            return (
              <div style={{ display: 'flex', height: 160, border: '1px solid var(--ds-border-default)', borderRadius: 'var(--ds-radius-md)', overflow: 'hidden' }}>
                <div style={{ width: `${pct}%`, background: 'var(--ds-bg-muted)' }} />
                <DS.WindowSplitter
                  aria-label="Resize panes"
                  orientation="vertical"
                  value={pct}
                  onChange={setPct}
                />
                <div style={{ flex: 1, background: 'var(--ds-bg-surface)' }} />
              </div>
            );
          };
          return <Example />;
        },
      },
    ],
    rtl: RTL_GENERIC,
    a11y: [
      ...A11Y_GENERIC,
      'Provide a clear accessible name for the separator (e.g., `aria-label=\"Resize panes\"`).',
      'Expose min/max/now via `aria-valuemin/max/now` so screen reader users understand the current size.',
    ],
    whenToUse: [
      'Use when users need to resize adjacent panes (navigation/content, list/details).',
      'Use when keyboard resizing is required for accessibility.',
    ],
    whenNotToUse: [
      'Don’t use when layout should be responsive without manual resizing.',
    ],
    keyboard: [
      { key: 'ArrowLeft / ArrowRight', action: 'Decreases/Increases the first pane size (vertical splitter).' },
      { key: 'ArrowUp / ArrowDown', action: 'Decreases/Increases the first pane size (horizontal splitter).' },
      { key: 'Home / End', action: 'Moves to min/max size.' },
      { key: 'PageUp / PageDown', action: 'Adjusts size by a larger step.' },
    ],
  },

  // ---------------------------------------------------------------------------
  // Landmarks (page semantics)
  // ---------------------------------------------------------------------------

  banner: {
    title: 'Banner',
    description:
      'Landmarks provide a powerful way to identify the organization and structure of a web page. Banner identifies the site-oriented header region.',
    usage: (pkg) => `import { Banner } from '${pkg}';\n\nexport function Example() {\n  return <Banner>...</Banner>;\n}\n`,
    examples: [
      {
        title: 'Basic',
        description: 'Use for the top-level page header (logo, primary nav, search).',
        code: `<Banner>\n  <div>Header</div>\n</Banner>`,
        render: (DS) => (
          <DS.Banner className="rounded-lg border border-[var(--ds-border-default)] bg-[var(--ds-bg-surface)] p-4">
            <div className="font-medium text-[var(--ds-text-primary)]">Header</div>
            <div className="text-sm text-[var(--ds-text-secondary)]">Logo · Primary nav · Search</div>
          </DS.Banner>
        ),
      },
    ],
    rtl: RTL_GENERIC,
    a11y: [
      ...A11Y_GENERIC,
      ...A11Y_LANDMARKS_PRINCIPLES,
      'Use a single Banner landmark per page (top-level header).',
    ],
    whenToUse: ['Use for the site/page header region.'],
    whenNotToUse: ['Don’t use for repeated headers inside the page; use a plain `header` or `section` instead.'],
    keyboard: [{ key: 'N/A', action: 'Landmarks are not interactive; screen readers provide landmark navigation.' }],
  },

  main: {
    title: 'Main',
    description:
      'Landmarks provide a powerful way to identify the organization and structure of a web page. Main identifies the primary content of the page.',
    usage: (pkg) => `import { Main } from '${pkg}';\n\nexport function Example() {\n  return <Main>...</Main>;\n}\n`,
    examples: [
      {
        title: 'Basic',
        code: `<Main>\n  <h1>Page title</h1>\n  <p>Content</p>\n</Main>`,
        render: (DS) => (
          <DS.Main className="rounded-lg border border-[var(--ds-border-default)] bg-[var(--ds-bg-surface)] p-4">
            <div className="font-medium text-[var(--ds-text-primary)]">Primary content</div>
            <div className="text-sm text-[var(--ds-text-secondary)]">This is where your page’s main content lives.</div>
          </DS.Main>
        ),
      },
    ],
    rtl: RTL_GENERIC,
    a11y: [...A11Y_GENERIC, ...A11Y_LANDMARKS_PRINCIPLES, 'Use only one Main landmark per page.'],
    whenToUse: ['Use for the primary content region (unique per page).'],
    whenNotToUse: ['Don’t nest Main inside other landmarks.'],
    keyboard: [{ key: 'N/A', action: 'Landmarks are not interactive; screen readers provide landmark navigation.' }],
  },

  nav: {
    title: 'Nav',
    description:
      'Landmarks provide a powerful way to identify the organization and structure of a web page. Navigation identifies a region containing navigation links.',
    usage: (pkg) => `import { Nav } from '${pkg}';\n\nexport function Example() {\n  return <Nav aria-label=\"Primary\">...</Nav>;\n}\n`,
    examples: [
      {
        title: 'Basic',
        description: 'Use `aria-label` when you have more than one navigation region.',
        code: `<Nav aria-label=\"Primary navigation\">\n  <a href=\"/\">Home</a>\n</Nav>`,
        render: (DS) => (
          <DS.Nav
            aria-label="Primary navigation"
            className="rounded-lg border border-[var(--ds-border-default)] bg-[var(--ds-bg-surface)] p-4"
          >
            <div className="flex flex-wrap gap-2">
              <button type="button" className="ds-btn ds-btn--ghost">
                Home
              </button>
              <button type="button" className="ds-btn ds-btn--ghost">
                Docs
              </button>
              <button type="button" className="ds-btn ds-btn--ghost">
                Settings
              </button>
            </div>
          </DS.Nav>
        ),
      },
    ],
    rtl: RTL_GENERIC,
    a11y: [
      ...A11Y_GENERIC,
      ...A11Y_LANDMARKS_PRINCIPLES,
      'If multiple nav landmarks exist, each should have a unique accessible name.',
    ],
    whenToUse: ['Use for primary navigation, table-of-contents, or secondary navigation regions.'],
    whenNotToUse: ['Don’t wrap every small link group in Nav; keep landmarks meaningful and limited.'],
    keyboard: [{ key: 'N/A', action: 'Landmarks are not interactive; focus behavior comes from links inside.' }],
  },

  'content-info': {
    title: 'Content Info',
    description:
      'Landmarks provide a powerful way to identify the organization and structure of a web page. Contentinfo identifies the footer region.',
    usage: (pkg) => `import { ContentInfo } from '${pkg}';\n\nexport function Example() {\n  return <ContentInfo>...</ContentInfo>;\n}\n`,
    examples: [
      {
        title: 'Basic',
        code: `<ContentInfo>\n  <small>© 2026</small>\n</ContentInfo>`,
        render: (DS) => (
          <DS.ContentInfo className="rounded-lg border border-[var(--ds-border-default)] bg-[var(--ds-bg-surface)] p-4 text-sm text-[var(--ds-text-secondary)]">
            © 2026 · Legal · Contact
          </DS.ContentInfo>
        ),
      },
    ],
    rtl: RTL_GENERIC,
    a11y: [...A11Y_GENERIC, ...A11Y_LANDMARKS_PRINCIPLES, 'Use a single ContentInfo landmark for the page footer.'],
    whenToUse: ['Use for the footer region (copyright, legal, contact).'],
    whenNotToUse: ['Don’t use for unrelated content sections in the middle of a page.'],
    keyboard: [{ key: 'N/A', action: 'Landmarks are not interactive.' }],
  },

  complementary: {
    title: 'Complementary',
    description:
      'Landmarks provide a powerful way to identify the organization and structure of a web page. Complementary identifies supporting content related to the main content.',
    usage: (pkg) => `import { Complementary } from '${pkg}';\n\nexport function Example() {\n  return <Complementary aria-label=\"Sidebar\">...</Complementary>;\n}\n`,
    examples: [
      {
        title: 'Basic',
        code: `<Complementary aria-label=\"Sidebar\">...</Complementary>`,
        render: (DS) => (
          <DS.Complementary
            aria-label="Sidebar"
            className="rounded-lg border border-[var(--ds-border-default)] bg-[var(--ds-bg-surface)] p-4"
          >
            <div className="font-medium text-[var(--ds-text-primary)]">Sidebar</div>
            <div className="text-sm text-[var(--ds-text-secondary)]">Related links, filters, tips…</div>
          </DS.Complementary>
        ),
      },
    ],
    rtl: RTL_GENERIC,
    a11y: [...A11Y_GENERIC, ...A11Y_LANDMARKS_PRINCIPLES],
    whenToUse: ['Use for sidebars or related/supporting content that complements the main content.'],
    whenNotToUse: ['Don’t use for primary page content; use Main.'],
    keyboard: [{ key: 'N/A', action: 'Landmarks are not interactive.' }],
  },

  region: {
    title: 'Region',
    description:
      'Landmarks provide a powerful way to identify the organization and structure of a web page. Region is a named section of content.',
    usage: (pkg) => `import { Region } from '${pkg}';\n\nexport function Example() {\n  return <Region aria-label=\"Filters\">...</Region>;\n}\n`,
    examples: [
      {
        title: 'Named region',
        description: 'Provide `aria-label` or `aria-labelledby` so the region is discoverable.',
        code: `<Region aria-label=\"Filters\">...</Region>`,
        render: (DS) => (
          <DS.Region
            aria-label="Filters"
            className="rounded-lg border border-[var(--ds-border-default)] bg-[var(--ds-bg-surface)] p-4"
          >
            <div className="font-medium text-[var(--ds-text-primary)]">Filters</div>
            <div className="text-sm text-[var(--ds-text-secondary)]">A named region inside a page.</div>
          </DS.Region>
        ),
      },
    ],
    rtl: RTL_GENERIC,
    a11y: [...A11Y_GENERIC, ...A11Y_LANDMARKS_PRINCIPLES, 'Region should have an accessible name (label or labelledby).'],
    whenToUse: ['Use for important named page sections users may want to navigate to directly.'],
    whenNotToUse: ['Don’t create too many regions; keep landmarks meaningful.'],
    keyboard: [{ key: 'N/A', action: 'Landmarks are not interactive.' }],
  },

  search: {
    title: 'Search',
    description:
      'Landmarks provide a powerful way to identify the organization and structure of a web page. Search identifies a search region.',
    usage: (pkg) => `import { Search } from '${pkg}';\n\nexport function Example() {\n  return (\n    <Search aria-label=\"Site search\">\n      <input />\n    </Search>\n  );\n}\n`,
    examples: [
      {
        title: 'Basic',
        code: `<Search aria-label=\"Site search\">\n  <input placeholder=\"Search\" />\n</Search>`,
        render: (DS) => (
          <DS.Search
            aria-label="Site search"
            className="rounded-lg border border-[var(--ds-border-default)] bg-[var(--ds-bg-surface)] p-4"
            onSubmit={(e: React.FormEvent) => e.preventDefault()}
          >
            <label htmlFor="ds-search-input" className="text-sm text-[var(--ds-text-secondary)]">
              Search
            </label>
            <div className="mt-2">
              <input
                id="ds-search-input"
                className="w-full rounded-md border border-[var(--ds-border-default)] bg-[var(--ds-bg-input)] px-3 py-2 text-sm"
                placeholder="Search…"
              />
            </div>
          </DS.Search>
        ),
      },
    ],
    rtl: RTL_GENERIC,
    a11y: [...A11Y_GENERIC, ...A11Y_LANDMARKS_PRINCIPLES, 'Give the search landmark an accessible name when needed.'],
    whenToUse: ['Use for a dedicated search region on a page.'],
    whenNotToUse: ['Don’t use for generic forms that are not search.'],
    keyboard: [{ key: 'N/A', action: 'Landmarks are not interactive; keyboard behavior comes from the form controls inside.' }],
  },

  'form-landmark': {
    title: 'Form Landmark',
    description:
      'Landmarks provide a powerful way to identify the organization and structure of a web page. Use a named form landmark only for forms that are distinct page sections.',
    usage: (pkg) => `import { FormLandmark } from '${pkg}';\n\nexport function Example() {\n  return <FormLandmark aria-label=\"Profile\">...</FormLandmark>;\n}\n`,
    examples: [
      {
        title: 'Basic',
        description: 'Provide `aria-label` to name the form landmark.',
        code: `<FormLandmark aria-label=\"Profile\">\n  ...\n</FormLandmark>`,
        render: (DS) => (
          <DS.FormLandmark
            aria-label="Profile"
            className="rounded-lg border border-[var(--ds-border-default)] bg-[var(--ds-bg-surface)] p-4"
            onSubmit={(e: React.FormEvent) => e.preventDefault()}
          >
            <div className="font-medium text-[var(--ds-text-primary)]">Profile</div>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                className="rounded-md border border-[var(--ds-border-default)] bg-[var(--ds-bg-input)] px-3 py-2 text-sm"
                placeholder="First name"
              />
              <input
                className="rounded-md border border-[var(--ds-border-default)] bg-[var(--ds-bg-input)] px-3 py-2 text-sm"
                placeholder="Last name"
              />
            </div>
          </DS.FormLandmark>
        ),
      },
    ],
    rtl: RTL_GENERIC,
    a11y: [
      ...A11Y_GENERIC,
      ...A11Y_LANDMARKS_PRINCIPLES,
      'Only use form landmarks when the form represents a distinct page region; keep names unique.',
    ],
    whenToUse: ['Use for major forms that are a primary section of the page (e.g., checkout, profile).'],
    whenNotToUse: ['Don’t mark every small form as a landmark; keep landmark count low and meaningful.'],
    keyboard: [{ key: 'N/A', action: 'Keyboard behavior comes from the form controls inside.' }],
  },

  // ---------------------------------------------------------------------------
  // Layout primitives
  // ---------------------------------------------------------------------------

  box: {
    title: 'Box',
    description: 'A simple layout primitive (a div) used as a building block for spacing and styling.',
    usage: (pkg) => `import { Box } from '${pkg}';\n\nexport function Example() {\n  return <Box>Content</Box>;\n}\n`,
    examples: [
      {
        title: 'Basic',
        description: 'Use as a wrapper for layout and styling.',
        code: `<Box style={{ padding: 'var(--ds-space-4)', background: 'var(--ds-bg-muted)', borderRadius: 'var(--ds-radius-md)' }}>\n  Box content\n</Box>`,
        render: (DS) => (
          <DS.Box
            style={{
              padding: 'var(--ds-space-4)',
              background: 'var(--ds-bg-muted)',
              borderRadius: 'var(--ds-radius-md)',
              border: '1px solid var(--ds-border-default)',
            }}
          >
            Box content
          </DS.Box>
        ),
      },
      {
        title: 'As a card',
        description: 'Combine tokens to create a surface.',
        code: `<Box style={{ padding: 'var(--ds-space-5)', background: 'var(--ds-bg-surface)', boxShadow: 'var(--ds-shadow-md)' }}>\n  Card-like box\n</Box>`,
        render: (DS) => (
          <DS.Box
            style={{
              padding: 'var(--ds-space-5)',
              background: 'var(--ds-bg-surface)',
              borderRadius: 'var(--ds-radius-lg)',
              boxShadow: 'var(--ds-shadow-md)',
              border: '1px solid var(--ds-border-default)',
            }}
          >
            Card-like box
          </DS.Box>
        ),
      },
    ],
    rtl: RTL_GENERIC,
    a11y: [
      ...A11Y_GENERIC,
      'Box has no semantics by default. Use semantic elements (`nav`, `main`, headings) when appropriate.',
    ],
    whenToUse: [
      'Use as a generic wrapper when you need a `div` with consistent props/ref support.',
      'Use to apply token-based styling without introducing extra semantics.',
    ],
    whenNotToUse: [
      'Don’t use Box as a replacement for semantic HTML when semantics matter.',
    ],
    keyboard: [{ key: 'N/A', action: 'Box is not interactive.' }],
  },

  container: {
    title: 'Container',
    description: 'Centers content and constrains its max width.',
    usage: (pkg) => `import { Container } from '${pkg}';\n\nexport function Example() {\n  return <Container size=\"lg\">Content</Container>;\n}\n`,
    examples: [
      {
        title: 'Basic',
        code: `<Container size=\"md\">\n  <Box>Centered content</Box>\n</Container>`,
        render: (DS) => (
          <DS.Container size="md">
            <DS.Box
              style={{
                padding: 'var(--ds-space-4)',
                borderRadius: 'var(--ds-radius-md)',
                border: '1px solid var(--ds-border-default)',
                background: 'var(--ds-bg-surface)',
              }}
            >
              Centered content
            </DS.Box>
          </DS.Container>
        ),
      },
      {
        title: 'Sizes',
        description: 'Choose a container width based on layout needs.',
        code: `<>\n  <Container size=\"sm\">...</Container>\n  <Container size=\"lg\">...</Container>\n  <Container size=\"full\">...</Container>\n</>`,
        render: (DS) => (
          <DS.Stack gap={3}>
            <DS.Container size="sm">
              <DS.Box style={{ padding: 'var(--ds-space-3)', background: 'var(--ds-bg-muted)', borderRadius: 'var(--ds-radius-md)' }}>
                sm
              </DS.Box>
            </DS.Container>
            <DS.Container size="lg">
              <DS.Box style={{ padding: 'var(--ds-space-3)', background: 'var(--ds-bg-muted)', borderRadius: 'var(--ds-radius-md)' }}>
                lg
              </DS.Box>
            </DS.Container>
            <DS.Container size="full">
              <DS.Box style={{ padding: 'var(--ds-space-3)', background: 'var(--ds-bg-muted)', borderRadius: 'var(--ds-radius-md)' }}>
                full
              </DS.Box>
            </DS.Container>
          </DS.Stack>
        ),
      },
      {
        title: 'Custom padding',
        description: 'Control horizontal padding with `paddingX`.',
        code: `<Container paddingX=\"2rem\">...</Container>`,
        render: (DS) => (
          <DS.Container paddingX="2rem">
            <DS.Box style={{ padding: 'var(--ds-space-3)', background: 'var(--ds-bg-muted)', borderRadius: 'var(--ds-radius-md)' }}>
              Custom paddingX
            </DS.Box>
          </DS.Container>
        ),
      },
    ],
    rtl: RTL_GENERIC,
    a11y: A11Y_GENERIC,
    whenToUse: [
      'Use to center page content and constrain max width.',
      'Use at page-level boundaries (not around every small section).',
    ],
    whenNotToUse: [
      'Don’t wrap everything in a Container—use it at page-level boundaries.',
    ],
    keyboard: [{ key: 'N/A', action: 'Container is not interactive.' }],
  },

  stack: {
    title: 'Stack',
    description: 'A flexbox layout primitive for vertical or horizontal stacking with consistent gaps.',
    usage: (pkg) => `import { Stack } from '${pkg}';\n\nexport function Example() {\n  return (\n    <Stack gap={3}>\n      <div />\n      <div />\n    </Stack>\n  );\n}\n`,
    examples: [
      {
        title: 'Vertical (default)',
        code: `<Stack gap={3}>\n  <Box>One</Box>\n  <Box>Two</Box>\n</Stack>`,
        render: (DS) => (
          <DS.Stack gap={3}>
            <DS.Box style={{ padding: 'var(--ds-space-3)', background: 'var(--ds-bg-muted)', borderRadius: 'var(--ds-radius-md)' }}>One</DS.Box>
            <DS.Box style={{ padding: 'var(--ds-space-3)', background: 'var(--ds-bg-muted)', borderRadius: 'var(--ds-radius-md)' }}>Two</DS.Box>
          </DS.Stack>
        ),
      },
      {
        title: 'Horizontal',
        description: 'Use for inline groups; optionally allow wrapping.',
        code: `<Stack direction=\"horizontal\" gap={2} wrap>\n  <Box>One</Box>\n  <Box>Two</Box>\n  <Box>Three</Box>\n</Stack>`,
        render: (DS) => (
          <DS.Stack direction="horizontal" gap={2} wrap>
            <DS.Box style={{ padding: 'var(--ds-space-3)', background: 'var(--ds-bg-muted)', borderRadius: 'var(--ds-radius-md)' }}>One</DS.Box>
            <DS.Box style={{ padding: 'var(--ds-space-3)', background: 'var(--ds-bg-muted)', borderRadius: 'var(--ds-radius-md)' }}>Two</DS.Box>
            <DS.Box style={{ padding: 'var(--ds-space-3)', background: 'var(--ds-bg-muted)', borderRadius: 'var(--ds-radius-md)' }}>Three</DS.Box>
          </DS.Stack>
        ),
      },
      {
        title: 'Alignment',
        description: 'Align and justify items using `align` and `justify`.',
        code: `<Stack direction=\"horizontal\" align=\"center\" justify=\"space-between\">...</Stack>`,
        render: (DS) => (
          <DS.Stack direction="horizontal" align="center" justify="space-between">
            <DS.Box style={{ padding: 'var(--ds-space-3)', background: 'var(--ds-bg-muted)', borderRadius: 'var(--ds-radius-md)' }}>Left</DS.Box>
            <DS.Box style={{ padding: 'var(--ds-space-3)', background: 'var(--ds-bg-muted)', borderRadius: 'var(--ds-radius-md)' }}>Right</DS.Box>
          </DS.Stack>
        ),
      },
    ],
    rtl: RTL_GENERIC,
    a11y: A11Y_GENERIC,
    whenToUse: [
      'Use for one-dimensional layout with consistent spacing between items.',
      'Use for vertical sections or horizontal groups (with optional wrapping).',
    ],
    whenNotToUse: [
      'Don’t use Stack to replace semantic list structures when order and list semantics matter.',
    ],
    keyboard: [{ key: 'N/A', action: 'Stack is not interactive.' }],
  },

  inline: {
    title: 'Inline',
    description: 'A horizontal Stack—use for inline groups with consistent spacing.',
    usage: (pkg) => `import { Inline } from '${pkg}';\n\nexport function Example() {\n  return (\n    <Inline gap={2} wrap>\n      <div />\n      <div />\n    </Inline>\n  );\n}\n`,
    examples: [
      {
        title: 'Basic',
        code: `<Inline gap={2} wrap>\n  <Box>Tag</Box>\n  <Box>Tag</Box>\n  <Box>Tag</Box>\n</Inline>`,
        render: (DS) => (
          <DS.Inline gap={2} wrap>
            <DS.Box style={{ padding: 'var(--ds-space-2)', background: 'var(--ds-bg-muted)', borderRadius: '999px' }}>Tag</DS.Box>
            <DS.Box style={{ padding: 'var(--ds-space-2)', background: 'var(--ds-bg-muted)', borderRadius: '999px' }}>Tag</DS.Box>
            <DS.Box style={{ padding: 'var(--ds-space-2)', background: 'var(--ds-bg-muted)', borderRadius: '999px' }}>Tag</DS.Box>
          </DS.Inline>
        ),
      },
      {
        title: 'Alignment',
        code: `<Inline align=\"center\" justify=\"flex-end\">...</Inline>`,
        render: (DS) => (
          <DS.Inline align="center" justify="flex-end">
            <DS.Box style={{ padding: 'var(--ds-space-3)', background: 'var(--ds-bg-muted)', borderRadius: 'var(--ds-radius-md)' }}>One</DS.Box>
            <DS.Box style={{ padding: 'var(--ds-space-3)', background: 'var(--ds-bg-muted)', borderRadius: 'var(--ds-radius-md)' }}>Two</DS.Box>
          </DS.Inline>
        ),
      },
    ],
    rtl: RTL_GENERIC,
    a11y: A11Y_GENERIC,
    whenToUse: [
      'Use for horizontal groups with consistent spacing (tags, buttons, metadata).',
      'Use when items should wrap naturally across lines.',
    ],
    whenNotToUse: ['Don’t use Inline when you need true grid layout; use Grid.'],
    keyboard: [{ key: 'N/A', action: 'Inline is not interactive.' }],
  },

  grid: {
    title: 'Grid',
    description: 'A CSS grid layout primitive with configurable columns and gap.',
    usage: (pkg) => `import { Grid } from '${pkg}';\n\nexport function Example() {\n  return (\n    <Grid columns={3} gap={3}>\n      <div />\n    </Grid>\n  );\n}\n`,
    examples: [
      {
        title: 'Fixed columns',
        code: `<Grid columns={3} gap={3}>\n  <Box />\n  <Box />\n  <Box />\n</Grid>`,
        render: (DS) => (
          <DS.Grid columns={3} gap={3}>
            <DS.Box style={{ padding: 'var(--ds-space-3)', background: 'var(--ds-bg-muted)', borderRadius: 'var(--ds-radius-md)' }}>1</DS.Box>
            <DS.Box style={{ padding: 'var(--ds-space-3)', background: 'var(--ds-bg-muted)', borderRadius: 'var(--ds-radius-md)' }}>2</DS.Box>
            <DS.Box style={{ padding: 'var(--ds-space-3)', background: 'var(--ds-bg-muted)', borderRadius: 'var(--ds-radius-md)' }}>3</DS.Box>
          </DS.Grid>
        ),
      },
      {
        title: 'Responsive auto-fit',
        description: 'Use `minColumnWidth` to auto-fit columns as space allows.',
        code: `<Grid minColumnWidth=\"220px\" gap={3}>...</Grid>`,
        render: (DS) => (
          <DS.Grid minColumnWidth="220px" gap={3}>
            <DS.Box style={{ padding: 'var(--ds-space-3)', background: 'var(--ds-bg-muted)', borderRadius: 'var(--ds-radius-md)' }}>A</DS.Box>
            <DS.Box style={{ padding: 'var(--ds-space-3)', background: 'var(--ds-bg-muted)', borderRadius: 'var(--ds-radius-md)' }}>B</DS.Box>
            <DS.Box style={{ padding: 'var(--ds-space-3)', background: 'var(--ds-bg-muted)', borderRadius: 'var(--ds-radius-md)' }}>C</DS.Box>
            <DS.Box style={{ padding: 'var(--ds-space-3)', background: 'var(--ds-bg-muted)', borderRadius: 'var(--ds-radius-md)' }}>D</DS.Box>
          </DS.Grid>
        ),
      },
    ],
    rtl: RTL_GENERIC,
    a11y: A11Y_GENERIC,
    whenToUse: [
      'Use for two-dimensional layouts (card grids, dashboards, galleries).',
      'Use when you need columns/rows rather than a single axis.',
    ],
    whenNotToUse: ['Don’t use Grid for one-dimensional layouts; use Stack/Inline.'],
    keyboard: [{ key: 'N/A', action: 'Grid is not interactive.' }],
  },

  spacer: {
    title: 'Spacer',
    description: 'Adds fixed empty space in layout (vertical or horizontal).',
    usage: (pkg) => `import { Spacer } from '${pkg}';\n\nexport function Example() {\n  return (\n    <>\n      <div />\n      <Spacer size={4} />\n      <div />\n    </>\n  );\n}\n`,
    examples: [
      {
        title: 'Vertical',
        code: `<>\n  <Box>Above</Box>\n  <Spacer size={4} />\n  <Box>Below</Box>\n</>`,
        render: (DS) => (
          <DS.Box>
            <DS.Box style={{ padding: 'var(--ds-space-3)', background: 'var(--ds-bg-muted)', borderRadius: 'var(--ds-radius-md)' }}>Above</DS.Box>
            <DS.Spacer size={4} />
            <DS.Box style={{ padding: 'var(--ds-space-3)', background: 'var(--ds-bg-muted)', borderRadius: 'var(--ds-radius-md)' }}>Below</DS.Box>
          </DS.Box>
        ),
      },
      {
        title: 'Horizontal',
        code: `<Inline align=\"center\">\n  <Box>Left</Box>\n  <Spacer axis=\"horizontal\" size={4} />\n  <Box>Right</Box>\n</Inline>`,
        render: (DS) => (
          <DS.Inline align="center">
            <DS.Box style={{ padding: 'var(--ds-space-3)', background: 'var(--ds-bg-muted)', borderRadius: 'var(--ds-radius-md)' }}>Left</DS.Box>
            <DS.Spacer axis="horizontal" size={4} />
            <DS.Box style={{ padding: 'var(--ds-space-3)', background: 'var(--ds-bg-muted)', borderRadius: 'var(--ds-radius-md)' }}>Right</DS.Box>
          </DS.Inline>
        ),
      },
    ],
    rtl: RTL_GENERIC,
    a11y: A11Y_GENERIC,
    whenToUse: [
      'Use sparingly to insert fixed space when `gap` is not an option (e.g., between unrelated blocks).',
      'Use for quick vertical/horizontal separation in demos and prototypes.',
    ],
    whenNotToUse: [
      'Don’t overuse Spacer for complex layouts—prefer Stack/Inline/Grid gap.',
    ],
    keyboard: [{ key: 'N/A', action: 'Spacer is not interactive.' }],
  },

  divider: {
    title: 'Divider',
    description: 'A visual separator between sections.',
    usage: (pkg) => `import { Divider } from '${pkg}';\n\nexport function Example() {\n  return <Divider />;\n}\n`,
    examples: [
      {
        title: 'Horizontal',
        code: `<>\n  <Box>Above</Box>\n  <Divider />\n  <Box>Below</Box>\n</>`,
        render: (DS) => (
          <DS.Stack gap={3}>
            <DS.Box style={{ padding: 'var(--ds-space-3)' }}>Above</DS.Box>
            <DS.Divider />
            <DS.Box style={{ padding: 'var(--ds-space-3)' }}>Below</DS.Box>
          </DS.Stack>
        ),
      },
      {
        title: 'Vertical',
        description: 'Use vertical dividers between inline items.',
        code: `<Inline align=\"center\">\n  <Box>Left</Box>\n  <Divider orientation=\"vertical\" />\n  <Box>Right</Box>\n</Inline>`,
        render: (DS) => (
          <DS.Inline align="center" style={{ height: 48 }}>
            <DS.Box style={{ padding: 'var(--ds-space-3)' }}>Left</DS.Box>
            <DS.Divider orientation="vertical" />
            <DS.Box style={{ padding: 'var(--ds-space-3)' }}>Right</DS.Box>
          </DS.Inline>
        ),
      },
      {
        title: 'Thickness',
        code: `<Divider thickness={2} />`,
        render: (DS) => <DS.Divider thickness={2} />,
      },
    ],
    rtl: RTL_GENERIC,
    a11y: [
      ...A11Y_GENERIC,
      'Divider uses `role=\"separator\"`. Don’t use it as the only way to convey meaning.',
    ],
    whenToUse: [
      'Use to separate groups or sections when whitespace alone isn’t sufficient.',
      'Use vertical dividers between inline items when the relationship needs a clear boundary.',
    ],
    whenNotToUse: ['Don’t use dividers excessively—prefer whitespace where possible.'],
    keyboard: [{ key: 'N/A', action: 'Divider is not interactive.' }],
  },

  center: {
    title: 'Center',
    description: 'Centers children horizontally and vertically.',
    usage: (pkg) => `import { Center } from '${pkg}';\n\nexport function Example() {\n  return <Center style={{ height: 120 }}>Centered</Center>;\n}\n`,
    examples: [
      {
        title: 'Block center',
        code: `<Center style={{ height: 120, border: '1px dashed var(--ds-border-default)' }}>Centered</Center>`,
        render: (DS) => (
          <DS.Center style={{ height: 120, border: '1px dashed var(--ds-border-default)' }}>
            Centered
          </DS.Center>
        ),
      },
      {
        title: 'Inline center',
        description: 'Use `inline` to center inline-flex content.',
        code: `<Center inline style={{ width: 160, height: 48, border: '1px dashed var(--ds-border-default)' }}>Inline</Center>`,
        render: (DS) => (
          <DS.Center inline style={{ width: 160, height: 48, border: '1px dashed var(--ds-border-default)' }}>
            Inline
          </DS.Center>
        ),
      },
    ],
    rtl: RTL_GENERIC,
    a11y: A11Y_GENERIC,
    whenToUse: [
      'Use to center a single child (empty states, loading, hero content) within a box.',
      'Use for simple alignment scenarios where full layout primitives would be overkill.',
    ],
    whenNotToUse: [
      'Don’t use Center for complex alignment rules—use Stack/Inline/Grid.',
    ],
    keyboard: [{ key: 'N/A', action: 'Center is not interactive.' }],
  },
};

// Fallback docs for components we haven't fully specified yet.
export function getFallbackDoc(componentId: string): ComponentDocSpec {
  const title = componentId
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    title,
    description: 'Accessible component following W3C ARIA APG patterns.',
    usage: (pkg) => `import { ${title.replace(/\s/g, '')} } from '${pkg}';\n`,
    examples: [
      {
        title: 'Basic',
        code: `// Basic example not yet defined for ${title}.`,
        render: () => (
          <p className="text-sm text-[var(--ds-text-secondary)]">
            Example not yet defined for {title}.
          </p>
        ),
      },
    ],
    rtl: RTL_GENERIC,
    a11y: A11Y_GENERIC,
    whenToUse: ['Use when it matches the UI pattern and semantics you need.'],
    whenNotToUse: ['Avoid when a simpler HTML element or pattern would communicate better.'],
    keyboard: [{ key: 'Tab', action: 'Moves focus.' }],
  };
}

