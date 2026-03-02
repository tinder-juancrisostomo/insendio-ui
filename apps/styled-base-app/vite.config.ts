import type { Plugin } from 'vite';
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { watchInsendioPlugin } from '@design-system/insendio-app/vite-watch-plugin';

export default defineConfig({
  base: '/styled-base/',
  plugins: [react(), watchInsendioPlugin() as Plugin],
  define: { global: 'globalThis' },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // Use insendio-app source in dev so changes apply without rebuild
      '@design-system/insendio-app': path.resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        '../../packages/insendio-app/src/index.tsx'
      ),
      // Use tokens source in dev so a11y CSS changes apply without rebuild
      '@design-system/tokens/css': path.resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        '../../packages/tokens/src/tokens.css'
      ),
      '@design-system/typography/css': path.resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        '../../packages/typography/src/typography.css'
      ),
    },
  },
  optimizeDeps: {
    force: true,
    include: ['@design-system/styled-base', '@design-system/icons'],
    exclude: ['@design-system/insendio-app'],
  },
  server: {
    port: 3003,
    strictPort: true,
    fs: {
      allow: [searchForWorkspaceRoot(process.cwd())],
    },
  },
});
