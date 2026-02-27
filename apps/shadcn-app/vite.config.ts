import type { Plugin } from 'vite';
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { watchInsendioPlugin } from '@design-system/insendio-app/vite-watch-plugin';

export default defineConfig({
  plugins: [react(), watchInsendioPlugin() as Plugin],
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
    },
  },
  optimizeDeps: {
    force: true,
    include: ['@design-system/shadcn', '@design-system/icons'],
    exclude: ['@design-system/insendio-app'],
  },
  server: {
    port: 3003,
    fs: {
      allow: [searchForWorkspaceRoot(process.cwd())],
    },
  },
});
