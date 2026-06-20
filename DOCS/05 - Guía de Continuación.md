# 05 — Guía de Continuación

> Roadmap de próximos pasos, cómo añadir páginas/componentes nuevos siguiendo el sistema, y orden de prioridad.

---

## 1. Roadmap

### Fase 1 — Pendiente (alto valor SEO + cobertura)

#### 1.0 ✅ Directorio Nacional `/directorio/` — Completado 2026-05-28
- Hub principal del catálogo con search hero + 12 chips por servicio + 6 regiones + 8 features + 32 estados + CTA
- Patrones nuevos: `.ed-chips`, `.ed-regions`, `.ed-search-hero`
- Schema CollectionPage + BreadcrumbList + ItemList
- Nav actualizado para apuntar aquí

**Pendientes derivados:**
- [ ] `/regiones/{slug}/` × 6 (Norte, Pacífico Norte, Bajío, Centro, Pacífico Sur, Sureste)
- [ ] `/estados/{slug}/` × 31 (todos excepto CDMX que ya existe en `/ciudad-de-mexico/`)
- [ ] `/destacadas/` (hub de Editor's Picks 2026)
- [ ] `/registro` (form de alta para barberías)
- [ ] `/criterios-editoriales` (transparencia de la curaduría)
- [ ] `/buscar?q=` (página de resultados de búsqueda)

#### 1.1 Migrar 5 sub-categorías a `.ed-cover` + `.ed-articles`
- [ ] `/categorias/tendencias/index.html`
- [ ] `/categorias/tecnicas/index.html`
- [ ] `/categorias/productos/index.html`
- [ ] `/categorias/negocios/index.html`
- [ ] `/categorias/estilo-de-vida/index.html`

Cada una: cover de la categoría + featured article + lista de artículos de esa categoría.

#### 1.2 Migrar 5 detalle de barberías a template profile editorial
- [ ] `/ciudad-de-mexico/barberia-roma-norte-cuauhtemoc.html` (The Barber's Spa)
- [ ] `/ciudad-de-mexico/barberia-condesa-cuauhtemoc.html` (The Gentleman's)
- [ ] `/ciudad-de-mexico/barberia-polanco-miguel-hidalgo.html` (Barbería Deluxe)
- [ ] `/ciudad-de-mexico/barberia-juarez-cuauhtemoc.html` (Scalper Studio)
- [ ] `/ciudad-de-mexico/barberia-del-valle-centro-benito-juarez.html` (Mr. Venez)

Template necesario:
- Hero image grande (sin sidebar)
- Stats row (rating, reviews, founded, employees)
- Servicios + precios
- Hours
- Ubicación + mapa embed
- Gallery (4-6 fotos)
- Related barberías cerca
- Schema `LocalBusiness` / `HealthAndBeautyBusiness`

#### 1.3 Migrar 3 artículos largos a template long-form
- [ ] `/articulos/mejores-barberias-ciudad-de-mexico-cdmx.html`
- [ ] `/articulos/rutina-grooming-hombre-moderno-guia-completa.html`
- [ ] `/articulos/como-encontrar-barberia-cerca-de-ti.html`

Template necesario:
- Cover article (1 columna, gran imagen)
- Byline block (autor, fecha, tiempo lectura)
- Cuerpo en `.ed-prose` con drop cap inicial (`.ed-drop`)
- Sidebar TOC sticky (clases pendientes)
- Pull quotes inline
- Related articles al final
- Schema `Article`

### Fase 2 — Mejoras del sistema

- [ ] Regenerar `/sitemap.xml` con páginas nuevas
- [ ] Actualizar `/robots.txt` si hace falta
- [ ] Crear OG images reales (`/img/og-*.jpg`) — actualmente referencian imágenes que no existen
- [ ] Migrar `.ed-section-head` (hubs) → `.ed-section-intro` (homepage pattern) si el cliente lo quiere
- [ ] Limpiar `/js/app.js` (legacy)
- [ ] Decidir destino de `webpack.*.js` configs (eliminar o usar)
- [ ] Investigar si `.audit/` folder tiene contenido útil

### Fase 3 — Features nuevas (después de cobertura)

- [ ] Plantilla de página de marketplace producto individual
- [ ] Plantilla de página de vacante individual
- [ ] Página "Sobre nosotros" / "Equipo editorial"
- [ ] Página de contacto / formulario
- [ ] Sistema real de búsqueda (actualmente `<input>` decorativo)
- [ ] Filtros funcionales para directorio (estado/alcaldía/servicio)
- [ ] Newsletter integration real (Mailchimp / Buttondown / etc.)

---

## 2. Cómo añadir una página nueva

### 2.1 Decidir el patrón

| Tipo | Patrón base | Cover |
|---|---|---|
| Hub (índice de muchos items) | `.ed-cover` + `.ed-atlas` o `.ed-articles` | sí |
| Detalle individual | Hero específico al tipo (profile, article) | no |
| Funcional (form, dashboard) | Layout simple sin hero editorial | no |

### 2.2 Estructura HTML mínima

```html
<!doctype html>
<html lang="es-MX">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{H1 keyword} · {subtitle} — Barberia.mx</title>

  <link rel="stylesheet" href="/css/style.css">
  <link rel="stylesheet" href="/css/editorial.css">

  <!-- Meta, OG, Twitter, canonical, theme-color (ver 04 - SEO) -->

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preconnect" href="https://images.unsplash.com">
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300;1,9..144,400;1,9..144,500&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

  <!-- Schema.org JSON-LD específico al tipo de página -->
  <script type="application/ld+json">{ ... }</script>
</head>
<body>

  <a href="#main" class="ed-skip">Saltar al contenido</a>

  <div data-component="masthead"></div>
  <div data-component="header"></div>

  <main id="main">
    <header class="ed-cover">
      <div class="ed-wrap">
        <nav class="ed-crumbs" aria-label="Migas de pan">…</nav>
        <div class="ed-cover-grid">…</div>
      </div>
    </header>

    <section class="ed-section">
      <div class="ed-wrap">
        <header class="ed-section-intro|head">…</header>
        <!-- contenido -->
      </div>
    </section>

    <!-- más secciones -->
  </main>

  <div data-component="footer"></div>

  <script src="/js/components.js" defer></script>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('.ed-section-intro, .ed-feature').forEach(el => el.setAttribute('data-reveal', ''));
    });
  </script>
</body>
</html>
```

### 2.3 Checklist al crear página nueva

- [ ] `<title>` incluye keyword + Barberia.mx
- [ ] `meta description` 150-160 chars con keyword + USP
- [ ] `<link rel="canonical">` apunta a la URL final
- [ ] Schema.org JSON-LD apropiado al tipo de página
- [ ] OG image existe (o se crea placeholder)
- [ ] Skip link al `#main`
- [ ] `<main id="main">` envolviendo el contenido
- [ ] Componentes globales en slots (`<div data-component>`)
- [ ] Sección hero con `.ed-cover` o variante
- [ ] Breadcrumbs `.ed-crumbs` con `aria-current="page"` en el último
- [ ] Carga `editorial.css` DESPUÉS de `style.css`
- [ ] Carga `components.js` con `defer`
- [ ] Reveal hooks via `data-reveal` en elementos animables
- [ ] Probar en navegador local
- [ ] Verificar console limpia
- [ ] Verificar responsive en 380/640/980/1180
- [ ] Actualizar `/sitemap.xml`
- [ ] Actualizar este doc ([[03 - Páginas]])

---

## 3. Cómo añadir un componente nuevo

### Componente HTML reutilizable (en `/components/`)

1. Crear `/components/mi-componente.html` con HTML semántico
2. Agregar `mi-componente` al array `CONFIG.allow` en `/js/components.js`
3. Usar en cualquier página: `<div data-component="mi-componente"></div>`
4. Si necesita hooks (datos dinámicos), agregar `hookMiComponente()` en components.js
5. Documentar en [[02 - Arquitectura]]

### Componente CSS (clase nueva)

1. Identificar grupo en `editorial.css` (1-26 numerados)
2. Agregar al final del grupo correspondiente o crear nuevo grupo
3. Convención de nombres: `.ed-{nombre-componente}` + sub `.ed-{nombre}-{parte}`
4. Tokens: usar variables `--ink`, `--paper`, `--copper`, etc., NO hardcoded
5. Responsive: añadir media queries propias O usar las globales
6. Documentar en [[01 - Sistema de Diseño#Componentes UI]]

---

## 4. Reglas para mantener consistencia

### Cuando dudes, copia de un patrón existente

- Listado con thumbnail: copia de `.ed-article-row` (blog)
- Grid de cards numeradas: copia de `.ed-states` (directorio) o `.ed-mkt-cats` (marketplace)
- Hero con stats: copia de `.ed-hero-cols` (homepage)
- Cover de hub: copia de `.ed-cover` (blog/zona/categorias)
- Pull quote oscuro: copia de `.ed-manifesto`

### Siempre que pongas texto

- Verificar que sea **nacional** (no CDMX-only) — ver [[memory · feedback-national-scope]]
- Mencionar `<strong>Barberia.mx</strong>` en bloques de copy SEO
- Usar `<em>` para acentos italic en h1/h2 (Fraunces los renderiza preciosos en cobre)
- Smart quotes (`'` `'` `"` `"`) en lugar de straight quotes
- En-dash (`—`) o thin separator (`·`) en lugar de hyphen para listas inline

### Imágenes

- Usar Unsplash hotlinks con `?w={width}&q={80-85}&auto=format&fit=crop`
- Aspect ratios: hero 16/9 o 5/4, cards 4/5 o 4/3, thumbnails 4/3
- Filter base: `grayscale(.4) contrast(1.05)`, hover `grayscale(0)`
- Lazy loading: imposible con background-image; si necesitas lazy usa `<img loading="lazy">`

### Hover states

- Links: invertir bg → ink, color → paper, accent → copper-hi
- Cards: `transform: translateY(-4px)` + filter color
- Botones: bg ink → copper-deep
- Tiempo: `--t-fast` (200ms)

---

## 5. Testing manual antes de deploy

```bash
# Levantar server local
cd ~/Documents/Claude/Projects/BARBERIA && python3 -m http.server 8000
```

Checklist visual:
- [ ] Página renderea sin errores en console
- [ ] Componentes globales (masthead/header/footer) cargan
- [ ] Nav activo (`aria-current`) destaca link correcto
- [ ] Imágenes Unsplash cargan
- [ ] Hover states funcionan
- [ ] Reveal animations no dejan contenido oculto
- [ ] Mobile: nav toggle abre drawer
- [ ] Mobile: search input no causa zoom iOS
- [ ] Footer year auto-actualiza
- [ ] Masthead fecha auto-actualiza

---

## 6. Git workflow sugerido

- Feature branches: `feat/categoria-tendencias`, `feat/barberia-roma-norte`
- Commits descriptivos: `feat(blog): migrar tendencias a sistema editorial`
- Push directo a `main` despliega a producción (GitHub Pages)
- Antes de merge a main: probar en branch deploy preview si está configurado

---

## Relacionado
- [[03 - Páginas]] — qué páginas ya están migradas
- [[06 - Patrones Editoriales]] — reglas de diseño consistentes
- [[07 - Decisiones del Cliente]] — historial de iteraciones
