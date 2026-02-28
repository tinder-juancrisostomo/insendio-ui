declare module 'react-graph-vis' {
  import { Component } from 'react';

  export interface GraphData {
    nodes: Array<{ id: string | number; label?: string; title?: string; [key: string]: unknown }>;
    edges: Array<{ from: string | number; to: string | number; [key: string]: unknown }>;
  }

  export interface GraphOptions {
    nodes?: Record<string, unknown>;
    edges?: Record<string, unknown>;
    layout?: Record<string, unknown>;
    physics?: Record<string, unknown>;
    height?: string;
    [key: string]: unknown;
  }

  export interface GraphProps {
    graph: GraphData;
    options?: GraphOptions;
    events?: Record<string, (event: unknown) => void>;
    getNetwork?: (network: unknown) => void;
  }

  export default class Graph extends Component<GraphProps> {}
}
