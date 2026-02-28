import {
  InsendioApp,
  InsendioComponentsProvider,
  type InsendioComponents,
} from '@design-system/insendio-app';
import {
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
} from '@design-system/shadcn';

const shadcnComponents: InsendioComponents = {
  library: 'Shadcn',
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
    <InsendioComponentsProvider value={shadcnComponents}>
      <InsendioApp />
    </InsendioComponentsProvider>
  );
}
