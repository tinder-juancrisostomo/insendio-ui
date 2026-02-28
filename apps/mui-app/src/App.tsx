import {
  InsendioApp,
  InsendioComponentsProvider,
  type InsendioComponents,
} from '@design-system/insendio-app';
import {
  DesignSystemThemeProvider,
  Box,
  Stack,
  Inline,
  Button,
  Input,
  Badge,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Alert,
  Switch,
  Dialog,
  AlertDialog,
} from '@design-system/mui';

const muiComponents: InsendioComponents = {
  library: 'MUI',
  Box,
  Stack,
  Inline,
  Button,
  Input,
  Badge,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Alert,
  Switch,
  Dialog,
  AlertDialog,
};

export default function App() {
  return (
    <DesignSystemThemeProvider>
      <InsendioComponentsProvider value={muiComponents}>
        <InsendioApp />
      </InsendioComponentsProvider>
    </DesignSystemThemeProvider>
  );
}
