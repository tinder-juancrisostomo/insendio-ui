import { useState } from 'react';
import {
  SearchIcon,
  ChartLineIcon,
  FlaskIcon,
  PersonIcon,
  PeopleOverlapIcon,
  BellIcon,
  EnvelopeIcon,
  WindowIcon,
  CheckIcon,
  WrenchIcon,
  HashIcon,
  ChevronDownIcon,
  XIcon,
} from '@design-system/icons';
import { Text } from '@design-system/typography';
import {
  monitoringMetrics,
  campaignMetrics,
  monitoringTabs,
  experimentStats,
  experiments,
  audienceOverlapStats,
  audienceOverlapCampaigns,
  audienceOverlapMatrix,
} from '../mock-data';
import { useInsendioComponents } from '../components-context';
import {
  PageLayout,
  InsendioTab,
  InsendioTabList,
  InsendioCard,
  InsendioStatCard,
  InsendioAlert,
  InsendioTableToolbar,
  InsendioPrimaryButton,
} from '../components/insendio';

const channelIcons: Record<string, React.ReactNode> = {
  Push: <BellIcon size={14} />,
  Email: <EnvelopeIcon size={14} />,
  Modal: <WindowIcon size={14} />,
};

const tabIcons: Record<string, React.ReactNode> = {
  'campaign-metrics': <ChartLineIcon size={18} />,
  experiments: <FlaskIcon size={18} />,
  'user-lookup': <PersonIcon size={18} />,
  'audience-overlap': <PeopleOverlapIcon size={18} />,
};

const lookupMethods = ['Email', 'User ID', 'Phone'] as const;

const lookupPlaceholder = (method: string) => {
  if (method === 'Email') return 'Enter email...';
  if (method === 'User ID') return 'Enter user ID...';
  return 'Enter phone...';
};

const overlapCellColor = (percent: number) => {
  if (percent >= 40) return 'text-[#C62828]';
  if (percent >= 20) return 'text-[#E65100]';
  return 'text-[#2E7D32]';
};

export function MonitoringPage() {
  const [lookupMethod, setLookupMethod] = useState('Email');
  const {
    Stack,
    Inline,
    Input,
    Button,
    Badge,
    Tabs,
    TabPanel,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
  } = useInsendioComponents();

  return (
    <Tabs defaultSelectedId="campaign-metrics">
      <PageLayout
        title="Monitoring"
        titleClassName="text-[var(--ds-text-primary)] font-semibold tracking-tight"
        headerContent={
          <InsendioTabList>
            {monitoringTabs.map((tab) => (
              <InsendioTab key={tab.id} id={tab.id} theme="blue">
                {tabIcons[tab.id]}
                {tab.label}
              </InsendioTab>
            ))}
          </InsendioTabList>
        }
      >
        <TabPanel tabId="campaign-metrics" className="pt-6">
          <Stack gap={6}>
            <div className="w-full min-w-0 overflow-x-auto overflow-y-hidden [-webkit-overflow-scrolling:touch] -mx-4 px-4 sm:mx-0 sm:px-0">
              <Inline gap={4} wrap className="flex-nowrap sm:flex-wrap min-w-max sm:min-w-0">
                <InsendioStatCard
                  label="Total Sent"
                  value={monitoringMetrics.totalSent}
                  size="compact"
                  className="shrink-0 min-w-[180px] sm:flex-1 sm:shrink sm:min-w-0"
                />
                <InsendioStatCard
                  label="Delivered"
                  value={monitoringMetrics.delivered}
                  size="compact"
                  valueClassName="text-[#2E7D32]"
                  className="shrink-0 min-w-[180px] sm:flex-1 sm:shrink sm:min-w-0"
                />
                <InsendioStatCard
                  label="Avg Open Rate"
                  value={monitoringMetrics.avgOpenRate}
                  size="compact"
                  valueClassName="text-[#1565C0]"
                  className="shrink-0 min-w-[180px] sm:flex-1 sm:shrink sm:min-w-0"
                />
                <InsendioStatCard
                  label="Active Campaigns"
                  value={monitoringMetrics.activeCampaigns}
                  size="compact"
                  valueClassName="text-[#7B1FA2]"
                  className="shrink-0 min-w-[180px] sm:flex-1 sm:shrink sm:min-w-0"
                />
              </Inline>
            </div>
            <InsendioTableToolbar>
              <Stack gap={3} className="w-full">
                <Input
                  placeholder="Search campaigns..."
                  iconLeft={<SearchIcon size={20} />}
                  className="w-full rounded-lg border border-[var(--ds-border-default)] bg-[var(--ds-bg-input)] focus:ring-0 focus:outline-none"
                />
                <Inline gap={2} wrap>
                  <Button variant="outline" className="rounded-lg">All Channels</Button>
                  <Button variant="outline" className="rounded-lg">All Status</Button>
                  <Button variant="outline" className="rounded-lg">Last 7 Days</Button>
                </Inline>
              </Stack>
            </InsendioTableToolbar>
            <Stack gap={4}>
              {campaignMetrics.map((cm) => (
                <InsendioCard key={cm.id} variant="surface" className="rounded-lg p-6">
                  <Stack gap={4}>
                    <Inline justify="space-between" align="center">
                      <Text variant="h4" className="font-semibold">{cm.name}</Text>
                      <Inline gap={2}>
                        <Badge variant="active">Active</Badge>
                        {cm.channel.map((ch) => (
                          <Badge key={ch} variant="neutral" className="flex items-center gap-1">
                            {channelIcons[ch]}
                            {ch}
                          </Badge>
                        ))}
                      </Inline>
                    </Inline>
                    <Inline gap={6} wrap>
                      <Stack gap={0}>
                        <Text variant="caption">Sent</Text>
                        <Text variant="body">{cm.sent}</Text>
                      </Stack>
                      <Stack gap={0}>
                        <Text variant="caption">Delivered</Text>
                        <Text variant="body">{cm.delivered}</Text>
                      </Stack>
                      <Stack gap={0}>
                        <Text variant="caption">Delivery Rate</Text>
                        <Text variant="body" className="text-[#2E7D32]">{cm.deliveryRate}</Text>
                      </Stack>
                      <Stack gap={0}>
                        <Text variant="caption">Opened</Text>
                        <Text variant="body">{cm.opened}</Text>
                      </Stack>
                      <Stack gap={0}>
                        <Text variant="caption">Open Rate</Text>
                        <Text variant="body" className="text-[#1565C0]">{cm.openRate}</Text>
                      </Stack>
                      <Stack gap={0}>
                        <Text variant="caption">Click Rate</Text>
                        <Text variant="body" className="text-[#1565C0]">{cm.clickRate}</Text>
                      </Stack>
                    </Inline>
                    {cm.alert && (
                      <InsendioAlert variant={cm.alert.type === 'success' ? 'success' : 'info'}>
                        <Inline gap={2} align="center">
                          <HashIcon size={18} />
                          {cm.alert.type === 'success' && <CheckIcon size={18} className="text-[#2E7D32]" />}
                          {cm.alert.type === 'info' && <WrenchIcon size={18} className="text-[#1565C0]" />}
                          {cm.alert.message}
                        </Inline>
                      </InsendioAlert>
                    )}
                    <button className="flex items-center gap-1 text-sm font-medium text-[var(--ds-text-link)] hover:underline self-start">
                      View Details
                      <ChevronDownIcon size={16} />
                    </button>
                  </Stack>
                </InsendioCard>
              ))}
            </Stack>
          </Stack>
        </TabPanel>

        <TabPanel tabId="experiments" className="pt-6">
          <Stack gap={6}>
            <div className="w-full min-w-0 overflow-x-auto overflow-y-hidden [-webkit-overflow-scrolling:touch] -mx-4 px-4 sm:mx-0 sm:px-0">
              <Inline gap={4} wrap className="flex-nowrap sm:flex-wrap min-w-max sm:min-w-0">
                <InsendioStatCard
                  label="Total Experiments"
                  value={String(experimentStats.totalExperiments)}
                  size="compact"
                  className="shrink-0 min-w-[180px] sm:flex-1 sm:shrink sm:min-w-0"
                />
                <InsendioStatCard
                  label="Running Tests"
                  value={String(experimentStats.runningTests)}
                  size="compact"
                  valueClassName="text-[#2E7D32]"
                  className="shrink-0 min-w-[180px] sm:flex-1 sm:shrink sm:min-w-0"
                />
                <InsendioStatCard
                  label="Total Participants"
                  value={experimentStats.totalParticipants}
                  size="compact"
                  valueClassName="text-[#1565C0]"
                  className="shrink-0 min-w-[180px] sm:flex-1 sm:shrink sm:min-w-0"
                />
                <InsendioStatCard
                  label="Avg Conversion Rate"
                  value={experimentStats.avgConversionRate}
                  size="compact"
                  valueClassName="text-[#7B1FA2]"
                  className="shrink-0 min-w-[180px] sm:flex-1 sm:shrink sm:min-w-0"
                />
              </Inline>
            </div>
            <InsendioTableToolbar>
              <Stack gap={3} className="w-full">
                <Input
                  placeholder="Search experiments..."
                  iconLeft={<SearchIcon size={20} />}
                  className="w-full rounded-lg border border-[var(--ds-border-default)] bg-[var(--ds-bg-input)] focus:ring-0 focus:outline-none"
                />
                <Inline gap={2} wrap>
                  <Button variant="outline" className="rounded-lg">
                    All Types
                  </Button>
                  <Button variant="outline" className="rounded-lg">
                    All Status
                  </Button>
                </Inline>
              </Stack>
            </InsendioTableToolbar>
            <Stack gap={4}>
              {experiments.map((exp) => (
                <InsendioCard key={exp.id} variant="surface" className="rounded-lg p-6">
                  <Stack gap={4}>
                    <Inline justify="space-between" align="center">
                      <Text variant="h4" className="font-semibold text-[var(--ds-text-primary)]">
                        {exp.name}
                      </Text>
                      <Inline gap={2}>
                        <Badge variant="neutral" className="text-[var(--ds-text-primary)]">
                          {exp.status}
                        </Badge>
                        <Badge variant="neutral" className="text-[var(--ds-text-primary)]">
                          {exp.type}
                        </Badge>
                        <button className="flex items-center gap-1 text-sm font-medium text-[var(--ds-text-link)] hover:underline">
                          View Details
                          <ChevronDownIcon size={16} />
                        </button>
                      </Inline>
                    </Inline>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                      <Stack gap={0}>
                        <Text variant="caption" className="text-[var(--ds-text-secondary)]">
                          Start Date
                        </Text>
                        <Text variant="body" className="text-[var(--ds-text-primary)]">
                          {exp.startDate}
                        </Text>
                      </Stack>
                      <Stack gap={0}>
                        <Text variant="caption" className="text-[var(--ds-text-secondary)]">
                          End Date
                        </Text>
                        <Text variant="body" className="text-[var(--ds-text-primary)]">
                          {exp.endDate}
                        </Text>
                      </Stack>
                      <Stack gap={0}>
                        <Text variant="caption" className="text-[var(--ds-text-secondary)]">
                          Participants
                        </Text>
                        <Text variant="body" className="text-[var(--ds-text-primary)]">
                          {exp.participants.toLocaleString()}
                        </Text>
                      </Stack>
                      <Stack gap={0}>
                        <Text variant="caption" className="text-[var(--ds-text-secondary)]">
                          Control Group
                        </Text>
                        <Text variant="body" className="text-[var(--ds-text-primary)]">
                          {exp.controlGroup.toLocaleString()}
                        </Text>
                      </Stack>
                      <Stack gap={0}>
                        <Text variant="caption" className="text-[var(--ds-text-secondary)]">
                          Test Group
                        </Text>
                        <Text variant="body" className="text-[var(--ds-text-primary)]">
                          {exp.testGroup.toLocaleString()}
                        </Text>
                      </Stack>
                      <Stack gap={0}>
                        <Text variant="caption" className="text-[var(--ds-text-secondary)]">
                          Open Rate
                        </Text>
                        <Text variant="body" className="text-[#1565C0]">
                          {exp.openRate}
                        </Text>
                      </Stack>
                    </div>
                    <InsendioAlert variant={exp.outcome === 'success' ? 'success' : 'warning'}>
                      <Inline gap={2} align="center">
                        {exp.outcome === 'success' ? (
                          <CheckIcon size={18} className="text-[#2E7D32]" />
                        ) : (
                          <XIcon size={18} className="text-[#E65100]" />
                        )}
                        <ChartLineIcon size={18} className="text-[var(--ds-text-primary)]" />
                        {exp.outcomeMessage}
                      </Inline>
                    </InsendioAlert>
                  </Stack>
                </InsendioCard>
              ))}
            </Stack>
          </Stack>
        </TabPanel>

        <TabPanel tabId="user-lookup" className="pt-6">
          <Stack gap={6}>
            <Inline
              gap={0}
              className="w-full max-w-2xl rounded-lg border border-[var(--ds-border-default)] bg-[var(--ds-bg-input)] overflow-hidden"
            >
              <Menu>
                <MenuButton
                  className="flex items-center gap-2 px-4 py-3 border-r border-[var(--ds-border-default)] bg-[var(--ds-bg-muted)] hover:bg-[var(--ds-bg-muted)]/80 text-[var(--ds-text-primary)] rounded-none min-w-[120px]"
                >
                  <EnvelopeIcon size={18} />
                  {lookupMethod}
                  <ChevronDownIcon size={16} />
                </MenuButton>
                <MenuList>
                  {lookupMethods.map((m) => (
                    <MenuItem key={m} onSelect={() => setLookupMethod(m)}>
                      {m}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
              <Input
                placeholder={lookupPlaceholder(lookupMethod)}
                iconLeft={<SearchIcon size={20} />}
                className="flex-1 border-0 rounded-none bg-transparent focus:ring-0 focus:outline-none"
              />
              <InsendioPrimaryButton className="rounded-none shrink-0">
                <SearchIcon size={18} />
                Lookup
              </InsendioPrimaryButton>
            </Inline>
          </Stack>
        </TabPanel>

        <TabPanel tabId="audience-overlap" className="pt-6">
          <Stack gap={6}>
            <div className="w-full min-w-0 overflow-x-auto overflow-y-hidden [-webkit-overflow-scrolling:touch] -mx-4 px-4 sm:mx-0 sm:px-0">
              <Inline gap={4} wrap className="flex-nowrap sm:flex-wrap min-w-max sm:min-w-0">
                <InsendioStatCard
                  label="Live Campaigns"
                  value={String(audienceOverlapStats.liveCampaigns)}
                  size="compact"
                  valueClassName="text-[#1565C0]"
                  className="shrink-0 min-w-[180px] sm:flex-1 sm:shrink sm:min-w-0"
                />
                <InsendioStatCard
                  label="Total Unique Users"
                  value={audienceOverlapStats.totalUniqueUsers}
                  size="compact"
                  valueClassName="text-[#2E7D32]"
                  className="shrink-0 min-w-[180px] sm:flex-1 sm:shrink sm:min-w-0"
                />
                <InsendioStatCard
                  label="Avg Messages/User/Week"
                  value={audienceOverlapStats.avgMessagesPerUserPerWeek}
                  size="compact"
                  valueClassName="text-[#F9A825]"
                  className="shrink-0 min-w-[180px] sm:flex-1 sm:shrink sm:min-w-0"
                />
                <InsendioStatCard
                  label="High Overlap Pairs"
                  value={String(audienceOverlapStats.highOverlapPairs)}
                  size="compact"
                  valueClassName="text-[#7B1FA2]"
                  className="shrink-0 min-w-[180px] sm:flex-1 sm:shrink sm:min-w-0"
                />
              </Inline>
            </div>
            <InsendioTableToolbar>
              <Stack gap={3} className="w-full">
                <Input
                  placeholder="Search campaigns..."
                  iconLeft={<SearchIcon size={20} />}
                  className="w-full rounded-lg border border-[var(--ds-border-default)] bg-[var(--ds-bg-input)] focus:ring-0 focus:outline-none"
                />
                <Text variant="caption" className="text-[var(--ds-text-secondary)]">
                  Filters (4 of 6 selected)
                </Text>
                <Inline gap={2} wrap>
                  <Button variant="outline" className="rounded-lg">
                    All Channels
                  </Button>
                  <Button variant="outline" className="rounded-lg">
                    All Times
                  </Button>
                  <Button variant="outline" className="rounded-lg">
                    All Days
                  </Button>
                  <Button variant="outline" className="rounded-lg">
                    All Genders
                  </Button>
                  <Button variant="outline" className="rounded-lg">
                    All Ages
                  </Button>
                  <Button variant="outline" className="rounded-lg">
                    All Types
                  </Button>
                </Inline>
                <Inline gap={2}>
                  <Button variant="default" className="rounded-lg">
                    Overlap Matrix
                  </Button>
                  <Button variant="outline" className="rounded-lg">
                    Timeline View
                  </Button>
                </Inline>
              </Stack>
            </InsendioTableToolbar>
            <Stack gap={4}>
              <Text variant="body" className="text-[var(--ds-text-secondary)]">
                Each cell shows the audience overlap percentage between two campaigns.
              </Text>
              <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[600px] border-collapse">
                  <thead>
                    <tr>
                      <th className="p-2 text-left text-sm font-medium text-[var(--ds-text-secondary)] w-48" />
                      {audienceOverlapCampaigns.map((c) => (
                        <th
                          key={c.id}
                          className="p-2 text-center text-xs font-medium text-[var(--ds-text-secondary)] w-24"
                        >
                          {c.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {audienceOverlapCampaigns.map((campaign, rowIdx) => (
                      <tr key={campaign.id}>
                        <td className="p-2 border border-[var(--ds-border-default)] bg-[var(--ds-bg-muted)]">
                          <Stack gap={0}>
                            <Text variant="body" className="font-medium text-[var(--ds-text-primary)]">
                              {campaign.name}
                            </Text>
                            <Text variant="caption" className="text-[var(--ds-text-secondary)]">
                              {campaign.description}
                            </Text>
                          </Stack>
                        </td>
                        {audienceOverlapMatrix[rowIdx].map((cell, colIdx) => (
                          <td
                            key={audienceOverlapCampaigns[colIdx].id}
                            className="p-2 border border-[var(--ds-border-default)] text-center"
                          >
                            {cell === null ? (
                              <span className="text-[var(--ds-text-muted)]">-</span>
                            ) : (
                              <Stack gap={0} className="items-center">
                                <Text
                                  variant="body"
                                  className={`font-medium ${overlapCellColor(cell.percent)}`}
                                >
                                  {cell.percent}%
                                </Text>
                                <Text variant="caption" className="text-[var(--ds-text-secondary)]">
                                  {cell.count.toLocaleString()}
                                </Text>
                              </Stack>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Stack>
          </Stack>
        </TabPanel>
      </PageLayout>
    </Tabs>
  );
}
