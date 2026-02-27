import {
  SearchIcon,
  FilterIcon,
  DownloadIcon,
  BookmarkIcon,
  EllipsisVerticalIcon,
} from '@design-system/icons';
import { Text } from '@design-system/typography';
import { campaigns, notificationTabs } from '../mock-data';
import { useInsendioComponents } from '../components-context';
import { PageLayout, InsendioTab, InsendioTabList, InsendioCard } from '../components/insendio';

const statusVariant = (s: string) =>
  s === 'active' ? 'active' : s === 'draft' ? 'draft' : s === 'scheduled' ? 'scheduled' : s === 'paused' ? 'paused' : 'neutral';

export function NotificationsPage() {
  const { Stack, Inline, Input, Button, Table, TableHeader, TableBody, TableRow, TableCell, Badge, Tabs, TabPanel } = useInsendioComponents();

  return (
    <PageLayout
      title="Manage campaigns and notifications"
      className="w-full max-w-full min-w-0"
      titleClassName="text-[var(--ds-text-primary)] font-semibold tracking-tight"
    >
      <Tabs defaultSelectedId="campaigns">
        <InsendioTabList className="bg-transparent">
          {notificationTabs.map((tab) => (
            <InsendioTab key={tab.id} id={tab.id} theme="sky">
              {tab.label}
            </InsendioTab>
          ))}
        </InsendioTabList>
        <TabPanel tabId="campaigns" className="pt-6">
          <Stack gap={4}>
            <Inline justify="space-between" align="center" wrap className="gap-4">
              <Input
                placeholder="Search campaigns by name, type, or content..."
                iconLeft={<SearchIcon size={20} />}
                className="max-w-md rounded-lg border-[var(--ds-border-default)] bg-white shadow-sm"
              />
              <Inline gap={2}>
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
            <InsendioCard className="overflow-hidden overflow-x-auto">
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
                        <Badge variant={statusVariant(c.status) as any}>{c.status.charAt(0).toUpperCase() + c.status.slice(1)}</Badge>
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
            </InsendioCard>
          </Stack>
        </TabPanel>
      </Tabs>
    </PageLayout>
  );
}
