import {
  BarsIcon,
  BellIcon,
  BookmarkIcon,
  ChartBarIcon,
  ChartLineIcon,
  CheckIcon,
  CheckboxIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  CodeIcon,
  DatabaseIcon,
  DownloadIcon,
  EllipsisVerticalIcon,
  EnvelopeIcon,
  EyeIcon,
  FilterIcon,
  FlaskIcon,
  FlowIcon,
  HashIcon,
  HouseIcon,
  ImageIcon,
  InfoIcon,
  LightningIcon,
  LinkIcon,
  MapPinIcon,
  MicrophoneIcon,
  MoonIcon,
  PencilIcon,
  PeopleOverlapIcon,
  PersonIcon,
  PlusIcon,
  QuestionIcon,
  SearchIcon,
  SendIcon,
  SettingsIcon,
  ShieldIcon,
  StarIcon,
  SunIcon,
  UsersIcon,
  WindowIcon,
  WrenchIcon,
  XIcon,
} from '@design-system/icons';

export interface IconSpec {
  id: string;
  name: string;
  component: React.ComponentType<{ size?: number; className?: string }>;
}

const ICON_LIST = [
  ['BarsIcon', BarsIcon],
  ['BellIcon', BellIcon],
  ['BookmarkIcon', BookmarkIcon],
  ['ChartBarIcon', ChartBarIcon],
  ['ChartLineIcon', ChartLineIcon],
  ['CheckIcon', CheckIcon],
  ['CheckboxIcon', CheckboxIcon],
  ['ChevronDownIcon', ChevronDownIcon],
  ['ChevronUpIcon', ChevronUpIcon],
  ['ClockIcon', ClockIcon],
  ['CodeIcon', CodeIcon],
  ['DatabaseIcon', DatabaseIcon],
  ['DownloadIcon', DownloadIcon],
  ['EllipsisVerticalIcon', EllipsisVerticalIcon],
  ['EnvelopeIcon', EnvelopeIcon],
  ['EyeIcon', EyeIcon],
  ['FilterIcon', FilterIcon],
  ['FlaskIcon', FlaskIcon],
  ['FlowIcon', FlowIcon],
  ['HashIcon', HashIcon],
  ['HouseIcon', HouseIcon],
  ['ImageIcon', ImageIcon],
  ['InfoIcon', InfoIcon],
  ['LightningIcon', LightningIcon],
  ['LinkIcon', LinkIcon],
  ['MapPinIcon', MapPinIcon],
  ['MicrophoneIcon', MicrophoneIcon],
  ['MoonIcon', MoonIcon],
  ['PencilIcon', PencilIcon],
  ['PeopleOverlapIcon', PeopleOverlapIcon],
  ['PersonIcon', PersonIcon],
  ['PlusIcon', PlusIcon],
  ['QuestionIcon', QuestionIcon],
  ['SearchIcon', SearchIcon],
  ['SendIcon', SendIcon],
  ['SettingsIcon', SettingsIcon],
  ['ShieldIcon', ShieldIcon],
  ['StarIcon', StarIcon],
  ['SunIcon', SunIcon],
  ['UsersIcon', UsersIcon],
  ['WindowIcon', WindowIcon],
  ['WrenchIcon', WrenchIcon],
  ['XIcon', XIcon],
] as [string, React.ComponentType<{ size?: number; className?: string }>][];

export const ICON_SPECS: IconSpec[] = ICON_LIST.map(([name, component]) => ({
  id: name.replace(/Icon$/, '').replace(/([A-Z])/g, '-$1').replace(/^-/, '').toLowerCase(),
  name,
  component,
}));

export const ICONS_USAGE = `import {
  BellIcon,
  HouseIcon,
  ChevronDownIcon,
  SearchIcon,
  // ... etc
} from '@design-system/icons';

// Default size (24px)
<BellIcon />

// Custom size
<HouseIcon size={32} />

// With className for styling
<SearchIcon size={20} className="text-[var(--ds-text-secondary)]" />`;
