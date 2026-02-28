# Charts Package

The `@design-system/charts` package provides accessible chart components styled with design tokens. Charts use base components (Box, Stack, Table, Button) and Tailwind for consistency with the design system.

## Components

| Chart | Use Case |
|-------|----------|
| **BarChart** | Comparing values across categories (vertical or horizontal) |
| **LineChart** | Time-series trends, continuous data |
| **PieChart** | Part-to-whole relationships |
| **AreaChart** | Cumulative trends, filled line charts |
| **NetworkGraph** | Relationships, flows, dependencies |

## Usage

```tsx
import { BarChart, LineChart, PieChart, AreaChart, NetworkGraph } from '@design-system/charts';

// Bar chart
<BarChart
  data={{ labels: ['Jan', 'Feb', 'Mar'], datasets: [{ name: 'Sales', values: [10, 20, 15] }] }}
  theme="light"
  height={250}
  aria-label="Monthly sales"
  caption="Sales by month"
/>

// With accessibility options
<BarChart
  data={data}
  theme={theme}
  defaultView="table"        // Show data table by default (for screen readers)
  showViewSwitch={true}     // Chart / Table / Details toggle
  reduceMotion={true}       // Disable animations
/>
```

## Data Shapes

**ChartData** (Bar, Line, Pie, Area):

```ts
{
  labels: string[];
  datasets: { name?: string; values: number[] }[];
}
```

**NetworkGraphData**:

```ts
{
  nodes: { id: number | string; label?: string; title?: string }[];
  edges: { from: number | string; to: number | string }[];
}
```

## Accessibility

- **Chart/Table view switch** – Users can toggle between visual chart and data table
- **Long description** – Optional `longDescription` for screen readers
- **Caption** – Accessible caption for the figure
- **Reduce motion** – `reduceMotion` prop disables animations (align with `prefers-reduced-motion`)
- **Design tokens** – Colors from `--ds-text-link`, `--ds-bg-muted`, etc.

## Dependencies

- `@design-system/base` – Box, Stack, Table, Button
- `@design-system/utils` – `cn()` for class merging
- `react-frappe-charts` – Bar, Line, Pie, Area
- `react-graph-vis` – Network graph

## Tailwind Content

Apps that use charts must include the charts package in Tailwind `content`:

```js
content: [
  // ...
  '../../packages/charts/src/**/*.{js,ts,jsx,tsx}',
],
```

## Where Used

- **Docs app** – `/charts/:id` (bar, line, pie, area, network-graph)
- **Insendio app** – Dashboard page (`/dashboard`) with Overview, User Behavior, Performance, Flows tabs
