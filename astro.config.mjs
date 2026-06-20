import { defineConfig } from 'astro/config';

// Lift-and-shift de sitio estático a Astro 6 (Barberia.mx).
// Salida estática; assets en public/ se sirven verbatim.
export default defineConfig({
  site: 'https://barberia.mx',
  build: { format: 'directory' },
});
