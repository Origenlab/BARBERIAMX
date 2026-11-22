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

const load = () => JSON.parse(readFileSync(dataUrl, 'utf8'));

test('la colección editorial contiene 45 fichas reales y cubre las 16 alcaldías', () => {
  assert.equal(existsSync(dataUrl), true, 'falta src/data/barberias-cdmx.json');
  const records = load();

  assert.equal(records.length, 45);
  assert.equal(records.filter(({ isNew }) => isNew).length, 40);
  assert.equal(records.filter(({ verificationStatus }) => verificationStatus === 'verified').length, 4);
  assert.equal(records.filter(({ verificationStatus }) => verificationStatus === 'reviewed').length, 40);
  assert.equal(records.filter(({ verificationStatus }) => verificationStatus === 'partial').length, 1);
  assert.deepEqual([...new Set(records.map(({ borough }) => borough))].sort(), [...alcaldias].sort());
  assert.equal(new Set(records.map(({ slug }) => slug)).size, records.length, 'los slugs deben ser únicos');
  assert.equal(new Set(records.map(({ telephone }) => telephone)).size, records.length, 'los teléfonos deben ser únicos');
  assert.equal(new Set(records.map(({ address }) => address)).size, records.length, 'los domicilios deben ser únicos');
});

test('las superficies editoriales no conservan rankings, precios ni conteos obsoletos de CDMX', () => {
  const article = readFileSync(new URL('src/content/articulos/mejores-barberias-ciudad-de-mexico-cdmx.md', root), 'utf8');
  const pages = readFileSync(new URL('src/data/pages.json', root), 'utf8');

  assert.doesNotMatch(article, /ranking-number|ranking-price|Barberías destacadas|\$\d/);
  assert.match(article, /45 fichas/);
  assert.doesNotMatch(pages, /45 fichas verificadas|<dt>Fichas<\/dt><dd>5<\/dd>|Cinco barberías/);
});

test('cada ficha conserva trazabilidad y solo datos publicables', () => {
  const records = load();

  for (const record of records) {
    assert.match(record.id, /^cdmx-[a-z0-9-]+$/);
    assert.match(record.slug, /^[a-z0-9-]+$/);
    assert.ok(record.name.trim());
    assert.ok(record.address.trim());
    assert.ok(record.telephone.trim());
    assert.match(record.verifiedAt, /^2026-\d{2}-\d{2}$/);
    assert.ok(record.sources.length >= 1, `${record.name} necesita al menos una fuente`);
    assert.ok(record.sources.every((source) => /^https:\/\//.test(source)), `${record.name} tiene una fuente inválida`);
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
  assert.equal(existsSync(new URL('src/components/BarbershopCard.astro', root)), true);
  assert.equal(existsSync(new URL('src/components/BarbershopDetail.astro', root)), true);
  assert.equal(existsSync(new URL('src/pages/ciudad-de-mexico/index.astro', root)), true);
  assert.equal(existsSync(new URL('src/pages/ciudad-de-mexico/[slug].astro', root)), true);
});
