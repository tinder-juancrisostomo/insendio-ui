import { useState } from 'react';
import { SearchIcon, FilterIcon, UsersIcon, ClockIcon, PencilIcon, XIcon } from '@design-system/icons';
import { Text } from '@design-system/typography';
import { segments as initialSegments, segmentStats } from '../mock-data';
import { useInsendioComponents } from '../components-context';
import { PageLayout, InsendioCard, InsendioStatCard, InsendioTableToolbar, InsendioList, InsendioListItem } from '../components/insendio';

type Segment = { id: string; name: string; type: string; users: number; lastModified: string };

export function SegmentsPage() {
  const { Stack, Inline, Input, Button, Badge, Dialog, AlertDialog } = useInsendioComponents();
  const [segments, setSegments] = useState<Segment[]>(() =>
    initialSegments.map((s) => ({ id: s.id, name: s.name, type: s.type, users: s.users, lastModified: s.lastModified }))
  );
  const [editSegment, setEditSegment] = useState<Segment | null>(null);
  const [deleteSegment, setDeleteSegment] = useState<Segment | null>(null);
  const [editForm, setEditForm] = useState({ name: '', type: '', users: 0 });

  const handleEditClick = (seg: Segment) => {
    setEditSegment(seg);
    setEditForm({ name: seg.name, type: seg.type, users: seg.users });
  };

  const handleSaveEdit = () => {
    if (!editSegment) return;
    setSegments((prev) =>
      prev.map((s) =>
        s.id === editSegment.id
          ? { ...s, name: editForm.name, type: editForm.type, users: editForm.users, lastModified: 'Just now' }
          : s
      )
    );
    setEditSegment(null);
  };

  const handleDeleteConfirm = () => {
    if (!deleteSegment) return;
    setSegments((prev) => prev.filter((s) => s.id !== deleteSegment.id));
    setDeleteSegment(null);
  };

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
                <Inline gap={2}>
                  <Button variant="outline" size="sm" onClick={() => handleEditClick(seg)}>
                    <PencilIcon size={16} />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[var(--ds-text-primary)] hover:bg-[var(--ds-bg-error)] hover:border-[var(--ds-bg-error)]"
                    onClick={() => setDeleteSegment(seg)}
                  >
                    <XIcon size={16} />
                    Delete
                  </Button>
                </Inline>
              </InsendioCard>
            </InsendioListItem>
          ))}
        </InsendioList>
      </Stack>

      <Dialog open={!!editSegment} onClose={() => setEditSegment(null)} aria-labelledby="edit-segment-title">
        <Stack gap={4} className="p-6">
          <Text id="edit-segment-title" variant="h3" className="text-[var(--ds-text-primary)]">
            Edit Segment
          </Text>
          <Stack gap={3}>
            <Stack gap={1}>
              <Text variant="caption" className="text-[var(--ds-text-secondary)]">Name</Text>
              <Input
                value={editForm.name}
                onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Segment name"
                className="rounded-lg border border-[var(--ds-border-default)] bg-[var(--ds-bg-input)]"
              />
            </Stack>
            <Stack gap={1}>
              <Text variant="caption" className="text-[var(--ds-text-secondary)]">Type</Text>
              <Input
                value={editForm.type}
                onChange={(e) => setEditForm((f) => ({ ...f, type: e.target.value }))}
                placeholder="e.g. Behavioral, Subscription"
                className="rounded-lg border border-[var(--ds-border-default)] bg-[var(--ds-bg-input)]"
              />
            </Stack>
            <Stack gap={1}>
              <Text variant="caption" className="text-[var(--ds-text-secondary)]">Users</Text>
              <Input
                type="number"
                value={editForm.users || ''}
                onChange={(e) => setEditForm((f) => ({ ...f, users: Number.parseInt(e.target.value, 10) || 0 }))}
                placeholder="Number of users"
                className="rounded-lg border border-[var(--ds-border-default)] bg-[var(--ds-bg-input)]"
              />
            </Stack>
          </Stack>
          <Inline gap={2} justify="flex-end">
            <Button variant="outline" onClick={() => setEditSegment(null)}>Cancel</Button>
            <Button variant="default" onClick={handleSaveEdit}>Save</Button>
          </Inline>
        </Stack>
      </Dialog>

      <AlertDialog open={!!deleteSegment} onClose={() => setDeleteSegment(null)}>
        <Stack gap={4} className="p-6">
          <Text id="delete-segment-title" variant="h3" className="text-[var(--ds-text-primary)]">
            Delete Segment
          </Text>
          <Text id="delete-segment-desc" variant="body" className="text-[var(--ds-text-secondary)]">
            Are you sure you want to delete &quot;{deleteSegment?.name}&quot;? This action cannot be undone.
          </Text>
          <Inline gap={2} justify="flex-end">
            <Button variant="outline" onClick={() => setDeleteSegment(null)}>Cancel</Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
            >
              Delete
            </Button>
          </Inline>
        </Stack>
      </AlertDialog>
    </PageLayout>
  );
}
