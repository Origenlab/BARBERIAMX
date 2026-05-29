# 02 — Arquitectura Técnica

> Estructura de archivos, componentes reutilizables y el loader `components.js`.

---

## 1. Estructura del repositorio

```
BARBERIA/
├── index.html              ← Homepage (refactor con slots)
├── 404.html                ← Error editorial
├── blog.html               ← Front-of-book magazine
├── zona.html               ← Atlas de zonas CDMX
├── CNAME                   ← barberia.mx (GitHub Pages)
├── favicon.ico · icon.svg · icon.png · site.webmanifest · robots.txt · sitemap.xml
│
├── articulos/              ← 3 artículos largos (PENDIENTES de migrar)
│   ├── como-encontrar-barberia-cerca-de-ti.html
│   ├── mejores-barberias-ciudad-de-mexico-cdmx.html
│   └── rutina-grooming-hombre-moderno-guia-completa.html
│
├── categorias/
│   ├── index.html          ← Hub editorial (migrado)
│   ├── tendencias/index.html ← (PENDIENTE)
│   ├── tecnicas/index.html   ← (PENDIENTE)
│   ├── productos/index.html  ← (PENDIENTE)
│   ├── negocios/index.html   ← (PENDIENTE)
│   └── estilo-de-vida/index.html ← (PENDIENTE)
│
├── ciudad-de-mexico/
│   ├── index.html          ← City guide (migrado)
│   ├── barberia-roma-norte-cuauhtemoc.html ← (PENDIENTE)
│   ├── barberia-condesa-cuauhtemoc.html    ← (PENDIENTE)
│   ├── barberia-polanco-miguel-hidalgo.html ← (PENDIENTE)
│   ├── barberia-juarez-cuauhtemoc.html     ← (PENDIENTE)
│   └── barberia-del-valle-centro-benito-juarez.html ← (PENDIENTE)
│
├── components/             ← Componentes reutilizables (HTML parciales)
│   ├── masthead.html       ← Barra editorial superior (vol/issue/contador/fecha)
│   ├── header.html         ← Nav principal
│   └── footer.html         ← Footer editorial
│
├── css/
│   ├── editorial.css       ← Sistema nuevo (~1,900 líneas) · OVERRIDEA style.css
│   └── style.css           ← Sistema viejo (44KB · backward compat)
│
├── js/
│   ├── components.js       ← Loader de slots + hooks
│   ├── app.js              ← JS viejo del homepage (cleanup pendiente)
│   └── vendor/             ← Dependencias externas (revisar)
│
├── img/                    ← VACÍO (usamos Unsplash hotlinks)
│
├── DOCS/                   ← Este vault Obsidian
│
├── webpack.*.js            ← Configs webpack legacy (no en uso actualmente)
├── package.json
├── LICENSE.txt · .editorconfig · .gitignore · .gitattributes
└── .audit/                 ← (?)
```

---

## 2. Carga de assets en cada HTML

Patrón estándar del `<head>`:

```html
<!-- CSS legacy (mantener para backward compat) -->
<link rel="stylesheet" href="/css/style.css">

<!-- CSS editorial nuevo (cargar DESPUÉS para overridear) -->
<link rel="stylesheet" href="/css/editorial.css">

<!-- Preconnects -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://images.unsplash.com">

<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300;1,9..144,400;1,9..144,500&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

Y al final del `<body>`:

```html
<script src="/js/components.js" defer></script>
```

---

## 3. Componentes reutilizables

### 3.1 Slots

Cada página usa slots `<div data-component="...">` que el loader rellena con el HTML de `/components/`.

```html
<a href="#main" class="ed-skip">Saltar al contenido</a>

<div data-component="masthead"></div>
<div data-component="header"></div>

<main id="main">
  <!-- contenido específico de la página -->
</main>

<div data-component="footer"></div>

<script src="/js/components.js" defer></script>
```

### 3.2 Componente `masthead`

Barra editorial superior con vol/issue, contador en vivo, ubicación, fecha. Los placeholders `data-masthead-date`, `data-masthead-count` se rellenan via JS.

### 3.3 Componente `header` (nav principal)

Nav con logo, menú desktop (con dropdown Editorial), CTAs, mobile toggle, mobile drawer.

Cada `<a class="nav-link">` y `.nav-mobile-link` lleva `data-match="palabra"` para auto-marcar como activo según la URL.

### 3.4 Componente `footer`

4 columnas (Brand, Directorio, Editorial, Comunidad) + bottom bar legal + social. Año automático via `data-current-year`.

---

## 4. `components.js` — Loader y hooks

Archivo: `/js/components.js` (~230 líneas)

### Responsabilidades

1. **Cargar slots:** busca `[data-component]`, fetch al `/components/{name}.html`, hidrata el slot.
2. **Hooks post-render:** ejecuta después de hidratar:
   - `hookCurrentYear()` — `[data-current-year]` → año actual
   - `hookMastheadDate()` — `[data-masthead-date]` → fecha (DD · MMM · YYYY)
   - `hookActiveNav()` — marca link como `aria-current="page"` según pathname
   - `hookMobileNav()` — toggle, Escape, click outside, scroll lock
   - `hookNavbarScroll()` — clase `.nav-scrolled` después de 60px
   - `hookSmoothScroll()` — anchors `#foo` con offset por navbar
   - `hookDropdowns()` — focus-within + mouseenter
   - `hookReveal()` — IntersectionObserver para `[data-reveal]`

3. **Dispatch:** `document.dispatchEvent(new CustomEvent('components:loaded'))` cuando termina.

### Cache

Si `CONFIG.cache = true`, los componentes se guardan en memoria entre `fetchComponent` calls (útil para SPA-like navigation).

### API pública

```js
window.BarberiaComponents = { load: fetchComponent, init };
```

### Eventos de reveal

Para usar reveal en elementos custom, agregar `data-reveal` al cargar:

```js
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.mi-elemento').forEach(el => el.setAttribute('data-reveal', ''));
});
```

---

## 5. Dev server local

```bash
cd ~/Documents/Claude/Projects/BARBERIA
python3 -m http.server 8000
```

URL: http://localhost:8000/

Importante: los componentes (`fetch` de `/components/*.html`) requieren server HTTP. `file://` no funciona por CORS.

---

## 6. Deploy

GitHub Pages directo desde `main` branch del repo `Origenlab/BARBERIAMX`. CNAME `barberia.mx`. Sin pipeline de build.

Cualquier push a `main` actualiza producción en ~1-5 minutos.

---

## Relacionado
- [[01 - Sistema de Diseño]] — CSS tokens y componentes visuales
- [[03 - Páginas]] — qué páginas usan qué patrones
- [[05 - Guía de Continuación]] — cómo añadir páginas/componentes nuevos
