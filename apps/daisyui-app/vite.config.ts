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
      '@design-system/insendio-app': path.resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        '../../packages/insendio-app/src/index.tsx'
      ),
      '@design-system/tokens/css': path.resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        '../../packages/tokens/src/tokens.css'
      ),
    },
  },
  optimizeDeps: {
    force: true,
    include: ['@design-system/daisyui', '@design-system/icons'],
    exclude: ['@design-system/insendio-app'],
  },
  server: {
    port: 3004,
    fs: {
      allow: [searchForWorkspaceRoot(process.cwd())],
    },
  },
});
