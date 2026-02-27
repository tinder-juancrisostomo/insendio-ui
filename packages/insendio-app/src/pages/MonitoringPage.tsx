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
} from '@design-system/icons';
import { Text } from '@design-system/typography';
import { monitoringMetrics, campaignMetrics, monitoringTabs } from '../mock-data';
import { useInsendioComponents } from '../components-context';
import { cn } from '@design-system/utils';
import { PageLayout, InsendioTab, InsendioTabList, InsendioCard, InsendioStatCard, InsendioAlert } from '../components/insendio';

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

export function MonitoringPage() {
  const { Box, Stack, Inline, Input, Button, Badge, Tabs, TabPanel } = useInsendioComponents();

  return (
    <PageLayout title="Campaign performance and metrics">
      <Tabs defaultSelectedId="campaign-metrics">
        <InsendioTabList>
          {monitoringTabs.map((tab) => (
            <InsendioTab key={tab.id} id={tab.id} theme="blue">
              {tabIcons[tab.id]}
              {tab.label}
            </InsendioTab>
          ))}
        </InsendioTabList>
        <TabPanel tabId="campaign-metrics" className="pt-6">
          <Stack gap={6}>
            <Inline gap={4} wrap>
              <InsendioStatCard
                label="Total Sent"
                value={monitoringMetrics.totalSent}
                size="compact"
              />
              <InsendioStatCard
                label="Delivered"
                value={monitoringMetrics.delivered}
                size="compact"
                valueClassName="text-[#2E7D32]"
              />
              <InsendioStatCard
                label="Avg Open Rate"
                value={monitoringMetrics.avgOpenRate}
                size="compact"
                valueClassName="text-[#1565C0]"
              />
              <InsendioStatCard
                label="Active Campaigns"
                value={monitoringMetrics.activeCampaigns}
                size="compact"
                valueClassName="text-[#7B1FA2]"
              />
            </Inline>
            <Inline justify="space-between" align="center" wrap>
              <Input
                placeholder="Search campaigns..."
                iconLeft={<SearchIcon size={20} />}
                className="max-w-md"
              />
              <Inline gap={2}>
                <Button variant="outline">All Channels</Button>
                <Button variant="outline">All Status</Button>
                <Button variant="outline">Last 7 Days</Button>
              </Inline>
            </Inline>
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
      </Tabs>
    </PageLayout>
  );
}
