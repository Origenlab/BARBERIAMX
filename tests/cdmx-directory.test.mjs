import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const dataUrl = new URL('src/data/barberias-cdmx.json', root);

const alcaldias = [
  'Álvaro Obregón',
  'Azcapotzalco',
  'Benito Juárez',
  'Coyoacán',
  'Cuajimalpa de Morelos',
  'Cuauhtémoc',
  'Gustavo A. Madero',
  'Iztacalco',
  'Iztapalapa',
  'La Magdalena Contreras',
  'Miguel Hidalgo',
  'Milpa Alta',
  'Tláhuac',
  'Tlalpan',
  'Venustiano Carranza',
  'Xochimilco',
];

const metasPorAlcaldia = {
  'Álvaro Obregón': 9,
  Azcapotzalco: 6,
  'Benito Juárez': 14,
  Coyoacán: 10,
  'Cuajimalpa de Morelos': 4,
  Cuauhtémoc: 18,
  'Gustavo A. Madero': 9,
  Iztacalco: 4,
  Iztapalapa: 9,
  'La Magdalena Contreras': 3,
  'Miguel Hidalgo': 12,
  'Milpa Alta': 3,
  Tláhuac: 3,
  Tlalpan: 7,
  'Venustiano Carranza': 5,
  Xochimilco: 4,
};

const normalize = (value) => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLocaleLowerCase('es-MX')
  .replace(/\s+/g, ' ')
  .trim();

const digits = (value) => value.replace(/\D/g, '');

const load = () => JSON.parse(readFileSync(dataUrl, 'utf8'));

test('la colección editorial contiene 120 fichas y cumple la distribución aprobada', () => {
  assert.equal(existsSync(dataUrl), true, 'falta src/data/barberias-cdmx.json');
  const records = load();

  assert.equal(records.length, 120);
  assert.equal(records.filter(({ isNew }) => isNew).length, 75);
  assert.deepEqual([...new Set(records.map(({ borough }) => borough))].sort(), [...alcaldias].sort());

  const counts = Object.fromEntries(alcaldias.map((borough) => [
    borough,
    records.filter((record) => record.borough === borough).length,
  ]));
  assert.deepEqual(counts, metasPorAlcaldia);

  const unique = (values, label) => {
    const normalized = values.map(normalize);
    assert.equal(new Set(normalized).size, records.length, `${label} deben ser únicos`);
  };

  unique(records.map(({ id }) => id), 'los identificadores');
  unique(records.map(({ slug }) => slug), 'los slugs');
  unique(records.map(({ telephone }) => digits(telephone)), 'los teléfonos');
  unique(records.map(({ address }) => address), 'los domicilios');
  unique(records.map(({ name, address }) => `${name} ${address}`), 'los negocios');
});

test('las superficies editoriales no conservan rankings, precios ni conteos obsoletos de CDMX', () => {
  const article = readFileSync(new URL('src/content/articulos/mejores-barberias-ciudad-de-mexico-cdmx.md', root), 'utf8');
  const pages = readFileSync(new URL('src/data/pages.json', root), 'utf8');

  assert.doesNotMatch(article, /ranking-number|ranking-price|Barberías destacadas|\$\d/);
  assert.match(article, /120 fichas/);
  assert.doesNotMatch(pages, /45 fichas|<dt>Fichas<\/dt><dd>5<\/dd>|Cinco barberías/);
});

test('cada ficha conserva trazabilidad y solo datos publicables', () => {
  const records = load();

  for (const record of records) {
    assert.match(record.id, /^cdmx-[a-z0-9-]+$/);
    assert.match(record.slug, /^[a-z0-9-]+$/);
    assert.ok(record.name.trim());
    assert.ok(record.address.trim());
    assert.ok(record.telephone.trim());
    assert.match(record.postalCode, /^\d{5}$/, `${record.name} necesita código postal válido`);
    assert.equal(digits(record.telephone).length, 10, `${record.name} necesita teléfono de diez dígitos`);
    assert.match(record.verifiedAt, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(record.sources.length >= 1, `${record.name} necesita al menos una fuente`);
    assert.ok(record.sources.every((source) => /^https:\/\//.test(source)), `${record.name} tiene una fuente inválida`);
    if (record.verificationStatus === 'verified') {
      assert.ok(record.sources.length >= 2, `${record.name} necesita dos fuentes para figurar como contrastada`);
    }
    assert.ok(record.description.length >= 80 && record.description.length <= 400, `${record.name} necesita descripción editorial completa`);
    assert.doesNotMatch(record.description, /\b(?:mejor|número uno|premium garantizado|recomendad[ao])\b/i, `${record.name} contiene una afirmación promocional`);
    assert.doesNotMatch(record.name, /[\u{1F300}-\u{1FAFF}]/u, `${record.name} debe usar un nombre editorial limpio`);
    assert.equal('website' in record, false, `${record.name} no debe publicar sitio web`);
    assert.equal('socialNetworks' in record, false, `${record.name} no debe publicar redes sociales`);
    assert.equal('mapUrl' in record, false, `${record.name} no debe publicar mapa`);
  }
});

test('el esquema y las rutas de CDMX son componentes dedicados', () => {
  const contentConfig = readFileSync(new URL('src/content.config.ts', root), 'utf8');

  assert.match(contentConfig, /barberiasCdmx/);
  assert.match(contentConfig, /file\('src\/data\/barberias-cdmx\.json'\)/);
  assert.doesNotMatch(contentConfig, /postalCode:[\s\S]{0,80}\.optional\(\)/, 'el código postal debe ser obligatorio');
  assert.equal(existsSync(new URL('src/components/BarbershopCard.astro', root)), true);
  assert.equal(existsSync(new URL('src/components/BarbershopDetail.astro', root)), true);
  assert.equal(existsSync(new URL('src/pages/ciudad-de-mexico/index.astro', root)), true);
  assert.equal(existsSync(new URL('src/pages/ciudad-de-mexico/[slug].astro', root)), true);
});

test('el catálogo compacto ofrece filtros combinables y paginación progresiva', () => {
  const index = readFileSync(new URL('src/pages/ciudad-de-mexico/index.astro', root), 'utf8');
  const card = readFileSync(new URL('src/components/BarbershopCard.astro', root), 'utf8');
  const styles = readFileSync(new URL('src/styles/editorial.css', root), 'utf8');

  assert.match(index, /const total = barbershops\.length/);
  assert.match(index, /\$\{total\} fichas/);
  assert.match(index, /data-cdmx-filter-panel/);
  assert.match(index, /data-cdmx-filter-toggle/);
  assert.match(index, /data-cdmx-borough/);
  assert.match(index, /data-cdmx-neighborhood/);
  assert.match(index, /data-cdmx-service/);
  assert.match(index, /data-cdmx-hours/);
  assert.match(index, /data-cdmx-status/);
  assert.match(index, /data-cdmx-prev/);
  assert.match(index, /data-cdmx-next/);
  assert.match(index, /data-cdmx-page/);
  assert.match(index, /<script src="\/js\/cdmx-directory\.js" defer><\/script>/);

  assert.match(card, /data-neighborhood=/);
  assert.match(card, /data-services=/);
  assert.match(card, /data-has-hours=/);
  assert.match(card, /data-status=/);

  const scriptUrl = new URL('public/js/cdmx-directory.js', root);
  assert.equal(existsSync(scriptUrl), true, 'falta el controlador progresivo del directorio');
  const script = readFileSync(scriptUrl, 'utf8');
  assert.match(script, /PAGE_SIZE\s*=\s*24/);
  assert.match(script, /URLSearchParams/);
  assert.doesNotMatch(script, /innerHTML|eval\(|new Function\(/);

  assert.match(styles, /\.cdmx-catalog\s*\{/);
  assert.match(styles, /\.cdmx-filter-panel\s*\{/);
  assert.match(styles, /\.cdmx-pagination\s*\{/);
  assert.match(styles, /\.cdmx-detail__quick\s*\{/);
  assert.match(styles, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
});
