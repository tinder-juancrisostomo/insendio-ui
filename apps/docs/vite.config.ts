import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    // Workspace packages change frequently; force re-optimizing so Vite doesn't
    // serve stale prebundled exports (which can surface as "Element type is invalid").
    force: true,
    include: [
      '@design-system/base',
      '@design-system/shadcn',
      '@design-system/hero-ui',
      '@design-system/daisyui',
      '@design-system/mui',
    ],
  },
  server: {
    port: 3000,
  },
});
