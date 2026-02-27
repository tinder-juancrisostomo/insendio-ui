import { UsersIcon, ShieldIcon, CheckIcon, XIcon, SearchIcon, PencilIcon } from '@design-system/icons';
import { Text } from '@design-system/typography';
import { roles, permissions, rolePermissions, teamMembers, roleUserCounts } from '../mock-data';
import { useInsendioComponents } from '../components-context';
import { cn } from '@design-system/utils';
import { PageLayout, InsendioTab, InsendioTabList, InsendioCard, InsendioTable, InsendioInfoAlert, InsendioPrimaryButton } from '../components/insendio';

const roleColorClasses: Record<string, string> = {
  purple: 'bg-[#7B1FA2] text-white',
  blue: 'bg-[#1565C0] text-white',
  green: 'bg-[#2E7D32] text-white',
  gray: 'bg-[var(--ds-text-muted)] text-white',
};

const displayedPermissions = ['CREATE CAMPAIGNS', 'SAVE SEGMENTS', 'APPROVE QA', 'EDIT DATA SOURCES', 'MANAGE USERS'] as const;

export function RolesPage() {
  const { Box, Stack, Inline, Input, Button, Badge, Tabs, TabPanel, Table, TableHeader, TableBody, TableRow, TableCell } = useInsendioComponents();

  return (
    <Tabs defaultSelectedId="team-members">
      <PageLayout
        title="Permissions & Roles"
        titleClassName="text-[var(--ds-text-primary)] font-semibold tracking-tight"
        headerContent={
          <InsendioTabList className="bg-transparent">
            <InsendioTab id="team-members" theme="purple">
              <UsersIcon size={18} />
              Team Members
            </InsendioTab>
            <InsendioTab id="manage-roles" theme="purple">
              <ShieldIcon size={18} />
              Manage Roles
            </InsendioTab>
          </InsendioTabList>
        }
      >
        <TabPanel tabId="team-members" className="pt-6">
          <Stack gap={6}>
            <Stack gap={4}>
              <Text variant="h3" className="text-[var(--ds-text-primary)]">Role Definitions</Text>
              <Inline gap={4} wrap>
                {roles.map((role) => (
                  <InsendioCard key={role.id} variant="surface" className="rounded-lg p-4 flex-1 min-w-[200px]">
                    <Stack gap={1}>
                      <Badge className={cn('text-white border-0', roleColorClasses[role.color])}>
                        {role.name}
                      </Badge>
                      <Text variant="body" className="font-medium text-[var(--ds-text-primary)]">
                        {roleUserCounts[role.id] ?? 0} users
                      </Text>
                      <Text variant="caption" className="text-[var(--ds-text-secondary)]">
                        {role.description}
                      </Text>
                    </Stack>
                  </InsendioCard>
                ))}
              </Inline>
            </Stack>
            <Stack gap={4}>
              <Inline justify="space-between" align="center" wrap className="gap-4">
                <Inline gap={2} wrap className="flex-1 min-w-0">
                  <Input
                    placeholder="Search by name or email..."
                    iconLeft={<SearchIcon size={20} />}
                    className="flex-1 min-w-[200px] rounded-lg border border-[var(--ds-border-default)] bg-[var(--ds-bg-input)] focus:ring-0 focus:outline-none"
                  />
                  <Button variant="outline" className="rounded-lg shrink-0">All Roles</Button>
                </Inline>
                <InsendioPrimaryButton className="shrink-0">
                  + Add User
                </InsendioPrimaryButton>
              </Inline>
              <Stack gap={3}>
                {teamMembers.map((member) => {
                  const role = roles.find((r) => r.id === member.roleId);
                  const perms = role ? rolePermissions[role.id] : {};
                  const initial = member.name.split(' ').map((n) => n[0]).join('').slice(0, 1);
                  const isAdmin = member.roleId === 'admin';
                  return (
                    <InsendioCard key={member.id} variant="surface" className="rounded-lg p-5">
                      <Inline justify="space-between" align="center" wrap className="gap-4">
                        <Inline gap={4} align="center" wrap className="flex-1 min-w-0">
                          <Box
                            className={cn(
                              'w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold shrink-0',
                              role ? roleColorClasses[role.color] : 'bg-[var(--ds-bg-muted)]'
                            )}
                          >
                            {initial}
                          </Box>
                          <Stack gap={1} className="min-w-0">
                            <Inline gap={2} align="center">
                              <Text variant="body" className="font-semibold text-[var(--ds-text-primary)]">
                                {member.name}
                              </Text>
                              {role && (
                                <Badge className={cn('text-white border-0 text-xs', roleColorClasses[role.color])}>
                                  {role.name}
                                </Badge>
                              )}
                            </Inline>
                            <Text variant="caption" className="text-[var(--ds-text-secondary)]">
                              {member.email}
                            </Text>
                            <Text variant="caption" className="text-[var(--ds-text-muted)]">
                              Last active: {member.lastActive}
                            </Text>
                          </Stack>
                          <Inline gap={2} wrap className="flex-1 min-w-[200px]">
                            {displayedPermissions.map((perm) => {
                              const granted = perms[perm];
                              return (
                                <Inline key={perm} gap={1} align="center" className="text-sm">
                                  <Box
                                    className={cn(
                                      'w-5 h-5 rounded flex items-center justify-center shrink-0',
                                      granted ? 'bg-[var(--ds-check-bg)]' : 'bg-[var(--ds-bg-muted)]'
                                    )}
                                  >
                                    {granted && <CheckIcon size={12} className="text-[var(--ds-check-icon)]" />}
                                  </Box>
                                  <Text variant="caption" className="text-[var(--ds-text-secondary)]">
                                    {perm.split('_').join(' ')}
                                  </Text>
                                </Inline>
                              );
                            })}
                          </Inline>
                        </Inline>
                        <Inline gap={2} className="shrink-0">
                          <Button variant="outline" size="sm" className="rounded-lg">
                            <PencilIcon size={14} className="mr-1" />
                            Edit
                          </Button>
                          {!isAdmin && (
                            <Button variant="outline" size="sm" className="rounded-lg text-[var(--ds-text-primary)] hover:bg-[var(--ds-bg-error)]">
                              <XIcon size={14} className="mr-1" />
                              Delete
                            </Button>
                          )}
                        </Inline>
                      </Inline>
                    </InsendioCard>
                  );
                })}
              </Stack>
            </Stack>
          </Stack>
        </TabPanel>
        <TabPanel tabId="manage-roles" className="pt-6">
          <Stack gap={6}>
            <InsendioCard className="p-6" variant="surface">
              <Stack gap={2} className="mb-6">
                <Text variant="h3" className="text-[var(--ds-text-primary)]">Role Permissions Matrix</Text>
                <Text variant="body-sm" className="text-[var(--ds-text-secondary)]">Toggle permissions for each role</Text>
              </Stack>
              <InsendioTable className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent [&:nth-child(even)]:bg-transparent">
                      <TableCell as="th" className="text-left font-medium text-[var(--ds-text-secondary)] w-48">ROLE</TableCell>
                      {permissions.map((p) => (
                        <TableCell key={p} as="th" className="text-left font-medium text-xs text-[var(--ds-text-secondary)]">
                          {p}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roles.map((role) => (
                      <TableRow key={role.id}>
                        <TableCell>
                          <Stack gap={0}>
                            <Text
                              variant="body"
                              className={cn(
                                'font-medium',
                                role.color === 'purple' && 'text-[#7B1FA2]',
                                role.color === 'blue' && 'text-[#1565C0] bg-[#E3F2FD] px-2 py-1 rounded -mx-2 -my-1',
                                role.color === 'green' && 'text-[#2E7D32]',
                                role.color === 'gray' && 'text-[var(--ds-text-secondary)]'
                              )}
                            >
                              {role.name}
                            </Text>
                            <Text variant="caption">{role.description}</Text>
                          </Stack>
                        </TableCell>
                        {permissions.map((perm) => {
                          const granted = rolePermissions[role.id]?.[perm];
                          return (
                            <TableCell key={perm}>
                              <Box
                                className={cn(
                                  'w-8 h-8 rounded-full flex items-center justify-center',
                                  granted ? 'bg-[var(--ds-check-bg)]' : 'bg-[var(--ds-cross-bg)]'
                                )}
                              >
                                {granted ? (
                                  <CheckIcon size={18} className="text-[var(--ds-check-icon)]" />
                                ) : (
                                  <XIcon size={18} className="text-[var(--ds-cross-icon)]" />
                                )}
                              </Box>
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </InsendioTable>
            </InsendioCard>
            <InsendioInfoAlert>
              <Text variant="body-sm">
                Permission Changes - Changes to role permissions will be applied to all users with that role. Users will be notified of any permission changes that affect their access.
              </Text>
            </InsendioInfoAlert>
          </Stack>
        </TabPanel>
      </PageLayout>
    </Tabs>
  );
}
