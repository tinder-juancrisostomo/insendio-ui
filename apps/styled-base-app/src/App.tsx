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
} from '@design-system/styled-base';

const styledBaseComponents: InsendioComponents = {
  library: 'Styled Base',
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
    <InsendioComponentsProvider value={styledBaseComponents}>
      <InsendioApp />
    </InsendioComponentsProvider>
  );
}
