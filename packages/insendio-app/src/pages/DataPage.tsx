import {
  SearchIcon,
  LightningIcon,
  LinkIcon,
  PersonIcon,
  EyeIcon,
  MapPinIcon,
  CodeIcon,
  ImageIcon,
  HashIcon,
  PencilIcon,
  PlusIcon,
} from '@design-system/icons';
import { Text } from '@design-system/typography';
import {
  eventTriggers,
  dataTabs,
  userAttributes,
  displayTriggers,
  anchorPoints,
  deeplinkStats,
  deeplinks,
  mediaStats,
  mediaItems,
  dynamicVarStats,
  dynamicVariables,
} from '../mock-data';
import { useInsendioComponents } from '../components-context';
import {
  PageLayout,
  InsendioTab,
  InsendioTabList,
  InsendioCard,
  InsendioPrimaryButton,
  InsendioTableToolbar,
  InsendioStatCard,
} from '../components/insendio';

const tabIcons: Record<string, React.ReactNode> = {
  'event-triggers': <LightningIcon size={18} />,
  'user-attributes': <PersonIcon size={18} />,
  'display-triggers': <EyeIcon size={18} />,
  'anchor-points': <MapPinIcon size={18} />,
  deeplinks: <CodeIcon size={18} />,
  media: <ImageIcon size={18} />,
  'dynamic-variables': <HashIcon size={18} />,
};

function DataToolbar({
  searchPlaceholder,
  filters,
  primaryLabel,
  primaryIcon,
}: Readonly<{
  searchPlaceholder: string;
  filters: React.ReactNode;
  primaryLabel: string;
  primaryIcon?: React.ReactNode;
}>) {
  const { Stack, Inline, Input } = useInsendioComponents();
  return (
    <InsendioTableToolbar>
      <Stack gap={3} className="w-full">
        <Input
          placeholder={searchPlaceholder}
          iconLeft={<SearchIcon size={20} />}
          className="w-full rounded-lg border border-[var(--ds-border-default)] bg-[var(--ds-bg-input)] focus:ring-0 focus:outline-none"
        />
        <Inline gap={2} wrap className="w-full">
          {filters}
          <InsendioPrimaryButton className="w-full sm:w-auto sm:ml-auto">
            {primaryIcon}
            {primaryLabel}
          </InsendioPrimaryButton>
        </Inline>
      </Stack>
    </InsendioTableToolbar>
  );
}

export function DataPage() {
  const { Box, Stack, Inline, Input, Button, Badge, Tabs, TabPanel } = useInsendioComponents();

  return (
    <Tabs defaultSelectedId="event-triggers">
      <PageLayout
        title="Data"
        titleClassName="text-[var(--ds-text-primary)] font-semibold tracking-tight"
        headerContent={
          <InsendioTabList className="bg-transparent">
            {dataTabs.map((tab) => (
              <InsendioTab key={tab.id} id={tab.id} theme="purple">
                {tabIcons[tab.id]}
                {tab.label}
              </InsendioTab>
            ))}
          </InsendioTabList>
        }
      >
        <TabPanel tabId="event-triggers" className="pt-6">
          <Stack gap={4}>
            <DataToolbar
              searchPlaceholder="Search event triggers..."
              filters={
                <>
                  <Button variant="outline" className="rounded-lg">All Status</Button>
                  <Button variant="outline" className="rounded-lg">All API Keys</Button>
                </>
              }
              primaryLabel="New Event Trigger"
              primaryIcon={<span className="mr-1">+</span>}
            />
            <Stack gap={3}>
              {eventTriggers.map((ev) => (
                <InsendioCard key={ev.id} variant="surface" className="rounded-lg p-5">
                  <Stack gap={2}>
                    <Inline gap={2} align="center" wrap>
                      <Box className="p-2 rounded bg-[var(--ds-bg-active-tab)]/20">
                        <LightningIcon size={24} className="text-[var(--ds-tab-active-purple)]" />
                      </Box>
                      <Text variant="h4" className="font-semibold text-[var(--ds-text-primary)]">{ev.name}</Text>
                      <Badge variant="neutral" className="bg-[var(--ds-bg-active-tab)]/20 text-[var(--ds-tab-active-purple)]">
                        <LinkIcon size={14} />
                        {ev.internalName}
                      </Badge>
                      <Badge variant={ev.status === 'active' ? 'active' : 'inactive'}>{ev.status}</Badge>
                    </Inline>
                    <Text variant="body-sm" className="text-[var(--ds-text-secondary)]">{ev.description}</Text>
                    <Inline gap={4} className="text-sm text-[var(--ds-text-secondary)]">
                      <span>{ev.triggers.toLocaleString()} triggers</span>
                      {ev.lastTriggered && <span>Last triggered: {ev.lastTriggered}</span>}
                      <span>API: {ev.api}</span>
                    </Inline>
                    <Box>
                      <Text variant="caption" className="block mb-1 text-[var(--ds-text-secondary)]">Parameters:</Text>
                      <Inline gap={2} wrap>
                        {ev.parameters.map((p) => (
                          <Badge key={p} variant="neutral" className="bg-[var(--ds-bg-warning)]/30 text-[var(--ds-text-primary)] border border-[var(--ds-border-default)]">
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

        <TabPanel tabId="user-attributes" className="pt-6">
          <Stack gap={4}>
            <DataToolbar
              searchPlaceholder="Search user attributes..."
              filters={
                <>
                  <Button variant="outline" className="rounded-lg">All Types</Button>
                  <Button variant="outline" className="rounded-lg">All Status</Button>
                  <Button variant="outline" className="rounded-lg">All API Keys</Button>
                </>
              }
              primaryLabel="New Attribute"
              primaryIcon={<PlusIcon size={18} className="mr-1" />}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userAttributes.map((attr) => (
                <InsendioCard key={attr.id} variant="surface" className="rounded-lg p-5">
                  <Stack gap={3}>
                    <Inline justify="space-between" align="center">
                      <Inline gap={2} align="center">
                        <Box className="p-2 rounded bg-[var(--ds-bg-active-tab)]/20">
                          <PersonIcon size={20} className="text-[var(--ds-tab-active-purple)]" />
                        </Box>
                        <Text variant="h4" className="font-semibold text-[var(--ds-text-primary)]">{attr.name}</Text>
                      </Inline>
                      <Badge variant={attr.status === 'active' ? 'active' : 'inactive'}>{attr.status}</Badge>
                    </Inline>
                    <Text variant="caption" className="font-mono text-[var(--ds-text-secondary)]">{attr.apiKey}</Text>
                    <Text variant="body-sm" className="text-[var(--ds-text-secondary)]">{attr.description}</Text>
                    <Inline gap={2} wrap className="text-sm">
                      <Badge variant="neutral" className="text-[#1565C0]">{attr.type}</Badge>
                      {attr.default ? <span className="text-[var(--ds-text-secondary)]">Default: {attr.default}</span> : null}
                    </Inline>
                    <Inline gap={4} className="text-sm text-[var(--ds-text-secondary)]">
                      <span>{attr.userCount.toLocaleString()} users</span>
                      <span>Updated {attr.lastUpdated}</span>
                      <span>{attr.api}</span>
                    </Inline>
                  </Stack>
                </InsendioCard>
              ))}
            </div>
          </Stack>
        </TabPanel>

        <TabPanel tabId="display-triggers" className="pt-6">
          <Stack gap={4}>
            <DataToolbar
              searchPlaceholder="Search display triggers..."
              filters={
                <>
                  <Button variant="outline" className="rounded-lg">All Types</Button>
                  <Button variant="outline" className="rounded-lg">All Status</Button>
                </>
              }
              primaryLabel="New Display Trigger"
              primaryIcon={<PlusIcon size={18} className="mr-1" />}
            />
            <Stack gap={3}>
              {displayTriggers.map((dt) => (
                <InsendioCard key={dt.id} variant="surface" className="rounded-lg p-5">
                  <Stack gap={2}>
                    <Inline justify="space-between" align="center" wrap>
                      <Text variant="h4" className="font-semibold text-[var(--ds-text-primary)]">{dt.name}</Text>
                      <Inline gap={2}>
                        <Badge variant="neutral" className="bg-[var(--ds-bg-active-tab)]/20 text-[var(--ds-tab-active-purple)]">{dt.type}</Badge>
                        <Badge variant={dt.status === 'active' ? 'active' : 'inactive'}>{dt.status}</Badge>
                      </Inline>
                    </Inline>
                    <Text variant="caption" className="font-mono text-[var(--ds-text-secondary)]">{dt.internalName}</Text>
                    <Text variant="body-sm" className="text-[var(--ds-text-secondary)]">{dt.description}</Text>
                    <Inline gap={4} className="text-sm text-[var(--ds-text-secondary)]">
                      <span>{dt.triggers.toLocaleString()} triggers</span>
                      <span>Last triggered: {dt.lastTriggered}</span>
                      <span>Page: {dt.page}</span>
                      {dt.selector && <Badge variant="neutral">{dt.selector}</Badge>}
                    </Inline>
                    <Inline gap={2} wrap>
                      {dt.channels.map((ch) => (
                        <Badge key={ch} variant="neutral" className="text-[#1565C0]">{ch}</Badge>
                      ))}
                    </Inline>
                  </Stack>
                </InsendioCard>
              ))}
            </Stack>
          </Stack>
        </TabPanel>

        <TabPanel tabId="anchor-points" className="pt-6">
          <Stack gap={4}>
            <DataToolbar
              searchPlaceholder="Search anchor points..."
              filters={
                <>
                  <Button variant="outline" className="rounded-lg">All Positions</Button>
                  <Button variant="outline" className="rounded-lg">All Status</Button>
                </>
              }
              primaryLabel="New Anchor Point"
              primaryIcon={<PlusIcon size={18} className="mr-1" />}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {anchorPoints.map((ap) => (
                <InsendioCard key={ap.id} variant="surface" className="rounded-lg p-5">
                  <Stack gap={3}>
                    <Inline justify="space-between" align="center">
                      <Text variant="h4" className="font-semibold text-[var(--ds-text-primary)]">{ap.name}</Text>
                      <Badge variant={ap.status === 'active' ? 'active' : 'inactive'}>{ap.status}</Badge>
                    </Inline>
                    <Inline gap={2} align="center">
                      <Text variant="caption" className="font-mono text-[var(--ds-text-secondary)]">{ap.internalId}</Text>
                      <Button variant="ghost" size="sm" className="h-6 px-1 text-[var(--ds-text-link)]">Copy</Button>
                    </Inline>
                    <Text variant="body-sm" className="text-[var(--ds-text-secondary)]">{ap.description}</Text>
                    <Inline gap={2} align="center">
                      <Text variant="caption" className="text-[var(--ds-text-secondary)]">Selector:</Text>
                      <Text variant="caption" className="font-mono">{ap.selector}</Text>
                      <Button variant="ghost" size="sm" className="h-6 px-1 text-[var(--ds-text-link)]">Copy</Button>
                    </Inline>
                    <Text variant="caption" className="text-[var(--ds-text-secondary)]">
                      {ap.position} Offset: {ap.offset}
                    </Text>
                    <Inline gap={4} className="text-sm text-[var(--ds-text-secondary)]">
                      <span>{ap.usage} uses {ap.page}</span>
                      {ap.lastUsed && <span>Last used: {ap.lastUsed}</span>}
                    </Inline>
                  </Stack>
                </InsendioCard>
              ))}
            </div>
          </Stack>
        </TabPanel>

        <TabPanel tabId="deeplinks" className="pt-6">
          <Stack gap={4}>
            <DataToolbar
              searchPlaceholder="Search deeplinks by name, URL, or description..."
              filters={
                <>
                  <Button variant="outline" className="rounded-lg">All Platforms</Button>
                  <Button variant="outline" className="rounded-lg">All Types</Button>
                </>
              }
              primaryLabel="Create Deeplink"
              primaryIcon={<PlusIcon size={18} className="mr-1" />}
            />
            <div className="w-full min-w-0 overflow-x-auto overflow-y-hidden [-webkit-overflow-scrolling:touch] -mx-4 px-4 sm:mx-0 sm:px-0">
              <Inline gap={4} wrap className="flex-nowrap sm:flex-wrap min-w-max sm:min-w-0">
                <InsendioStatCard label="Total Deeplinks" value={deeplinkStats.total} size="compact" className="shrink-0 min-w-[180px] sm:flex-1" />
                <InsendioStatCard label="Active" value={deeplinkStats.active} size="compact" valueClassName="text-[#2E7D32]" className="shrink-0 min-w-[180px] sm:flex-1" />
                <InsendioStatCard label="Total Clicks" value={deeplinkStats.totalClicks.toLocaleString()} size="compact" valueClassName="text-[#1565C0]" className="shrink-0 min-w-[180px] sm:flex-1" />
                <InsendioStatCard label="Platforms" value={deeplinkStats.platforms} size="compact" valueClassName="text-[#7B1FA2]" className="shrink-0 min-w-[180px] sm:flex-1" />
              </Inline>
            </div>
            <Stack gap={3}>
              {deeplinks.map((dl) => (
                <InsendioCard key={dl.id} variant="surface" className="rounded-lg p-5">
                  <Stack gap={3}>
                    <Inline justify="space-between" align="center" wrap>
                      <Inline gap={2} align="center">
                        <Box className="p-2 rounded bg-[var(--ds-bg-active-tab)]/20">
                          <LinkIcon size={20} className="text-[var(--ds-tab-active-purple)]" />
                        </Box>
                        <Text variant="h4" className="font-semibold text-[var(--ds-text-primary)]">{dl.name}</Text>
                        <Badge variant="neutral">{dl.type}</Badge>
                        <Badge variant={dl.status === 'active' ? 'active' : 'inactive'}>{dl.status}</Badge>
                      </Inline>
                      <Inline gap={2}>
                        <Button variant="outline" size="sm" className="rounded-lg">Test</Button>
                        <Button variant="outline" size="sm" className="rounded-lg"><PencilIcon size={14} /> Edit</Button>
                      </Inline>
                    </Inline>
                    <Text variant="body-sm" className="text-[var(--ds-text-secondary)]">{dl.description}</Text>
                    <Inline gap={2} align="center">
                      <Text variant="caption" className="font-mono text-[var(--ds-text-secondary)]">{dl.url}</Text>
                      <Button variant="ghost" size="sm" className="h-6 px-1 text-[var(--ds-text-link)]">Copy</Button>
                    </Inline>
                    <Inline gap={4} className="text-sm text-[var(--ds-text-secondary)]">
                      <span>Target: {dl.target}</span>
                      <span>{dl.clicks.toLocaleString()} clicks</span>
                      <span>{dl.params.length} parameters</span>
                      <span>Last used: {dl.lastUsed}</span>
                    </Inline>
                    <Inline gap={2} wrap>
                      {dl.params.map((p) => (
                        <Badge key={p} variant="neutral" className="font-mono text-xs">{p}</Badge>
                      ))}
                    </Inline>
                  </Stack>
                </InsendioCard>
              ))}
            </Stack>
          </Stack>
        </TabPanel>

        <TabPanel tabId="media" className="pt-6">
          <Stack gap={4}>
            <InsendioTableToolbar>
              <Inline justify="space-between" align="center" wrap className="gap-4 w-full">
                <Input
                  placeholder="Search by filename or campaign..."
                  iconLeft={<SearchIcon size={20} />}
                  className="flex-1 min-w-0 rounded-lg border border-[var(--ds-border-default)] bg-[var(--ds-bg-input)] focus:ring-0 focus:outline-none"
                />
                <Inline gap={2}>
                  <Button variant="default" size="sm" className="rounded-lg">All</Button>
                  <Button variant="outline" size="sm" className="rounded-lg">Images</Button>
                  <Button variant="outline" size="sm" className="rounded-lg">Icons</Button>
                  <Button variant="outline" size="sm" className="rounded-lg p-2">Grid</Button>
                  <Button variant="outline" size="sm" className="rounded-lg p-2">List</Button>
                  <InsendioPrimaryButton><PlusIcon size={18} className="mr-1" />Upload Media</InsendioPrimaryButton>
                </Inline>
              </Inline>
            </InsendioTableToolbar>
            <div className="w-full min-w-0 overflow-x-auto overflow-y-hidden [-webkit-overflow-scrolling:touch] -mx-4 px-4 sm:mx-0 sm:px-0">
              <Inline gap={4} wrap className="flex-nowrap sm:flex-wrap min-w-max sm:min-w-0">
                <InsendioStatCard label="Media items" value={mediaStats.totalItems} size="compact" className="shrink-0 min-w-[180px] sm:flex-1" />
                <InsendioStatCard label="Total Storage" value={mediaStats.totalStorage} size="compact" className="shrink-0 min-w-[180px] sm:flex-1" />
                <InsendioStatCard label="Active Campaigns" value={mediaStats.activeCampaigns} size="compact" valueClassName="text-[#7B1FA2]" className="shrink-0 min-w-[180px] sm:flex-1" />
              </Inline>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {mediaItems.map((m) => (
                <InsendioCard key={m.id} variant="surface" className="rounded-lg overflow-hidden">
                  <div className="aspect-video bg-[var(--ds-bg-muted)] flex items-center justify-center relative">
                    <ImageIcon size={48} className="text-[var(--ds-text-muted)]" />
                    {m.type === 'icon' && (
                      <Badge variant="neutral" className="absolute top-2 right-2 text-xs">icon</Badge>
                    )}
                  </div>
                  <Stack gap={1} className="p-3">
                    <Text variant="body-sm" className="font-mono truncate text-[var(--ds-text-primary)]">{m.filename}</Text>
                    <Text variant="caption" className="text-[var(--ds-text-secondary)]">{m.size} - {m.dimensions}</Text>
                    <Text variant="caption" className="text-[var(--ds-text-secondary)]">Used in {m.campaigns} campaigns</Text>
                  </Stack>
                </InsendioCard>
              ))}
            </div>
          </Stack>
        </TabPanel>

        <TabPanel tabId="dynamic-variables" className="pt-6">
          <Stack gap={4}>
            <DataToolbar
              searchPlaceholder="Search variables by name, syntax, or description..."
              filters={
                <>
                  <Button variant="outline" className="rounded-lg">All Categories</Button>
                  <Button variant="outline" className="rounded-lg">All Channels</Button>
                </>
              }
              primaryLabel="Create Variable"
              primaryIcon={<PlusIcon size={18} className="mr-1" />}
            />
            <div className="w-full min-w-0 overflow-x-auto overflow-y-hidden [-webkit-overflow-scrolling:touch] -mx-4 px-4 sm:mx-0 sm:px-0">
              <Inline gap={4} wrap className="flex-nowrap sm:flex-wrap min-w-max sm:min-w-0">
                <InsendioStatCard label="Total Variables" value={dynamicVarStats.total} size="compact" className="shrink-0 min-w-[180px] sm:flex-1" />
                <InsendioStatCard label="Active" value={dynamicVarStats.active} size="compact" valueClassName="text-[#2E7D32]" className="shrink-0 min-w-[180px] sm:flex-1" />
                <InsendioStatCard label="Total Usage" value={dynamicVarStats.totalUsage.toLocaleString()} size="compact" valueClassName="text-[#1565C0]" className="shrink-0 min-w-[180px] sm:flex-1" />
                <InsendioStatCard label="Categories" value={dynamicVarStats.categories} size="compact" valueClassName="text-[#7B1FA2]" className="shrink-0 min-w-[180px] sm:flex-1" />
              </Inline>
            </div>
            <Stack gap={3}>
              {dynamicVariables.map((dv) => (
                <InsendioCard key={dv.id} variant="surface" className="rounded-lg p-5">
                  <Stack gap={3}>
                    <Inline justify="space-between" align="center" wrap>
                      <Inline gap={2} align="center">
                        <Box className="p-2 rounded bg-[var(--ds-bg-active-tab)]/20">
                          <HashIcon size={20} className="text-[var(--ds-tab-active-purple)]" />
                        </Box>
                        <Text variant="h4" className="font-semibold text-[var(--ds-text-primary)]">{dv.name}</Text>
                        {dv.tags.map((t) => (
                          <Badge key={t} variant="neutral" className="text-xs">{t}</Badge>
                        ))}
                      </Inline>
                      <Button variant="outline" size="sm" className="rounded-lg"><PencilIcon size={14} /> Edit</Button>
                    </Inline>
                    <Text variant="body-sm" className="text-[var(--ds-text-secondary)]">{dv.description}</Text>
                    <Inline gap={2} align="center">
                      <Box className="flex-1 px-3 py-2 rounded bg-[var(--ds-bg-muted)] font-mono text-sm text-[var(--ds-text-primary)]">
                        {dv.syntax}
                      </Box>
                      <Button variant="outline" size="sm" className="rounded-lg">Copy</Button>
                    </Inline>
                    <Text variant="caption" className="text-[var(--ds-text-secondary)]">
                      Example: {dv.example}
                    </Text>
                    <Inline gap={2} wrap>
                      {dv.channels.map((ch) => (
                        <Badge key={ch} variant="neutral">{ch}</Badge>
                      ))}
                    </Inline>
                    <Inline gap={4} className="text-sm text-[var(--ds-text-secondary)]">
                      <span>{dv.usage.toLocaleString()} uses</span>
                      <span>Last used: {dv.lastUsed}</span>
                    </Inline>
                  </Stack>
                </InsendioCard>
              ))}
            </Stack>
          </Stack>
        </TabPanel>
      </PageLayout>
    </Tabs>
  );
}
