import { Link } from "react-router-dom";
import { Text } from "@design-system/typography";
import {
  StarIcon,
  MicrophoneIcon,
  SendIcon,
  PlusIcon,
  ChartBarIcon,
  UsersIcon,
  LightningIcon,
} from "@design-system/icons";
import { recentCampaigns, suggestedActions } from "../mock-data";
import { useInsendioComponents } from "../components-context";
import { InsendioTable } from "../components/insendio";

const statusVariant = (s: string) =>
  s === "active"
    ? "active"
    : s === "draft"
      ? "draft"
      : s === "scheduled"
        ? "scheduled"
        : "neutral";

const actionIcon = (icon: string) => {
  if (icon === "plus") return <PlusIcon size={18} aria-hidden />;
  if (icon === "chart-bar") return <ChartBarIcon size={18} aria-hidden />;
  if (icon === "users") return <UsersIcon size={18} aria-hidden />;
  if (icon === "lightning") return <LightningIcon size={18} aria-hidden />;
  return null;
};

export function HomePage() {
  const {
    Box,
    Stack,
    Inline,
    Input,
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
    Badge,
    library,
  } = useInsendioComponents();

  return (
    <>
      <Stack
        gap={0}
        className="w-full min-w-0 flex-1 bg-gradient-to-r from-indigo-50/60 via-pink-50 to-indigo-50/60 dark:from-indigo-950/60 dark:via-pink-950/50 dark:to-indigo-950/60 p-4 sm:p-6"
      >
        <section aria-labelledby="hero-heading" className="w-full">
          <Stack gap={4} align="center" className="w-full max-w-[1280px] mx-auto py-6 sm:py-8 sm:gap-6">
            <Stack gap={6} align="center" className="w-full max-w-5xl mx-auto">
              <Inline gap={2} align="center">
                <Box
                  className="bg-gradient-to-r from-[#2196F3] to-[#9C27B0] p-2 rounded-lg"
                  role="img"
                  aria-label="Insendio AI logo"
                >
                  <StarIcon size={32} className="text-white" aria-hidden />
                </Box>
                <Text
                  id="hero-heading"
                  variant="h1"
                  className="bg-gradient-to-r from-[#2196F3] to-[#9C27B0] bg-clip-text text-transparent"
                >
                  Insendio AI{library ? ` (${library})` : ""}
                </Text>
              </Inline>
              <Text variant="body" className="text-[var(--ds-text-secondary)]">
                I can help you get started with engagement features
              </Text>
              <Box
                className="relative w-full max-w-[856px] h-[52px] rounded-xl border border-[var(--ds-border-default)] bg-[var(--ds-bg-input)] shadow-sm focus-within:border-[var(--ds-border-focus)] focus-within:ring-2 focus-within:ring-[var(--ds-border-focus)] focus-within:ring-offset-0 overflow-hidden"
                role="search"
                aria-label="Search for engagement features"
              >
                <Input
                  placeholder="Tell me what you're looking to achieve..."
                  aria-label="Tell me what you're looking to achieve"
                  className="w-full h-[52px] max-h-[52px] rounded-xl py-3 pr-24 bg-transparent border-0 shadow-none focus:ring-0 focus:outline-none"
                  iconRight={
                    <span className="flex items-center gap-2 text-[var(--ds-text-secondary)]" aria-hidden>
                      <MicrophoneIcon size={20} />
                      <SendIcon size={20} />
                    </span>
                  }
                />
              </Box>
              <nav aria-label="Quick actions">
                <ul className="flex flex-wrap justify-center gap-2 list-none m-0 p-0">
                  {suggestedActions.map((action) => {
                    const to =
                      action.id === "1"
                        ? "/notifications"
                        : action.id === "4"
                          ? "/data"
                          : action.id === "3"
                            ? "/segments"
                            : "#";
                    return (
                      <li key={action.id}>
                        <Link
                          to={to}
                          className="inline-flex items-center gap-2 rounded-full bg-[var(--ds-bg-surface)] border border-[var(--ds-border-default)] hover:bg-[var(--ds-bg-muted)] px-4 py-2 text-sm font-medium text-[var(--ds-text-primary)] no-underline"
                        >
                          {actionIcon(action.icon)}
                          {action.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </Stack>
          </Stack>
        </section>
      </Stack>

      <section aria-labelledby="recent-campaigns-heading" className="w-full min-w-0 flex-1 bg-[var(--ds-bg-surface)]">
        <Stack gap={4} className="w-full max-w-[1280px] mx-auto min-w-0 py-4 px-4 sm:py-6 sm:px-6">
          <Inline justify="space-between" align="center">
            <Text id="recent-campaigns-heading" variant="h3">
              Recent Campaigns
            </Text>
            <Link
              to="/notifications"
              className="text-sm font-medium text-[var(--ds-text-link)] hover:underline"
            >
              View All
            </Link>
          </Inline>
          <InsendioTable className="w-full min-w-0">
            <Table aria-labelledby="recent-campaigns-heading">
              <TableHeader>
                <TableRow>
                  <TableCell as="th" className="font-medium text-left">
                    Name
                  </TableCell>
                  <TableCell as="th" className="font-medium text-left">
                    Status
                  </TableCell>
                  <TableCell as="th" className="font-medium text-left">
                    Channel
                  </TableCell>
                  <TableCell as="th" className="font-medium text-left">
                    Type
                  </TableCell>
                  <TableCell as="th" className="font-medium text-left">
                    Last Modified
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentCampaigns.slice(0, 4).map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>{c.name}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant(c.status) as any}>
                        {c.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{c.channel}</TableCell>
                    <TableCell>{c.type}</TableCell>
                    <TableCell>{c.lastModified}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </InsendioTable>
        </Stack>
      </section>
    </>
  );
}
