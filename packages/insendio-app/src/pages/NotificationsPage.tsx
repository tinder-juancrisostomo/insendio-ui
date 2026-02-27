import {
  SearchIcon,
  FilterIcon,
  DownloadIcon,
  BookmarkIcon,
  EllipsisVerticalIcon,
  FlowIcon,
  CheckboxIcon,
  SettingsIcon,
  BellIcon,
  EnvelopeIcon,
  WindowIcon,
  UsersIcon,
  ClockIcon,
  PencilIcon,
  ChartBarIcon,
  ChartLineIcon,
  CheckIcon,
  XIcon,
  InfoIcon,
  PlusIcon,
} from '@design-system/icons';
import { Text } from '@design-system/typography';
import {
  campaigns,
  notificationTabs,
  journeyStats,
  journeys,
  pendingApprovals,
  rateLimitChannels,
  configuredRateLimits,
} from '../mock-data';
import { useInsendioComponents } from '../components-context';
import {
  PageLayout,
  InsendioTab,
  InsendioTabList,
  InsendioTable,
  InsendioTableToolbar,
  InsendioCard,
  InsendioStatCard,
  InsendioPrimaryButton,
  InsendioRateLimitCard,
} from '../components/insendio';

const statusVariant = (s: string): 'active' | 'draft' | 'scheduled' | 'paused' | 'neutral' => {
  if (s === 'active') return 'active';
  if (s === 'draft') return 'draft';
  if (s === 'scheduled') return 'scheduled';
  if (s === 'paused') return 'paused';
  return 'neutral';
};

const priorityBadgeClass = (p: string) => {
  if (p === 'high') return 'bg-[var(--ds-bg-error)] text-[var(--ds-text-primary)] border border-[var(--ds-border-default)]';
  if (p === 'medium') return 'bg-[var(--ds-bg-warning)] text-[var(--ds-text-primary)] border border-[var(--ds-border-default)]';
  return 'bg-[var(--ds-bg-info)] text-[var(--ds-text-primary)] border border-[var(--ds-border-default)]';
};

const categoryBadgeClass = (c: string) =>
  c === 'Global' ? 'bg-[var(--ds-bg-active-tab)] text-[var(--ds-text-primary)]' : 'bg-[var(--ds-bg-info)] text-[var(--ds-text-primary)]';

const tabIcons: Record<string, React.ReactNode> = {
  campaigns: <BellIcon size={18} />,
  journeys: <FlowIcon size={18} />,
  'approval-queue': <CheckboxIcon size={18} />,
  'atc-management': <SettingsIcon size={18} />,
};

const channelIcons: Record<string, React.ReactNode> = {
  Push: <BellIcon size={14} />,
  Email: <EnvelopeIcon size={14} />,
  Modal: <WindowIcon size={14} />,
  SMS: <EnvelopeIcon size={14} />,
};

const rateLimitIconMap: Record<string, React.ReactNode> = {
  bell: <BellIcon size={20} className="text-[var(--ds-text-primary)]" />,
  envelope: <EnvelopeIcon size={20} className="text-[var(--ds-text-primary)]" />,
  window: <WindowIcon size={20} className="text-[var(--ds-text-primary)]" />,
  sms: <EnvelopeIcon size={20} className="text-[var(--ds-text-primary)]" />,
};

export function NotificationsPage() {
  const {
    Box,
    Stack,
    Inline,
    Input,
    Button,
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
    Badge,
    Tabs,
    TabPanel,
  } = useInsendioComponents();

  return (
    <Tabs defaultSelectedId="campaigns">
      <PageLayout
        title="Manage campaigns and notifications"
        titleClassName="text-[var(--ds-text-primary)] font-semibold tracking-tight"
        headerContent={
          <InsendioTabList className="bg-transparent">
            {notificationTabs.map((tab) => (
              <InsendioTab key={tab.id} id={tab.id} theme="blue">
                {tabIcons[tab.id]}
                {tab.label}
              </InsendioTab>
            ))}
          </InsendioTabList>
        }
      >
        {/* Campaigns tab */}
        <TabPanel tabId="campaigns" className="pt-6">
          <Stack gap={4}>
            <InsendioTableToolbar>
              <Inline justify="space-between" align="center" wrap className="gap-4 w-full">
                <Input
                  placeholder="Search campaigns by name, type, or content..."
                  iconLeft={<SearchIcon size={20} />}
                  className="flex-1 min-w-0 sm:min-w-[200px] max-w-full rounded-lg border border-[var(--ds-border-default)] bg-[var(--ds-bg-input)] focus:ring-0 focus:outline-none"
                />
                <Inline gap={2} className="shrink-0">
                  <Button variant="outline" className="rounded-lg">
                    <FilterIcon size={18} />
                    Filters
                  </Button>
                  <Button variant="outline" className="rounded-lg">
                    <DownloadIcon size={18} />
                    Export
                  </Button>
                  <Button variant="outline" className="rounded-lg">
                    <BookmarkIcon size={18} />
                    Saved Views
                  </Button>
                </Inline>
              </Inline>
            </InsendioTableToolbar>
            <InsendioTable className="overflow-hidden overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent [&:nth-child(even)]:bg-transparent">
                    <TableCell as="th" className="font-semibold text-left text-[var(--ds-text-secondary)]">Name</TableCell>
                    <TableCell as="th" className="font-semibold text-left text-[var(--ds-text-secondary)]">Status</TableCell>
                    <TableCell as="th" className="font-semibold text-left text-[var(--ds-text-secondary)]">Channel</TableCell>
                    <TableCell as="th" className="font-semibold text-left text-[var(--ds-text-secondary)]">Type</TableCell>
                    <TableCell as="th" className="font-semibold text-right text-[var(--ds-text-secondary)]">Start / End Date</TableCell>
                    <TableCell as="th" className="w-10">{''}</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaigns.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell>{c.name}</TableCell>
                      <TableCell>
                        <Badge variant={statusVariant(c.status) as 'active' | 'draft' | 'neutral'}>
                          {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Inline gap={2}>
                          {c.channel.map((ch) => (
                            <Badge key={ch} variant="neutral" className="text-xs">
                              {ch}
                            </Badge>
                          ))}
                        </Inline>
                      </TableCell>
                      <TableCell>{c.type}</TableCell>
                      <TableCell className="text-right">
                        <Stack gap={0}>
                          <span className="text-[var(--ds-text-primary)]">{c.startDate}</span>
                          {c.endDate && (
                            <span className="text-xs text-[var(--ds-text-muted)]">{c.endDate}</span>
                          )}
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <button
                          type="button"
                          className="p-1.5 rounded-lg hover:bg-[var(--ds-bg-muted)] transition-colors text-[var(--ds-text-secondary)] hover:text-[var(--ds-text-primary)]"
                          aria-label="More actions"
                        >
                          <EllipsisVerticalIcon size={20} />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </InsendioTable>
          </Stack>
        </TabPanel>

        {/* Journeys tab */}
        <TabPanel tabId="journeys" className="pt-6">
          <Stack gap={6}>
            <div className="w-full min-w-0 overflow-x-auto overflow-y-hidden [-webkit-overflow-scrolling:touch] -mx-4 px-4 sm:mx-0 sm:px-0">
              <Inline gap={4} wrap className="flex-nowrap sm:flex-wrap min-w-max sm:min-w-0">
                <InsendioStatCard
                  label="Total Journeys"
                  value={journeyStats.totalJourneys}
                  icon={<FlowIcon size={24} className="text-[var(--ds-text-link)]" />}
                  iconBg="bg-[var(--ds-bg-info)]"
                  className="shrink-0 min-w-[180px] sm:flex-1 sm:shrink sm:min-w-0"
                />
                <InsendioStatCard
                  label="Live Journeys"
                  value={journeyStats.liveJourneys}
                  icon={<FlowIcon size={24} className="text-[var(--ds-text-primary)]" />}
                  iconBg="bg-[var(--ds-bg-success)]"
                  className="shrink-0 min-w-[180px] sm:flex-1 sm:shrink sm:min-w-0"
                />
                <InsendioStatCard
                  label="Active Users"
                  value={journeyStats.activeUsers}
                  icon={<UsersIcon size={24} className="text-[var(--ds-text-primary)]" />}
                  iconBg="bg-[var(--ds-bg-active-tab)]"
                  className="shrink-0 min-w-[180px] sm:flex-1 sm:shrink sm:min-w-0"
                />
                <InsendioStatCard
                  label="Avg Completion"
                  value={journeyStats.avgCompletion}
                  icon={<ChartLineIcon size={24} className="text-[var(--ds-text-primary)]" />}
                  iconBg="bg-[var(--ds-bg-warning)]"
                  className="shrink-0 min-w-[180px] sm:flex-1 sm:shrink sm:min-w-0"
                />
              </Inline>
            </div>
            <InsendioTableToolbar>
              <Stack gap={3} className="w-full">
                <Input
                  placeholder="Search journeys..."
                  iconLeft={<SearchIcon size={20} />}
                  className="w-full rounded-lg border border-[var(--ds-border-default)] bg-[var(--ds-bg-input)] focus:ring-0 focus:outline-none"
                />
                <Inline gap={2} wrap>
                  <Button variant="outline" className="rounded-lg">
                    <FilterIcon size={18} />
                    Filters
                  </Button>
                  <Button variant="outline" className="rounded-lg">All Statuses</Button>
                  <Button variant="outline" className="rounded-lg">All Types</Button>
                </Inline>
              </Stack>
            </InsendioTableToolbar>
            <Stack gap={4}>
              {journeys.map((j) => (
                <InsendioCard key={j.id} variant="surface" className="rounded-lg p-5">
                  <Stack gap={3}>
                    <Inline justify="space-between" align="start" wrap>
                      <Text variant="h4" className="font-semibold text-[var(--ds-text-primary)]">
                        {j.name}
                      </Text>
                      <Inline gap={2}>
                        <Badge variant={j.status === 'live' ? 'active' : 'draft'}>
                          {j.status.charAt(0).toUpperCase() + j.status.slice(1)}
                        </Badge>
                        <Badge variant="neutral">{j.type}</Badge>
                      </Inline>
                    </Inline>
                    <Inline gap={4} wrap className="text-sm text-[var(--ds-text-secondary)]">
                      <span className="flex items-center gap-1">
                        <FlowIcon size={16} />
                        {j.steps} steps
                      </span>
                      <span className="flex items-center gap-1">
                        <UsersIcon size={16} />
                        {j.activeUsers.toLocaleString()} active users
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckIcon size={16} />
                        {j.completion} completion
                      </span>
                      <span className="flex items-center gap-1">
                        <ClockIcon size={16} />
                        Modified {j.lastModified}
                      </span>
                    </Inline>
                    <Inline gap={2} wrap>
                      <Button variant="outline" size="sm" className="rounded-lg">
                        <PencilIcon size={16} />
                        Edit Journey
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-lg">
                        <ChartBarIcon size={16} />
                        Monitor Journey
                      </Button>
                    </Inline>
                    {j.campaigns.length > 0 && (
                      <Box>
                        <Text variant="caption" className="text-[var(--ds-text-secondary)] block mb-2">
                          Campaigns in this journey:
                        </Text>
                        <Inline gap={2} wrap>
                          {j.campaigns.map((c, i) => (
                            <button
                              key={`${c.name}-${c.type}-${i}`}
                              type="button"
                              className="text-sm text-[var(--ds-text-link)] hover:underline"
                            >
                              {i + 1}. {c.name} ({c.type})
                            </button>
                          ))}
                        </Inline>
                      </Box>
                    )}
                  </Stack>
                </InsendioCard>
              ))}
            </Stack>
          </Stack>
        </TabPanel>

        {/* Approval Queue tab */}
        <TabPanel tabId="approval-queue" className="pt-6">
          <Stack gap={6}>
            <Inline justify="space-between" align="center" wrap>
              <Stack gap={0}>
                <Text variant="h3" className="text-[var(--ds-text-primary)]">
                  Pending Approvals
                </Text>
                <Text variant="body-sm" className="text-[var(--ds-text-secondary)]">
                  {pendingApprovals.length} campaigns waiting for review
                </Text>
              </Stack>
              <Badge variant="neutral" className="bg-[var(--ds-bg-warning)] text-[var(--ds-text-primary)] border border-[var(--ds-border-default)]">
                Action Required
              </Badge>
            </Inline>
            <Stack gap={4}>
              {pendingApprovals.map((a) => (
                <InsendioCard key={a.id} variant="surface" className="rounded-lg p-5">
                  <Stack gap={3}>
                    <Inline justify="space-between" align="start" wrap>
                      <Text variant="h4" className="font-semibold text-[var(--ds-text-primary)]">
                        {a.title}
                      </Text>
                      <Badge variant="neutral" className={priorityBadgeClass(a.priority)}>
                        {a.priority.charAt(0).toUpperCase() + a.priority.slice(1)} Priority
                      </Badge>
                    </Inline>
                    <Inline gap={2}>
                      {a.type.map((t) => (
                        <Badge key={t} variant="neutral" className="flex items-center gap-1">
                          {channelIcons[t]}
                          {t}
                        </Badge>
                      ))}
                    </Inline>
                    <Text variant="body" className="text-[var(--ds-text-secondary)]">
                      {a.description}
                    </Text>
                    <Inline gap={4} wrap className="text-sm text-[var(--ds-text-muted)]">
                      <span>Submitted by {a.submittedBy}</span>
                      <span>{a.submittedAt}</span>
                      <span>Estimated reach: {a.estimatedReach}</span>
                    </Inline>
                    <Inline gap={2} wrap>
                      <Button
                        variant="default"
                        size="sm"
                        className="rounded-lg !bg-[#2E7D32] hover:!bg-[#1B5E20] !text-white"
                      >
                        <CheckIcon size={16} />
                        Approve & Launch
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-lg">
                        <InfoIcon size={16} />
                        Review Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-lg text-[var(--ds-text-primary)] border-[var(--ds-border-default)] hover:bg-[var(--ds-bg-error)]"
                      >
                        <XIcon size={16} />
                        Reject
                      </Button>
                    </Inline>
                  </Stack>
                </InsendioCard>
              ))}
            </Stack>
          </Stack>
        </TabPanel>

        {/* ATC Management tab */}
        <TabPanel tabId="atc-management" className="pt-6">
          <Stack gap={6}>
            <Stack gap={2}>
              <Text variant="h3" className="text-[var(--ds-text-primary)]">
                Rate Limits
              </Text>
              <Text variant="body" className="text-[var(--ds-text-secondary)]">
                Control notification volume across all channels to prevent overwhelming users and manage sending capacity.
              </Text>
            </Stack>
            <Inline gap={4} wrap>
              {rateLimitChannels.map((r) => (
                <InsendioRateLimitCard
                  key={r.channel}
                  channel={r.channel}
                  icon={
                    rateLimitIconMap[r.icon] ?? (
                      <EnvelopeIcon size={20} className="text-[var(--ds-text-primary)]" />
                    )
                  }
                  current={r.current}
                  total={r.total}
                  percent={r.percent}
                  className="min-w-[200px] flex-1"
                />
              ))}
            </Inline>
            <Stack gap={4}>
              <Inline justify="space-between" align="center" wrap>
                <Text variant="h3" className="text-[var(--ds-text-primary)]">
                  Configured Rate Limits
                </Text>
                <InsendioPrimaryButton>
                  <PlusIcon size={18} />
                  Add Rate Limit
                </InsendioPrimaryButton>
              </Inline>
              <InsendioTable className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent [&:nth-child(even)]:bg-transparent">
                      <TableCell as="th" className="font-semibold text-left text-[var(--ds-text-secondary)]">Channel</TableCell>
                      <TableCell as="th" className="font-semibold text-left text-[var(--ds-text-secondary)]">Sub-Channel</TableCell>
                      <TableCell as="th" className="font-semibold text-left text-[var(--ds-text-secondary)]">Category</TableCell>
                      <TableCell as="th" className="font-semibold text-left text-[var(--ds-text-secondary)]">Per Hour</TableCell>
                      <TableCell as="th" className="font-semibold text-left text-[var(--ds-text-secondary)]">Per Day</TableCell>
                      <TableCell as="th" className="font-semibold text-left text-[var(--ds-text-secondary)]">Per Week</TableCell>
                      <TableCell as="th" className="w-10">{''}</TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {configuredRateLimits.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell>{r.channel}</TableCell>
                        <TableCell>{r.subChannel}</TableCell>
                        <TableCell>
                          <Badge variant="neutral" className={categoryBadgeClass(r.category)}>
                            {r.category}
                          </Badge>
                        </TableCell>
                        <TableCell>{r.perHour.toLocaleString()}</TableCell>
                        <TableCell>{r.perDay.toLocaleString()}</TableCell>
                        <TableCell>{r.perWeek.toLocaleString()}</TableCell>
                        <TableCell>
                          <button
                            type="button"
                            className="p-1.5 rounded-lg hover:bg-[var(--ds-bg-muted)] text-[var(--ds-text-secondary)]"
                            aria-label="More actions"
                          >
                            <EllipsisVerticalIcon size={20} />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </InsendioTable>
            </Stack>
            <Stack gap={2}>
              <Text variant="h3" className="text-[var(--ds-text-primary)]">
                Campaign Priorities
              </Text>
              <Text variant="body" className="text-[var(--ds-text-secondary)]">
                Manage which campaigns take precedence when multiple are triggered at the same time.
              </Text>
            </Stack>
          </Stack>
        </TabPanel>
      </PageLayout>
    </Tabs>
  );
}
