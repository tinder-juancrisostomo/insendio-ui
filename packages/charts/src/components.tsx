import { useMemo, useRef, useEffect, useState } from 'react';
import ReactFrappeChart from 'react-frappe-charts';
import Graph from 'react-graph-vis';
import { Box, Stack } from '@design-system/base';
import { cn } from '@design-system/utils';
import type { ChartData, NetworkGraphData } from './types';
import { useChartColors } from './useChartColors';
import { ChartWrapper, type ChartAccessibilityProps } from './ChartWrapper';
import { ChartDataTable, PieChartDataTable, NetworkGraphDataTable } from './DataTable';

const AXIS_OPTIONS = { xAxisMode: 'tick' as const, yAxisMode: 'tick' as const, xIsSeries: 1 };

/** Defers mounting children until the container has dimensions. Fixes charts not rendering when mounted inside tabs. */
function DeferredChartMount({
  children,
  style,
  className,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const check = () => {
      if (el.offsetWidth > 0) setIsReady(true);
    };

    check();
    const obs = new ResizeObserver(check);
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Box ref={ref} style={style} className={className}>
      {isReady ? children : null}
    </Box>
  );
}

/** Disables SMIL animations in chart container when reduce motion is on */
function useDisableChartAnimations(reduceMotion: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!reduceMotion || !containerRef.current) return;

    const disableAnims = (root: Element) => {
      root.querySelectorAll('animate, animateTransform').forEach((el) => {
        el.setAttribute('dur', '0.001s');
      });
    };

    const obs = new MutationObserver(() => {
      if (containerRef.current) disableAnims(containerRef.current);
    });

    disableAnims(containerRef.current);
    obs.observe(containerRef.current, { childList: true, subtree: true });

    const id = setInterval(() => {
      if (containerRef.current) disableAnims(containerRef.current);
    }, 30);

    const stopId = setTimeout(() => clearInterval(id), 2000);

    return () => {
      obs.disconnect();
      clearInterval(id);
      clearTimeout(stopId);
    };
  }, [reduceMotion]);

  return containerRef;
}

export interface BarChartProps extends ChartAccessibilityProps {
  data: ChartData;
  theme?: 'light' | 'dark';
  height?: number;
  /** 'vertical' = vertical bars (default), 'horizontal' = horizontal bars */
  variant?: 'vertical' | 'horizontal';
  /** When true, disables animations. Respects reduce-motion preference. */
  reduceMotion?: boolean;
}

export function BarChart({
  data,
  theme = 'light',
  height = 250,
  variant = 'vertical',
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  longDescription,
  caption,
  showViewSwitch = true,
  defaultView,
  reduceMotion = false,
}: BarChartProps) {
  const colors = useChartColors(theme);
  const table = useMemo(
    () => <ChartDataTable data={data} caption={caption ?? 'Bar chart data'} />,
    [data, caption]
  );

  const a11yProps = {
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedby,
    longDescription,
    caption,
    showViewSwitch,
    defaultView,
  };

  if (variant === 'horizontal') {
    return (
      <ChartWrapper
        accessibilityProps={a11yProps}
        dataTable={table}
      >
        <HorizontalBarChart data={data} colors={colors} height={height} reduceMotion={reduceMotion} />
      </ChartWrapper>
    );
  }

  const chartRef = useDisableChartAnimations(reduceMotion);

  return (
    <ChartWrapper
      accessibilityProps={a11yProps}
      dataTable={table}
    >
      <DeferredChartMount style={{ minHeight: height }}>
        <Box ref={chartRef} style={{ minHeight: height }} className="w-full">
          <ReactFrappeChart
            key={String(reduceMotion)}
            type="bar"
            colors={colors}
            data={data}
            height={height}
            axisOptions={AXIS_OPTIONS}
            animate={!reduceMotion}
          />
        </Box>
      </DeferredChartMount>
    </ChartWrapper>
  );
}

function HorizontalBarChart({
  data,
  colors,
  height,
  reduceMotion = false,
}: {
  data: ChartData;
  colors: string[];
  height: number;
  reduceMotion?: boolean;
}) {
  const values = data.datasets[0]?.values ?? [];
  const max = Math.max(...values, 1);
  const barColor = colors[0] ?? 'var(--ds-text-link, #1976D2)';

  return (
    <Stack direction="vertical" gap={2} className="py-2" style={{ height }}>
      {data.labels.map((label, i) => {
        const val = values[i] ?? 0;
        const pct = Math.min(100, (val / max) * 100);
        return (
          <Stack key={`${label}-${i}`} direction="vertical" gap={1}>
            <Box className="flex items-center justify-between text-[var(--ds-font-size-sm)]">
              <span className="text-[var(--ds-text-primary)]">{label}</span>
              <span className="font-medium text-[var(--ds-text-secondary)]">
                {typeof val === 'number' && val >= 1000 ? val.toLocaleString() : val}
              </span>
            </Box>
            <Box className="h-2 overflow-hidden rounded-[var(--ds-radius-sm)] bg-[var(--ds-bg-muted)]">
              <Box
                className={cn('h-full rounded-[var(--ds-radius-sm)]', !reduceMotion && 'transition-[width] duration-300 ease-out')}
                style={{ width: `${pct}%`, background: barColor }}
              />
            </Box>
          </Stack>
        );
      })}
    </Stack>
  );
}

export interface LineChartProps extends ChartAccessibilityProps {
  data: ChartData;
  theme?: 'light' | 'dark';
  height?: number;
  reduceMotion?: boolean;
}

export function LineChart({
  data,
  theme = 'light',
  height = 250,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  longDescription,
  caption,
  showViewSwitch = true,
  defaultView,
  reduceMotion = false,
}: LineChartProps) {
  const colors = useChartColors(theme);
  const table = useMemo(
    () => <ChartDataTable data={data} caption={caption ?? 'Line chart data'} />,
    [data, caption]
  );

  const chartRef = useDisableChartAnimations(reduceMotion);

  return (
    <ChartWrapper
      accessibilityProps={{
        'aria-label': ariaLabel,
        'aria-describedby': ariaDescribedby,
        longDescription,
        caption,
        showViewSwitch,
        defaultView,
      }}
      dataTable={table}
    >
      <DeferredChartMount style={{ minHeight: height }}>
        <Box ref={chartRef} style={{ minHeight: height }}>
          <ReactFrappeChart
            key={String(reduceMotion)}
            type="line"
            colors={colors}
            data={data}
            height={height}
            axisOptions={AXIS_OPTIONS}
            animate={!reduceMotion}
          />
        </Box>
      </DeferredChartMount>
    </ChartWrapper>
  );
}

export interface PieChartProps extends ChartAccessibilityProps {
  data: ChartData;
  theme?: 'light' | 'dark';
  height?: number;
  reduceMotion?: boolean;
}

export function PieChart({
  data,
  theme = 'light',
  height = 250,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  longDescription,
  caption,
  showViewSwitch = true,
  defaultView,
  reduceMotion = false,
}: PieChartProps) {
  const colors = useChartColors(theme);
  const table = useMemo(
    () => <PieChartDataTable data={data} caption={caption ?? 'Pie chart data'} />,
    [data, caption]
  );

  const chartRef = useDisableChartAnimations(reduceMotion);

  return (
    <ChartWrapper
      accessibilityProps={{
        'aria-label': ariaLabel,
        'aria-describedby': ariaDescribedby,
        longDescription,
        caption,
        showViewSwitch,
        defaultView,
      }}
      dataTable={table}
    >
      <DeferredChartMount style={{ minHeight: height }}>
        <Box ref={chartRef} style={{ minHeight: height }}>
          <ReactFrappeChart
            key={String(reduceMotion)}
            type="pie"
            colors={colors}
            data={data}
            height={height}
            animate={!reduceMotion}
          />
        </Box>
      </DeferredChartMount>
    </ChartWrapper>
  );
}

export interface AreaChartProps extends ChartAccessibilityProps {
  data: ChartData;
  theme?: 'light' | 'dark';
  height?: number;
  reduceMotion?: boolean;
}

export function AreaChart({
  data,
  theme = 'light',
  height = 250,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  longDescription,
  caption,
  showViewSwitch = true,
  defaultView,
  reduceMotion = false,
}: AreaChartProps) {
  const colors = useChartColors(theme);
  const table = useMemo(
    () => <ChartDataTable data={data} caption={caption ?? 'Area chart data'} />,
    [data, caption]
  );

  const chartRef = useDisableChartAnimations(reduceMotion);

  return (
    <ChartWrapper
      accessibilityProps={{
        'aria-label': ariaLabel,
        'aria-describedby': ariaDescribedby,
        longDescription,
        caption,
        showViewSwitch,
        defaultView,
      }}
      dataTable={table}
    >
      <DeferredChartMount style={{ minHeight: height }}>
        <Box ref={chartRef} style={{ minHeight: height }}>
          <ReactFrappeChart
            key={String(reduceMotion)}
            type="line"
            colors={colors.slice(0, 1)}
            data={data}
            height={height}
            axisOptions={AXIS_OPTIONS}
            lineOptions={{ regionFill: 1 }}
            animate={!reduceMotion}
          />
        </Box>
      </DeferredChartMount>
    </ChartWrapper>
  );
}

function getNetworkOptions(theme: 'light' | 'dark', reduceMotion: boolean) {
  const isDark = theme === 'dark';
  return {
    nodes: {
      shape: 'dot' as const,
      size: 16,
      color: {
        background: isDark ? '#404040' : '#F0F0F0',
        border: isDark ? '#444444' : '#E0E0E0',
      },
      font: {
        size: 14,
        color: isDark ? '#FFFFFF' : '#212529',
      },
    },
    edges: {
      width: 2,
      color: { color: isDark ? '#444444' : '#E0E0E0' },
    },
    layout: reduceMotion
      ? { hierarchical: { enabled: true, direction: 'UD', sortMethod: 'directed' as const } }
      : { hierarchical: false },
    physics: reduceMotion
      ? undefined
      : {
          enabled: true,
          barnesHut: {
            gravitationalConstant: -3000,
            centralGravity: 0.3,
            springLength: 120,
          },
        },
    height: '320px',
  };
}

export interface NetworkGraphProps extends ChartAccessibilityProps {
  data: NetworkGraphData;
  theme?: 'light' | 'dark';
  reduceMotion?: boolean;
}

export function NetworkGraph({
  data,
  theme = 'light',
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  longDescription,
  caption,
  showViewSwitch = true,
  defaultView,
  reduceMotion = false,
}: NetworkGraphProps) {
  const options = useMemo(() => getNetworkOptions(theme, reduceMotion), [theme, reduceMotion]);
  const table = useMemo(
    () => (
      <NetworkGraphDataTable
        data={data}
        caption={caption ?? 'Network graph structure'}
      />
    ),
    [data, caption]
  );

  return (
    <ChartWrapper
      accessibilityProps={{
        'aria-label': ariaLabel,
        'aria-describedby': ariaDescribedby,
        longDescription,
        caption,
        showViewSwitch,
        defaultView,
      }}
      dataTable={table}
    >
      <DeferredChartMount style={{ minHeight: 320 }} className="min-h-[320px]">
        <Box className="min-h-[320px] w-full">
          <Graph graph={data} options={options} />
        </Box>
      </DeferredChartMount>
    </ChartWrapper>
  );
}
