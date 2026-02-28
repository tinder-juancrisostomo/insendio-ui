declare module 'react-frappe-charts' {
  import { Component } from 'react';

  export interface ChartData {
    labels: string[];
    datasets: Array<{ name?: string; values: number[] }>;
  }

  export interface ReactFrappeChartProps {
    type: 'bar' | 'line' | 'pie' | 'percentage' | 'axis-mixed';
    data: ChartData;
    colors?: string[];
    height?: number;
    axisOptions?: Record<string, unknown>;
    lineOptions?: Record<string, unknown>;
    /** Disable chart animations. Use when prefers-reduced-motion. */
    animate?: boolean;
  }

  export default class ReactFrappeChart extends Component<ReactFrappeChartProps> {}
}
