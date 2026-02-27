import { SearchIcon, FilterIcon, UsersIcon, ClockIcon, PencilIcon } from '@design-system/icons';
import { Text } from '@design-system/typography';
import { segments, segmentStats } from '../mock-data';
import { useInsendioComponents } from '../components-context';
import { PageLayout, InsendioCard, InsendioStatCard, InsendioTableToolbar, InsendioList, InsendioListItem } from '../components/insendio';

export function SegmentsPage() {
  const { Stack, Inline, Input, Button, Badge } = useInsendioComponents();

  return (
    <PageLayout title="User segments and audiences">
      <Stack gap={6}>
        <InsendioTableToolbar>
          <Inline justify="space-between" align="center" wrap className="gap-4 w-full">
            <Input
              placeholder="Search segments..."
              iconLeft={<SearchIcon size={20} />}
              className="flex-1 min-w-0 sm:min-w-[200px] max-w-full rounded-lg border border-[var(--ds-border-default)] bg-[var(--ds-bg-input)] focus:ring-0 focus:outline-none"
            />
            <Button variant="outline" className="rounded-lg shrink-0">
              <FilterIcon size={18} />
              Filters
            </Button>
          </Inline>
        </InsendioTableToolbar>
        <div className="w-full min-w-0 overflow-x-auto overflow-y-hidden [-webkit-overflow-scrolling:touch] -mx-4 px-4 sm:mx-0 sm:px-0">
          <Inline gap={4} wrap className="flex-nowrap sm:flex-wrap min-w-max sm:min-w-0">
            <InsendioStatCard
              label="Total Segments"
              value={segmentStats.totalSegments}
              icon={<UsersIcon size={24} className="text-sky-600" />}
              iconBg="bg-sky-100"
              className="shrink-0 min-w-[180px] sm:flex-1 sm:shrink sm:min-w-0"
            />
            <InsendioStatCard
              label="Total Users"
              value={segmentStats.totalUsers}
              icon={<UsersIcon size={24} className="text-emerald-600" />}
              iconBg="bg-emerald-100"
              className="shrink-0 min-w-[180px] sm:flex-1 sm:shrink sm:min-w-0"
            />
            <InsendioStatCard
              label="Updated Today"
              value={segmentStats.updatedToday}
              icon={<ClockIcon size={24} className="text-violet-600" />}
              iconBg="bg-violet-100"
              className="shrink-0 min-w-[180px] sm:flex-1 sm:shrink sm:min-w-0"
            />
          </Inline>
        </div>
        <InsendioList gap={2}>
          {segments.map((seg) => (
            <InsendioListItem key={seg.id}>
              <InsendioCard
                className="p-4 flex items-center justify-between hover:shadow-md transition-shadow"
              >
                <Stack gap={1}>
                  <Text variant="h4" className="font-semibold">{seg.name}</Text>
                  <Inline gap={2} align="center">
                    <Badge variant="neutral">{seg.type}</Badge>
                    <span className="flex items-center gap-1 text-sm text-[var(--ds-text-secondary)]">
                      <UsersIcon size={16} />
                      {seg.users.toLocaleString()} users
                    </span>
                    <span className="text-sm text-[var(--ds-text-muted)]">
                      Last modified {seg.lastModified}
                    </span>
                  </Inline>
                </Stack>
                <Button variant="outline" size="sm">
                  <PencilIcon size={16} />
                  Edit
                </Button>
              </InsendioCard>
            </InsendioListItem>
          ))}
        </InsendioList>
      </Stack>
    </PageLayout>
  );
}
