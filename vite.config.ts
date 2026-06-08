import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { tanstackRouterVite } from '@tanstack/router-plugin/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { nitro } from 'nitro/vite';

export default defineConfig({
  plugins: [
    tanstackRouterVite(),
    react(),
    tsconfigPaths(),
    nitro({ preset: 'vercel' }),   // ← This is the key line
  ],
  build: {
    outDir: 'dist',
  },
});