import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import path from 'node:path';

export default defineConfig({
  output: 'static',
  integrations: [react()],
  vite: {
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
    css: {
      postcss: './postcss.config.js',
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
        },
        '/uploads': {
          target: 'http://localhost:3001',
          changeOrigin: true,
        },
      },
    },
  },
});
