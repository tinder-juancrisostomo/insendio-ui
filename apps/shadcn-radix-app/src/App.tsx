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
} from '@design-system/shadcn-radix';

const shadcnRadixComponents: InsendioComponents = {
  library: 'Shadcn Radix',
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
    <InsendioComponentsProvider value={shadcnRadixComponents}>
      <InsendioApp />
    </InsendioComponentsProvider>
  );
}
