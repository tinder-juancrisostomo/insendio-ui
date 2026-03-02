import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  define: {
    // uuid (used by react-graph-vis/vis-network) expects Node's `global`; polyfill for browser
    global: 'globalThis',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@design-system/typography/css': path.resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        '../../packages/typography/src/typography.css'
      ),
    },
  },
  optimizeDeps: {
    // Workspace packages change frequently; force re-optimizing so Vite doesn't
    // serve stale prebundled exports (which can surface as "Element type is invalid").
    force: true,
    include: [
      '@design-system/base',
      '@design-system/styled-base',
      '@design-system/hero-ui',
      '@design-system/daisyui',
      '@design-system/mui',
    ],
  },
  server: {
    port: 3000,
    origin: 'http://localhost:8080',
    hmr: {
      clientPort: 8080,
      host: 'localhost',
    },
  },
  preview: {
    port: 3000,
  },
});
