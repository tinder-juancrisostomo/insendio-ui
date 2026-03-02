# Insendio App Package

Shared Insendio app structure, mock data, and page components. Polymorphic UI via component injection.

---

## Overview

**Package:** `@design-system/insendio-app`  
**Description:** Shared Insendio app structure, mock data, and page components  
**Dependencies:** `@design-system/base`, `@design-system/charts`, `@design-system/icons`, `@design-system/typography`, `@design-system/utils`  
**Peer dependencies:** `react` >=18, `react-router-dom` >=6

The insendio-app package provides the **Insendio demo** app: layout, pages, routing, and specialized components (InsendioCard, InsendioTab, InsendioTable, etc.). It is **polymorphic**—it receives components via `InsendioComponentsProvider` and never imports Button, Tabs, etc. directly. Each app (styled-base-app, daisyui-app, mui-app, etc.) injects its chosen library.

---

## How It Works

- **InsendioComponentsProvider** – Context for Box, Button, Input, Tabs, Menu, Switch, Dialog, etc.
- **useInsendioComponents()** – Hook to get the current library's components.
- **Pages** – HomePage, DashboardPage, SegmentsPage, RolesPage, DataPage, NotificationsPage, MonitoringPage, AccessibilityPage, SettingsPage.
- **Specialized components** – InsendioCard, InsendioTab, InsendioTable, InsendioAlert, InsendioPrimaryButton, etc. wrap the polymorphic components with Insendio-specific styling.

---

## Component Context

```tsx
interface InsendioComponents {
  library?: string;
  Box, Stack, Inline, Button, Input, Badge, Table, TableHeader, TableBody, TableRow, TableCell;
  Tabs, TabList, Tab, TabPanel;
  Menu, MenuButton, MenuList, MenuItem;
  Alert, Switch, Dialog, AlertDialog;
}

<InsendioComponentsProvider value={daisyuiComponents}>
  <InsendioApp />
</InsendioComponentsProvider>
```

---

## Pages

| Page | Route | Content |
|------|-------|---------|
| Home | / | Overview, quick links |
| Dashboard | /dashboard | Charts, stats, cards |
| Segments | /segments | User segments list |
| Roles | /roles | Permissions & roles matrix |
| Data | /data | Data sources |
| Notifications | /notifications | Notification settings |
| Monitoring | /monitoring | Monitoring dashboard |
| Accessibility | /accessibility | A11y settings |
| Settings | /settings | App settings |

---

## Specialization Pattern

InsendioCard, InsendioTab, etc. use `useInsendioComponents()` to get the polymorphic Box, Tab, etc., then apply Insendio-specific styling (e.g. purple primary, card borders). This keeps the app code library-agnostic while allowing brand customization.

---

## Exports

- `InsendioApp`, `InsendioLayout`
- `InsendioComponentsProvider`, `useInsendioComponents`, `InsendioComponents`
- Specialized components (InsendioCard, InsendioTab, InsendioTable, etc.)
- Mock data (segments, roles, teamMembers, etc.)
- `vite-watch-plugin` for dev

---

## Related

- [INSENDIO-APP.md](INSENDIO-APP.md) – Detailed Insendio app guide
- [ARCHITECTURE.md](ARCHITECTURE.md) – Polymorphic setup
- [FAQ.md](FAQ.md) – "Why component wrappers?"
