import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

const projectRoot = new URL('../', import.meta.url);
const dist = new URL('../dist/', import.meta.url);

function htmlFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const url = new URL(`${entry.name}${entry.isDirectory() ? '/' : ''}`, directory);
    if (entry.isDirectory()) return htmlFiles(url);
    return entry.name.endsWith('.html') && !entry.name.startsWith('google') ? [url] : [];
  });
}

function publicTarget(pathname) {
  const clean = decodeURIComponent(pathname).replace(/^\//, '');
  if (!clean) return new URL('index.html', dist);
  if (clean.endsWith('/')) return new URL(`${clean}index.html`, dist);
  const file = new URL(clean, dist);
  return existsSync(file) ? file : new URL(`${clean}/index.html`, dist);
}

test('el build publica el sitio y excluye archivos internos', () => {
  rmSync(dist, { recursive: true, force: true });

  const result = spawnSync('npm', ['run', 'build', '--silent'], {
    cwd: projectRoot,
    encoding: 'utf8',
  });

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.equal(existsSync(new URL('index.html', dist)), true);
  assert.equal(existsSync(new URL('CNAME', dist)), true);
  assert.equal(existsSync(new URL('directorio/index.html', dist)), true);
  assert.equal(existsSync(new URL('sitemap-index.xml', dist)), true);
  assert.equal(existsSync(new URL('_headers', dist)), true);
  assert.equal(existsSync(new URL('css', dist)), false, 'los estilos deben formar parte del bundle optimizado');

  for (const internalPath of [
    '.git',
    '.github',
    'scripts',
    'tests',
    'LICENSE.txt',
    'package.json',
    'package-lock.json',
    'src',
  ]) {
    assert.equal(
      existsSync(new URL(internalPath, dist)),
      false,
      `${internalPath} no debe formar parte del artefacto público`,
    );
  }

  const pages = htmlFiles(dist);
  const titles = new Set();
  const bannedClaims = [
    'Perfil de ejemplo',
    '24 artículos',
    'ha cortado a presidentes',
    'Probadas por la redacción durante tres meses',
    'Con cifras de operación verificadas en barberías de los 32 estados',
    'fue visitada en persona',
    'revisita decenas de barberías',
    'recomendamos sin reservas',
    'agenda saturada',
    "Editor's Pick",
    'Productos verificados por la redacción',
    'Reseñas y testimonios reales de clientes',
  ];

  for (const page of pages) {
    const html = readFileSync(page, 'utf8');
    const title = html.match(/<title>(.*?)<\/title>/s)?.[1] ?? '';
    assert.ok(title, `${page.pathname} necesita title`);
    assert.equal(titles.has(title), false, `title duplicado: ${title}`);
    titles.add(title);
    assert.equal((html.match(/rel="canonical"/g) ?? []).length, 1, `${page.pathname} necesita un canonical`);
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${page.pathname} necesita un H1`);
    assert.equal((html.match(/<main\b/g) ?? []).length, 1, `${page.pathname} necesita un main`);

    for (const image of html.matchAll(/<img\b[^>]*>/gi)) {
      assert.match(image[0], /\bwidth="?\d+/i, `imagen sin width en ${page.pathname}`);
      assert.match(image[0], /\bheight="?\d+/i, `imagen sin height en ${page.pathname}`);
    }

    for (const href of html.matchAll(/href="([^"]+)"/gi)) {
      const value = href[1];
      if (!value.startsWith('/') || value.startsWith('//')) continue;
      const pathname = value.split(/[?#]/, 1)[0];
      assert.equal(existsSync(publicTarget(pathname)), true, `enlace interno roto en ${page.pathname}: ${value}`);
    }

    for (const claim of bannedClaims) assert.equal(html.includes(claim), false, `${claim} no debe publicarse`);
  }

  const searchIndex = JSON.parse(readFileSync(new URL('search-index.json', dist), 'utf8'));
  assert.ok(searchIndex.length >= 373, 'el buscador debe incluir las fichas de CDMX, artículos y páginas');

  const cdmxIndex = readFileSync(new URL('ciudad-de-mexico/index.html', dist), 'utf8');
  assert.match(cdmxIndex, /<dd>120<\/dd>/);
  assert.match(cdmxIndex, /data-cdmx-search/);
  assert.match(cdmxIndex, /data-borough="cuauhtemoc"/);
  assert.equal((cdmxIndex.match(/class="cdmx-card"/g) ?? []).length, 120);

  const cdmxDetail = readFileSync(new URL('ciudad-de-mexico/barberia-roma-norte-cuauhtemoc/index.html', dist), 'utf8');
  const cdmxDetailMain = cdmxDetail.match(/<main\b[\s\S]*?<\/main>/)?.[0] ?? '';
  assert.match(cdmxDetail, /The Barber's Spa Roma Norte/);
  assert.match(cdmxDetail, /55 9688 6590/);
  assert.match(cdmxDetailMain, /cdmx-detail__quick/);
  assert.match(cdmxDetailMain, /Código postal/);
  assert.match(cdmxDetailMain, /Transparencia editorial/);
  assert.match(cdmxDetailMain, /Volver a las 120 barberías en CDMX/);
  assert.doesNotMatch(cdmxDetailMain, /href="tel:/);
  assert.doesNotMatch(cdmxDetailMain, /href="https?:|wa\.me|localmexico\.net|thebarbersspa\.mx/);
  assert.doesNotMatch(cdmxDetailMain, /aggregateRating|reviewCount|Abierto ahora/);

  const cdmxRecords = JSON.parse(readFileSync(new URL('src/data/barberias-cdmx.json', projectRoot), 'utf8'));
  for (const record of cdmxRecords) {
    const detail = readFileSync(new URL(`ciudad-de-mexico/${record.slug}/index.html`, dist), 'utf8');
    const main = detail.match(/<main\b[\s\S]*?<\/main>/)?.[0] ?? '';
    assert.match(main, new RegExp(record.telephone.replaceAll(' ', '\\s+')), `${record.name} necesita teléfono visible`);
    assert.doesNotMatch(main, /href="tel:|href="https?:/, `${record.name} no debe enlazar teléfono, sitio, red o mapa`);
    assert.doesNotMatch(main, /aggregateRating|reviewCount|Abierto ahora/, `${record.name} no debe publicar señales dinámicas o reseñas`);
    for (const source of record.sources) {
      assert.equal(detail.includes(source), false, `${record.name} expone una fuente interna`);
    }
  }

  const cdmxResults = searchIndex.filter(({ url }) => url.startsWith('/ciudad-de-mexico/'));
  assert.equal(cdmxResults.length, 121, 'el buscador debe incluir el índice y las 120 fichas de CDMX');

  const sitemap = readFileSync(new URL('sitemap-0.xml', dist), 'utf8');
  assert.equal(sitemap.includes('https://barberia.mx/buscar/'), false, 'una ruta noindex no debe estar en el sitemap');
});
