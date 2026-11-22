import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://barberia.mx',
  output: 'static',
  build: { format: 'directory' },
  integrations: [sitemap({ filter: (page) => !page.endsWith('/buscar/') })],
  vite: { plugins: [tailwindcss()] },
});
