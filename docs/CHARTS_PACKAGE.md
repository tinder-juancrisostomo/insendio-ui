# Charts Package

Chart components styled with design tokens. Bar, Line, Pie, Area, Network Graph.

---

## Overview

**Package:** `@design-system/charts`  
**Description:** Chart components styled with design tokens - Bar, Line, Pie, Area, Network  
**Dependencies:** `@design-system/base`, `@design-system/utils`, `frappe-charts`, `react-frappe-charts`, `react-graph-vis`, `vis-data`, `vis-network`  
**Peer dependencies:** `react` >=18, `react-dom` >=18

The charts package provides data visualization components for the Insendio Dashboard. Charts use design tokens for colors and styling.

---

## How It Works

- **Frappe Charts** – Bar, Line, Pie, Area charts via `react-frappe-charts`.
- **vis-network** – Network graph for relationship visualization.
- **Design tokens** – Chart colors and styles use `--ds-*` variables.
- **Base** – Uses base for layout (Box, etc.) where needed.

---

## Chart Types

| Component | Library | Use |
|-----------|---------|-----|
| BarChart | frappe-charts | Bar charts |
| LineChart | frappe-charts | Line charts |
| PieChart | frappe-charts | Pie charts |
| AreaChart | frappe-charts | Area charts |
| NetworkGraph | vis-network | Node/edge graphs |

---

## Usage

```tsx
import { BarChart, LineChart, PieChart, AreaChart, NetworkGraph } from '@design-system/charts';

<BarChart data={...} />
<NetworkGraph nodes={...} edges={...} />
```

---

## Consumers

`insendio-app` (Dashboard), `docs` (Charts section).

---

## Related

- [CHARTS.md](CHARTS.md) – Detailed charts documentation
- [INSENDIO_APP_PACKAGE.md](INSENDIO_APP_PACKAGE.md) – Dashboard uses charts
- [TOKENS_PACKAGE.md](TOKENS_PACKAGE.md) – Chart theming
