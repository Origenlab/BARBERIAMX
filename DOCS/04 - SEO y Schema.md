# 04 — SEO y Schema.org

> Estrategia de keywords, implementación de Schema.org y meta tags pattern.

---

## 1. Estrategia de Keywords

Ver también [[memory · feedback-national-scope]].

### Primary keywords (national)

- `directorio de barberías en México`
- `mejores barberías de México`
- `barberías en México`
- `directorio nacional barberías`
- `barbería profesional México`

### Secondary keywords (location)

- `barbería CDMX`
- `barbería Guadalajara`
- `barbería Monterrey`
- `barbería Tijuana`
- `barbería Puebla`
- `barbería Querétaro`
- `barbería Mérida`

### Long-tail (specific)

- `mejores barberías Roma Norte`
- `barbería Polanco premium`
- `fade perfecto técnica`
- `abrir barbería en México`
- `bolsa trabajo barberos`
- `marketplace barberos`

### Branded

- `Barberia.mx` / `Barberia MX` / `Barbería México`

---

## 2. Schema.org · Homepage

Dos schemas en `<head>`:

### 2.1 Organization (principal)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://barberia.mx/#organization",
  "name": "Barberia.mx",
  "alternateName": ["Barbería México", "BarberiaMX"],
  "url": "https://barberia.mx",
  "logo": { "@type": "ImageObject", "url": "...", "width": 512, "height": 512 },
  "description": "Barberia.mx es el directorio editorial de barberías más antiguo y completo de México...",
  "slogan": "El directorio editorial del oficio barbero en México",
  "foundingDate": "2005",
  "foundingLocation": {
    "@type": "Place",
    "address": { "addressLocality": "Ciudad de México", "addressRegion": "CDMX", "addressCountry": "MX" }
  },
  "areaServed": { "@type": "Country", "name": "México" },
  "knowsAbout": ["Directorio de barberías", "Barbería en México", ...],
  "knowsLanguage": ["es-MX", "es"],
  "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 5, "maxValue": 15 },
  "contactPoint": [
    { "@type": "ContactPoint", "contactType": "customer service", "email": "hola@barberia.mx" },
    { "@type": "ContactPoint", "contactType": "editorial", "email": "redaccion@barberia.mx" }
  ],
  "makesOffer": [
    { "@type": "Offer", "name": "Directorio de barberías en México", "price": "0", "priceCurrency": "MXN" },
    { "@type": "Offer", "name": "Registro de barbería en directorio", "price": "0", "priceCurrency": "MXN" },
    { "@type": "Offer", "name": "Marketplace de herramientas y productos profesionales" },
    { "@type": "Offer", "name": "Bolsa de trabajo para barberos" },
    { "@type": "Offer", "name": "Revista editorial mensual del oficio barbero" }
  ],
  "sameAs": ["instagram.com/barberiamx", "facebook.com/barberiamx", "twitter.com/barberiamx"]
}
```

### 2.2 WebSite (para sitelinks searchbox)

```json
{
  "@type": "WebSite",
  "@id": "https://barberia.mx/#website",
  "url": "https://barberia.mx/",
  "name": "Barberia.mx",
  "inLanguage": "es-MX",
  "publisher": { "@id": "https://barberia.mx/#organization" },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://barberia.mx/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

---

## 3. Schemas por tipo de página

| Página | Schema principal | @id |
|---|---|---|
| Homepage | `Organization` + `WebSite` | `#organization`, `#website` |
| Blog | `Blog` | `#blog` |
| Categorías hub | `CollectionPage` | `#collection` |
| Sub-categorías | `CollectionPage` con `mainEntity` ItemList | `#category-{name}` |
| Zona | `ItemList` | `#zonas` |
| CDMX guide | `TouristAttraction` | `#cdmx` |
| Barbería detalle | `LocalBusiness` o `HealthAndBeautyBusiness` ⏳ | `#barberia-{slug}` |
| Artículo largo | `Article` con `author`, `datePublished` ⏳ | `#article-{slug}` |
| 404 | — | — |

Las marcadas con ⏳ son páginas pendientes — ver [[05 - Guía de Continuación]].

---

## 4. Meta tags pattern (estándar por página)

```html
<title>{H1 KEYWORD} · {SUBTÍTULO} — Barberia.mx</title>

<meta name="description" content="{1-2 sentences · 150-160 chars · incluir keyword principal + Barberia.mx + USP}">
<meta name="keywords" content="{8-12 keywords separados por comas, mix de primary + location + long-tail}">
<meta name="author" content="Barberia.mx">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<link rel="canonical" href="https://barberia.mx/{path}">

<!-- Open Graph -->
<meta property="og:title" content="...">
<meta property="og:type" content="website|article">
<meta property="og:url" content="...">
<meta property="og:image" content="https://barberia.mx/img/og-{page}.jpg">
<meta property="og:description" content="...">
<meta property="og:site_name" content="Barberia.mx">
<meta property="og:locale" content="es_MX">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@barberiamx">
<meta name="twitter:title" content="...">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="...">

<!-- Theme -->
<meta name="theme-color" content="#0a0a0a">
```

---

## 5. Patrones de copy SEO

### Hero col aside (homepage)

Estructura de 2 párrafos:
- **Párrafo 1 (autoridad/historia):** "Barberia.mx es el [directorio nacional / directorio editorial] de barberías más antiguo y completo de México. Desde 2005 [verb] [data]..."
- **Párrafo 2 (scope/CTA):** "Más que un directorio, somos el [archivo cultural / referencia]... operamos [servicios]... si eres [audience], puedes [action gratis]."

### Section-intro copy

Cada `.ed-section-intro-r` lleva 2 párrafos:
- **Copy A (SEO):** menciona <strong>Barberia.mx</strong> con valor + data verificable + keyword principal de la sección
- **Copy B (Marketing):** menciona <strong>Barberia.mx</strong> con CTA + link interno + alcance nacional

Ver ejemplos en [[06 - Patrones Editoriales#Section Intro Pattern]].

### Reglas obligatorias

- ✅ Siempre mencionar `<strong>Barberia.mx</strong>` al menos 1× por bloque de copy
- ✅ Incluir "México" o "nacional" o "32 estados" en cada bloque de copy
- ✅ Links internos a anchors del homepage (`#marketplace`, `#empleo`, `#registro`) con `border-bottom: 1px solid var(--copper)`
- ✅ Datos verificables: 1,247 barberías · 32 estados · 20+ años · 600 productos · 80+ vacantes · 48K lectores
- ❌ NO repetir el título en el copy (uso de keyword variation)
- ❌ NO usar lenguaje vago ("muchas", "varios") cuando hay número específico

---

## 6. Sitemap y robots

- `/robots.txt` — verificar que esté actualizado (revisar al hacer deploy)
- `/sitemap.xml` — pendiente de regenerar con las páginas nuevas

---

## Relacionado
- [[03 - Páginas]] — qué meta y schema usa cada página
- [[05 - Guía de Continuación]] — cómo añadir schemas a páginas nuevas
- [[06 - Patrones Editoriales]] — reglas de copy
