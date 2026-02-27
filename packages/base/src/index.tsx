/**
 * @design-system/base
 * Headless accessible UI components following W3C ARIA APG patterns
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/
 */

export {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  type AccordionProps,
  type AccordionItemProps,
  type AccordionHeaderProps,
  type AccordionPanelProps,
} from './accordion';
export { Alert, type AlertProps } from './alert';
export { Badge, type BadgeProps } from './badge';
export { AlertDialog, type AlertDialogProps } from './alert-dialog';
export {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  type BreadcrumbProps,
  type BreadcrumbItemProps,
  type BreadcrumbLinkProps,
} from './breadcrumb';
export { Button, type ButtonProps } from './button';
export { Carousel, type CarouselProps, type CarouselVariant } from './carousel';
export { Checkbox, type CheckboxProps } from './checkbox';
export { Combobox, type ComboboxProps, type ComboboxOption } from './combobox';
export { Dialog, type DialogProps } from './dialog';
export {
  Disclosure,
  DisclosureTrigger,
  DisclosurePanel,
  type DisclosureProps,
  type DisclosureTriggerProps,
  type DisclosurePanelProps,
} from './disclosure';
export { Link, type LinkProps } from './link';
export { Listbox, type ListboxProps, type ListboxOption } from './listbox';
export {
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
  type MenuProps,
  type MenuButtonProps,
  type MenuItemProps,
  type MenuListProps,
} from './menu';
export { RadioGroup, Radio, type RadioGroupProps, type RadioProps } from './radio-group';
export { Slider, type SliderProps } from './slider';
export { RangeSlider, type RangeSliderProps } from './range-slider';
export { Switch, type SwitchProps } from './switch';
export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  type TableProps,
  type TableHeaderProps,
  type TableBodyProps,
  type TableRowProps,
  type TableCellProps,
} from './table';
export {
  Tabs,
  TabList,
  Tab,
  TabPanel,
  type TabsProps,
  type TabListProps,
  type TabProps,
  type TabPanelProps,
} from './tabs';
export { Toolbar, type ToolbarProps } from './toolbar';
export { Tooltip, type TooltipProps } from './tooltip';
export { TreeView, type TreeViewProps, type TreeNode } from './tree-view';
export { TreeGrid, type TreeGridProps, type TreeGridColumn, type TreeGridRow } from './treegrid';
export { WindowSplitter, type WindowSplitterProps } from './window-splitter';

// Landmarks - W3C ARIA APG Pattern
export {
  Banner,
  Main,
  Nav,
  ContentInfo,
  Complementary,
  Region,
  Search,
  FormLandmark,
  type BannerProps,
  type MainProps,
  type NavProps,
  type ContentInfoProps,
  type ComplementaryProps,
  type RegionProps,
  type SearchProps,
  type FormLandmarkProps,
} from './landmarks';

// Layout primitives (non-APG, utility components)
export { Box, type BoxProps } from './box';
export { Container, type ContainerProps, type ContainerSize } from './container';
export { Stack, type StackProps, type SpaceToken } from './stack';
export { Inline, type InlineProps } from './inline';
export { Input, type InputProps } from './input';
export { Grid, type GridProps } from './grid';
export { Spacer, type SpacerProps } from './spacer';
export { Divider, type DividerProps } from './divider';
export { Center, type CenterProps } from './center';
