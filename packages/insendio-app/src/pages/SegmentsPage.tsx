import { SearchIcon, FilterIcon, UsersIcon, ClockIcon, PencilIcon } from '@design-system/icons';
import { Text } from '@design-system/typography';
import { segments, segmentStats } from '../mock-data';
import { useInsendioComponents } from '../components-context';
import { PageLayout, InsendioCard, InsendioStatCard } from '../components/insendio';

export function SegmentsPage() {
  const { Stack, Inline, Input, Button, Badge } = useInsendioComponents();

  return (
    <PageLayout title="User segments and audiences">
      <Inline justify="space-between" align="center" wrap>
        <Input
          placeholder="Search segments..."
          iconLeft={<SearchIcon size={20} />}
          className="max-w-md rounded-lg bg-white shadow-sm"
        />
        <Button variant="outline" className="rounded-lg">
          <FilterIcon size={18} />
          Filters
        </Button>
      </Inline>
      <Inline gap={4} wrap>
        <InsendioStatCard
          label="Total Segments"
          value={segmentStats.totalSegments}
          icon={<UsersIcon size={24} className="text-sky-600" />}
          iconBg="bg-sky-100"
        />
        <InsendioStatCard
          label="Total Users"
          value={segmentStats.totalUsers}
          icon={<UsersIcon size={24} className="text-emerald-600" />}
          iconBg="bg-emerald-100"
        />
        <InsendioStatCard
          label="Updated Today"
          value={segmentStats.updatedToday}
          icon={<ClockIcon size={24} className="text-violet-600" />}
          iconBg="bg-violet-100"
        />
      </Inline>
      <Stack gap={2}>
        {segments.map((seg) => (
          <InsendioCard
            key={seg.id}
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
        ))}
      </Stack>
    </PageLayout>
  );
}
