import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const root = new URL('../', import.meta.url);

const read = (path) => readFileSync(new URL(path, root), 'utf8');

test('la arquitectura canónica de Astro existe y usa configuración central', () => {
  const pkg = JSON.parse(read('package.json'));

  assert.match(pkg.dependencies?.astro ?? '', /^\^6\./);
  assert.equal(existsSync(new URL('astro.config.mjs', root)), true);
  assert.equal(existsSync(new URL('src/config/site.ts', root)), true);
  assert.equal(existsSync(new URL('src/lib/seo.ts', root)), true);
  assert.equal(existsSync(new URL('src/content.config.ts', root)), true);
  assert.equal(existsSync(new URL('index.html', root)), false, 'el HTML raíz heredado no debe duplicar a Astro');
  assert.equal(existsSync(new URL('wrangler.jsonc', root)), true, 'Cloudflare Pages necesita configuración reproducible');

  const siteConfig = read('src/config/site.ts');
  assert.match(siteConfig, /5215547868402/);
  assert.match(read('src/content.config.ts'), /\.strict\(\)/);
  assert.match(read('wrangler.jsonc'), /"pages_build_output_dir": "\.\/dist"/);
});

test('el workflow publica exclusivamente el resultado de Astro', () => {
  const workflow = read('.github/workflows/pages.yml');

  assert.match(workflow, /npm run check/);
  assert.match(workflow, /npm run build/);
  assert.match(workflow, /path: dist/);
  assert.doesNotMatch(workflow, /path: ['"]?\.['"]?/);
});
