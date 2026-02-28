import type { TextVariant } from '@design-system/typography';

export interface TypographyVariantSpec {
  id: TextVariant;
  label: string;
  description: string;
  sampleText: string;
  defaultTag: string;
}

export const TYPOGRAPHY_VARIANTS: TypographyVariantSpec[] = [
  {
    id: 'h1',
    label: 'Heading 1',
    description: 'Page titles and primary headings. Largest, boldest text.',
    sampleText: 'Design System Heading 1',
    defaultTag: 'h1',
  },
  {
    id: 'h2',
    label: 'Heading 2',
    description: 'Section titles and secondary headings.',
    sampleText: 'Section Heading',
    defaultTag: 'h2',
  },
  {
    id: 'h3',
    label: 'Heading 3',
    description: 'Subsection titles.',
    sampleText: 'Subsection Title',
    defaultTag: 'h3',
  },
  {
    id: 'h4',
    label: 'Heading 4',
    description: 'Card titles, list headers, and smaller headings.',
    sampleText: 'Card or List Header',
    defaultTag: 'h4',
  },
  {
    id: 'body',
    label: 'Body',
    description: 'Default body text for paragraphs and main content.',
    sampleText: 'This is body text for paragraphs and main content. It uses the base font size and normal weight.',
    defaultTag: 'p',
  },
  {
    id: 'body-sm',
    label: 'Body Small',
    description: 'Secondary text, descriptions, and supporting content.',
    sampleText: 'Secondary or supporting text. Often used for descriptions and metadata.',
    defaultTag: 'p',
  },
  {
    id: 'caption',
    label: 'Caption',
    description: 'Labels, captions, and fine print.',
    sampleText: 'Caption or label text',
    defaultTag: 'span',
  },
  {
    id: 'overline',
    label: 'Overline',
    description: 'Category labels, section dividers, and uppercase labels.',
    sampleText: 'Category Label',
    defaultTag: 'span',
  },
];

export const TYPOGRAPHY_USAGE = `import { Text } from '@design-system/typography';

// Headings
<Text variant="h1">Page Title</Text>
<Text variant="h2">Section Title</Text>
<Text variant="h3">Subsection</Text>
<Text variant="h4">Card Title</Text>

// Body text
<Text variant="body">Paragraph content.</Text>
<Text variant="body-sm">Secondary or supporting text.</Text>

// Labels
<Text variant="caption">Caption text</Text>
<Text variant="overline">Category</Text>

// Override semantic element
<Text variant="h2" as="span">Styled like h2, renders as span</Text>`;

export const TYPOGRAPHY_WHEN_TO_USE = [
  'Use headings (h1–h4) for document structure; ensure a single h1 per page and logical heading order (h1 → h2 → h3).',
  'Use body for main content and body-sm for secondary or supporting text.',
  'Use caption for labels, timestamps, and fine print that supplements primary content.',
  'Use overline for category labels, section dividers, or uppercase labels in navigation or cards.',
  'Prefer the default semantic element (as) for each variant to support assistive technologies and document outline.',
];

export const TYPOGRAPHY_WHEN_NOT_TO_USE = [
  'Don’t skip heading levels (e.g. h1 to h3); maintain a logical hierarchy.',
  'Don’t use heading variants purely for visual styling without semantic meaning; use as to override only when necessary.',
  'Avoid body-sm or caption for critical information that all users must read.',
  'Don’t use overline for long text; it’s intended for short labels.',
];

export const TYPOGRAPHY_A11Y = [
  'Typography uses design tokens (--ds-font-size-*, --ds-text-primary, etc.) that respect user preferences like high contrast and large text.',
  'Use the as prop to match the semantic element to the visual style (e.g. as="h2" for variant="h2") so screen readers get correct structure.',
  'Ensure sufficient color contrast between text and background; tokens support light/dark themes.',
  'Avoid using color alone to convey meaning; pair with icons or labels when needed.',
];
