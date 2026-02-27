import {
  SearchIcon,
  LightningIcon,
  LinkIcon,
  PersonIcon,
  EyeIcon,
  MapPinIcon,
  CodeIcon,
  ImageIcon,
} from '@design-system/icons';
import { Text } from '@design-system/typography';
import { eventTriggers, dataTabs } from '../mock-data';
import { useInsendioComponents } from '../components-context';
import { PageLayout, InsendioTab, InsendioTabList, InsendioCard, InsendioPrimaryButton } from '../components/insendio';

const tabIcons: Record<string, React.ReactNode> = {
  lightning: <LightningIcon size={18} />,
  person: <PersonIcon size={18} />,
  eye: <EyeIcon size={18} />,
  'map-pin': <MapPinIcon size={18} />,
  code: <CodeIcon size={18} />,
  image: <ImageIcon size={18} />,
  hash: <span className="text-sm">(x)</span>,
};

export function DataPage() {
  const { Box, Stack, Inline, Input, Button, Badge, Tabs, TabPanel } = useInsendioComponents();

  return (
    <PageLayout title="Event triggers and data configuration">
      <Tabs defaultSelectedId="event-triggers">
        <InsendioTabList className="overflow-x-auto">
          {dataTabs.map((tab) => (
            <InsendioTab key={tab.id} id={tab.id} className="whitespace-nowrap">
              {tabIcons[tab.icon]}
              {tab.label}
            </InsendioTab>
          ))}
        </InsendioTabList>
        <TabPanel tabId="event-triggers" className="pt-6">
          <Stack gap={4}>
            <Inline justify="space-between" align="center" wrap>
              <Input
                placeholder="Search event triggers..."
                iconLeft={<SearchIcon size={20} />}
                className="max-w-md"
              />
              <Inline gap={2}>
                <Button variant="outline">All Status</Button>
                <Button variant="outline">All API Keys</Button>
                <InsendioPrimaryButton>
                  <span className="mr-1">+</span>
                  New Event Trigger
                </InsendioPrimaryButton>
              </Inline>
            </Inline>
            <Stack gap={3}>
              {eventTriggers.map((ev) => (
                <InsendioCard key={ev.id} variant="surface" className="rounded-lg p-5">
                  <Stack gap={2}>
                    <Inline gap={2} align="center" wrap>
                      <Box className="p-2 rounded bg-[#F3E5F5]">
                        <LightningIcon size={24} className="text-[#7B1FA2]" />
                      </Box>
                      <Text variant="h4" className="font-semibold">{ev.name}</Text>
                      <Inline gap={2} align="center" className="text-sm">
                        <Badge variant="neutral" className="bg-[#F3E5F5] text-[#7B1FA2]">
                          <LinkIcon size={14} />
                          {ev.internalName}
                        </Badge>
                      </Inline>
                      <Badge variant={ev.status === 'active' ? 'active' : 'inactive'}>
                        {ev.status}
                      </Badge>
                    </Inline>
                    <Text variant="body-sm">{ev.description}</Text>
                    <Inline gap={4} className="text-sm text-[var(--ds-text-secondary)]">
                      <span>{ev.triggers.toLocaleString()} triggers</span>
                      {ev.lastTriggered && (
                        <span>Last triggered: {ev.lastTriggered}</span>
                      )}
                      <span>API: {ev.api}</span>
                    </Inline>
                    <Box>
                      <Text variant="caption" className="block mb-1">Parameters:</Text>
                      <Inline gap={2} wrap>
                        {ev.parameters.map((p) => (
                          <Badge
                            key={p}
                            variant="neutral"
                            className="bg-[#FFF8E1] text-[#D48806] border border-[#FFE082]"
                          >
                            {p}
                          </Badge>
                        ))}
                      </Inline>
                    </Box>
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
