import { useState } from 'react';
import {
  BarChart,
  LineChart,
  AreaChart,
  PieChart,
  NetworkGraph,
} from '@design-system/charts';
import { ChevronUpIcon, ChevronDownIcon } from '@design-system/icons';
import { Text } from '@design-system/typography';
import {
  dashboardTabs,
  overviewKpis,
  analysisChartData,
  topReferrersChartData,
  topPagesChartData,
  topSourcesChartData,
  userBehaviorKpis,
  userOverviewData,
  userTransactions,
  trafficByDevice,
  performanceKpis,
  salesGrowthData,
  bounceRateSources,
  bounceRateChartData,
  salesByCountryData,
  totalRevenueData,
  conversionFlowData,
  flowsKpis,
} from '../mock-data';
import { useInsendioComponents } from '../components-context';
import { useTheme } from '../theme-context';
import { useAccessibility } from '../accessibility-context';
import {
  PageLayout,
  InsendioTab,
  InsendioTabList,
  InsendioCard,
} from '../components/insendio';

function KpiCard({
  label,
  value,
  change,
  trend,
  compare,
}: Readonly<{
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  compare: string;
}>) {
  const isUp = trend === 'up';
  return (
    <InsendioCard className="p-4 sm:p-6">
      <div className="flex flex-col gap-1">
        <Text variant="caption" className="text-[var(--ds-text-secondary)]">
          {label}
        </Text>
        <Text variant="h1" className="text-2xl sm:text-3xl font-bold text-[var(--ds-text-primary)]">
          {value}
        </Text>
        <div className="flex items-center gap-1.5 text-sm">
          <span
            className={isUp ? 'text-[#2E7D32]' : 'text-[#C62828]'}
            aria-hidden
          >
            {isUp ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />}
          </span>
          <span className={isUp ? 'text-[#2E7D32]' : 'text-[#C62828]'}>
            {change}%
          </span>
          <span className="text-[var(--ds-text-secondary)]">{compare}</span>
        </div>
      </div>
    </InsendioCard>
  );
}

function PerformanceKpiCard({
  label,
  value,
  target,
  percent,
  trend,
}: Readonly<{
  label: string;
  value: string;
  target: string;
  percent: number;
  trend: 'up' | 'down';
}>) {
  const isUp = trend === 'up';
  const barPercent = Math.min(100, percent);
  return (
    <InsendioCard className="p-4 sm:p-6">
      <div className="flex flex-col gap-3">
        <Text variant="caption" className="text-[var(--ds-text-secondary)]">
          {label}
        </Text>
        <div className="flex justify-between items-baseline">
          <Text variant="h1" className="text-2xl font-bold text-[var(--ds-text-primary)]">
            {value}
          </Text>
          <Text variant="caption" className="text-[var(--ds-text-secondary)]">
            Target: {target}
          </Text>
        </div>
        <div className="relative h-2 rounded-full bg-[var(--ds-bg-muted)] overflow-hidden">
          <div
            className={`h-full rounded-full ${isUp ? 'bg-[#2E7D32]' : 'bg-[#C62828]'}`}
            style={{ width: `${barPercent}%` }}
          />
        </div>
      </div>
    </InsendioCard>
  );
}

export function DashboardPage() {
  const { Box, Stack, Tabs, TabPanel, Badge } = useInsendioComponents();
  const { theme } = useTheme();
  const a11y = useAccessibility();
  const chartDefaultView = a11y.preferChartTable ? ('table' as const) : undefined;
  const chartShowViewSwitch = !a11y.preferChartTable;
  const chartReduceMotion = a11y.reduceMotion;
  const [referrerTime, setReferrerTime] = useState('7d');
  const [bounceTime, setBounceTime] = useState('7d');

  const referrerTabs = [
    { id: '7d', label: 'Last 7 days' },
    { id: '30d', label: 'Last Month' },
    { id: '1y', label: 'Last Year' },
  ];

  return (
    <Tabs defaultSelectedId="overview">
      <PageLayout
        title="Analytics"
        titleClassName="text-[var(--ds-text-primary)] font-semibold tracking-tight"
        headerContent={
          <InsendioTabList theme="blue">
            {dashboardTabs.map((tab) => (
              <InsendioTab key={tab.id} id={tab.id} theme="blue">
                {tab.label}
              </InsendioTab>
            ))}
          </InsendioTabList>
        }
      >
        <TabPanel tabId="overview" className="pt-6">
          <Stack gap={6}>
            <div className="w-full min-w-0 overflow-x-auto overflow-y-hidden [-webkit-overflow-scrolling:touch] -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="flex flex-nowrap gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:flex-none">
                {overviewKpis.map((kpi) => (
                  <div key={kpi.id} className="shrink-0 min-w-[240px] sm:min-w-0 sm:shrink">
                    <KpiCard
                      label={kpi.label}
                      value={kpi.value}
                      change={kpi.change}
                      trend={kpi.trend}
                      compare={kpi.compare}
                    />
                  </div>
                ))}
              </div>
            </div>

            <InsendioCard className="p-4 sm:p-6">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <Text variant="h4" className="font-semibold text-[var(--ds-text-primary)]">
                      Analysis
                    </Text>
                    <Text variant="body-sm" className="text-[var(--ds-text-secondary)] mt-1">
                      Analyze user engagement and improve your product with real-time analytics.
                    </Text>
                  </div>
                  <div className="flex gap-1">
                    {['Daily', 'Monthly', 'Yearly'].map((t) => (
                      <button
                        key={t}
                        type="button"
                        className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                          t === 'Monthly'
                            ? 'bg-[var(--ds-bg-active-tab)] text-[var(--ds-tab-active-blue)] font-medium'
                            : 'text-[var(--ds-text-secondary)] hover:bg-[var(--ds-bg-muted)]'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="min-h-[280px]">
                  <LineChart
                    data={analysisChartData}
                    theme={theme}
                    height={280}
                    defaultView={chartDefaultView}
                    showViewSwitch={chartShowViewSwitch}
                    reduceMotion={chartReduceMotion}
                    aria-label="Line chart showing page views and unique visitors by month"
                    caption="Page views and unique visitors"
                    longDescription="Page views ranged from 420 (Jan) to 1000 (Dec). Unique visitors followed a similar trend, peaking at 680 in Dec."
                  />
                </div>
              </div>
            </InsendioCard>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <InsendioCard className="p-4">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Text variant="h4" className="font-semibold text-[var(--ds-text-primary)]">
                      Top HTTP Referrers
                    </Text>
                    <div className="flex gap-1">
                      {referrerTabs.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setReferrerTime(t.id)}
                          className={`px-2 py-1 text-xs rounded transition-colors ${
                            referrerTime === t.id
                              ? 'bg-[var(--ds-bg-active-tab)] text-[var(--ds-tab-active-blue)] font-medium'
                              : 'text-[var(--ds-text-secondary)] hover:bg-[var(--ds-bg-muted)]'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="min-h-[220px]">
                    <BarChart
                      key="top-referrers"
                      data={topReferrersChartData}
                      theme={theme}
                      height={220}
                      variant="horizontal"
                      defaultView={chartDefaultView}
                      showViewSwitch={chartShowViewSwitch}
                      reduceMotion={chartReduceMotion}
                      aria-label="Horizontal bar chart showing top HTTP referrers"
                      caption="Top HTTP referrers"
                      longDescription="Direct leads with 16,890, followed by Google.com 12,450 and Remix.com 8,920."
                    />
                  </div>
                </div>
              </InsendioCard>
              <InsendioCard className="p-4">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Text variant="h4" className="font-semibold text-[var(--ds-text-primary)]">
                      Top Pages
                    </Text>
                    <div className="flex gap-1">
                      {[
                        { id: 'routes', label: 'Routes' },
                        { id: 'pages', label: 'Pages' },
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          className={`px-2 py-1 text-xs rounded transition-colors ${
                            t.id === 'routes'
                              ? 'bg-[var(--ds-bg-active-tab)] text-[var(--ds-tab-active-blue)] font-medium'
                              : 'text-[var(--ds-text-secondary)] hover:bg-[var(--ds-bg-muted)]'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="min-h-[220px]">
                    <BarChart
                      key="top-pages"
                        data={topPagesChartData}
                        theme={theme}
                        height={220}
                        variant="horizontal"
                        defaultView={chartDefaultView}
                        showViewSwitch={chartShowViewSwitch}
                        reduceMotion={chartReduceMotion}
                        aria-label="Horizontal bar chart showing top pages"
                        caption="Top pages"
                        longDescription="Home leads with 24,500, followed by Pricing 18,200 and Change-log 12,400."
                      />
                  </div>
                </div>
              </InsendioCard>
              <InsendioCard className="p-4">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Text variant="h4" className="font-semibold text-[var(--ds-text-primary)]">
                      Top Sources
                    </Text>
                    <div className="flex gap-1">
                      {[
                        { id: 'affiliate', label: 'Affiliate' },
                        { id: 'campaign', label: 'Campaign' },
                        { id: 'marketing', label: 'Marketing' },
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          className={`px-2 py-1 text-xs rounded transition-colors ${
                            t.id === 'affiliate'
                              ? 'bg-[var(--ds-bg-active-tab)] text-[var(--ds-tab-active-blue)] font-medium'
                              : 'text-[var(--ds-text-secondary)] hover:bg-[var(--ds-bg-muted)]'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="min-h-[220px]">
                    <BarChart
                      key="top-sources"
                        data={topSourcesChartData}
                        theme={theme}
                        height={220}
                        variant="horizontal"
                        defaultView={chartDefaultView}
                        showViewSwitch={chartShowViewSwitch}
                        reduceMotion={chartReduceMotion}
                        aria-label="Horizontal bar chart showing top sources"
                        caption="Top sources"
                        longDescription="No-Reference leads with 18,900, followed by Medium 12,400 and remaixblock.com 8,200."
                      />
                  </div>
                </div>
              </InsendioCard>
            </div>
          </Stack>
        </TabPanel>

        <TabPanel tabId="user-behavior" className="pt-6">
          <Stack gap={6}>
            <div className="w-full min-w-0 overflow-x-auto overflow-y-hidden [-webkit-overflow-scrolling:touch] -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="flex flex-nowrap gap-4 sm:grid sm:grid-cols-3 sm:flex-none">
                {userBehaviorKpis.map((kpi) => (
                  <div key={kpi.id} className="shrink-0 min-w-[240px] sm:min-w-0 sm:shrink">
                    <KpiCard
                      label={kpi.label}
                      value={kpi.value}
                      change={kpi.change}
                      trend={kpi.trend}
                      compare={kpi.compare}
                    />
                  </div>
                ))}
              </div>
            </div>

            <InsendioCard className="p-4 sm:p-6">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <Text variant="h4" className="font-semibold text-[var(--ds-text-primary)]">
                      User Overview
                    </Text>
                    <Text variant="body-sm" className="text-[var(--ds-text-secondary)] mt-1">
                      Monitor visitor behavior to enhance user experience and retention.
                    </Text>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[var(--ds-text-secondary)]">
                    <span>27-Feb-2026</span>
                  </div>
                </div>
                <div className="min-h-[280px] w-full">
                  <BarChart
                    key="user-overview"
                      data={userOverviewData}
                      theme={theme}
                      height={280}
                      defaultView={chartDefaultView}
                      showViewSwitch={chartShowViewSwitch}
                      reduceMotion={chartReduceMotion}
                      aria-label="Bar chart showing active and inactive users by month"
                      caption="Active vs inactive users"
                    longDescription="Active users ranged from 520 (Jan) to 850 (Dec). Inactive users followed a similar pattern with lower values."
                  />
                </div>
              </div>
            </InsendioCard>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Box className="lg:col-span-2">
                <InsendioCard className="p-4">
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <Text variant="h4" className="font-semibold text-[var(--ds-text-primary)]">
                        User Transaction
                      </Text>
                      <button
                        type="button"
                        className="text-sm text-[var(--ds-tab-active-blue)] hover:underline"
                      >
                        View All
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-[var(--ds-border-default)]">
                            <th className="text-left py-2 font-medium text-[var(--ds-text-primary)]">User</th>
                            <th className="text-left py-2 font-medium text-[var(--ds-text-primary)]">Amount</th>
                            <th className="text-left py-2 font-medium text-[var(--ds-text-primary)]">Status</th>
                            <th className="text-left py-2 font-medium text-[var(--ds-text-primary)]">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {userTransactions.map((tx) => (
                            <tr key={tx.id} className="border-b border-[var(--ds-border-default)] last:border-b-0">
                              <td className="py-3 text-[var(--ds-text-primary)]">{tx.user}</td>
                              <td className="py-3 text-[var(--ds-text-secondary)]">{tx.amount}</td>
                              <td className="py-3">
                                <Badge variant={tx.status === 'Success' ? 'active' : 'inactive'}>
                                  {tx.status}
                                </Badge>
                              </td>
                              <td className="py-3 text-[var(--ds-text-secondary)]">{tx.date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </InsendioCard>
              </Box>
              <InsendioCard className="p-4">
                <Text variant="h4" className="font-semibold text-[var(--ds-text-primary)] mb-4">
                  Traffic in Device
                </Text>
                <div className="min-h-[200px]">
                  <PieChart
                    key="traffic-in-device"
                      data={trafficByDevice}
                      theme={theme}
                      height={200}
                      defaultView={chartDefaultView}
                      showViewSwitch={chartShowViewSwitch}
                      reduceMotion={chartReduceMotion}
                      aria-label="Pie chart showing traffic share by device type"
                      caption="Traffic by device"
                    longDescription="Computer 55%, Mobile 35%, Tablet 10%. Desktop is the primary traffic source."
                  />
                </div>
              </InsendioCard>
            </div>
          </Stack>
        </TabPanel>

        <TabPanel tabId="performance" className="pt-6">
          <Stack gap={6}>
            <div className="w-full min-w-0 overflow-x-auto overflow-y-hidden [-webkit-overflow-scrolling:touch] -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="flex flex-nowrap gap-4 sm:grid sm:grid-cols-3 sm:flex-none">
                {performanceKpis.map((kpi) => (
                  <div key={kpi.id} className="shrink-0 min-w-[240px] sm:min-w-0 sm:shrink">
                    <PerformanceKpiCard
                      label={kpi.label}
                      value={kpi.value}
                      target={kpi.target}
                      percent={kpi.percent}
                      trend={kpi.trend}
                    />
                  </div>
                ))}
              </div>
            </div>

            <InsendioCard className="p-4 sm:p-6">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <Text variant="h4" className="font-semibold text-[var(--ds-text-primary)]">
                      Total sales growth and target
                    </Text>
                    <div className="flex items-baseline gap-2 mt-1">
                      <Text variant="h2" className="text-2xl font-bold text-[var(--ds-text-primary)]">
                        2680.50k
                      </Text>
                      <span className="text-sm text-[#2E7D32] font-medium">60.5%</span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {['Daily', 'Monthly', 'Yearly'].map((t) => (
                      <button
                        key={t}
                        type="button"
                        className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                          t === 'Monthly'
                            ? 'bg-[var(--ds-bg-active-tab)] text-[var(--ds-tab-active-blue)] font-medium'
                            : 'text-[var(--ds-text-secondary)] hover:bg-[var(--ds-bg-muted)]'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="min-h-[280px] w-full">
                  <AreaChart
                    key="sales-growth"
                      data={salesGrowthData}
                      theme={theme}
                      height={280}
                      defaultView={chartDefaultView}
                      showViewSwitch={chartShowViewSwitch}
                      reduceMotion={chartReduceMotion}
                      aria-label="Area chart showing sales growth vs target"
                      caption="Sales growth and target"
                    longDescription="Sales growth exceeded target in most months. Peak at 26,800 in Dec."
                  />
                </div>
              </div>
            </InsendioCard>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <InsendioCard className="p-4">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Text variant="h4" className="font-semibold text-[var(--ds-text-primary)]">
                      Bounce Rate
                    </Text>
                    <div className="flex gap-1">
                      {[
                        { id: '7d', label: 'Last 7 day' },
                        { id: '30d', label: 'Last Month' },
                        { id: '1y', label: 'Last Year' },
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setBounceTime(t.id)}
                          className={`px-2 py-1 text-xs rounded transition-colors ${
                            bounceTime === t.id
                              ? 'bg-[var(--ds-bg-active-tab)] text-[var(--ds-tab-active-blue)] font-medium'
                              : 'text-[var(--ds-text-secondary)] hover:bg-[var(--ds-bg-muted)]'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="min-h-[220px]">
                    <BarChart
                      key="bounce-rate"
                        data={bounceRateChartData}
                        theme={theme}
                        height={220}
                        variant="horizontal"
                        defaultView={chartDefaultView}
                        showViewSwitch={chartShowViewSwitch}
                        reduceMotion={chartReduceMotion}
                        aria-label="Horizontal bar chart showing bounce rate by traffic source"
                        caption="Bounce rate by source"
                      longDescription="Direct traffic leads with 16,890, followed by Search 4,909 and Mail 8,675."
                    />
                  </div>
                </div>
              </InsendioCard>
              <Box className="lg:col-span-2">
                <InsendioCard className="p-4">
                  <Text variant="h4" className="font-semibold text-[var(--ds-text-primary)] mb-4">
                    Sale Mapping by Country
                  </Text>
                  <div className="min-h-[220px]">
                    <BarChart
                      key="sales-by-country"
                        data={salesByCountryData}
                        theme={theme}
                        height={220}
                        defaultView={chartDefaultView}
                        showViewSwitch={chartShowViewSwitch}
                        reduceMotion={chartReduceMotion}
                        aria-label="Bar chart showing sales by US state/region"
                        caption="Sales by region"
                      longDescription="California leads with 4,200 orders, Texas 3,800, New York 3,100."
                    />
                  </div>
                </InsendioCard>
              </Box>
            </div>

            <InsendioCard className="p-4 sm:p-6 w-4/5">
              <div className="flex flex-col sm:flex-row items-center gap-10 sm:gap-12">
                <div className="w-72 sm:w-96 shrink-0" style={{ minHeight: 420 }}>
                  <PieChart
                    key="total-revenue"
                      data={totalRevenueData}
                      theme={theme}
                      height={320}
                      defaultView={chartDefaultView}
                      showViewSwitch={chartShowViewSwitch}
                      reduceMotion={chartReduceMotion}
                      aria-label="Donut chart showing total revenue at 75%"
                      caption="Total revenue"
                    longDescription="75% of revenue target achieved."
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Text variant="h4" className="font-semibold text-[var(--ds-text-primary)] text-base">
                    Total Revenue
                  </Text>
                  <Text variant="h1" className="text-2xl font-bold text-[var(--ds-text-primary)]">
                    $4593.35
                  </Text>
                  <div className="flex items-center gap-1.5 text-sm text-[#2E7D32] font-medium">
                    <ChevronUpIcon size={20} aria-hidden />
                    <span>24.5%</span>
                  </div>
                </div>
              </div>
            </InsendioCard>
          </Stack>
        </TabPanel>

        <TabPanel tabId="flows" className="pt-6">
          <Stack gap={6}>
            <div className="w-full min-w-0 overflow-x-auto overflow-y-hidden [-webkit-overflow-scrolling:touch] -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="flex flex-nowrap gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:flex-none">
                {flowsKpis.map((kpi) => (
                  <div key={kpi.id} className="shrink-0 min-w-[240px] sm:min-w-0 sm:shrink">
                    <KpiCard
                      label={kpi.label}
                      value={kpi.value}
                      change={kpi.change}
                      trend={kpi.trend}
                      compare={kpi.compare}
                    />
                  </div>
                ))}
              </div>
            </div>

            <InsendioCard className="p-4 sm:p-6">
              <div className="flex flex-col gap-4">
                <div>
                  <Text variant="h4" className="font-semibold text-[var(--ds-text-primary)]">
                    Conversion Flow
                  </Text>
                  <Text variant="body-sm" className="text-[var(--ds-text-secondary)] mt-1">
                    User journey from landing to purchase. Nodes represent stages; edges show possible paths. Hover nodes for details.
                  </Text>
                </div>
                <Box
                  className="rounded-lg overflow-hidden"
                  style={{ minHeight: 400 }}
                >
                  <NetworkGraph
                      key="conversion-flow"
                      data={conversionFlowData}
                      theme={theme}
                      defaultView={chartDefaultView}
                      showViewSwitch={chartShowViewSwitch}
                      reduceMotion={chartReduceMotion}
                      aria-label="Network graph showing user conversion flow from landing to purchase"
                      caption="Conversion flow"
                    longDescription="Main path: Landing to Browse to Sign Up to Onboard to First Action to Cart to Checkout to Purchase. Alternative paths lead to Churn at various stages."
                  />
                </Box>
              </div>
            </InsendioCard>
          </Stack>
        </TabPanel>
      </PageLayout>
    </Tabs>
  );
}
