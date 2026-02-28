import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.tsx'],
  format: ['cjs', 'esm'],
  dts: true,
  external: ['react', 'react-dom'],
  define: {
    // uuid (used by react-graph-vis/vis-network) expects Node's `global`; polyfill for browser
    global: 'globalThis',
  },
});
