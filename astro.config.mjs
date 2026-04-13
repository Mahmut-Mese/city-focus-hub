import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import path from 'node:path';

// P1-70: Set the production site URL for sitemap and canonical URL generation
const SITE_URL = process.env.SITE_URL || 'https://cityfocushub.com';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  integrations: [react(), sitemap()],
  server: { port: 8080 },
  vite: {
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
    css: {
      postcss: './postcss.config.js',
    },
    optimizeDeps: {
      exclude: ['@stripe/stripe-js'],
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
        '/admin': {
          target: 'http://localhost:3001',
          changeOrigin: true,
        },
        '/admin-assets': {
          target: 'http://localhost:3001',
          changeOrigin: true,
        },
      },
    },
  },
});
