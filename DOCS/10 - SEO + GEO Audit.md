# 10 — Auditoría SEO + GEO Profunda · 2026-05-29

> Estudio profesional cubriendo SEO técnico, semántico, GEO, EEAT, local, schemas, conversión, comparativa contra competencia y roadmap. Foco: posicionar **"barbería"** y **"barberías"** en Google México + motores generativos (ChatGPT, Gemini, Perplexity, Google AI Overviews, Bing Copilot).

**Auditor:** redacción técnica de agencia SEO semántico/GEO especializada en directorios verticales México
**Alcance:** sitio completo migrado a clean URLs
**Fecha:** 2026-05-29

---

## Diagnóstico ejecutivo (1 línea)

> Barberia.mx tiene un **front-end editorial de clase A1**, un **back-end semántico de clase B+**, y un **gap masivo entre lo que promete (1,247 barberías en 32 estados) y lo que entrega (5 fichas reales + 6 hubs)**. Ese gap es el único bloqueador real para dominar nacional en 6 meses.

---

## 1 · ANÁLISIS SEO GENERAL DEL SITIO

### 1.1 Arquitectura · jerarquía · clean URLs

La arquitectura está **bien concebida pero subentregada**.

```
/                              ← homepage (1,225 lns)
/directorio/                   ← hub directorio nacional (1,105 lns)
/ciudad-de-mexico/             ← hub estado (348 lns)
/ciudad-de-mexico/barberia-*/  ← 5 fichas (legacy, 1,360-1,490 lns)
/zona/                         ← hub atlas zonas CDMX (328 lns)
/blog/                         ← hub editorial (600 lns)
/categorias/                   ← hub secciones (217 lns)
/categorias/{slug}/            ← 5 sub-hubs categorías (317-682 lns)
/articulos/{slug}/             ← 3 long-reads (1,854-2,190 lns)
/404.html
```

Clean URLs implementadas correctamente (folder + `index.html`, sin `.html` en hrefs visibles). **Bien hecho.**

**Problema crítico de jerarquía:** los **31 estados restantes** y las **6 regiones** prometidas en `index.html:147-178` y `directorio/index.html:792-866` no existen (404 silenciosos). Cualquier crawler que siga el `ItemList` schema cae en muros 404, lo cual:
- Diluye autoridad del sitio (broken internal links = señal negativa).
- Hace que el `numberOfItems: 32` del ItemList sea **falso** según Google.
- Impide rankear por queries `"barberías en Jalisco"`, `"barberías en Monterrey"`, etc.

**Inconsistencia de canonicals legacy en fichas CDMX.** En `ciudad-de-mexico/barberia-roma-norte-cuauhtemoc/index.html:48` el `@id` termina en `.html` mientras el canonical (línea 13) ya está en clean URL `/`. Mismo bug en breadcrumbs (línea 120). Confirmado en las 5 fichas legacy + el blog (`blog/index.html:39,63` con `blog.html#blog`). **Esto es un riesgo de canonicalización inconsistente — Google puede interpretar como duplicate content.**

### 1.2 On-page SEO de hubs migrados — calidad

| Página | Title | Description | H1 | Verdict |
|---|---|---|---|---|
| `/` | "Las Mejores Barberías de México · Directorio Nacional — Barberia.mx" (66 chars) | 281 chars ✓ | Las mejores **barberías** de México, en un solo directorio | A |
| `/directorio/` | "Directorio Nacional de Barberías en México · 1,247 reseñadas — Barberia.mx" (75 chars) | 246 chars ✓ | El **directorio editorial** de la barbería mexicana | A |
| `/ciudad-de-mexico/` | "Ciudad de México · Guía editorial de barberías" | OK | La **guía** editorial de la Ciudad de México | B (no incluye "mejores" ni "1,247") |
| `/zona/` | "Atlas de Zonas · Barberías por colonia" | OK | La ciudad por **colonias**. El oficio por zonas. | B (falta "CDMX" en H1, search intent débil) |
| `/blog/` | "La Edición · Revista Editorial del Oficio Barbero" | OK | Lecturas para la **nueva** escena barbera mexicana | C (title sin keyword principal) |
| `/categorias/` | "Secciones · Categorías Editoriales" | OK | Cinco **secciones**, una sola conversación | D (keyword "barbería" no aparece) |

**Fix sugerido:**
- `/blog/`: → `"Revista de Barberías y Cultura del Oficio Barbero México — Barberia.mx"`
- `/categorias/`: → `"Categorías Editoriales sobre Barberías en México — Barberia.mx"`

### 1.3 Páginas legacy CDMX (5 fichas barbería)

Estas son las **únicas páginas-producto reales** del sitio. Problemas serios:

1. **No cargan `editorial.css` ni `mobile.css`** — solo `style.css`. Se rompen del sistema de diseño y rinden mal en móvil.
2. **Schema.org `LocalBusiness`** está bien pero **no es `BarberShop`** (subtype específico Schema.org, más preciso).
3. **`hasOfferCatalog` truncado** (2 servicios cuando HTML lista 8).
4. **Sin schema `Review`/`Person`** para reviews mostradas (líneas 1083+), perdiendo rich snippets de estrellas.
5. **Footer hardcodeado o broken** — no usan `<div data-component="footer">`.

### 1.4 Indexación · robots.txt · sitemap.xml

**`robots.txt`** mínimo viable. **Falta** declaración explícita para GPTBot, ClaudeBot, PerplexityBot, GoogleExtended, Bingbot:

```
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /
```

**`sitemap.xml`**: solo 17 URLs. **Faltan:**
- `/directorio/` (no está) — bug crítico
- `/ciudad-de-mexico/` (no está como hub)

### 1.5 Crawlability · interlinking · profundidad

Profundidad ≤2 clicks. Interlinking `.ed-related` bien hecho. Footer robusto (22 enlaces).

**Pero**: enlaces `/#marketplace`, `/#empleo`, `/#registro` son anchors sin página propia. Deberían ser páginas indexables (`/marketplace/`, `/empleo/`, `/registro/`) para captar long-tails.

### 1.6 Keyword cannibalization

**Riesgo medio-alto entre cuatro páginas:**

| Página | Target query potencial |
|---|---|
| `/` | "directorio de barberías México" |
| `/directorio/` | "directorio nacional de barberías" |
| `/ciudad-de-mexico/` | "barberías CDMX", "mejores barberías CDMX" |
| `/articulos/mejores-barberias-ciudad-de-mexico-cdmx/` | "mejores barberías CDMX" |

`/ciudad-de-mexico/` y el artículo **compiten por la misma intent**. Diferenciar:
- Hub: *"Barberías en Ciudad de México · 187 indexadas — Directorio Barberia.mx"* (navegacional)
- Artículo: *"Las 5 Mejores Barberías de CDMX (Selección Editorial 2026) — Barberia.mx"* (editorial)

### 1.7 Local SEO

Solo CDMX cubierta. No hay `LocalBusiness` con `geo` por estado (solo las 5 fichas). NAP del medio inexistente. Falta `Service` schema en hubs estatales (cuando existan).

### 1.8 Mobile

`mobile.css` cargado en hubs migrados. **Las 5 fichas legacy NO lo cargan.** Bug crítico de UX móvil.

### 1.9 Search intent coverage

| Intent | Cubierto |
|---|---|
| Navegacional | ✓ Parcial |
| Informacional | ✓ |
| Transaccional (reservar) | ✗ |
| Comercial (vender barbería) | ✓ Débil |
| Investigativa (precios) | ⚠ |
| "Cerca de mí" | ⚠ |

**Falta cubrir:** "Cuánto cuesta corte de cabello México 2026", "Diferencia entre barbería y peluquería", "Tipos de cortes hombre 2026".

---

## 2 · ANÁLISIS GEO (Generative Engine Optimization)

### 2.1 Cómo "ve" el sitio una IA generativa

ChatGPT, Perplexity, Gemini, AI Overviews extraen *afirmaciones citables*. Materia prima excelente:

**Afirmaciones únicas y citables:**
- "Barberia.mx es el directorio editorial de barberías más antiguo y completo de México, opera desde 2005"
- "1,247 barberías profesionales en los 32 estados del país"
- "Independencia editorial. No publicamos reseñas patrocinadas"
- Datos por estado con copy específico
- Datos por servicio cuantificados: "812 corte clásico · 724 fade · 689 barba"

**Oro para GEO.** Las IAs citan números, fuentes con autoridad, afirmaciones declarativas. Tenemos los tres.

### 2.2 Lo que falta para que las IAs citen

1. **Definiciones explícitas tipo dictionary entry** — no existe `/que-es-una-barberia/` ni bloque `<dfn>` semántico.
2. **FAQ schema (`FAQPage`)** — solo artículo `mejores-cdmx` tiene FAQs HTML, **sin schema**.
3. **Listas tabulares densas** — directorio usa cards visuales, no `<table>` semántica.
4. **Datos primarios verificables** — afirma "1,247" sin explicar metodología.
5. **Páginas tipo *Wikipedia-de-barbería-mexicana*** — TOC, secciones largas, fechas, contexto histórico.

### 2.3 Score GEO por motor

| Motor | Score | Razón |
|---|---|---|
| Google AI Overviews | 4/10 | Hubs ricos pero sin FAQ schema, sin datos primarios |
| ChatGPT | 5/10 | Bien para marca, débil para queries genéricas |
| Perplexity | 4/10 | Falta densidad citas + metodología |
| Bing Copilot | 5/10 | Organization sólido ayuda |
| Gemini | 3/10 | Falta contenido enciclopédico |

### 2.4 Bloques específicamente diseñados para GEO

Hoy no existen. Recomendaciones:

- **`/datos-barberia-mexico-2026/`** — tabla con # barberías nacionales, ticket promedio, sueldo barbero, top 10 estados, certificaciones. Fuentes citadas (INEGI, encuestas propias).
- **`/glosario/`** — `fade`, `taper`, `pompadour`, `undercut`, `quiff`, `barba candado`, `navaja shavette` — cada uno con `Article`/`DefinedTerm` schema y 50-80 palabras.

---

## 3 · ANÁLISIS DE KEYWORDS "BARBERÍA" / "BARBERÍAS"

### 3.1 Densidad por página (medida)

| Página | Refs | Words | Densidad | Sing/Plu | Verdict |
|---|---|---|---|---|---|
| `/` | 219 | 2,367 | **9.25%** | 143/76 | Alto (límite) |
| `/directorio/` | 175 | 1,962 | **8.92%** | 92/83 | Alto (límite) |
| `/blog/` | 75 | 1,341 | 5.59% | 57/18 | OK |
| `/zona/` | 42 | 544 | 7.72% | 22/20 | OK |
| `/categorias/` | 20 | 341 | 5.86% | 18/2 | OK |
| `/ciudad-de-mexico/` | 44 | 489 | 9.0% | 22/22 | Alto |
| Artículo `como-encontrar` | 109 | 3,302 | 3.30% | — | Excelente |
| Artículo `mejores-cdmx` | 101 | 2,790 | 3.62% | — | Excelente |
| Artículo `rutina-grooming` | 51 | 4,568 | 1.12% | — | Bajo |

**Análisis:** densidad >8% es zona de riesgo over-optimization. En `/` y `/directorio/` aparece **una vez cada ~11 palabras** → puede leerse como keyword stuffing por BERT/MUM.

**Recomendación:** sustituir 30-40% de las ocurrencias por sinónimos contextuales:
- "barber shop" (anglicismo común en México)
- "casa" (uso editorial, ya presente)
- "establecimiento" (formal)
- "salón masculino"
- "peluquería para hombre" (cross-search)
- "estudio" (premium)

### 3.2 Distribución por elemento

```
H1 con "barbería/s":         7/19 páginas (37%)
H2 con "barbería/s":         ~18/~95 H2 (19%) — bajo
H3 con "barbería/s":         32× cards estado — natural
<title> con keyword:         14/19 (74%)
<meta description>:          17/19 (89%)
<alt> imágenes:              ~95%
```

**Gap:** H2 de section-intros son creativos editoriales pero sub-optimizan keywords. Ejemplo `directorio/index.html:163`:
> "El directorio completo, estado por estado"

**Mejor SEO:**
> "Las barberías de México, estado por estado · Directorio completo"

### 3.3 Long-tails cubiertos vs sin cubrir

| Long-tail | Estado |
|---|---|
| "barbería cerca de mí" | ✓ |
| "mejores barberías México" | ✓ |
| "barberías en México" | ✓ |
| "barbería CDMX" | ✓ |
| "barbería profesional" | ✓ |
| "barberías premium" | ✓ |
| "barber shop México" | ✗ (alto volumen) |
| "directorio de barberías" | ✓ |
| "corte de cabello hombre" | ⚠ Sin página dedicada |
| "barbería masculina" | ✗ |
| "barberos profesionales" | ✓ |
| "barberías para hombres" | ⚠ |
| "barbería de lujo" | ✗ |
| "barbería en Guadalajara" | ⚠ Solo card, sin landing |
| "barbería en Monterrey" | ⚠ Solo card, sin landing |

**Acción crítica:** crear landings para top 10 ciudades (Guadalajara, Monterrey, Puebla, Querétaro, Mérida, Tijuana, León, Cancún, Cuernavaca, Toluca) — todas hoy son 404.

### 3.4 Semantic clusters detectados

**Bien formados:** Estado (32 cards) · Servicios (12 chips con count).

**Faltantes:**
- **Técnicas** (fade, taper, undercut, pompadour, crew cut, low/mid/high fade)
- **Productos** (pomada, cera, gel, aceite barba, shampoo, navaja, máquina)
- **Tipos de barba** (candado, balbo, van dyke, full beard, garibaldi, mutton chops)
- **Ocasiones** (barbería para boda, graduación, primer corte de niño)

---

## 4 · ANÁLISIS DEL CONTENIDO

### 4.1 Calidad editorial — hubs migrados

**Excelente.** Voz consistente, premium, masculina, sin clichés. Ejemplos:
- `index.html:1010`: *"Cortar pelo es un oficio. Documentarlo, una forma de respeto."*
- `directorio/index.html:1013`: *"Cada barbería de este directorio fue visitada en persona."*
- `index.html:340`: *"Epicentro nacional del oficio. Cinco zonas reseñadas y decenas de casas premium en Roma, Polanco, Del Valle."*

**Lectura humana, no automatizada.** El "voice" es el **principal diferenciador** vs treatwell.com.mx o fresha.

### 4.2 EEAT

| Dimensión | Score | Comentario |
|---|---|---|
| Experience | 7/10 | "Visitamos cada barbería" es claim fuerte, **falta evidencia** (fotos del visit, journals con fecha) |
| Expertise | 6/10 | Voz experta, **sin author bios**. Solo bylines "S. García" sin perfil ni link |
| Authority | 5/10 | "Desde 2005" potente, **sin timeline histórica, sin menciones prensa, sin premios** |
| Trust | 6/10 | "Sin patrocinios" fuerte, **`/criterios-editoriales` no existe** (404) |

**Quick wins EEAT:**
1. Crear `/redaccion/` con perfiles autores (fotos, bios, social, # artículos).
2. Crear `/criterios-editoriales/` (ya referenciado, 404).
3. Crear `/sobre-nosotros/` con timeline 2005-2026.
4. Agregar `Person` schema a firmas.

### 4.3 Profundidad temática

| Página | Words | Profundidad |
|---|---|---|
| `/` | 2,367 | Alta |
| `/directorio/` | 1,962 | Alta |
| Artículo grooming | 4,568 | Muy alta |
| Artículo como-encontrar | 3,302 | Alta |
| Artículo mejores-cdmx | 2,790 | Alta pero corta |
| Hubs categorías | ~600 c/u | **Baja** |
| `/zona/` | 544 | Media |
| `/categorias/` | 341 | Baja |

**Hubs de categorías legacy son los más débiles** — <1,000 words, sin texto editorial real, no usan `editorial.css`.

### 4.4 Originalidad

Alto. No detecté boilerplate ni copy-paste. **32 párrafos editoriales por estado** son trabajo real que Google premia.

### 4.5 Hierarchy H1-H6

Verificado: **1 H1 por página en las 19 páginas.** Bien.

**Pero:** los `§ XX — Por Estado` son `<div>` no headings. Conviene `<h2>` o `role="doc-subtitle"`.

---

## 5 · ANÁLISIS DE ESTRUCTURA TOPICAL

### 5.1 Topic clusters

```
HUB CENTRAL
├── Geográfico
│   ├── Directorio Nacional [✓]
│   ├── 32 estados [✗ 1/32: CDMX]
│   ├── 6 regiones [✗ 0/6]
│   ├── Zonas CDMX [✓]
│   └── Alcaldías CDMX [⚠ links inertes]
│
├── Editorial
│   ├── Blog hub [✓]
│   ├── 5 categorías [✓ hubs débiles]
│   └── 3 artículos largos [✓]
│
├── Comercial
│   ├── Marketplace [⚠ vaporware]
│   ├── Empleo [⚠ vaporware]
│   └── Registro [⚠ solo CTA]
│
└── Conocimiento / GEO
    ├── Glosario [✗]
    ├── Metodología [✗]
    ├── Historia [✗]
    └── Datos del oficio [✗]
```

### 5.2 Topical authority por sub-tema

| Sub-tema | Authority |
|---|---|
| Directorio nacional | Media |
| Barberías CDMX | **Alta** |
| Barberías otros estados | **Nula** |
| Grooming | Media-Alta |
| Técnicas (fade, etc.) | **Nula** |
| Productos | **Nula** |
| Negocio barbería | **Nula** |

**Autoridad concentrada en CDMX.** Para "barbería México" general necesita 5-10× más volumen.

---

## 6 · ANÁLISIS DE SCHEMAS Y SEO TÉCNICO

### 6.1 Schemas implementados

| Página | Schemas |
|---|---|
| `/` | `Organization` (rico), `WebSite`+SearchAction, `ItemList` 32 estados |
| `/directorio/` | `CollectionPage`, `BreadcrumbList`, `ItemList` truncado a 8 |
| `/blog/` | `Blog` con 3 `BlogPosting`, `BreadcrumbList` (con `.html` legacy) |
| `/zona/` | `ItemList` 6 zonas (con `.html` legacy en `@id`) |
| `/categorias/` | `CollectionPage` |
| `/categorias/{slug}/` | `CollectionPage`, `BreadcrumbList` (con `.html` legacy) |
| `/ciudad-de-mexico/` | `TouristAttraction` (mal type) |
| Fichas CDMX | `LocalBusiness` (debería ser `BarberShop`), `BreadcrumbList` (`.html` legacy) |
| Artículos | `Article`, `BreadcrumbList`, **sin `FAQPage` aunque hay FAQs** |

### 6.2 Bugs específicos

1. **`ciudad-de-mexico/index.html:38` usa `TouristAttraction`** — incorrecto. Mejor `Place` + `ItemList`.
2. **`@id` con `.html`** en muchas páginas (`blog/index.html:39,63`, `categorias/tendencias/index.html:50,78`, fichas CDMX).
3. **`Organization` sin `aggregateRating`** propio.
4. **`WebSite` SearchAction apunta a `/buscar?q={...}` que no existe**.
5. **`ItemList` directorio con `numberOfItems: 32` pero solo 8 items definidos** — inconsistencia.
6. **Sin `FAQPage` schema** a pesar de FAQs visibles.
7. **Sin `Service` schema** para registrar/empleo/marketplace.
8. **`Review`/`AggregateRating`** solo en 5 fichas, agregado, sin Reviews individuales.

### 6.3 Schemas faltantes — priorizado

| Schema | Prioridad | Donde | Impacto |
|---|---|---|---|
| `FAQPage` | 🔴 Crítica | 3 artículos + home + directorio + criterios | Rich result + GEO |
| `BarberShop` | 🔴 Crítica | 5 fichas legacy | Categorización precisa |
| `BreadcrumbList` | 🔴 Crítica | Faltan en `/`, `/cdmx/`, `/zona/`, `/categorias/` | Sitelinks |
| `Article`+`speakable` | 🟡 Alta | 3 artículos largos | Voice search |
| `Service` | 🟡 Alta | /registro, /marketplace, /empleo | Cuando existan |
| `Person` | 🟡 Alta | Autores bylines | EEAT |
| `Review` individuales | 🟡 Alta | Fichas barbería | Stars rich result |
| `HowTo` | 🟢 Media | Artículo grooming | Snippet específico |
| `Dataset` | 🟢 Media | "Datos del oficio" futuro | Google Dataset Search |
| `VideoObject` | 🟢 Polish | Cuando publiquen video | YouTube tie-in |

---

## 7 · ANÁLISIS DE CONVERSIÓN Y MARKETING

### 7.1 CTAs

| CTA | Ubicación | Funcional |
|---|---|---|
| "Registrar mi barbería" | Home, directorio, blog, CDMX, 404 (4×) | ✗ → /#registro inexistente |
| "Suscribir" newsletter | Home, blog | ✗ Sin backend |
| "Buscar empleo" | Home | ✗ Sin página |
| "Publicar vacante" | Home | ✗ Sin página |
| "Vender un producto" | Home | ✗ Sin página |
| "Buscar barbería" form | Home, directorio | ✗ `/buscar` no existe |
| "Reservar cita" en fichas | 5 fichas | Solo botón estático |

**Diagnóstico:** **el sitio tiene el mejor marketing copy del segmento pero CERO infraestructura de conversión funcional.**

### 7.2 Confianza · branding · premium

- **Branding:** A+ (Fraunces + Inter + Mono, paleta black/cream/copper)
- **Percepción premium:** A
- **Confianza:** B (claims fuertes sin evidencia visual)
- **Social proof:** C (sin logos prensa, sin testimonios, sin métricas tráfico)

### 7.3 Funnel actual (roto)

```
Visitor lands → Hub lectura → Click hub estatal → 404
         ↘ Click ficha CDMX → ficha legacy → CTA reservar no funciona
                                              ↘ CTA registrar → /#registro (mismo home)
```

**Pérdida total de conversión.**

---

## 8 · COMPARATIVA CONTRA COMPETENCIA

| Dimensión | Barberia.mx | Treatwell | Fresha | Booksy |
|---|---|---|---|---|
| Cobertura geográfica | 1 ciudad + 31 cards | Todo MX (real) | Todo MX (real) | Todo MX (real) |
| Booking integrado | ✗ | ✓ | ✓ | ✓ |
| Curaduría editorial | **✓✓✓ Único** | ✗ | ✗ | ✗ |
| Voz / branding | **A+** | C | B | C |
| Reviews verificadas | ⚠ Estáticas | ✓ | ✓ | ✓ |
| Marketplace | ⚠ Vaporware | ✗ | ✗ | ✗ |
| Bolsa trabajo | ⚠ Vaporware | ✗ | ✗ | ✗ |
| Cultura / contenido | **✓✓✓ Único** | ✗ | ✗ | ✗ |
| 21 años de operación | **✓ Único** | <5 años | <5 años | <5 años |
| Independencia editorial | **✓ Único** | n/a | n/a | n/a |
| Schema.org | B+ | B | A | A |
| Mobile | B (hubs A, fichas D) | A | A | A |

**Diferenciadores defendibles:** voz editorial, curaduría sin patrocinios, 21 años, cultura del oficio.

**Lo que competencia hace mejor:** booking real, cobertura nacional REAL, reviews dinámicas, app móvil.

**Estrategia recomendada:** **NO competir con bookers transaccionales.** Posicionarse como *"el New York Times de las barberías mexicanas"*. Dominar la decisión ("¿a qué barbería voy?") y dejar la ejecución (reserva) a integraciones con terceros (Fresha API, Booksy embed).

---

## 9 · PLAN DE MEJORA PRIORITARIO

### 🔴 CRÍTICO · semanas 1-4

| # | Tarea | Impacto | Est. |
|---|---|---|---|
| C1 | Crear 31 hubs estatales + 6 regiones (HTML estático · ~600-800 words c/u) | **Masivo** | 25-35h |
| C2 | `FAQPage` schema en 3 artículos + home + directorio (8-12 Q&A c/u) | **Alto** | 4-6h |
| C3 | `/marketplace/`, `/empleo/`, `/registro/`, `/buscar/` como páginas reales | **Alto** | 8-12h |
| C4 | Fix 5 fichas CDMX legacy: cargar `editorial.css` + `mobile.css`, migrar diseño, `LocalBusiness`→`BarberShop`, agregar `Review` items, limpiar `.html` en `@id` | **Alto** | 6-10h |
| C5 | Limpiar `.html` en `@id` schema y breadcrumbs (blog, categorías, fichas) | Medio | 2h |
| C6 | Sitemap.xml: agregar `/directorio/`, `/ciudad-de-mexico/`, expandir | **Alto** | 1h |
| C7 | robots.txt: declarar Allow para GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Bingbot | Medio (GEO) | 30min |
| C8 | Crear `/criterios-editoriales/` y `/redaccion/` (referenciados, hoy 404) | Alto (EEAT) | 4-6h |
| C9 | Reducir densidad keyword en `/` y `/directorio/` de 9% a 5-6% con sinónimos | Medio | 2-3h |
| C10 | Fix title `/blog/` y `/categorias/` para incluir "barbería/s" | Bajo | 30min |

### 🟡 IMPORTANTE · semanas 5-12

| # | Tarea |
|---|---|
| I1 | Crear 10 landings ciudad (Guadalajara, Monterrey, Puebla, Querétaro, Mérida, Tijuana, León, Cancún, Cuernavaca, Toluca) — 1,500+ words + 5 fichas mín. + `BarberShop` schema |
| I2 | Cluster "Técnicas": `/tecnicas/{fade,taper,undercut,pompadour,crew-cut}/` · 1,200 words c/u con `Article` + `HowTo` schema |
| I3 | Cluster "Tipos de barba" (5 páginas tipo glosario) |
| I4 | `/glosario/` con 40+ términos · `DefinedTerm` schema por entrada |
| I5 | `/metodologia/` explicando selección, verificación, actualización |
| I6 | `/sobre-nosotros/` con timeline 2005-2026 + fotos + menciones prensa |
| I7 | Convertir 3 artículos largos a `HowTo`/`Article` con `speakable` |
| I8 | `Person` schema a 3 autores |
| I9 | `/datos-barberia-mexico-2026/` con tabla densa + `Dataset` schema |
| I10 | Diferenciar `/ciudad-de-mexico/` vs `/articulos/mejores-cdmx/` en titles |

### 🟢 POLISH · meses 4-6

| # | Tarea |
|---|---|
| P1 | `WebSite` SearchAction con backend real |
| P2 | Booking integrado vía Fresha/Booksy API |
| P3 | Reviews verificadas con `Review` schema dinámico |
| P4 | App móvil PWA |
| P5 | Newsletter doble-opt-in + archive público |
| P6 | Logos "as featured in" cuando consigas prensa |
| P7 | YouTube channel con `VideoObject` schema |

### Propuestas de títulos (top 10 urgentes)

| Página | Title actual | Title propuesto |
|---|---|---|
| `/blog/` | "La Edición · Revista Editorial..." | "Revista de Barberías y Cultura del Oficio Barbero México — Barberia.mx" |
| `/categorias/` | "Secciones · Categorías Editoriales" | "Categorías Editoriales sobre Barberías en México — Barberia.mx" |
| `/zona/` | "Atlas de Zonas · Barberías..." | "Barberías en CDMX por Zona y Colonia · Atlas — Barberia.mx" |
| `/ciudad-de-mexico/` | "Ciudad de México · Guía editorial..." | "Las Mejores Barberías de CDMX · 187 indexadas — Barberia.mx" |
| `/categorias/tendencias/` | "Tendencias \| Blog" | "Tendencias de Barbería Masculina 2026 · México — Barberia.mx" |
| `/categorias/tecnicas/` | legacy | "Técnicas de Barbería: Fade, Taper, Undercut y Más — Barberia.mx" |
| `/categorias/productos/` | legacy | "Productos de Barbería y Grooming Masculino · Reviews — Barberia.mx" |
| `/categorias/negocios/` | legacy | "Negocio de Barbería en México: Guías y Casos — Barberia.mx" |
| `/categorias/estilo-de-vida/` | legacy | "Estilo de Vida del Hombre Moderno · Grooming — Barberia.mx" |

---

## 10 · CONCLUSIÓN PROFESIONAL

### 10.1 Lo que está bien hecho (preservar)

1. Sistema de diseño editorial (Fraunces + Inter + Mono, black/cream/copper)
2. Voz editorial — entre las mejores en español del segmento
3. Pretty URLs / clean URL pattern
4. `Organization` schema rico
5. Componentización (masthead, header, footer vía `components.js`)
6. `.ed-related` interlinking pattern
7. Mobile-first overhaul (`mobile.css` en hubs)
8. Manifesto editorial citable

### 10.2 Lo que probablemente ya ayuda

- `Organization` con `foundingDate: 2005` + `knowsAbout` → contexto claro de marca
- 32 cards estado con copy diferenciado → semantic depth alto
- 3 artículos largos → topical authority en sus temas
- Interlinking robusto → reparte page authority
- Consistencia "1,247 · 32 · desde 2005" → señal de marca

### 10.3 Lo que limita crecimiento

1. **31 estados vacíos** — autoridad geográfica al 3% (1/32)
2. **5 fichas CDMX legacy rotas** — únicas páginas-producto, descapitalizadas
3. **Ausencia de FAQ schema** — rich results perdidos
4. **Sin booking real**
5. **Sin `/criterios-editoriales/` ni `/redaccion/`** — claims sin evidencia
6. **Densidad keyword 9%** — riesgo over-optimization
7. **`@id` schema inconsistentes** (`.html` legacy)
8. **Sitemap.xml incompleto**

### 10.4 Mejoras que llevan al siguiente nivel (GEO + autoridad)

1. **`/glosario/`** — 40 términos citables por IA
2. **`/datos-barberia-mexico-2026/`** — datos primarios verificables = oro GEO
3. **31 hubs estatales con 800 words c/u** (24,800 words editoriales nuevos)
4. **`FAQPage` schema** en todas con preguntas
5. **`Article` + `speakable`** en long-reads — voice-search ready

### 10.5 Score por dimensión (1-10)

| Dimensión | Score |
|---|---|
| Diseño & UX premium | **9** |
| Copywriting / voz editorial | **10** |
| Branding consistency | **9** |
| Estructura técnica HTML/SEO básico | **7** |
| Schema.org implementation | **6** |
| Cobertura de contenido (volumen) | **3** |
| Cobertura geográfica real | **2** |
| Topical authority (clusters) | **4** |
| EEAT signals | **5** |
| GEO readiness (IA-citability) | **4** |
| Local SEO | **3** |
| Mobile experience | **7** |
| Crawlability | **6** |
| Backlink potential del contenido | **8** |
| Conversion infrastructure | **2** |
| Competitive moat | **8** |

**Promedio ponderado:** ~5.5/10.

### 10.6 Veredicto final

**¿Listo para posicionar nacional? — No todavía.**

Hoy Barberia.mx **rankea (o rankeará pronto) para queries de marca y para CDMX**. Pero **no para queries genéricas nacionales** del tipo "barberías en Monterrey" — esas páginas no existen.

**El sitio es 70% promesa, 30% entrega.** Sin embargo:
- La promesa está bien construida (branding, voz, estructura)
- La infraestructura técnica está lista (componentes, CSS, schemas base, interlinking)
- Solo falta producir contenido en los slots ya diseñados

**Tiempo realista a "ranking nacional":**
- **90 días** de trabajo concentrado en C1+C2+C3+I1 → ranking para 80% queries geográficas long-tail
- **6 meses** con roadmap 🔴+🟡 → autoridad real en "barberías México" principal
- **12 meses** con polish 🟢 → competir cabeza a cabeza con Fresha/Booksy en transaccional

**Recomendación estratégica final:** **NO competir con bookers transaccionales.** Posicionarse como *autoridad editorial / Michelin Guide de las barberías mexicanas*. Dominar la decisión ("¿a qué barbería voy?"). Fresha solo ejecuta la reserva — y tú capturas el valor más alto del funnel: la **intent de descubrimiento**, donde SEO + GEO sí se pueden ganar.

El sitio está a **6 meses de trabajo enfocado** de ser **la referencia nacional indiscutible** del oficio barbero mexicano — algo que ningún competidor está construyendo, y que las IAs van a citar como fuente cada vez más en los próximos 24 meses.

---

## Relacionado
- [[05 - Guía de Continuación]] — roadmap general
- [[06 - Patrones Editoriales]] — reglas establecidas
- [[09 - Interlinking Strategy]] — interlinking actual
- [[08 - Auditoría Index 2026-05-28]] — auditoría técnica previa
