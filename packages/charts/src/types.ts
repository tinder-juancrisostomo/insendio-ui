export interface ChartData {
  labels: string[];
  datasets: Array<{ name?: string; values: number[] }>;
}

export interface NetworkGraphData {
  nodes: Array<{ id: string | number; label?: string; title?: string }>;
  edges: Array<{ from: string | number; to: string | number }>;
}
