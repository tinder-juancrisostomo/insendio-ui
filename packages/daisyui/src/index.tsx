/**
 * @design-system/daisyui
 * Components using react-daisyui (real DaisyUI React components)
 */

export { Badge } from './badge';
export { Button } from './button';
export { Alert } from './alert';
export { AlertDialog } from './alert-dialog';
export { Dialog } from './dialog';
export { Input } from './input';
export { Menu, MenuButton, MenuList, MenuItem } from './menu';
export { Switch } from './switch';
export { Table, TableHeader, TableBody, TableRow, TableCell } from './table';
export { Tabs, TabList, Tab, TabPanel } from './tabs';

// Layout (no base dependency)
export { Box, Stack, Inline } from './layout';

// Components still using base (styled with DaisyUI classes) - for docs compatibility
export { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from './accordion';
export { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from './breadcrumb';
export { Carousel } from './carousel';
export { Checkbox } from './checkbox';
export { Combobox } from './combobox';
export { Disclosure, DisclosureTrigger, DisclosurePanel } from './disclosure';
export { Link } from './link';
export { Listbox } from './listbox';
export { RadioGroup, Radio } from './radio-group';
export { Slider } from './slider';
export { Toolbar } from './toolbar';
export { Tooltip } from './tooltip';

// Layout primitives and additional patterns from base
export { Container, Grid, Spacer, Divider, Center } from '@design-system/base';
export { RangeSlider, TreeView, TreeGrid, WindowSplitter } from '@design-system/base';
export { Banner, Main, Nav, ContentInfo, Complementary, Region, Search, FormLandmark } from '@design-system/base';
