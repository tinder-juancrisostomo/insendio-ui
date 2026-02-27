import path from 'path';
import { fileURLToPath } from 'url';
import chokidar from 'chokidar';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Vite plugin that watches the insendio-app source and triggers a full reload
 * when files change. Use this when running dev so changes to insendio-app
 * update the page automatically without manual build + restart.
 */
export function watchInsendioPlugin() {
  const insendioSrc = path.resolve(__dirname, 'src');

  return {
    name: 'watch-insendio-app',
    apply: 'serve',
    configureServer(server) {
      const watcher = chokidar.watch(insendioSrc, { ignoreInitial: true });
      watcher.on('change', () => {
        server.ws.send({ type: 'full-reload', path: '*' });
      });
    },
  };
}
