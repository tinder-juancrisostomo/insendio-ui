import { UsersIcon, ShieldIcon, CheckIcon, XIcon } from '@design-system/icons';
import { Text } from '@design-system/typography';
import { roles, permissions, rolePermissions } from '../mock-data';
import { useInsendioComponents } from '../components-context';
import { cn } from '@design-system/utils';
import { PageLayout, InsendioTab, InsendioTabList, InsendioCard, InsendioInfoAlert } from '../components/insendio';

export function RolesPage() {
  const { Box, Stack, Inline, Tabs, TabPanel } = useInsendioComponents();

  return (
    <PageLayout title="Manage team members and their access levels">
      <Tabs defaultSelectedId="manage-roles">
        <InsendioTabList>
          <InsendioTab id="team-members">
            <UsersIcon size={18} />
            Team Members
          </InsendioTab>
          <InsendioTab id="manage-roles">
            <ShieldIcon size={18} />
            Manage Roles
          </InsendioTab>
        </InsendioTabList>
        <TabPanel tabId="manage-roles" className="pt-6">
          <Stack gap={6}>
            <InsendioCard className="p-6">
              <Stack gap={2} className="mb-6">
                <Text variant="h3">Role Permissions Matrix</Text>
                <Text variant="body-sm">Toggle permissions for each role</Text>
              </Stack>
              <Box className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left p-3 font-medium text-[var(--ds-text-secondary)] w-48">ROLE</th>
                      {permissions.map((p) => (
                        <th key={p} className="text-left p-3 font-medium text-xs text-[var(--ds-text-secondary)]">
                          {p}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {roles.map((role) => (
                      <tr key={role.id} className="border-t border-[var(--ds-border-default)]">
                        <td className="p-3">
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
                        </td>
                        {permissions.map((perm) => {
                          const granted = rolePermissions[role.id]?.[perm];
                          return (
                            <td key={perm} className="p-3">
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
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </InsendioCard>
            <InsendioInfoAlert>
              <Text variant="body-sm">
                Permission Changes - Changes to role permissions will be applied to all users with that role. Users will be notified of any permission changes that affect their access.
              </Text>
            </InsendioInfoAlert>
          </Stack>
        </TabPanel>
      </Tabs>
    </PageLayout>
  );
}
