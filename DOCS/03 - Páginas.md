# 03 — Páginas Implementadas

> Inventario de páginas del sitio con su concepto editorial, secciones, clases CSS clave y Schema.org.

---

## Resumen

| Página | Path | Concepto | Schema | Estado |
|---|---|---|---|---|
| Homepage | `/index.html` | Cover editorial nacional | `Organization` + `WebSite` + `ItemList` | ✅ Migrada |
| **Directorio Nacional** | `/directorio/index.html` | **Catálogo completo · servicios · regiones · 32 estados** | `CollectionPage` + `BreadcrumbList` + `ItemList` | ✅ **Nueva (2026-05-28)** |
| Blog | `/blog.html` | Front-of-book magazine | `Blog` | ✅ Migrada |
| Zona | `/zona.html` | Atlas geográfico CDMX | `ItemList` | ✅ Migrada |
| Categorías hub | `/categorias/index.html` | Department hub | `CollectionPage` | ✅ Migrada |
| CDMX guide | `/ciudad-de-mexico/index.html` | City guide | `TouristAttraction` | ✅ Migrada |
| 404 | `/404.html` | Error editorial | — | ✅ Migrada |
| Artículos largos | `/articulos/*.html` (3) | Long-form prose | `Article` | ⏳ Pendiente |
| Sub-categorías | `/categorias/*/index.html` (5) | Department detail | `CollectionPage` | ⏳ Pendiente |
| Barberías detalle | `/ciudad-de-mexico/barberia-*.html` (5) | Barbershop profile | `LocalBusiness` / `BarberShop` | ⏳ Pendiente |

---

## 1. Homepage — `/index.html`

**Concepto:** Cover editorial del directorio nacional con 2 columnas (título + SEO copy), quick-nav de 6 secciones, y módulos featured de directorio · marketplace · empleo · cultura.

### Secciones (orden)

1. **Skip link** (`a.ed-skip`)
2. **Masthead** (componente)
3. **Header nav** (componente)
4. **Hero** (`.ed-hero` con `.ed-hero-cols`)
   - Col 1 (`.ed-hero-col-main`): kicker · h1 · dek
   - Col 2 (`.ed-hero-col-aside`): 2 párrafos SEO apilados con `<strong>Barberia.mx</strong>`
   - Search bar full-width abajo
5. **Quick nav** (`.ed-quick-nav` con `.ed-quick-grid` 6-col) — menú de secciones tipo meseci
6. **§ 01 Directorio Nacional** (`.ed-section-intro` + `.ed-states` + `.ed-features`)
7. **§ 02 Marketplace Nacional** (`.ed-section-intro` + `.ed-mkt-cats` + `.ed-products`)
8. **Manifesto** (`.ed-manifesto` — pull-quote oscuro)
9. **§ 03 Bolsa de Trabajo** (`.ed-section-intro` + `.ed-jobs-grid`)
10. **§ 04 CTA Registro** (`.ed-cta`)
11. **§ 05 Cultura & Editorial** (`.ed-section-intro` + `.ed-blog-grid`)
12. **Newsletter** (`.ed-news`)
13. **Footer** (componente)

### Patrón de section-head usado

Todas las secciones de homepage usan el pattern nuevo [[06 - Patrones Editoriales#Section Intro Pattern]] (`.ed-section-intro` 2-col).

### Reveal animations

Selectores con `data-reveal`:
- `.ed-section-head` `.ed-section-intro` `.ed-feature` `.ed-product` `.ed-job` `.ed-blog-card` `.ed-manifesto-inner`

### SEO meta

```html
<title>Las Mejores Barberías de México · Directorio Nacional — Barberia.mx</title>
<meta name="description" content="Directorio nacional de las mejores barberías de México. Más de 1,200 barberías profesionales reseñadas en los 32 estados del país…">
```

Ver [[04 - SEO y Schema#Homepage]] para Schema.org completo.

---

## 1b. Directorio Nacional — `/directorio/index.html`

**Concepto:** Hub principal del catálogo de barberías. Página landing del slot § 01 del homepage extendida con múltiples filtros: por servicio, por región, top destacadas nacional, por estado (32 cards). Es la página de mayor profundidad SEO del sitio.

### Secciones

1. **Cover** (`.ed-cover`) — crumbs · eyebrow con 3 datos · h1 italic · dek · meta date
2. **Search Hero** (`.ed-search-hero`) — bloque 2-col con kicker+h2 a la izquierda y search form full-width a la derecha
3. **§ 01 Por Servicio** (`.ed-section-intro` + `.ed-chips`) — 12 chips de filtros con count: Corte clásico (812) · Fade (724) · Barba (689) · Spa (218) · Faciales (156) · Color (94) · Diseño (147) · Corte Niño (203) · Navaja (412) · Premium (187) · Cita el mismo día (523) · A domicilio (68)
4. **§ 02 Por Región** (`.ed-section-intro` + `.ed-regions`) — 6 regiones agrupando los 32 estados: Frontera Norte (366) · Pacífico Norte (95) · El Bajío (415) · Centro & Valle de México (516) · Pacífico Sur (83) · Sureste & Península (202)
5. **§ 03 Top Destacadas** Editor's Picks 2026 (`.ed-features`) — 1 big + 7 sm; mix nacional (CDMX, Monterrey, Guadalajara, Mérida, Puebla, Querétaro)
6. **Manifesto** — curaduría editorial · "Cada barbería de este directorio fue visitada en persona"
7. **§ 04 Por Estado** (`.ed-section-intro` + `.ed-states-pro`) — los 32 estados ordenados por densidad descendente
8. **CTA Registro** (`.ed-cta`) — convocatoria nacional

### Patrones nuevos creados para esta página

- `.ed-chips` `.ed-chip` `.ed-chip-count` — filter tags por servicio con count en monospace; soporta `aria-pressed="true"` para estado activo
- `.ed-regions` `.ed-region` `.ed-region-num` `.ed-region-name` `.ed-region-states` `.ed-region-meta` `.ed-region-arrow` — grid 3-col con cards agrupando estados, hover invert ink
- `.ed-search-hero` `.ed-search-hero-grid` — bloque search promovido con kicker+h2+form (2-col 5/7)

### Schema

```json
{ "@type": "CollectionPage", "@id": "...#collection", "mainEntity": { "@id": "...#estados" }}
{ "@type": "BreadcrumbList", "itemListElement": [Inicio, Directorio Nacional] }
{ "@type": "ItemList", "numberOfItems": 32, "itemListElement": [32 estados] }
```

### Internal linking

- Cada chip → `?servicio={slug}` (filtro futuro)
- Cada región → `/regiones/{slug}/` (páginas pendientes)
- Cada estado → `/estados/{slug}/` o `/ciudad-de-mexico/` (CDMX existe)
- Cada feature → página de barbería individual (algunas existen, otras pendientes)
- CTA Registro → `/registro` y `/criterios-editoriales` (pendientes)

### Nav update relacionado

Al crear esta página se actualizó `components/header.html` y `components/footer.html`:
- Link "Directorio" en nav principal: `/#directorio` → `/directorio/`
- Footer "Por estados" → "Directorio nacional" + "Por estado" como sub-item

## 2. Blog — `/blog.html`

**Concepto:** Front-of-book magazine. Cover con masthead → featured story hero → departments grid (5 categorías) → archive list (artículos completos).

### Secciones

1. Cover (`.ed-cover`) con crumbs · eyebrow · title · dek · meta date
2. § 01 Featured Story (`.ed-feat-story`) — 1 historia hero con kicker "Editor's Pick"
3. § 02 Departments (`.ed-depts`) — 5 categorías editoriales (Tendencias, Técnicas, Productos, Negocios, Estilo de vida)
4. § 03 Archive (`.ed-articles` con `.ed-article-row`) — listado completo de artículos
5. Manifesto
6. Newsletter

### Schema

```json
{
  "@type": "Blog",
  "name": "La Edición — Barberia.mx",
  "publisher": { "@type": "Organization", ... }
}
```

---

## 3. Zona — `/zona.html`

**Concepto:** Atlas geográfico de las zonas barberas de CDMX. Tiles con cover image, alcaldía eyebrow, nombre, dek, contador + rating.

### Secciones

1. Cover
2. § 01 Centro & Poniente — atlas 3-col (Roma Norte, Condesa, Polanco, Juárez, Reforma, Santa Fe)
3. § 02 Sur — atlas 3-col (Del Valle, Coyoacán, San Ángel)

### Schema

```json
{
  "@type": "ItemList",
  "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Roma Norte" }, ...]
}
```

---

## 4. Categorías hub — `/categorias/index.html`

**Concepto:** Department hub con las 5 categorías permanentes como bloques editoriales grandes.

### Secciones

1. Cover (crumbs incluye `Inicio / La Edición / Categorías`)
2. Single `.ed-depts` con 5 categorías (la 5ta `Estilo de vida` ocupa todo el ancho)

### Schema

```json
{ "@type": "CollectionPage" }
```

---

## 5. CDMX guide — `/ciudad-de-mexico/index.html`

**Concepto:** City guide editorial con spread de 5 barberías destacadas + grid de 8 alcaldías + CTA registro.

### Secciones

1. Cover (crumbs `Inicio / Directorio / Ciudad de México`)
2. § 01 Selección 2026 — `.ed-features` spread (1 hero + 4 sm)
3. § 02 Por alcaldía — `.ed-states` grid 4-col con 8 alcaldías
4. CTA Registro

### Schema

```json
{ "@type": "TouristAttraction", "address": { "addressLocality": "Ciudad de México" } }
```

---

## 6. 404 — `/404.html`

**Concepto:** Error editorial con número "404" gigante (clamp 8-22rem) con "0" en italic cobre, dek explicativo y links alternativos.

### Estructura

```html
<main class="ed-error">
  <div class="ed-error-grid">
    <div class="ed-error-num">4<em>0</em>4</div>
    <div class="ed-error-body">
      <p class="ed-error-kicker">— Error · página no encontrada</p>
      <h1 class="ed-error-title">…</h1>
      <p class="ed-error-dek">…</p>
      <nav class="ed-error-links">…</nav>
    </div>
  </div>
</main>
```

Sin Schema (es un error page).

---

## Páginas pendientes (no migradas)

### 7. Artículos largos (3) — `/articulos/*.html`

Pendiente diseñar template editorial long-form con:
- Drop cap inicial (`.ed-drop`)
- Pull quotes
- Sidebar TOC sticky
- Byline block grande
- Related articles al final
- Schema `Article` con `author`, `datePublished`, `wordCount`

### 8. Sub-categorías (5) — `/categorias/*/index.html`

Pendiente template archivo editorial con:
- Cover de la categoría
- Featured article de la categoría
- Listado de todos los artículos de esa categoría
- Schema `CollectionPage` con `mainEntity` ItemList

### 9. Barberías detalle (5) — `/ciudad-de-mexico/barberia-*.html`

Pendiente template profile editorial con:
- Hero image grande
- Stats: rating, reviews, founded
- Servicios + precios (`PriceSpecification`)
- Hours (`OpeningHoursSpecification`)
- Ubicación con mapa (`PostalAddress`)
- Gallery
- Related barberías
- Schema `LocalBusiness` o `HealthAndBeautyBusiness`

Ver [[05 - Guía de Continuación]] para roadmap completo y prioridades.

---

## Relacionado
- [[01 - Sistema de Diseño]] — clases CSS de cada componente
- [[04 - SEO y Schema]] — schemas por tipo de página
- [[06 - Patrones Editoriales]] — reglas para diseñar páginas nuevas
