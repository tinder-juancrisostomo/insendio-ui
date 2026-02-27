import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Banner, Complementary, Main, Nav } from '@design-system/base';
import {
  BellIcon,
  HouseIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  UsersIcon,
  ChartLineIcon,
  DatabaseIcon,
  SettingsIcon,
} from '@design-system/icons';
import { Text } from '@design-system/typography';
import { navItems } from '../mock-data';
import { useInsendioComponents } from '../components-context';
import { InsendioNavLink } from './insendio';

const navIcons: Record<string, React.ReactNode> = {
  house: <HouseIcon size={20} />,
  bell: <BellIcon size={20} />,
  users: <UsersIcon size={20} />,
  'chart-line': <ChartLineIcon size={20} />,
  database: <DatabaseIcon size={20} />,
};

export function InsendioLayout() {
  const { Box, Menu, MenuButton, MenuList, MenuItem, library } = useInsendioComponents();
  const [envOpen, setEnvOpen] = useState(false);

  return (
    <Box className="min-h-screen flex bg-[#f1f5f9]">
      {/* Sidebar */}
      <Complementary
        className="flex w-56 flex-col border-r border-[var(--ds-border-default)] bg-white shadow-sm"
        aria-label="Primary navigation"
      >
        <div className="flex h-14 items-center gap-3 border-b border-[var(--ds-border-default)] px-4">
          <Box className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#2196F3] to-[#1976D2] shadow-sm">
            <BellIcon size={20} className="text-white" />
          </Box>
          <Text variant="h4" className="font-semibold text-[var(--ds-text-primary)]">
            Insendio{library ? ` (${library})` : ''}
          </Text>
        </div>
        <Nav className="flex flex-1 flex-col gap-0.5 p-3" aria-label="Main">
          {navItems.map((item) => (
            <InsendioNavLink
              key={item.id}
              to={item.path}
              end={item.path === '/'}
            >
              {navIcons[item.icon]}
              <span>{item.label}</span>
            </InsendioNavLink>
          ))}
        </Nav>
        <div className="border-t border-[var(--ds-border-default)] p-3">
          <InsendioNavLink to="/roles" aria-label="Settings">
            <SettingsIcon size={20} />
            <span>Settings</span>
          </InsendioNavLink>
        </div>
      </Complementary>

      {/* Main area */}
      <Box className="flex flex-1 flex-col min-w-0">
        <Banner className="sticky top-0 z-50 flex h-14 items-center justify-end border-b border-[var(--ds-border-default)] bg-white shadow-sm px-6">
          <Menu>
            <MenuButton
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#E8F5E9] px-3 py-1.5 text-sm font-medium text-[#2E7D32] border-0 hover:bg-[#C8E6C9] transition-colors"
              onClick={() => setEnvOpen(!envOpen)}
            >
              Prod
              {envOpen ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />}
            </MenuButton>
            <MenuList>
              <MenuItem>Prod</MenuItem>
              <MenuItem>D1</MenuItem>
              <MenuItem>D2</MenuItem>
            </MenuList>
          </Menu>
        </Banner>
        <Main className="flex-1 overflow-auto p-6 w-full min-w-0 flex flex-col">
          <div className="w-full min-w-0 flex-1 flex flex-col">
            <Outlet />
          </div>
        </Main>
      </Box>
    </Box>
  );
}
