import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const dist = fileURLToPath(new URL('../dist/', import.meta.url));

const publicEntries = [
  '.nojekyll',
  '404.html',
  'CNAME',
  'apple-touch-icon.png',
  'articulos',
  'blog',
  'build-id.txt',
  'buscar',
  'categorias',
  'ciudad-de-mexico',
  'components',
  'css',
  'directorio',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'favicon.ico',
  'favicon.png',
  'favicon.svg',
  'fonts',
  'google897b1f16de00c568.html',
  'icon-192.png',
  'icon-512.png',
  'icon.avif',
  'icon.png',
  'icon.svg',
  'img',
  'index.html',
  'jalisco',
  'js',
  'merida',
  'monterrey',
  'privacidad',
  'puebla',
  'queretaro',
  'robots.txt',
  'search-index.json',
  'site.webmanifest',
  'sitemap.xml',
  'zona',
];

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

for (const entry of publicEntries) {
  const source = `${projectRoot}${entry}`;
  if (!existsSync(source)) {
    throw new Error(`Falta la entrada pública requerida: ${entry}`);
  }
  cpSync(source, `${dist}${entry}`, { recursive: true });
}
