import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
plugins: [
  TanStackRouterVite(),  // was tanstackRouterVite()
  react(),
  tsconfigPaths(),
],
  build: {
    outDir: 'dist',
  },
});