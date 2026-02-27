import { Link } from 'react-router-dom';
import { Text } from '@design-system/typography';
import {
  StarIcon,
  MicrophoneIcon,
  SendIcon,
  PlusIcon,
  ChartBarIcon,
  UsersIcon,
  LightningIcon,
} from '@design-system/icons';
import { recentCampaigns, suggestedActions } from '../mock-data';
import { useInsendioComponents } from '../components-context';

const statusVariant = (s: string) =>
  s === 'active' ? 'active' : s === 'draft' ? 'draft' : s === 'scheduled' ? 'scheduled' : 'neutral';

export function HomePage() {
  const { Box, Stack, Inline, Button, Input, Table, TableHeader, TableBody, TableRow, TableCell, Badge, library } = useInsendioComponents();

  return (
    <Stack gap={6} className="w-full min-w-0 flex-1">
      <Stack gap={6} align="center" className="py-8 w-full max-w-5xl mx-auto">
        <Inline gap={2} align="center">
          <Box className="bg-gradient-to-r from-[#2196F3] to-[#9C27B0] p-2 rounded-lg">
            <StarIcon size={32} className="text-white" />
          </Box>
          <Text variant="h1" className="bg-gradient-to-r from-[#2196F3] to-[#9C27B0] bg-clip-text text-transparent">
            Insendio AI{library ? ` (${library})` : ''}
          </Text>
        </Inline>
        <Text variant="body" className="text-[var(--ds-text-secondary)]">
          I can help you get started with engagement features
        </Text>
        <Box className="relative w-full max-w-2xl">
          <Input
            placeholder="Tell me what you're looking to achieve..."
            className="w-full rounded-xl py-4 pr-20"
            iconRight={
              <span className="flex gap-2">
                <MicrophoneIcon size={20} />
                <SendIcon size={20} />
              </span>
            }
          />
        </Box>
        <Inline gap={2} wrap className="justify-center">
          {suggestedActions.map((action) => {
            const to = action.id === '1' ? '/notifications' : action.id === '4' ? '/data' : action.id === '3' ? '/segments' : '#';
            return (
              <Link key={action.id} to={to}>
                <Button variant="outline" className="rounded-full border-[var(--ds-border-default)]">
                  {action.icon === 'plus' && <PlusIcon size={18} />}
                  {action.icon === 'chart-bar' && <ChartBarIcon size={18} />}
                  {action.icon === 'users' && <UsersIcon size={18} />}
                  {action.icon === 'lightning' && <LightningIcon size={18} />}
                  {action.label}
                </Button>
              </Link>
            );
          })}
        </Inline>
      </Stack>

      <Stack gap={4} className="w-full min-w-0">
        <Inline justify="space-between" align="center">
          <Text variant="h3">Recent Campaigns</Text>
          <Link
            to="/notifications"
            className="text-sm font-medium text-[var(--ds-text-link)] hover:underline"
          >
            View All
          </Link>
        </Inline>
        <Box className="w-full min-w-0 rounded-xl border border-[var(--ds-border-default)] bg-white shadow-sm overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell as="th" className="font-medium text-left">Name</TableCell>
                <TableCell as="th" className="font-medium text-left">Status</TableCell>
                <TableCell as="th" className="font-medium text-left">Channel</TableCell>
                <TableCell as="th" className="font-medium text-left">Type</TableCell>
                <TableCell as="th" className="font-medium text-left">Last Modified</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentCampaigns.slice(0, 4).map((c) => (
                <TableRow key={c.id}>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(c.status) as any}>{c.status}</Badge>
                  </TableCell>
                  <TableCell>{c.channel}</TableCell>
                  <TableCell>{c.type}</TableCell>
                  <TableCell>{c.lastModified}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Stack>
    </Stack>
  );
}
