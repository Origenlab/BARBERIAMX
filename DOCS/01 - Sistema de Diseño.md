# 01 — Sistema de Diseño Editorial

> Tokens, paleta, tipografía, grid y componentes del sistema editorial v1 de Barberia.mx.
> Archivo CSS principal: `/css/editorial.css` (~1,900 líneas)

---

## 1. Paleta de Color

| Token | Hex | Uso |
|-------|-----|-----|
| `--ink` | `#0a0a0a` | Negro principal · texto, bordes fuertes, hover invert |
| `--ink-soft` | `#1a1916` | Negro suave · body text secundario |
| `--paper` | `#f3ede3` | Crema fondo principal |
| `--paper-warm` | `#ebe3d4` | Crema cálido · CTA bg, hover states |
| `--paper-deep` | `#e2d9c8` | Crema profundo · borders sutiles |
| `--copper` | `#b87333` | Cobre principal · acentos, dots, links |
| `--copper-hi` | `#d18c4a` | Cobre claro · sobre fondo oscuro |
| `--copper-deep` | `#7a4e22` | Cobre profundo · kickers, hover text |
| `--rule` | `#d6cdbb` | Hairline divisor estándar |
| `--rule-strong` | `#0a0a0a` | Hairline fuerte (= --ink) |
| `--muted` | `#6b6457` | Texto muted, meta |
| `--muted-2` | `#8a8273` | Placeholder, disabled |

**Reglas de uso:**
- Backgrounds primarios: `--paper` (default) o `--ink` (manifesto/footer)
- Texto sobre paper: `--ink` (h1-h2), `--ink-soft` (body), `--muted` (meta)
- Acentos italic en h1/h2 (`<em>`): `--copper-deep`
- Hairlines sutiles: `--rule`; hairlines de sección: `--ink`
- Links inline en prose: `border-bottom: 1px solid var(--copper)`

---

## 2. Tipografía

### Familias

```css
--font-display: "Fraunces", "Playfair Display", Georgia, serif;
--font-body:    "Inter", -apple-system, sans-serif;
--font-mono:    "JetBrains Mono", ui-monospace, Menlo, monospace;
```

Cargadas via Google Fonts con preconnect en `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300;1,9..144,400;1,9..144,500&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

**Fraunces es variable** (axes: italic + opsz 9-144 + weight 300-500). Usar `font-variation-settings: "opsz" 36` para glifos menos decorativos en tamaños pequeños.

### Escala editorial (ver [[06 - Patrones Editoriales]] para detalle)

| Token / Pattern | Rango clamp | Uso |
|---|---|---|
| Hero h1 (`.ed-hero-title`) | clamp(2rem, 4.2vw, 3.5rem) | Título principal homepage |
| Cover title (`.ed-cover-title`) | clamp(3rem, 8.5vw, 7.5rem) | Hubs (blog, zona, categorias, cdmx) |
| Section-intro h2 (`.ed-section-intro-title`) | clamp(1.875rem, 3.2vw, 2.75rem) | Encabezados de sección homepage |
| Aside h2 (`.ed-hero-aside-title`) | clamp(1.375rem, 1.9vw, 1.75rem) | Subtítulos en col aside |
| Body | clamp(1rem, 0.95rem + 0.2vw, 1.0625rem) | Prosa general |
| Kicker | 0.6875rem · letter-spacing .22em · uppercase | Etiquetas mono |
| Meta line | 10px · letter-spacing .18em · uppercase | Metadatos |

**Regla clave** (ver [[memory · feedback-smaller-typography]]):
> NO uses los tokens `--t-mega` ni `--t-display` para hero titles. Frank los rechazó como "muy grandes". Usar el rango editorial.

### Pesos

- 300 · light · solo para fade-in decorativo, evitar
- 400 · regular · default para display y body
- 500 · medium · énfasis, kickers de marca
- 600 / 700 · usar muy raramente

### Características OpenType

```css
body {
  font-feature-settings: "ss01", "cv11", "kern", "liga";
  font-variant-numeric: oldstyle-nums proportional-nums;
  hanging-punctuation: first last;
}

/* Números tabulares para precios, ratings, stats */
.ed-num, .ed-jobs-stat-n, .ed-product-price, [data-masthead-count] {
  font-variant-numeric: tabular-nums lining-nums;
}
```

---

## 3. Layout y Grid

### Container

```css
--container-ed: 1480px;
--gutter-ed: clamp(1.25rem, 4vw, 3.5rem);
--grid-gap: clamp(1rem, 1.6vw, 1.75rem);
```

Wrapper estándar:
```html
<div class="ed-wrap">…</div>
```

### Grid 12-col

Casi todos los layouts usan `display: grid; grid-template-columns: repeat(12, 1fr)` o variantes asimétricas (`5fr 7fr`, `7fr 5fr`, `6fr 6fr`).

### Spacing scale

```css
--space-xs:  0.5rem;
--space-sm:  1rem;
--space-md:  1.5rem;
--space-lg:  2rem;
--space-xl:  3rem;
--space-2xl: 4rem;
--space-3xl: 6rem;
--space-4xl: 8rem;
```

Para padding de sección: `padding: clamp(4rem, 8vw, 8rem) 0` (estándar) o `clamp(2rem, 4vw, 3.5rem)` (hero compacto).

### Breakpoints

| BP | Trigger |
|----|---------|
| `max-width: 1180px` | Quick-nav 6col → 3×2 |
| `max-width: 980px` | Nav menu hidden, mobile toggle visible · hero 2-col → 1-col · section-intro 2-col → 1-col |
| `max-width: 820px` | Cover title full-width · article rows stack |
| `max-width: 720px` | Padding compacto, ticker fuente reducida |
| `max-width: 640px` | Atlas/blog grid 2-col → 1-col |
| `max-width: 520px` | States/depts grid 1-col · credentials columns simplificadas |
| `max-width: 480px` | Masthead font reducido · ticker padding reducido |

iOS form fix obligatorio: `font-size: 16px` en inputs móviles para evitar zoom automático. Ver `.ed-search input` y `.ed-news-form input`.

---

## 4. Componentes UI (clases CSS)

### Tipográficos

- `.ed-mega` `.ed-display` `.ed-h1` `.ed-h2` `.ed-h3` — escalas display
- `.ed-kicker` — label mono con prefijo `—`
- `.ed-kicker-plain` — label mono sin prefijo
- `.ed-dek` — italic serif para standfirst
- `.ed-lead` — párrafo grande inicial
- `.ed-meta` — meta line mono
- `.ed-pull` — pull quote italic
- `.ed-drop` — drop cap (`::first-letter`)
- `.ed-balance` `.ed-pretty` — text-wrap utilities

### Layout / Hero

- `.ed-hero` `.ed-hero-cols` `.ed-hero-col-main` `.ed-hero-col-aside`
- `.ed-hero-title` `.ed-hero-aside-title` `.ed-hero-figure` `.ed-hero-credentials`
- `.ed-hero-search-bar`

### Quick nav (menú post-hero)

- `.ed-quick-nav` `.ed-quick-grid` `.ed-quick-link`
- `.ed-quick-num` `.ed-quick-name` `.ed-quick-meta` `.ed-quick-arrow`

### Section intro (2-col títulos del homepage)

- `.ed-section-intro` `.ed-section-intro-l` `.ed-section-intro-r`
- `.ed-section-intro-num` `.ed-section-intro-title` `.ed-section-intro-copy`

Ver [[06 - Patrones Editoriales]] § Section Intro Pattern.

### Section head (hubs: blog, zona, categorias, cdmx)

- `.ed-section-head` `.ed-section-num` `.ed-section-title` `.ed-section-aside`

> ⚠️ Pattern **viejo** (3 elementos en grid 12). Aún se usa en páginas hub. No migrado al pattern `.ed-section-intro` del homepage.

### Page cover (hubs)

- `.ed-cover` `.ed-cover-grid` `.ed-cover-eyebrow` `.ed-cover-title` `.ed-cover-dek` `.ed-cover-meta`
- `.ed-crumbs` (breadcrumbs)

### Cards / grids

- `.ed-states` `.ed-state` — grid de estados (4-col)
- `.ed-features` `.ed-feature` `.ed-feature-big` `.ed-feature-sm` — featured spread
- `.ed-mkt-cats` `.ed-mkt-cat` — marketplace categories
- `.ed-products` `.ed-product` — product grid
- `.ed-jobs-grid` `.ed-job` — job listings
- `.ed-blog-grid` `.ed-blog-card` — blog teasers
- `.ed-articles` `.ed-article-row` — article index list
- `.ed-depts` `.ed-dept` — department grid (hubs)
- `.ed-atlas` `.ed-atlas-tile` — zone atlas

### Bloques especiales

- `.ed-ticker` `.ed-ticker-track` — marquee animada (legacy, ya no en uso)
- `.ed-manifesto` — pull-quote sección oscura
- `.ed-cta` `.ed-cta-grid` — CTA registro
- `.ed-news` `.ed-news-form` — newsletter
- `.ed-error` `.ed-error-num` — 404
- `.ed-prose` — long-form article prose
- `.ed-prose-tight` — prose compacta para aside

### Botones / Links

- `.ed-btn` `.ed-btn-ghost` — botones principales
- `.ed-link-arrow` — link con flecha y border-bottom

### A11y / utilidades

- `.ed-skip` — skip link al main
- `.visually-hidden` — labels ocultos para screen readers
- `.ed-reveal` `.has-reveal` — animación scroll (intersection observer)

---

## 5. Tokens de motion

```css
--ease: cubic-bezier(.22,.61,.36,1);
--t-fast: 200ms;
--t-base: 380ms;
--t-slow: 700ms;
```

Reglas:
- Hover de links/botones: `--t-fast`
- Reveal de cards: `--t-base`
- Animación de imágenes (filter grayscale → color): `--t-slow`
- `prefers-reduced-motion: reduce` deshabilita todas las animations a 0.001s

---

## Relacionado
- [[02 - Arquitectura]] — cómo se carga este CSS y dónde viven los componentes
- [[06 - Patrones Editoriales]] — reglas y do/don't tipográficos
- [[03 - Páginas]] — qué clases usa cada página
