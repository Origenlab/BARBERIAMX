# DOCUMENTO-ARTICULO.md
## Guía Oficial de Creación y Publicación de Artículos | Barberia.mx

**Versión:** 1.0.0
**Última actualización:** Noviembre 2024
**Autor:** Equipo Barberia.mx
**Estado:** Documento Oficial

---

## Índice

1. [Introducción](#1-introducción)
2. [Arquitectura del Sistema de Artículos](#2-arquitectura-del-sistema-de-artículos)
3. [Estructura de Archivos](#3-estructura-de-archivos)
4. [Categorías Disponibles](#4-categorías-disponibles)
5. [Creación del Archivo HTML del Artículo](#5-creación-del-archivo-html-del-artículo)
6. [Estructura HTML Completa](#6-estructura-html-completa)
7. [Estilos CSS del Artículo](#7-estilos-css-del-artículo)
8. [Sidebar con Slider](#8-sidebar-con-slider)
9. [SEO y Metadatos](#9-seo-y-metadatos)
10. [Schema.org (Datos Estructurados)](#10-schemaorg-datos-estructurados)
11. [Integración en blog.html](#11-integración-en-bloghtml)
12. [Integración en Página de Categoría](#12-integración-en-página-de-categoría)
13. [JavaScript Requerido](#13-javascript-requerido)
14. [Checklist de Publicación](#14-checklist-de-publicación)
15. [Convenciones de Nomenclatura](#15-convenciones-de-nomenclatura)
16. [Ejemplos de Referencia](#16-ejemplos-de-referencia)

---

## 1. Introducción

Este documento establece los estándares oficiales para la creación, estructuración y publicación de artículos en el sitio web Barberia.mx. Siguiendo esta guía, cualquier artículo mantendrá consistencia visual, técnica y de SEO con el resto del sitio.

### Objetivos del Documento

- Estandarizar el proceso de creación de artículos
- Garantizar consistencia en diseño y estructura
- Optimizar el SEO de cada publicación
- Facilitar el mantenimiento y escalabilidad
- Reducir errores en la implementación

### Requisitos Previos

- Conocimiento básico de HTML5 y CSS3
- Acceso a la estructura de archivos del proyecto
- Contenido del artículo redactado y revisado
- Imágenes optimizadas (si aplica)

---

## 2. Arquitectura del Sistema de Artículos

### Diseño de Dos Columnas

El layout de artículos utiliza un sistema de dos columnas:

```
┌─────────────────────────────────────────────────────────────┐
│                        NAVBAR (72px)                         │
├─────────────────────────────────────────────────────────────┤
│                        BREADCRUMB                            │
├───────────────────────────────────┬─────────────────────────┤
│                                   │                         │
│         ARTICLE-MAIN              │    ARTICLE-SIDEBAR      │
│         (contenido)               │    (sticky slider)      │
│                                   │                         │
│  ┌─────────────────────────────┐  │  ┌───────────────────┐  │
│  │     HERO INLINE             │  │  │   SLIDER          │  │
│  │  - Categoría                │  │  │   "Como funciona" │  │
│  │  - Título                   │  │  │   6 pasos         │  │
│  │  - Excerpt                  │  │  │                   │  │
│  │  - Meta (autor, fecha)      │  │  │   Navegación      │  │
│  └─────────────────────────────┘  │  │   Dots + Arrows   │  │
│                                   │  └───────────────────┘  │
│  ┌─────────────────────────────┐  │                         │
│  │     ARTICLE BODY            │  │  ┌───────────────────┐  │
│  │  - Párrafos                 │  │  │   CTA BOX         │  │
│  │  - Headings (h2, h3)        │  │  │   "Encuentra tu   │  │
│  │  - Listas                   │  │  │    barbería"      │  │
│  │  - Stats Grid               │  │  └───────────────────┘  │
│  │  - Feature List             │  │                         │
│  │  - CTA Box                  │  │                         │
│  │  - FAQ Section              │  │                         │
│  └─────────────────────────────┘  │                         │
│                                   │                         │
│  ┌─────────────────────────────┐  │                         │
│  │     ARTICLE FOOTER          │  │                         │
│  │  - Tags                     │  │                         │
│  │  - Share buttons            │  │                         │
│  │  - Author box               │  │                         │
│  └─────────────────────────────┘  │                         │
│                                   │                         │
├───────────────────────────────────┴─────────────────────────┤
│                    RELATED ARTICLES                          │
├─────────────────────────────────────────────────────────────┤
│                         FOOTER                               │
└─────────────────────────────────────────────────────────────┘
```

### Especificaciones Técnicas

| Elemento | Ancho | Comportamiento |
|----------|-------|----------------|
| Container | max-width: 1200px | Centrado |
| Article Main | 1fr (flexible) | Contenido principal |
| Article Sidebar | 380px | Sticky, top: 100px |
| Gap entre columnas | var(--space-2xl) | ~48px |

### Responsive Breakpoints

| Breakpoint | Comportamiento |
|------------|----------------|
| > 1024px | Layout de dos columnas |
| ≤ 1024px | Una columna, sidebar después del contenido |
| ≤ 768px | Ajustes adicionales en meta, stats, author box |

---

## 3. Estructura de Archivos

### Ubicación de Archivos

```
BARBERIA.MX/
├── articulos/
│   ├── como-encontrar-barberia-cerca-de-ti.html
│   ├── [slug-del-articulo].html
│   └── ...
├── categorias/
│   ├── index.html
│   ├── tendencias/
│   │   └── index.html
│   ├── tecnicas/
│   │   └── index.html
│   ├── productos/
│   │   └── index.html
│   ├── negocios/
│   │   └── index.html
│   └── estilo-de-vida/
│       └── index.html
├── blog.html
├── css/
│   └── style.css
├── js/
│   └── app.js
└── img/
    └── articulos/
        └── [slug-articulo]/
            ├── og-image.jpg (1200x630)
            ├── thumbnail.jpg (400x250)
            └── ...
```

### Nomenclatura de Archivos

- **Artículos:** `slug-del-articulo.html` (kebab-case, sin acentos, sin ñ)
- **Imágenes OG:** `[slug]-og.jpg` (1200x630px)
- **Thumbnails:** `[slug]-thumb.jpg` (400x250px)

---

## 4. Categorías Disponibles

### Lista de Categorías

| Categoría | Slug | Color | Descripción |
|-----------|------|-------|-------------|
| Tendencias | tendencias | #F59E0B (amber) | Cortes, estilos, modas actuales |
| Técnicas | tecnicas | #10B981 (emerald) | Tutoriales, métodos, cómo hacer |
| Productos | productos | #8B5CF6 (violet) | Reseñas, recomendaciones de productos |
| Negocios | negocios | #3B82F6 (blue) | Emprendimiento, marketing, finanzas |
| Estilo de vida | estilo-de-vida | #EC4899 (pink) | Lifestyle, bienestar, cultura |

### Estilos de Categoría Badge

```css
/* Tendencias */
background: rgba(245, 158, 11, 0.1);
color: #F59E0B;

/* Técnicas */
background: rgba(16, 185, 129, 0.1);
color: #10B981;

/* Productos */
background: rgba(139, 92, 246, 0.1);
color: #8B5CF6;

/* Negocios */
background: rgba(59, 130, 246, 0.1);
color: #3B82F6;

/* Estilo de vida */
background: rgba(236, 72, 153, 0.1);
color: #EC4899;
```

---

## 5. Creación del Archivo HTML del Artículo

### Plantilla Base

Crear archivo en `/articulos/[slug-del-articulo].html`

```html
<!doctype html>
<html lang="es-MX">

<head>
  <!-- META TAGS Y SEO (Ver sección 9) -->
</head>

<body>
  <!-- NAVIGATION (Ver sección 6.1) -->

  <!-- MAIN CONTENT -->
  <main class="article-page">
    <div class="container">
      <!-- BREADCRUMB (Ver sección 6.2) -->
      <!-- TWO COLUMN LAYOUT (Ver sección 6.3) -->
      <!-- RELATED ARTICLES (Ver sección 6.8) -->
    </div>
  </main>

  <!-- FOOTER (Ver sección 6.9) -->

  <!-- SCRIPTS (Ver sección 13) -->
</body>

</html>
```

---

## 6. Estructura HTML Completa

### 6.1 Navigation

```html
<nav class="nav" id="navbar">
  <div class="nav-container">
    <a href="/" class="nav-logo">
      <svg class="nav-logo-icon" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="currentColor"/>
        <path d="M10 8v16M14 8v16M10 16h4M20 8l4 8-4 8M20 16h4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span class="nav-logo-text">barberia<span class="nav-logo-accent">.mx</span></span>
    </a>

    <ul class="nav-menu" id="nav-menu">
      <li class="nav-item"><a href="/index.html#directorio" class="nav-link"><span class="nav-link-text">Directorio</span></a></li>
      <li class="nav-item"><a href="/zona.html" class="nav-link"><span class="nav-link-text">Zonas</span></a></li>
      <li class="nav-item"><a href="/index.html#marketplace" class="nav-link"><span class="nav-link-text">Marketplace</span></a></li>
      <li class="nav-item"><a href="/index.html#empleo" class="nav-link"><span class="nav-link-text">Empleo</span></a></li>
      <li class="nav-item nav-item-dropdown">
        <a href="/blog.html" class="nav-link nav-link-active">
          <span class="nav-link-text">Blog</span>
          <svg class="nav-dropdown-icon" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
        </a>
        <div class="nav-dropdown">
          <a href="/blog.html" class="nav-dropdown-link">Todos los articulos</a>
          <a href="/categorias/" class="nav-dropdown-link">Ver categorias</a>
          <div class="nav-dropdown-divider"></div>
          <a href="/categorias/tendencias/" class="nav-dropdown-link">Tendencias</a>
          <a href="/categorias/tecnicas/" class="nav-dropdown-link">Tecnicas</a>
          <a href="/categorias/productos/" class="nav-dropdown-link">Productos</a>
          <a href="/categorias/negocios/" class="nav-dropdown-link">Negocios</a>
          <a href="/categorias/estilo-de-vida/" class="nav-dropdown-link">Estilo de vida</a>
        </div>
      </li>
    </ul>

    <div class="nav-actions">
      <a href="/index.html#registro" class="nav-btn nav-btn-outline">Ingresar</a>
      <a href="/index.html#registro" class="nav-btn nav-btn-primary">Registrar Barberia</a>
    </div>

    <button class="nav-toggle" id="nav-toggle" aria-label="Abrir menu">
      <span class="nav-toggle-line"></span>
      <span class="nav-toggle-line"></span>
      <span class="nav-toggle-line"></span>
    </button>
  </div>

  <!-- Mobile Menu -->
  <div class="nav-mobile" id="nav-mobile">
    <div class="nav-mobile-content">
      <ul class="nav-mobile-menu">
        <li><a href="/index.html#directorio" class="nav-mobile-link">Directorio</a></li>
        <li><a href="/zona.html" class="nav-mobile-link">Zonas</a></li>
        <li><a href="/index.html#marketplace" class="nav-mobile-link">Marketplace</a></li>
        <li><a href="/index.html#empleo" class="nav-mobile-link">Empleo</a></li>
        <li><a href="/blog.html" class="nav-mobile-link">Blog</a></li>
        <li class="nav-mobile-submenu">
          <span class="nav-mobile-submenu-title">Categorias</span>
          <ul class="nav-mobile-submenu-list">
            <li><a href="/categorias/tendencias/" class="nav-mobile-link">Tendencias</a></li>
            <li><a href="/categorias/tecnicas/" class="nav-mobile-link">Tecnicas</a></li>
            <li><a href="/categorias/productos/" class="nav-mobile-link">Productos</a></li>
            <li><a href="/categorias/negocios/" class="nav-mobile-link">Negocios</a></li>
            <li><a href="/categorias/estilo-de-vida/" class="nav-mobile-link">Estilo de vida</a></li>
          </ul>
        </li>
      </ul>
      <div class="nav-mobile-actions">
        <a href="/index.html#registro" class="nav-btn nav-btn-outline nav-btn-full">Ingresar</a>
        <a href="/index.html#registro" class="nav-btn nav-btn-primary nav-btn-full">Registrar Barberia</a>
      </div>
    </div>
  </div>
</nav>
```

### 6.2 Breadcrumb

```html
<nav class="article-breadcrumb" aria-label="Breadcrumb">
  <ol class="breadcrumb-list">
    <li class="breadcrumb-item">
      <a href="/" class="breadcrumb-link">Inicio</a>
      <span class="breadcrumb-separator">/</span>
    </li>
    <li class="breadcrumb-item">
      <a href="/blog.html" class="breadcrumb-link">Blog</a>
      <span class="breadcrumb-separator">/</span>
    </li>
    <li class="breadcrumb-item">
      <a href="/categorias/[CATEGORIA]/" class="breadcrumb-link">[NOMBRE_CATEGORIA]</a>
      <span class="breadcrumb-separator">/</span>
    </li>
    <li class="breadcrumb-item">
      <span class="breadcrumb-current">[TITULO_CORTO_ARTICULO]</span>
    </li>
  </ol>
</nav>
```

### 6.3 Two Column Layout

```html
<div class="article-layout">
  <!-- Main Content Column -->
  <div class="article-main">
    <!-- 6.4 Hero Inline -->
    <!-- 6.5 Article Content -->
    <!-- 6.6 Article Footer -->
  </div>

  <!-- Sidebar with Slider -->
  <aside class="article-sidebar">
    <!-- 6.7 Sidebar Slider -->
  </aside>
</div>
```

### 6.4 Hero Inline

```html
<header class="article-hero-inline">
  <a href="/categorias/[CATEGORIA]/" class="article-category">[NOMBRE_CATEGORIA]</a>
  <h1 class="article-title">[TITULO_COMPLETO_DEL_ARTICULO]</h1>
  <p class="article-excerpt">
    [DESCRIPCION_BREVE_DEL_ARTICULO_2_3_ORACIONES]
  </p>
  <div class="article-meta">
    <div class="article-author">
      <div class="author-avatar">[INICIALES]</div>
      <div class="author-info">
        <span class="author-name">[NOMBRE_AUTOR]</span>
        <span class="article-date">[FECHA_O_TEXTO_ACTUALIZACION]</span>
      </div>
    </div>
    <div class="article-stats">
      <span class="article-stat">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
        [X] min lectura
      </span>
      <span class="article-stat">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
        [X]k vistas
      </span>
    </div>
  </div>
</header>
```

### 6.5 Article Content

```html
<article class="article-content">
  <div class="article-body">

    <!-- Introducción -->
    <p>
      <strong>[FRASE_GANCHO_INICIAL]</strong> [RESTO_DEL_PARRAFO_INTRODUCTORIO]
    </p>

    <p>
      [SEGUNDO_PARRAFO_CONTEXTO]
    </p>

    <!-- Sección Principal -->
    <h2>[TITULO_SECCION_1]</h2>

    <p>[CONTENIDO_SECCION]</p>

    <!-- Lista Simple -->
    <ul>
      <li>[ITEM_1]</li>
      <li>[ITEM_2]</li>
      <li>[ITEM_3]</li>
    </ul>

    <!-- Stats Grid (opcional) -->
    <div class="stats-grid">
      <div class="stat-card">
        <span class="stat-number">[NUMERO]%</span>
        <span class="stat-label">[DESCRIPCION_ESTADISTICA]</span>
      </div>
      <div class="stat-card">
        <span class="stat-number">[NUMERO]</span>
        <span class="stat-label">[DESCRIPCION_ESTADISTICA]</span>
      </div>
      <div class="stat-card">
        <span class="stat-number">[NUMERO]</span>
        <span class="stat-label">[DESCRIPCION_ESTADISTICA]</span>
      </div>
    </div>

    <!-- Feature List (opcional) -->
    <ul class="feature-list">
      <li>
        <div class="feature-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <!-- SVG PATH -->
          </svg>
        </div>
        <div class="feature-text">
          <strong>[TITULO_FEATURE]</strong>
          [DESCRIPCION_FEATURE]
        </div>
      </li>
      <!-- Repetir para más features -->
    </ul>

    <!-- Subsecciones -->
    <h3>[SUBTITULO_1]</h3>
    <p>[CONTENIDO_SUBSECCION]</p>

    <!-- CTA Box (ubicar estratégicamente) -->
    <div class="cta-box">
      <h3 class="cta-title">[TITULO_CTA]</h3>
      <p class="cta-text">[DESCRIPCION_CTA]</p>
      <div class="cta-buttons">
        <a href="[URL_PRIMARIO]" class="cta-btn cta-btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
          [TEXTO_BOTON_PRIMARIO]
        </a>
        <a href="[URL_SECUNDARIO]" class="cta-btn cta-btn-secondary">
          [TEXTO_BOTON_SECUNDARIO]
        </a>
      </div>
    </div>

    <!-- FAQ Section -->
    <div class="faq-section">
      <h3 class="faq-title">Preguntas frecuentes</h3>

      <div class="faq-item">
        <h4 class="faq-question">[PREGUNTA_1]?</h4>
        <p class="faq-answer">[RESPUESTA_1]</p>
      </div>

      <div class="faq-item">
        <h4 class="faq-question">[PREGUNTA_2]?</h4>
        <p class="faq-answer">[RESPUESTA_2]</p>
      </div>

      <div class="faq-item">
        <h4 class="faq-question">[PREGUNTA_3]?</h4>
        <p class="faq-answer">[RESPUESTA_3]</p>
      </div>
    </div>

    <!-- Conclusión -->
    <h2>Conclusion</h2>
    <p>[PARRAFO_CONCLUSION]</p>
    <p><strong>[FRASE_FINAL_IMPACTANTE]</strong></p>

  </div>

  <!-- Article Footer -->
  <!-- Ver sección 6.6 -->
</article>
```

### 6.6 Article Footer

```html
<footer class="article-footer">
  <!-- Tags -->
  <div class="article-tags">
    <a href="#" class="article-tag">[TAG_1]</a>
    <a href="#" class="article-tag">[TAG_2]</a>
    <a href="#" class="article-tag">[TAG_3]</a>
    <a href="#" class="article-tag">[TAG_4]</a>
    <a href="#" class="article-tag">[TAG_5]</a>
  </div>

  <!-- Share -->
  <div class="article-share">
    <span class="share-label">Compartir:</span>
    <div class="share-buttons">
      <a href="#" class="share-btn" aria-label="Compartir en Facebook">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
        </svg>
      </a>
      <a href="#" class="share-btn" aria-label="Compartir en Twitter">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
        </svg>
      </a>
      <a href="#" class="share-btn" aria-label="Compartir en LinkedIn">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
          <rect x="2" y="9" width="4" height="12"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      </a>
      <a href="#" class="share-btn" aria-label="Compartir en WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
      <a href="#" class="share-btn" aria-label="Copiar enlace">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
        </svg>
      </a>
    </div>
  </div>

  <!-- Author Box -->
  <div class="author-box">
    <div class="author-box-avatar">[INICIALES]</div>
    <div class="author-box-info">
      <h4>[NOMBRE_COMPLETO_AUTOR]</h4>
      <span class="author-box-role">[ROL_EN_BARBERIA_MX]</span>
      <p class="author-box-bio">
        [BIO_DEL_AUTOR_2_3_ORACIONES]
      </p>
    </div>
  </div>
</footer>
```

### 6.7 Sidebar con Interlinking

El sidebar incluye multiples secciones para mejorar el SEO interno y la experiencia del usuario:

1. **CTA Principal** - Llamada a accion para explorar el directorio
2. **Barberias Recomendadas** - Links a perfiles de barberias verificadas
3. **Articulos de Interes** - Links a otros articulos del blog (interlinking)
4. **Como Funciona** - Version compacta de los pasos del directorio
5. **Categorias** - Tags de navegacion por categoria

```html
<aside class="article-sidebar">

  <!-- Sidebar CTA Principal -->
  <div class="sidebar-cta-main">
    <div class="sidebar-cta-badge">Directorio verificado</div>
    <h4 class="sidebar-cta-main-title">Encuentra tu barberia ideal</h4>
    <p class="sidebar-cta-main-text">[TEXTO_CONTEXTUAL_AL_ARTICULO]</p>
    <a href="/ciudad-de-mexico/" class="sidebar-cta-main-btn">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8"/>
        <path d="M21 21l-4.35-4.35"/>
      </svg>
      Explorar directorio
    </a>
  </div>

  <!-- Barberias Recomendadas -->
  <div class="sidebar-section">
    <div class="sidebar-section-header">
      <h4 class="sidebar-section-title">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        Barberias recomendadas
      </h4>
      <a href="/ciudad-de-mexico/" class="sidebar-section-link">Ver todas</a>
    </div>
    <div class="sidebar-barbershops">
      <a href="[URL_BARBERIA_1]" class="sidebar-barbershop-card">
        <div class="sidebar-barbershop-avatar">[INICIALES]</div>
        <div class="sidebar-barbershop-info">
          <span class="sidebar-barbershop-name">[NOMBRE_BARBERIA]</span>
          <span class="sidebar-barbershop-location">[UBICACION]</span>
          <div class="sidebar-barbershop-rating">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            [RATING] ([NUM_RESENAS] resenas)
          </div>
        </div>
      </a>
      <!-- Repetir para 2-3 barberias mas -->
    </div>
  </div>

  <!-- Articulos de Interes -->
  <div class="sidebar-section">
    <div class="sidebar-section-header">
      <h4 class="sidebar-section-title">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
        </svg>
        Articulos de interes
      </h4>
      <a href="/blog.html" class="sidebar-section-link">Ver blog</a>
    </div>
    <div class="sidebar-articles">
      <a href="[URL_ARTICULO]" class="sidebar-article-card">
        <div class="sidebar-article-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <!-- ICONO RELEVANTE AL ARTICULO -->
          </svg>
        </div>
        <div class="sidebar-article-info">
          <span class="sidebar-article-title">[TITULO_ARTICULO]</span>
          <span class="sidebar-article-meta">
            <span class="sidebar-article-category [CATEGORIA_SLUG]">[CATEGORIA]</span>
            <span>[X] min</span>
          </span>
        </div>
      </a>
      <!-- Repetir para 3-4 articulos mas -->
    </div>
  </div>

  <!-- Como Funciona Mini -->
  <div class="sidebar-section sidebar-how-it-works">
    <h4 class="sidebar-section-title-solo">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
      Como usar Barberia.mx
    </h4>
    <div class="sidebar-steps-mini">
      <div class="sidebar-step-mini">
        <span class="sidebar-step-number-mini">1</span>
        <span class="sidebar-step-text-mini">Busca por tu ubicacion</span>
      </div>
      <div class="sidebar-step-mini">
        <span class="sidebar-step-number-mini">2</span>
        <span class="sidebar-step-text-mini">Filtra por servicios y precios</span>
      </div>
      <div class="sidebar-step-mini">
        <span class="sidebar-step-number-mini">3</span>
        <span class="sidebar-step-text-mini">Lee resenas verificadas</span>
      </div>
      <div class="sidebar-step-mini">
        <span class="sidebar-step-number-mini">4</span>
        <span class="sidebar-step-text-mini">Contacta y agenda tu cita</span>
      </div>
    </div>
  </div>

  <!-- Categorias -->
  <div class="sidebar-section">
    <h4 class="sidebar-section-title-solo">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="8" y1="6" x2="21" y2="6"/>
        <line x1="8" y1="12" x2="21" y2="12"/>
        <line x1="8" y1="18" x2="21" y2="18"/>
        <line x1="3" y1="6" x2="3.01" y2="6"/>
        <line x1="3" y1="12" x2="3.01" y2="12"/>
        <line x1="3" y1="18" x2="3.01" y2="18"/>
      </svg>
      Explora por categoria
    </h4>
    <div class="sidebar-categories">
      <a href="/categorias/tendencias/" class="sidebar-category-tag tendencias">Tendencias</a>
      <a href="/categorias/tecnicas/" class="sidebar-category-tag tecnicas">Tecnicas</a>
      <a href="/categorias/productos/" class="sidebar-category-tag productos">Productos</a>
      <a href="/categorias/negocios/" class="sidebar-category-tag negocios">Negocios</a>
      <a href="/categorias/estilo-de-vida/" class="sidebar-category-tag estilo">Estilo de vida</a>
    </div>
  </div>

</aside>
```

#### Clases CSS para categorias en el sidebar:

| Categoria | Clase CSS | Color |
|-----------|-----------|-------|
| Tendencias | `tendencias` | #EF4444 (rojo) |
| Tecnicas | `tecnicas` | #10B981 (verde) |
| Productos | `productos` | #3B82F6 (azul) |
| Negocios | `negocios` | #F59E0B (amarillo) |
| Estilo de vida | `estilo` | #EC4899 (rosa) |

### 6.8 Related Articles

```html
<section class="related-articles">
  <h2 class="related-title">Articulos relacionados</h2>
  <div class="related-grid">
    <a href="[URL_ARTICULO_1]" class="related-card">
      <div class="related-image">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <path d="M21 15l-5-5L5 21"/>
        </svg>
      </div>
      <div class="related-content">
        <h3 class="related-card-title">[TITULO_ARTICULO_RELACIONADO_1]</h3>
        <span class="related-meta">[CATEGORIA] · [X] min</span>
      </div>
    </a>
    <a href="[URL_ARTICULO_2]" class="related-card">
      <div class="related-image">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <path d="M21 15l-5-5L5 21"/>
        </svg>
      </div>
      <div class="related-content">
        <h3 class="related-card-title">[TITULO_ARTICULO_RELACIONADO_2]</h3>
        <span class="related-meta">[CATEGORIA] · [X] min</span>
      </div>
    </a>
    <a href="[URL_ARTICULO_3]" class="related-card">
      <div class="related-image">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <path d="M21 15l-5-5L5 21"/>
        </svg>
      </div>
      <div class="related-content">
        <h3 class="related-card-title">[TITULO_ARTICULO_RELACIONADO_3]</h3>
        <span class="related-meta">[CATEGORIA] · [X] min</span>
      </div>
    </a>
  </div>
</section>
```

### 6.9 Footer (Simplificado para artículos)

```html
<footer class="footer">
  <div class="footer-main">
    <div class="footer-container">
      <div class="footer-grid">
        <div class="footer-col footer-col-brand">
          <a href="/" class="footer-logo">
            <span class="footer-logo-text">barberia<span class="footer-logo-accent">.mx</span></span>
          </a>
          <p class="footer-tagline">El directorio de barberias mas completo de Mexico.</p>
          <div class="footer-social">
            <a href="#" class="footer-social-link">Instagram</a>
            <a href="#" class="footer-social-link">Facebook</a>
            <a href="#" class="footer-social-link">X</a>
          </div>
        </div>
        <div class="footer-col">
          <h4 class="footer-heading">Directorio</h4>
          <ul class="footer-list">
            <li><a href="/zona.html" class="footer-link">Explorar zonas</a></li>
            <li><a href="/ciudad-de-mexico/" class="footer-link">Ciudad de Mexico</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4 class="footer-heading">Blog</h4>
          <ul class="footer-list">
            <li><a href="/blog.html" class="footer-link">Todos los articulos</a></li>
            <li><a href="/categorias/" class="footer-link">Categorias</a></li>
          </ul>
          <h4 class="footer-heading footer-heading-mt">Categorias</h4>
          <ul class="footer-list">
            <li><a href="/categorias/tendencias/" class="footer-link">Tendencias</a></li>
            <li><a href="/categorias/tecnicas/" class="footer-link">Tecnicas</a></li>
            <li><a href="/categorias/productos/" class="footer-link">Productos</a></li>
            <li><a href="/categorias/negocios/" class="footer-link">Negocios</a></li>
            <li><a href="/categorias/estilo-de-vida/" class="footer-link">Estilo de vida</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="footer-container">
      <div class="footer-bottom-content">
        <p class="footer-copyright">© Barberia.mx. Todos los derechos reservados.</p>
      </div>
    </div>
  </div>
</footer>
```

---

## 7. Estilos CSS del Artículo

Los estilos deben incluirse dentro de una etiqueta `<style>` en el `<head>` del documento.

### 7.1 Estilos Base

```css
/* Article Page Layout */
.article-page {
  padding-top: 72px;
}

/* Article Hero Inline (inside two-column layout) */
.article-hero-inline {
  margin-bottom: var(--space-xl);
  padding-bottom: var(--space-xl);
  border-bottom: 1px solid var(--color-gray-200);
}

.article-category {
  display: inline-block;
  padding: 6px 16px;
  font-size: 11px;
  font-weight: var(--font-semibold);
  color: #3B82F6; /* Ajustar según categoría */
  background: rgba(59, 130, 246, 0.1); /* Ajustar según categoría */
  border-radius: var(--radius-full);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-md);
  text-decoration: none;
  transition: all var(--transition-fast);
}

.article-category:hover {
  background: rgba(59, 130, 246, 0.2);
}

.article-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: var(--font-bold);
  color: var(--color-black);
  line-height: 1.15;
  margin-bottom: var(--space-lg);
}

.article-excerpt {
  font-size: var(--text-xl);
  color: var(--color-gray-500);
  line-height: 1.6;
  margin-bottom: var(--space-xl);
}

.article-meta {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  flex-wrap: wrap;
}

.article-author {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.author-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-base);
  font-weight: var(--font-bold);
  color: white;
}

.author-info {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--color-black);
}

.article-date {
  font-size: var(--text-sm);
  color: var(--color-gray-500);
}

.article-stats {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-left: auto;
}

.article-stat {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--text-sm);
  color: var(--color-gray-500);
}

.article-stat svg {
  width: 16px;
  height: 16px;
}
```

### 7.2 Breadcrumb

```css
.article-breadcrumb {
  padding: var(--space-md) 0;
  border-bottom: 1px solid var(--color-gray-200);
}

.breadcrumb-list {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: var(--text-sm);
  flex-wrap: wrap;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.breadcrumb-link {
  color: var(--color-gray-500);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.breadcrumb-link:hover {
  color: var(--color-accent);
}

.breadcrumb-separator {
  color: var(--color-gray-300);
}

.breadcrumb-current {
  color: var(--color-black);
  font-weight: var(--font-medium);
}
```

### 7.3 Two Column Layout

```css
.article-layout {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: var(--space-2xl);
  padding: var(--space-xl) 0 var(--space-2xl);
}

.article-main {
  min-width: 0;
}
```

### 7.4 Article Content

```css
.article-content {
  padding: 0;
}

.article-body {
  font-size: var(--text-lg);
  line-height: 1.8;
  color: var(--color-gray-700);
}

.article-body h2 {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--color-black);
  margin: var(--space-2xl) 0 var(--space-md);
  line-height: 1.3;
}

.article-body h3 {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--color-black);
  margin: var(--space-xl) 0 var(--space-sm);
}

.article-body p {
  margin-bottom: var(--space-lg);
}

.article-body ul,
.article-body ol {
  margin: var(--space-lg) 0;
  padding-left: var(--space-xl);
}

.article-body li {
  margin-bottom: var(--space-sm);
}

.article-body strong {
  color: var(--color-black);
  font-weight: var(--font-semibold);
}

.article-body a {
  color: var(--color-accent);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.article-body a:hover {
  text-decoration: none;
}
```

### 7.5 Stats Grid

```css
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-md);
  margin: var(--space-xl) 0;
}

.stat-card {
  background: var(--color-gray-50);
  padding: var(--space-lg);
  border-radius: var(--radius-lg);
  text-align: center;
}

.stat-number {
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: var(--color-accent);
  display: block;
}

.stat-label {
  font-size: var(--text-sm);
  color: var(--color-gray-500);
  margin-top: var(--space-xs);
}
```

### 7.6 Feature List

```css
.feature-list {
  list-style: none;
  padding: 0;
  margin: var(--space-xl) 0;
}

.feature-list li {
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
  padding: var(--space-md) 0;
  border-bottom: 1px solid var(--color-gray-100);
}

.feature-list li:last-child {
  border-bottom: none;
}

.feature-icon {
  width: 32px;
  height: 32px;
  background: var(--color-accent-light);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.feature-icon svg {
  width: 16px;
  height: 16px;
  color: var(--color-accent);
}

.feature-text strong {
  display: block;
  margin-bottom: 4px;
}
```

### 7.7 CTA Box

```css
.cta-box {
  background: var(--color-black);
  color: var(--color-white);
  padding: var(--space-2xl);
  border-radius: var(--radius-xl);
  text-align: center;
  margin: var(--space-2xl) 0;
}

.cta-title {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  margin-bottom: var(--space-sm);
}

.cta-text {
  font-size: var(--text-base);
  color: var(--color-gray-300);
  margin-bottom: var(--space-lg);
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: var(--space-sm);
  flex-wrap: wrap;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-md) var(--space-xl);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  border-radius: var(--radius-full);
  text-decoration: none;
  transition: all var(--transition-fast);
}

.cta-btn-primary {
  background: var(--color-white);
  color: var(--color-black);
}

.cta-btn-primary:hover {
  background: var(--color-gray-100);
}

.cta-btn-secondary {
  background: transparent;
  color: var(--color-white);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.cta-btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
}
```

### 7.8 FAQ Section

```css
.faq-section {
  margin: var(--space-2xl) 0;
  padding: var(--space-xl);
  background: var(--color-gray-50);
  border-radius: var(--radius-xl);
}

.faq-title {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--color-black);
  margin-bottom: var(--space-lg);
}

.faq-item {
  padding: var(--space-md) 0;
  border-bottom: 1px solid var(--color-gray-200);
}

.faq-item:last-child {
  border-bottom: none;
}

.faq-question {
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--color-black);
  margin-bottom: var(--space-xs);
}

.faq-answer {
  font-size: var(--text-sm);
  color: var(--color-gray-600);
  line-height: 1.6;
}
```

### 7.9 Article Footer

```css
.article-footer {
  border-top: 1px solid var(--color-gray-200);
  padding-top: var(--space-xl);
  margin-top: var(--space-2xl);
}

/* Tags */
.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  margin-bottom: var(--space-xl);
}

.article-tag {
  padding: 6px 14px;
  font-size: var(--text-sm);
  color: var(--color-gray-600);
  background: var(--color-gray-100);
  border-radius: var(--radius-full);
  text-decoration: none;
  transition: all var(--transition-fast);
}

.article-tag:hover {
  background: var(--color-gray-200);
  color: var(--color-black);
}

/* Share */
.article-share {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-lg) 0;
  border-top: 1px solid var(--color-gray-200);
  border-bottom: 1px solid var(--color-gray-200);
}

.share-label {
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--color-black);
}

.share-buttons {
  display: flex;
  gap: var(--space-xs);
}

.share-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-gray-100);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gray-600);
  text-decoration: none;
  transition: all var(--transition-fast);
}

.share-btn:hover {
  background: var(--color-black);
  color: var(--color-white);
}

.share-btn svg {
  width: 18px;
  height: 18px;
}

/* Author Box */
.author-box {
  display: flex;
  gap: var(--space-lg);
  padding: var(--space-xl);
  background: var(--color-gray-50);
  border-radius: var(--radius-xl);
  margin: var(--space-xl) 0;
}

.author-box-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: white;
  flex-shrink: 0;
}

.author-box-info h4 {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--color-black);
  margin-bottom: var(--space-xs);
}

.author-box-role {
  font-size: var(--text-sm);
  color: var(--color-accent);
  margin-bottom: var(--space-sm);
}

.author-box-bio {
  font-size: var(--text-sm);
  color: var(--color-gray-600);
  line-height: 1.6;
}
```

### 7.10 Related Articles

```css
.related-articles {
  padding: var(--space-2xl) 0;
}

.related-title {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--color-black);
  margin-bottom: var(--space-lg);
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
}

.related-card {
  background: var(--color-white);
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-lg);
  overflow: hidden;
  text-decoration: none;
  transition: all var(--transition-base);
}

.related-card:hover {
  border-color: var(--color-gray-300);
  box-shadow: var(--shadow-md);
}

.related-image {
  aspect-ratio: 16/10;
  background: var(--color-gray-100);
  display: flex;
  align-items: center;
  justify-content: center;
}

.related-image svg {
  width: 32px;
  height: 32px;
  color: var(--color-gray-300);
}

.related-content {
  padding: var(--space-md);
}

.related-card-title {
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--color-black);
  line-height: 1.4;
  margin-bottom: var(--space-xs);
}

.related-card:hover .related-card-title {
  color: var(--color-accent);
}

.related-meta {
  font-size: var(--text-xs);
  color: var(--color-gray-500);
}
```

### 7.11 Responsive Styles

```css
@media (max-width: 768px) {
  .article-meta {
    flex-direction: column;
    align-items: flex-start;
  }

  .article-stats {
    margin-left: 0;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .related-grid {
    grid-template-columns: 1fr;
  }

  .author-box {
    flex-direction: column;
    text-align: center;
  }

  .cta-buttons {
    flex-direction: column;
  }
}

@media (max-width: 1024px) {
  .article-layout {
    grid-template-columns: 1fr;
  }

  .article-sidebar {
    position: relative;
    top: 0;
    order: 1;
    margin-top: var(--space-xl);
  }

  .article-main {
    order: 0;
  }

  .sidebar-slider-container {
    height: 240px;
  }

  .sidebar-slide {
    height: 240px;
  }
}
```

---

## 8. Sidebar con Slider

### 8.1 Estilos del Sidebar Slider

```css
.article-sidebar {
  position: sticky;
  top: 100px;
  height: fit-content;
}

.sidebar-slider {
  background: linear-gradient(180deg, #1a1a2e 0%, #0f3460 100%);
  border-radius: var(--radius-xl);
  overflow: hidden;
  position: relative;
}

.sidebar-slider-header {
  padding: var(--space-md) var(--space-lg);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sidebar-slider-title {
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.sidebar-slider-counter {
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.6);
}

.sidebar-slider-container {
  position: relative;
  overflow: hidden;
  height: 280px;
}

.sidebar-slides {
  transition: transform 0.4s ease;
}

.sidebar-slide {
  padding: var(--space-lg);
  height: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-sizing: border-box;
}

.sidebar-slide-icon {
  width: 56px;
  height: 56px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: var(--space-md);
}

.sidebar-slide-step {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  font-size: var(--text-sm);
  font-weight: var(--font-bold);
  color: white;
  margin-bottom: var(--space-sm);
}

.sidebar-slide-title {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: white;
  margin-bottom: var(--space-sm);
  line-height: 1.2;
}

.sidebar-slide-text {
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
}

.sidebar-slider-nav {
  display: flex;
  justify-content: center;
  gap: var(--space-sm);
  padding: var(--space-md);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-nav-btn {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
}

.sidebar-nav-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.sidebar-nav-btn svg {
  width: 16px;
  height: 16px;
  color: white;
}

.sidebar-dots {
  display: flex;
  gap: 6px;
  align-items: center;
  padding: 0 var(--space-sm);
}

.sidebar-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  border: none;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.sidebar-dot.active {
  background: white;
  transform: scale(1.3);
}

.sidebar-progress {
  height: 3px;
  background: rgba(255, 255, 255, 0.2);
}

.sidebar-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #3B82F6, #8B5CF6);
  width: 16.66%;
  transition: width 0.3s ease;
}

/* Sidebar CTA */
.sidebar-cta {
  margin-top: var(--space-lg);
  padding: var(--space-lg);
  background: var(--color-gray-50);
  border-radius: var(--radius-xl);
  text-align: center;
}

.sidebar-cta-title {
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--color-black);
  margin-bottom: var(--space-xs);
}

.sidebar-cta-text {
  font-size: var(--text-sm);
  color: var(--color-gray-500);
  margin-bottom: var(--space-md);
}

.sidebar-cta-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-sm) var(--space-lg);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: white;
  background: var(--color-black);
  border-radius: var(--radius-full);
  text-decoration: none;
  transition: all var(--transition-fast);
}

.sidebar-cta-btn:hover {
  background: var(--color-gray-800);
}
```

---

## 9. SEO y Metadatos

### 9.1 Meta Tags Esenciales

```html
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- SEO Primary Tags -->
  <title>[TITULO_ARTICULO] | [CATEGORIA] | Barberia.mx</title>
  <meta name="description" content="[DESCRIPCION_150_160_CARACTERES]">
  <meta name="keywords" content="[KEYWORD_1], [KEYWORD_2], [KEYWORD_3], barberia, mexico">
  <meta name="author" content="Barberia.mx">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <link rel="canonical" href="https://barberia.mx/articulos/[SLUG].html">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://barberia.mx/articulos/[SLUG].html">
  <meta property="og:title" content="[TITULO_PARA_REDES_60_CHARS]">
  <meta property="og:description" content="[DESCRIPCION_PARA_REDES_155_CHARS]">
  <meta property="og:image" content="https://barberia.mx/img/articulos/[SLUG]-og.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="[DESCRIPCION_IMAGEN]">
  <meta property="og:site_name" content="Barberia.mx">
  <meta property="og:locale" content="es_MX">
  <meta property="article:published_time" content="[YYYY-MM-DDTHH:MM:SS-06:00]">
  <meta property="article:modified_time" content="[YYYY-MM-DDTHH:MM:SS-06:00]">
  <meta property="article:author" content="https://barberia.mx/autores/[SLUG-AUTOR]">
  <meta property="article:section" content="[CATEGORIA]">
  <meta property="article:tag" content="[TAG_1]">
  <meta property="article:tag" content="[TAG_2]">
  <meta property="article:tag" content="[TAG_3]">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="https://barberia.mx/articulos/[SLUG].html">
  <meta name="twitter:title" content="[TITULO_PARA_TWITTER]">
  <meta name="twitter:description" content="[DESCRIPCION_PARA_TWITTER]">
  <meta name="twitter:image" content="https://barberia.mx/img/articulos/[SLUG]-og.jpg">
  <meta name="twitter:site" content="@barberiamx">
  <meta name="twitter:creator" content="@barberiamx">

  <!-- Favicon -->
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" href="/icon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <meta name="theme-color" content="#ffffff">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

  <!-- Styles -->
  <link rel="stylesheet" href="/css/style.css">
</head>
```

### 9.2 Buenas Prácticas SEO

| Elemento | Longitud Óptima | Notas |
|----------|-----------------|-------|
| Title | 50-60 caracteres | Incluir keyword principal |
| Meta Description | 150-160 caracteres | Call to action incluido |
| H1 | 1 por página | Único, descriptivo |
| URL/Slug | 3-5 palabras | Sin acentos, kebab-case |
| Alt de imágenes | 50-125 caracteres | Descriptivo |

---

## 10. Schema.org (Datos Estructurados)

### 10.1 Article Schema

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[TITULO_COMPLETO_ARTICULO]",
  "description": "[DESCRIPCION_DEL_ARTICULO]",
  "image": [
    "https://barberia.mx/img/articulos/[SLUG]-1x1.jpg",
    "https://barberia.mx/img/articulos/[SLUG]-4x3.jpg",
    "https://barberia.mx/img/articulos/[SLUG]-16x9.jpg"
  ],
  "author": {
    "@type": "Person",
    "name": "[NOMBRE_AUTOR]",
    "url": "https://barberia.mx/autores/[SLUG-AUTOR]"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Barberia.mx",
    "logo": {
      "@type": "ImageObject",
      "url": "https://barberia.mx/img/logo.png"
    }
  },
  "datePublished": "[YYYY-MM-DDTHH:MM:SS-06:00]",
  "dateModified": "[YYYY-MM-DDTHH:MM:SS-06:00]",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://barberia.mx/articulos/[SLUG].html"
  },
  "articleSection": "[CATEGORIA]",
  "keywords": ["[KEYWORD_1]", "[KEYWORD_2]", "[KEYWORD_3]"]
}
</script>
```

### 10.2 BreadcrumbList Schema

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Inicio",
      "item": "https://barberia.mx"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://barberia.mx/blog.html"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "[CATEGORIA]",
      "item": "https://barberia.mx/categorias/[SLUG-CATEGORIA]/"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "[TITULO_CORTO_ARTICULO]",
      "item": "https://barberia.mx/articulos/[SLUG].html"
    }
  ]
}
</script>
```

### 10.3 FAQPage Schema

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[PREGUNTA_1]?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[RESPUESTA_1]"
      }
    },
    {
      "@type": "Question",
      "name": "[PREGUNTA_2]?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[RESPUESTA_2]"
      }
    },
    {
      "@type": "Question",
      "name": "[PREGUNTA_3]?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[RESPUESTA_3]"
      }
    }
  ]
}
</script>
```

---

## 11. Integración en blog.html

### 11.1 Featured Article (Artículo Destacado)

Si el artículo es el más reciente o destacado, actualizar la sección Featured:

```html
<!-- Featured Article -->
<a href="/articulos/[SLUG].html" class="featured-article">
  <div class="featured-image">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
      <!-- SVG icon representativo -->
    </svg>
  </div>
  <div class="featured-content">
    <span class="featured-category" style="background: rgba([R], [G], [B], 0.1); color: #[HEX];">[CATEGORIA]</span>
    <h2 class="featured-title">[TITULO_ARTICULO]</h2>
    <p class="featured-excerpt">
      [DESCRIPCION_BREVE_2_3_LINEAS]
    </p>
    <div class="featured-meta">
      <div class="featured-author">
        <div class="author-avatar">[INICIALES]</div>
        <div class="author-info">
          <span class="author-name">[NOMBRE_AUTOR]</span>
        </div>
      </div>
      <span class="read-time">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
        [X] min lectura
      </span>
    </div>
  </div>
</a>
```

### 11.2 Article Card (Card en Grid)

Agregar al inicio del grid `blog-grid`:

```html
<!-- Article: [TITULO] -->
<a href="/articulos/[SLUG].html" class="article-card">
  <div class="article-image">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
      <!-- SVG icon representativo -->
    </svg>
    <span class="article-card-category [SLUG-CATEGORIA]">[CATEGORIA]</span>
  </div>
  <div class="article-content">
    <h3 class="article-title">[TITULO_ARTICULO]</h3>
    <p class="article-excerpt">
      [DESCRIPCION_BREVE_1_2_LINEAS]
    </p>
    <div class="article-footer">
      <div class="article-author-small">
        <div class="author-avatar-small">[INICIALES]</div>
        <span class="author-name-small">[NOMBRE_AUTOR]</span>
      </div>
      <span class="article-meta-small">[X] min</span>
    </div>
  </div>
</a>
```

### 11.3 Clases de Categoría para Cards

```css
.article-card-category.tendencias { background: rgba(245, 158, 11, 0.9); }
.article-card-category.tecnicas { background: rgba(16, 185, 129, 0.9); }
.article-card-category.productos { background: rgba(139, 92, 246, 0.9); }
.article-card-category.negocios { background: rgba(59, 130, 246, 0.9); }
.article-card-category.estilo-de-vida { background: rgba(236, 72, 153, 0.9); }
```

### 11.4 Proceso de Actualización

1. **Agregar nuevo artículo al Featured** (si corresponde)
2. **Mover el Featured anterior** al primer lugar del grid
3. **Agregar card del nuevo artículo** al grid (si no es featured)
4. **Los artículos existentes se recorren** hacia abajo automáticamente

---

## 12. Integración en Página de Categoría

### 12.1 Ubicación

`/categorias/[SLUG-CATEGORIA]/index.html`

### 12.2 Article Card para Categoría

```html
<a href="/articulos/[SLUG].html" class="article-card">
  <div class="article-image">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
      <!-- SVG -->
    </svg>
  </div>
  <div class="article-content">
    <h3 class="article-title">[TITULO_ARTICULO]</h3>
    <p class="article-excerpt">[DESCRIPCION_BREVE]</p>
    <div class="article-footer">
      <div class="article-author">
        <div class="author-avatar">[INICIALES]</div>
        <span class="author-name">[NOMBRE_AUTOR]</span>
      </div>
      <span class="article-meta">[X] min</span>
    </div>
  </div>
</a>
```

### 12.3 Actualizar Contador

Actualizar el contador de artículos en la categoría:

```html
<span class="articles-count"><strong>[NUMERO_TOTAL]</strong> articulos en [CATEGORIA]</span>
```

---

## 13. JavaScript Requerido

### 13.1 Scripts Base

```html
<script src="/js/app.js"></script>
<script>
  // Mobile Navigation
  document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMobile = document.getElementById('nav-mobile');

    if (navToggle && navMobile) {
      navToggle.addEventListener('click', function() {
        navMobile.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.style.overflow = navMobile.classList.contains('active') ? 'hidden' : '';
      });
    }

    // Navbar scroll
    const navbar = document.getElementById('navbar');
    if (navbar) {
      window.addEventListener('scroll', function() {
        navbar.classList.toggle('nav-scrolled', window.pageYOffset > 100);
      }, { passive: true });
    }

    // Sidebar Slider
    const slidesContainer = document.getElementById('sidebarSlides');
    const prevBtn = document.getElementById('sidebarPrev');
    const nextBtn = document.getElementById('sidebarNext');
    const dots = document.querySelectorAll('.sidebar-dot');
    const counter = document.getElementById('currentSlide');
    const progressBar = document.getElementById('sidebarProgress');
    const totalSlides = 6;
    let currentSlide = 0;

    function getSlideHeight() {
      return window.innerWidth <= 1024 ? 240 : 280;
    }

    function goToSlide(index) {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
      currentSlide = index;

      // Vertical slider - move slides up/down
      if (slidesContainer) {
        const slideHeight = getSlideHeight();
        slidesContainer.style.transform = `translateY(-${currentSlide * slideHeight}px)`;
      }

      // Update counter
      if (counter) {
        counter.textContent = currentSlide + 1;
      }

      // Update dots
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });

      // Update progress bar
      if (progressBar) {
        const progressWidth = ((currentSlide + 1) / totalSlides) * 100;
        progressBar.style.width = `${progressWidth}%`;
      }
    }

    // Navigation buttons
    if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

    // Dots navigation
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => goToSlide(index));
    });

    // Auto-play
    const slider = document.querySelector('.sidebar-slider');
    let autoPlay = setInterval(() => goToSlide(currentSlide + 1), 4000);

    if (slider) {
      slider.addEventListener('mouseenter', () => clearInterval(autoPlay));
      slider.addEventListener('mouseleave', () => {
        autoPlay = setInterval(() => goToSlide(currentSlide + 1), 4000);
      });
    }

    // Recalculate on resize
    window.addEventListener('resize', () => {
      if (slidesContainer) {
        const slideHeight = getSlideHeight();
        slidesContainer.style.transform = `translateY(-${currentSlide * slideHeight}px)`;
      }
    }, { passive: true });
  });
</script>
```

---

## 14. Checklist de Publicación

### Pre-publicación

- [ ] **Contenido**
  - [ ] Artículo redactado y revisado
  - [ ] Sin errores ortográficos ni gramaticales
  - [ ] Mínimo 1,000 palabras
  - [ ] Estructura con H2s y H3s adecuados
  - [ ] FAQ section incluida (mínimo 3 preguntas)

- [ ] **Archivos**
  - [ ] Archivo HTML creado en `/articulos/[slug].html`
  - [ ] Slug sin acentos, en kebab-case
  - [ ] Imágenes optimizadas (si aplica)

- [ ] **SEO**
  - [ ] Title tag (50-60 caracteres)
  - [ ] Meta description (150-160 caracteres)
  - [ ] URL canónica correcta
  - [ ] Open Graph tags completos
  - [ ] Twitter Card tags completos
  - [ ] Schema.org Article
  - [ ] Schema.org BreadcrumbList
  - [ ] Schema.org FAQPage

- [ ] **Diseño**
  - [ ] Hero inline con categoría, título, excerpt, meta
  - [ ] Sidebar slider con 6 pasos
  - [ ] CTA box estratégicamente ubicado
  - [ ] Tags relevantes
  - [ ] Author box completo
  - [ ] Related articles (3 artículos)

- [ ] **Código**
  - [ ] Todos los estilos CSS incluidos
  - [ ] JavaScript de sidebar slider
  - [ ] Navegación móvil funcional
  - [ ] Responsive verificado

### Post-publicación

- [ ] **Integraciones**
  - [ ] Agregado a blog.html (featured o grid)
  - [ ] Agregado a página de categoría correspondiente
  - [ ] Contador de categoría actualizado
  - [ ] Artículos existentes recorridos

- [ ] **Testing**
  - [ ] Verificar en desktop (1440px+)
  - [ ] Verificar en tablet (768px-1024px)
  - [ ] Verificar en móvil (320px-767px)
  - [ ] Links internos funcionando
  - [ ] Imágenes cargando correctamente
  - [ ] Slider funcional en todas las resoluciones

- [ ] **Validación**
  - [ ] HTML válido (W3C Validator)
  - [ ] Schema.org validado (Google Rich Results Test)
  - [ ] Open Graph validado (Facebook Debugger)
  - [ ] Twitter Card validado (Twitter Card Validator)

---

## 15. Convenciones de Nomenclatura

### URLs y Slugs

| Tipo | Formato | Ejemplo |
|------|---------|---------|
| Artículo | `/articulos/[slug].html` | `/articulos/como-encontrar-barberia.html` |
| Categoría | `/categorias/[slug]/` | `/categorias/negocios/` |
| Autor | `/autores/[slug]/` | `/autores/carlos-mendoza/` |

### Archivos de Imagen

| Tipo | Formato | Dimensiones |
|------|---------|-------------|
| OG Image | `[slug]-og.jpg` | 1200x630px |
| Thumbnail | `[slug]-thumb.jpg` | 400x250px |
| 1:1 | `[slug]-1x1.jpg` | 1200x1200px |
| 4:3 | `[slug]-4x3.jpg` | 1200x900px |
| 16:9 | `[slug]-16x9.jpg` | 1200x675px |

### Clases CSS

| Elemento | Prefijo | Ejemplo |
|----------|---------|---------|
| Artículo | `article-` | `article-hero-inline` |
| Sidebar | `sidebar-` | `sidebar-slider` |
| Blog | `blog-` | `blog-grid` |
| Featured | `featured-` | `featured-article` |
| Related | `related-` | `related-card` |

---

## 16. Ejemplos de Referencia

### Artículo de Referencia

**Archivo:** `/articulos/como-encontrar-barberia-cerca-de-ti.html`

Este artículo sirve como plantilla base y referencia para todos los artículos futuros. Contiene:

- Estructura completa de dos columnas
- Hero inline con todos los elementos
- Sidebar slider con 6 pasos
- Stats grid
- Feature list
- CTA box
- FAQ section
- Article footer con tags, share y author box
- Related articles
- Todos los Schema.org necesarios
- JavaScript completo para el slider

### Uso como Plantilla

1. Duplicar el archivo de referencia
2. Renombrar con el nuevo slug
3. Reemplazar todos los placeholders marcados con `[CORCHETES]`
4. Ajustar colores de categoría según corresponda
5. Actualizar Schema.org con datos reales
6. Verificar todos los links internos

---

## Historial de Versiones

| Versión | Fecha | Cambios |
|---------|-------|---------|
| 1.0.0 | Nov 2024 | Documento inicial |

---

## Contacto y Soporte

Para dudas sobre este documento o el proceso de publicación:

- **Email:** equipo@barberia.mx
- **Repositorio:** Consultar archivos en `.audit/`

---

*Este documento es propiedad de Barberia.mx y debe ser actualizado con cada cambio significativo en la estructura de artículos.*
