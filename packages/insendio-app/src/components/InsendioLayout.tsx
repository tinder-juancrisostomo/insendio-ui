import { Outlet } from "react-router-dom";
import { cn } from "@design-system/utils";
import { useState } from "react";
import { Banner, Main, Nav } from "@design-system/base";
import {
  BellIcon,
  BarsIcon,
  HouseIcon,
  ChevronDownIcon,
  UsersIcon,
  ChartBarIcon,
  ChartLineIcon,
  DatabaseIcon,
  SettingsIcon,
  SunIcon,
  MoonIcon,
  EyeIcon,
} from "@design-system/icons";
import { Text } from "@design-system/typography";
import { navItems } from "../mock-data";
import { useInsendioComponents } from "../components-context";
import { useTheme } from "../theme-context";
import { InsendioNavLink } from "./insendio";

const envOptions = [
  { id: "prod", label: "Prod", color: "#2E7D32", bg: "bg-[#E8F5E9] hover:bg-[#C8E6C9] dark:bg-[#1B3D1F] dark:hover:bg-[#2E5D32]", text: "text-[#2E7D32] dark:text-[#81C784]", selectedBg: "bg-[#E8F5E9] dark:bg-[#1B3D1F]" },
  { id: "d1", label: "D1", color: "#E65100", bg: "bg-[#FFF3E0] hover:bg-[#FFE0B2] dark:bg-[#3D2E1A] dark:hover:bg-[#4A3520]", text: "text-[#E65100] dark:text-[#FFB74D]", selectedBg: "bg-[#FFF3E0] dark:bg-[#3D2E1A]" },
  { id: "d2", label: "D2", color: "#7B1FA2", bg: "bg-[#F3E5F5] hover:bg-[#E1BEE7] dark:bg-[#4A3F6B] dark:hover:bg-[#5C4D7A]", text: "text-[#7B1FA2] dark:text-[#CE93D8]", selectedBg: "bg-[#F3E5F5] dark:bg-[#4A3F6B]" },
] as const;

const navIcons: Record<string, React.ReactNode> = {
  house: <HouseIcon size={20} />,
  bell: <BellIcon size={20} />,
  users: <UsersIcon size={20} />,
  "chart-line": <ChartLineIcon size={20} />,
  "chart-bar": <ChartBarIcon size={20} />,
  database: <DatabaseIcon size={20} />,
};

export function InsendioLayout() {
  const { Box, Menu, MenuButton, MenuList, MenuItem, Button, Stack, library } =
    useInsendioComponents();
  const { theme, toggleTheme } = useTheme();
  const [selectedEnv, setSelectedEnv] = useState<(typeof envOptions)[number]["id"]>("prod");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Box className="relative min-h-screen flex flex-col bg-[var(--ds-bg-page)]">
      <a
        href="#main-content"
        className="absolute left-4 -top-20 z-[100] px-4 py-2 bg-[var(--ds-bg-surface)] text-[var(--ds-text-primary)] rounded-lg border border-[var(--ds-border-default)] transition-[top] duration-150 focus:top-4 focus:outline-none focus:ring-2 focus:ring-[var(--ds-border-focus)]"
      >
        Skip to main content
      </a>
      {/* Top nav bar */}
      <Banner
        className="sticky top-0 z-50 flex h-14 shrink-0 justify-center border-b border-[var(--ds-border-default)] bg-[var(--ds-bg-surface)] shadow-sm px-3 sm:px-6"
        aria-label="Primary navigation"
      >
        <div className="flex h-full w-full max-w-[1400px] items-center justify-between gap-2 sm:gap-4">
          {/* Left: hamburger (mobile) + logo + name + prod menu */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 overflow-hidden flex-1">
              <div className="lg:hidden shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                  className="!p-2 !min-w-0 rounded-lg text-[var(--ds-text-secondary)] hover:bg-[var(--ds-bg-muted)]"
                >
                  <BarsIcon size={22} aria-hidden />
                </Button>
              </div>
              <Box
                className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#2196F3] to-[#1976D2] shadow-sm"
                role="img"
                aria-label="Insendio logo"
              >
                <BellIcon size={20} className="text-white" aria-hidden />
              </Box>
              <Text
                variant="h4"
                className="font-semibold text-[var(--ds-text-primary)] truncate min-w-0 text-base sm:text-lg"
              >
                Insendio{library ? ` (${library})` : ""}
              </Text>
            </div>
            <div className="relative shrink-0 hidden lg:block">
              <Menu>
              <MenuButton
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium border-0 transition-colors [&[aria-expanded=true]_svg]:rotate-180",
                  envOptions.find((e) => e.id === selectedEnv)?.bg ?? "bg-[#E8F5E9] hover:bg-[#C8E6C9] dark:bg-[#1B3D1F] dark:hover:bg-[#2E5D32]",
                  envOptions.find((e) => e.id === selectedEnv)?.text ?? "text-[#2E7D32] dark:text-[#81C784]"
                )}
              >
                {envOptions.find((e) => e.id === selectedEnv)?.label ?? "Prod"}
                <ChevronDownIcon size={16} className="transition-transform" />
              </MenuButton>
              <MenuList className="!left-0 !top-full !mt-1.5 !min-w-[7rem] !rounded-xl !border !border-[var(--ds-border-default)] !bg-[var(--ds-bg-surface)] !py-1 !shadow-lg !z-[60]">
                {envOptions.map((opt) => (
                  <MenuItem
                    key={opt.id}
                    onSelect={() => setSelectedEnv(opt.id)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 text-sm cursor-pointer outline-none hover:bg-[var(--ds-bg-muted)] focus:bg-[var(--ds-bg-muted)]",
                      selectedEnv === opt.id && opt.selectedBg
                    )}
                  >
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: opt.color }}
                    />
                    {opt.label}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            </div>
          </div>
          {/* Desktop nav - hidden on mobile/tablet */}
          <Nav className="hidden lg:flex items-center gap-0.5" aria-label="Main">
            {navItems.map((item) => (
              <InsendioNavLink
                key={item.id}
                to={item.path}
                end={item.path === "/"}
              >
                <span aria-hidden>{navIcons[item.icon]}</span>
                <span>{item.label}</span>
              </InsendioNavLink>
            ))}
            <InsendioNavLink to="/accessibility" aria-label="Accessibility">
              <span aria-hidden><EyeIcon size={20} /></span>
              <span>Accessibility</span>
            </InsendioNavLink>
            <InsendioNavLink to="/roles" aria-label="Settings">
              <span aria-hidden><SettingsIcon size={20} /></span>
              <span>Settings</span>
            </InsendioNavLink>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              className="!p-2 !min-w-0 rounded-lg text-[var(--ds-text-secondary)] hover:bg-[var(--ds-bg-muted)] hover:text-[var(--ds-text-primary)]"
            >
              {theme === "light" ? (
                <MoonIcon size={20} aria-hidden />
              ) : (
                <SunIcon size={20} aria-hidden />
              )}
            </Button>
          </Nav>
          {/* Mobile/tablet: theme + settings icons */}
          <div className="flex lg:hidden shrink-0 items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              className="!p-2 !min-w-0 rounded-lg text-[var(--ds-text-secondary)] hover:bg-[var(--ds-bg-muted)]"
            >
              {theme === "light" ? (
                <MoonIcon size={20} aria-hidden />
              ) : (
                <SunIcon size={20} aria-hidden />
              )}
            </Button>
            <InsendioNavLink to="/accessibility" aria-label="Accessibility" className="!p-2">
              <EyeIcon size={20} />
            </InsendioNavLink>
            <InsendioNavLink to="/roles" aria-label="Settings" className="!p-2">
              <SettingsIcon size={20} />
            </InsendioNavLink>
          </div>
        </div>
      </Banner>

      {/* Mobile menu overlay - click to close */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          aria-hidden="true"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      {/* Mobile menu panel - slides down from header */}
      <div
        className={`
          fixed top-14 left-0 right-0 z-50 lg:hidden max-h-[calc(100vh-3.5rem)] overflow-y-auto
          bg-[var(--ds-bg-surface)] border-b border-[var(--ds-border-default)] shadow-lg
          transition-transform duration-200 ease-out
          ${mobileMenuOpen ? "translate-y-0" : "-translate-y-[calc(100%+3.5rem)] pointer-events-none"}
        `}
      >
        <Stack gap={0} className="p-4">
          {navItems.map((item) => (
            <InsendioNavLink
              key={item.id}
              to={item.path}
              end={item.path === "/"}
              className="!rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span aria-hidden>{navIcons[item.icon]}</span>
              <span>{item.label}</span>
            </InsendioNavLink>
          ))}
          <InsendioNavLink to="/accessibility" className="!rounded-lg" onClick={() => setMobileMenuOpen(false)}>
            <span aria-hidden><EyeIcon size={20} /></span>
            <span>Accessibility</span>
          </InsendioNavLink>
          <InsendioNavLink to="/roles" className="!rounded-lg" onClick={() => setMobileMenuOpen(false)}>
            <span aria-hidden><SettingsIcon size={20} /></span>
            <span>Settings</span>
          </InsendioNavLink>
        </Stack>
      </div>

      {/* Main area - no max-width here; pages control their own layout */}
      <Main id="main-content" className="flex-1 min-h-0 w-full min-w-0 flex flex-col bg-[var(--ds-bg-page)]">
        <Outlet />
      </Main>
    </Box>
  );
}
