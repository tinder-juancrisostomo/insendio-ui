import React from 'react';
import {
  BarChart,
  LineChart,
  PieChart,
  AreaChart,
  NetworkGraph,
} from '@design-system/charts';

export interface ChartDocSpec {
  title: string;
  description: string;
  usage: string;
  exampleCode: string;
  render: (theme: 'light' | 'dark') => React.ReactNode;
  whenToUse: string[];
  whenNotToUse: string[];
  a11y: string[];
}

const BAR_DATA = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{ name: 'Revenue', values: [12, 19, 15, 25, 22, 30] }],
};

const LINE_DATA = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    { name: 'Visits', values: [65, 78, 90, 81, 96, 105, 92] },
    { name: 'Signups', values: [28, 45, 36, 52, 48, 61, 55] },
  ],
};

const PIE_DATA = {
  labels: ['Desktop', 'Mobile', 'Tablet'],
  datasets: [{ values: [55, 35, 10] }],
};

const AREA_DATA = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [{ name: 'Growth', values: [100, 150, 180, 220] }],
};

const NETWORK_DATA = {
  nodes: [
    { id: 1, label: 'Home', title: 'Landing page' },
    { id: 2, label: 'Products', title: 'Product catalog' },
    { id: 3, label: 'Cart', title: 'Shopping cart' },
    { id: 4, label: 'Checkout', title: 'Checkout flow' },
    { id: 5, label: 'Account', title: 'User account' },
  ],
  edges: [
    { from: 1, to: 2 },
    { from: 1, to: 5 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
    { from: 5, to: 2 },
  ],
};

export const CHART_DOCS: Record<string, ChartDocSpec> = {
  bar: {
    title: 'Bar Chart',
    description:
      'A bar chart displays data using rectangular bars whose lengths are proportional to the values they represent. Use for comparing values across discrete categories.',
    usage: `import { BarChart } from '@design-system/charts';

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{ name: 'Revenue', values: [12, 19, 15, 25, 22, 30] }],
};

<BarChart
  data={data}
  theme={theme}
  height={250}
  aria-label="Bar chart showing monthly revenue Jan–Jun"
  caption="Monthly revenue"
  longDescription="Revenue increased from Jan to Apr, dipped in May, then rose to 30 in Jun."
/>`,
    exampleCode: `const data = {
  labels: ['Jan', 'Feb', 'Mar'],
  datasets: [{ name: 'Sales', values: [10, 20, 15] }],
};

<BarChart data={data} theme={theme} height={250} />`,
    render: (theme) => (
      <BarChart
        data={BAR_DATA}
        theme={theme}
        height={250}
        aria-label="Bar chart showing monthly revenue Jan–Jun 2025"
        caption="Monthly revenue Jan–Jun"
        longDescription="Revenue increased from Jan (12) to Apr (25), dipped in May (22), then rose to 30 in Jun. April had the highest revenue in the period."
      />
    ),
    whenToUse: [
      'Comparing values across discrete categories (e.g., sales by month, traffic by channel).',
      'Showing rankings or distributions where the exact value matters.',
      'When users need to scan and compare multiple values quickly.',
    ],
    whenNotToUse: [
      "Do not use for time-series trends—prefer Line or Area charts.",
      'Avoid when you have many categories (10+); consider a table or different visualization.',
      "Do not use for part-to-whole relationships—use Pie or similar.",
    ],
    a11y: [
      'Provide a visible title or caption that describes the chart (e.g., "Monthly revenue 2025").',
      "Ensure sufficient color contrast; do not rely on color alone to convey meaning.",
      'Offer a text alternative (table or summary) for screen reader users.',
      'Use `aria-label` or `role="img"` with `aria-labelledby` on the chart container if needed.',
      'See W3C Complex Images: https://www.w3.org/WAI/tutorials/images/complex/',
    ],
  },

  line: {
    title: 'Line Chart',
    description:
      'A line chart displays data as a series of points connected by lines. Ideal for showing trends over time or comparing multiple series.',
    usage: `import { LineChart } from '@design-system/charts';

const data = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    { name: 'Visits', values: [65, 78, 90, 81, 96, 105, 92] },
    { name: 'Signups', values: [28, 45, 36, 52, 48, 61, 55] },
  ],
};

<LineChart
  data={data}
  theme={theme}
  height={250}
  aria-label="Line chart showing weekly visits and signups"
  caption="Weekly visits and signups"
  longDescription="Visits ranged 65–105; signups 28–61. Both peaked around Fri–Sat."
/>`,
    exampleCode: `const data = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [
    { name: 'Series A', values: [10, 20, 15, 25] },
    { name: 'Series B', values: [5, 15, 20, 18] },
  ],
};

<LineChart data={data} theme={theme} height={250} />`,
    render: (theme) => (
      <LineChart
        data={LINE_DATA}
        theme={theme}
        height={250}
        aria-label="Line chart showing weekly visits and signups"
        caption="Weekly visits and signups"
        longDescription="Visits ranged from 65 (Mon) to 105 (Sat); signups from 28 (Mon) to 61 (Sat). Both series peaked around Fri–Sat, with a mid-week dip on Wed."
      />
    ),
    whenToUse: [
      'Showing trends over time (daily, weekly, monthly).',
      'Comparing multiple series on the same scale.',
      'When continuity and change over time are the main focus.',
    ],
    whenNotToUse: [
      "Do not use for categorical comparisons—use Bar chart.",
      'Avoid when data points are not ordered (e.g., random categories).',
      "Do not use for part-to-whole—use Pie or similar.",
    ],
    a11y: [
      'Provide a descriptive title (e.g., "Weekly visits and signups").',
      'Use distinguishable line styles (dash, dot) in addition to color for multi-series charts.',
      'Offer a data table or summary for screen reader users.',
      'Ensure the chart has an accessible name via `aria-label` or `aria-labelledby`.',
      'See W3C Complex Images: https://www.w3.org/WAI/tutorials/images/complex/',
    ],
  },

  pie: {
    title: 'Pie Chart',
    description:
      'A pie chart shows data as slices of a circle, where each slice represents a proportion of the whole. Use for part-to-whole relationships.',
    usage: `import { PieChart } from '@design-system/charts';

const data = {
  labels: ['Desktop', 'Mobile', 'Tablet'],
  datasets: [{ values: [55, 35, 10] }],
};

<PieChart
  data={data}
  theme={theme}
  height={250}
  aria-label="Pie chart showing traffic by device type"
  caption="Traffic by device"
  longDescription="Desktop 55%, Mobile 35%, Tablet 10%. Desktop is the primary traffic source."
/>`,
    exampleCode: `const data = {
  labels: ['A', 'B', 'C'],
  datasets: [{ values: [40, 35, 25] }],
};

<PieChart data={data} theme={theme} height={250} />`,
    render: (theme) => (
      <PieChart
        data={PIE_DATA}
        theme={theme}
        height={250}
        aria-label="Pie chart showing traffic by device type"
        caption="Traffic by device type"
        longDescription="Desktop accounts for 55% of traffic, Mobile 35%, and Tablet 10%. Desktop is the primary traffic source."
      />
    ),
    whenToUse: [
      'Showing composition of a whole (e.g., market share, device breakdown).',
      'When you have a small number of segments (typically 2–6).',
      'When proportions matter more than exact values.',
    ],
    whenNotToUse: [
      "Do not use for many segments (7+); slices become hard to compare.",
      'Avoid when values are similar—small differences are hard to perceive.',
      "Do not use for trends over time—use Line or Area.",
    ],
    a11y: [
      'Provide a title describing the whole (e.g., "Traffic by device type").',
      "Ensure each slice has a visible label or legend; do not rely on color alone.",
      'Offer a table with percentages for screen reader users.',
      'Consider an alternative (e.g., horizontal bar) if precise comparison is critical.',
      'See W3C Complex Images: https://www.w3.org/WAI/tutorials/images/complex/',
    ],
  },

  area: {
    title: 'Area Chart',
    description:
      'An area chart is a line chart with the area below the line filled. It emphasizes the magnitude of change over time, often for cumulative or volume data.',
    usage: `import { AreaChart } from '@design-system/charts';

const data = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [{ name: 'Growth', values: [100, 150, 180, 220] }],
};

<AreaChart
  data={data}
  theme={theme}
  height={250}
  aria-label="Area chart showing quarterly growth"
  caption="Quarterly growth"
  longDescription="Growth increased steadily: Q1 100, Q2 150, Q3 180, Q4 220."
/>`,
    exampleCode: `const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr'],
  datasets: [{ name: 'Cumulative', values: [50, 120, 200, 280] }],
};

<AreaChart data={data} theme={theme} height={250} />`,
    render: (theme) => (
      <AreaChart
        data={AREA_DATA}
        theme={theme}
        height={250}
        aria-label="Area chart showing quarterly growth"
        caption="Quarterly growth"
        longDescription="Growth increased steadily: Q1 100, Q2 150, Q3 180, Q4 220. The trend shows consistent quarter-over-quarter improvement."
      />
    ),
    whenToUse: [
      'Emphasizing volume or magnitude of change over time.',
      'Showing cumulative values (e.g., total users, revenue over period).',
      'When the filled area adds meaning (e.g., "total under the curve").',
    ],
    whenNotToUse: [
      "Do not use for multiple overlapping series—areas obscure each other.",
      'Avoid when exact values at each point are more important than trend.',
      "Do not use for categorical data—use Bar chart.",
    ],
    a11y: [
      'Provide a clear title (e.g., "Quarterly growth").',
      'Offer a text summary or table for screen reader users.',
      'Ensure sufficient contrast between fill and background.',
      'Use `aria-label` to describe the chart purpose.',
      'See W3C Complex Images: https://www.w3.org/WAI/tutorials/images/complex/',
    ],
  },

  'network-graph': {
    title: 'Network Graph',
    description:
      'A network graph visualizes relationships between nodes (entities) and edges (connections). Use for flows, dependencies, hierarchies, or graph structures.',
    usage: `import { NetworkGraph } from '@design-system/charts';

const graphData = {
  nodes: [
    { id: 1, label: 'Home', title: 'Landing page' },
    { id: 2, label: 'Products', title: 'Product catalog' },
  ],
  edges: [{ from: 1, to: 2 }],
};

<NetworkGraph
  data={graphData}
  theme={theme}
  aria-label="Network graph showing user flow"
  caption="User flow"
  longDescription="Nodes: Home, Products, Cart, Checkout, Account. Main flow: Home to Products to Cart to Checkout."
/>`,
    exampleCode: `const graphData = {
  nodes: [
    { id: 1, label: 'A' },
    { id: 2, label: 'B' },
    { id: 3, label: 'C' },
  ],
  edges: [
    { from: 1, to: 2 },
    { from: 2, to: 3 },
  ],
};

<NetworkGraph data={graphData} theme={theme} />`,
    render: (theme) => (
      <NetworkGraph
        data={NETWORK_DATA}
        theme={theme}
        aria-label="Network graph showing user flow"
        caption="User flow structure"
        longDescription="Nodes: Home, Products, Cart, Checkout, Account. Main flow: Home to Products to Cart to Checkout. Users can also go from Home to Account, and from Account to Products."
      />
    ),
    whenToUse: [
      'Visualizing relationships (e.g., user flows, dependencies, org charts).',
      'Showing connections between entities (nodes and edges).',
      'When structure and topology matter more than exact layout.',
    ],
    whenNotToUse: [
      "Do not use for simple hierarchies—consider a tree view.",
      'Avoid when the graph is very dense; it becomes unreadable.',
      "Do not use for sequential data—use a flow diagram or timeline.",
    ],
    a11y: [
      'Provide a title describing the graph (e.g., "User flow from Home to Checkout").',
      'Offer a text-based representation (list of nodes and edges) for screen readers.',
      'Ensure interactive elements (if any) are keyboard accessible.',
      'Consider providing a simplified or linearized view for complex graphs.',
      'See W3C Complex Images: https://www.w3.org/WAI/tutorials/images/complex/',
    ],
  },
};

export const CHART_IDS = ['bar', 'line', 'pie', 'area', 'network-graph'] as const;

export function getChartDoc(chartId: string): ChartDocSpec | undefined {
  return CHART_DOCS[chartId];
}
