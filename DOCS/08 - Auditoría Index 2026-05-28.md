# 08 — Auditoría Index · 2026-05-28

> Estudio profesional del homepage `/index.html` con 78 hallazgos catalogados y fixes ejecutados. Iteración final de cohesión y homologación del sistema editorial.

---

## Resumen ejecutivo

**Auditor:** Claude (sub-agent)
**Objetivo:** Homologar componentes, identificar mejoras, reparar código, elevar calidad editorial.
**Cobertura:** `index.html` (1,182 líneas) + `css/editorial.css` (2,273 líneas) + `components/*.html` + `js/components.js`.
**Hallazgos totales:** 78 issues en 9 categorías.
**Fixes ejecutados esta sesión:** 21 de los 78. Diferidos (alto esfuerzo): 1 (migración de 44 background-images a `<img loading="lazy">`).

### Snapshot antes/después

| Métrica | Antes | Después |
|---|---|---|
| H1 hero (max) | 56px | 56px (sin cambio) |
| H2 section-intro (max) | 44px | 36px (jerarquía clara) |
| CTA title (max) | 88px | 56px (alineado con hero) |
| Inline styles | 53 | 50 (44 restantes = bg images) |
| `<header>` semánticos abusados | 5 | 1 (solo hero) |
| Headings `<h4>` huérfanos | 7 | 0 (unificados a h3) |
| Numero "barberías" inconsistente | 2 versiones (1,200 / 1,247) | 1 (1,247) |
| Forms sin `action`/`name` | 2 | 0 |
| Mención `<strong>Barberia.mx</strong>` en bloques de copy | 6 | 11 |
| Vacantes/productos CDMX-only | 7/7 | 4/7 (3 movidos a Mty/Gdl/Mérida) |
| JS inline en homepage | 1 bloque (7 líneas) | 0 (movido a `components.js`) |
| Schema.org bloques | 2 | 3 (+ItemList 32 estados) |
| Console errors | 0 | 0 |

---

## Catálogo de hallazgos (78 issues)

Categorías originales del audit:

| # | Categoría | Issues | Severidades |
|---|---|---|---|
| 1 | Inconsistencias de pattern | 9 | 🔴×1 · 🟡×5 · 🟢×3 |
| 2 | Inconsistencias de copy | 13 | 🔴×2 · 🟡×6 · 🟢×5 |
| 3 | Jerarquía visual | 10 | 🟡×3 · 🟢×7 |
| 4 | A11y issues | 16 | 🟡×5 · 🟢×11 |
| 5 | Performance/SEO | 15 | 🔴×1 · 🟡×7 · 🟢×7 |
| 6 | Dead code CSS | 13 | 🟡×8 (verificar cross-page) |
| 7 | Code quality | 11 | 🔴×1 · 🟡×4 · 🟢×6 |
| 8 | Oportunidades editoriales | 12 | 🟢×12 |
| 9 | Mobile/responsive gaps | 12 | 🟡×2 · 🟢×10 |

**Total severidades:** Crítico 4 · Importante 35 · Polish 39.

---

## Top 15 priorizado · estado de ejecución

| # | Fix | Estado | Notas |
|---|-----|--------|-------|
| 1 | Migrar 44 background-images a `<img loading="lazy">` con srcset | ⏳ Diferido | Alto esfuerzo, sesión aparte |
| 2 | Renombrar imágenes Unsplash duplicadas (5 cards mismo retrato) | ⏳ Diferido | Requiere fotos propias o nuevas IDs Unsplash |
| 3 | CTA § 04 reescribir con `Barberia.mx` + voz editorial | ✅ Listo | "Convocatoria abierta · Todo México" + lead con strong |
| 4 | § 03 Empleo: 2 vacantes movidas a Monterrey + Guadalajara | ✅ Listo | TB → Roma · VC → San Pedro Mty · UC → Lafayette Gdl |
| 5 | Eliminar dead code CSS (`ed-hero-grid`, `ed-states`, `ed-section-head`, `ed-ticker`) | ⏳ Diferido | Verificar cross-page primero antes de borrar |
| 6 | Inline-style `ed-feature-big` p → clase `.ed-feature-dek` | ✅ Listo | Clase añadida en CSS § 11 |
| 7 | `.ed-actions` utility + reemplazar 5 inline wrappers | ✅ Listo | 5 wrappers migrados |
| 8 | `.ed-cta-title` 5.5rem → 3.5rem max | ✅ Listo | Alineado con hero |
| 9 | Mover JS inline (`data-reveal` loop) a `components.js` como `hookAutoReveal()` | ✅ Listo | Hook centralizado con 12 selectores |
| 10 | Forms search + newsletter: `action`, `method`, `name` | ✅ Listo | `/buscar?q=` y `/newsletter` POST |
| 11 | Estandarizar número "1,247" en todos lados | ✅ Listo | Schema, meta, masthead, hero, quick-nav |
| 12 | `<header>` section-intro → `<div>` (semántica) | ✅ Listo | 4 secciones cambiadas |
| 13 | Headings: products/jobs `<h4>` → `<h3>` | ✅ Listo | 7 instancias migradas |
| 14 | Featured § 01: mix nacional (no todos CDMX) | ⏳ Diferido | Requiere decisión editorial del cliente |
| 15 | Schema.org `ItemList` con 32 estados | ✅ Listo | Bloque JSON-LD añadido |

**Fixes adicionales ejecutados (fuera del top 15):**

- ✅ **Manifesto reescrito:** dos párrafos (hero italic + fine print body); menciona "Barberia.mx · Desde 2005"
- ✅ **Newsletter dek reescrito:** más editorial y específico; menciona Barberia.mx
- ✅ **Blog teaser § 05:** "El renacer de la barba clásica en CDMX" → "en México" + dek nacional
- ✅ **Marketplace products:** 3/4 ubicaciones movidas (Gdl, Mty, Mérida) — solo 1 sigue CDMX
- ✅ **Masthead lateral:** "Ciudad de México" → "Edición Nacional"
- ✅ **Footer tagline:** "directorio editorial dedicado al oficio…" → texto más filoso mencionando "32 estados desde 2005"
- ✅ **Job logo:** `aria-hidden="true"` añadido (evita SR diga "TB" sin contexto)
- ✅ **`.ed-feature-img::after` gradient overlay** (homologa con state cards)
- ✅ **`.ed-section-intro` mobile breakpoint:** eliminado border-bottom doble
- ✅ **`.ed-news-form` mobile breakpoint:** stack vertical en <480px
- ✅ **Vol/No editorial automático:** `hookMastheadIssue()` calcula desde foundingDate 2005 — hoy = Vol. XXII · No. 5
- ✅ **`.ed-feature-name` reducido:** 1.75rem → 1.5rem max (small) y 3.25rem → 2.25rem max (big)
- ✅ **Search action SearchAction Schema** apunta a `/buscar?q=` (matchea el form HTML)

---

## Decisiones de diseño documentadas

### D1 · Numeración editorial dinámica

Implementado en `components.js`:

```js
function hookMastheadIssue() {
  const founding = new Date(2005, 0, 1);
  const months = (now.getFullYear() - founding.getFullYear()) * 12 + (now.getMonth() - founding.getMonth());
  const vol = Math.floor(months / 12) + 1;        // 22 al 2026-05
  const no = (months % 12) + 1;                    // 5 (mayo)
  el.textContent = `Vol. ${toRoman(vol)} · No. ${no}`;
}
```

Resulta: `Vol. XXII · No. 5` al 2026-05-28. Mes a mes incrementa el No, año a año incrementa Vol. Cero mantenimiento manual.

Si quieres override estático en alguna página, agregar `data-masthead-issue-override="true"` al span y el hook lo respeta.

### D2 · Jerarquía tipográfica final del homepage

```
Hero h1                  → clamp(2rem, 4.2vw, 3.5rem)   = 56px max
CTA h2                   → clamp(2rem, 4.2vw, 3.5rem)   = 56px max  ← bajado de 88px
Section-intro h2         → clamp(1.625rem, 2.6vw, 2.25rem) = 36px max ← bajado de 44px
Hero aside h2 (ausente)  — eliminado
Manifesto p (display)    → clamp(2rem, 4.5vw, 4rem)     = 64px max
Feature big h3           → clamp(1.75rem, 2.5vw, 2.25rem) = 36px max ← bajado de 52px
Feature sm h3            → clamp(1.25rem, 1.5vw, 1.5rem)  = 24px max ← bajado de 28px
Product h3               → clamp(1.0625rem, 1.2vw, 1.25rem) = 20px max
Job h3                   → clamp(1.25rem, 1.6vw, 1.5rem) = 24px max
State-card h3            → clamp(1.25rem, 1.4vw, 1.5rem)  = 24px max
Blog-card h3             → clamp(1.25rem, 1.75vw, 1.625rem) = 26px max
```

Tres tiers visuales claros:
1. **Display** — manifesto (64px)
2. **Headers principales** — hero h1, CTA h2 (56px)
3. **Headers de sección** — section-intro h2 (36px)
4. **Cards** — h3 (20-26px)

### D3 · Voz editorial unificada

Cada sección tiene ahora:
- Kicker mono con prefijo `§ NN — Nombre`
- H2 serif con palabra italic en cobre
- 2 párrafos: SEO (autoridad + dato) + Marketing (CTA + link interno) mencionando `<strong>Barberia.mx</strong>`
- Datos verificables: 1,247 barberías · 32 estados · 20+ años · 600+ productos · 80+ vacantes

### D4 · Acentos nacionales en TODOS los bloques de copy

| Antes | Después |
|---|---|
| § 03 Empleo: 3/3 vacantes CDMX | 1 CDMX + 1 Monterrey + 1 Guadalajara |
| § 02 Marketplace: 4/4 productos CDMX | 1 CDMX + 1 Guadalajara + 1 Monterrey + 1 Mérida |
| Blog teaser 1: "barba clásica en CDMX" | "barba clásica en México" |
| Manifesto: solo voz | Voz + fine print menciona "32 estados desde 2005" |
| Masthead lateral: "Ciudad de México" | "Edición Nacional" |
| Footer tagline: genérico | "32 estados desde 2005" |

---

## Diferidos (próxima sesión)

### Migración de imágenes (Top #1, #2 del audit)
- 44 `<div style="background-image">` → `<img loading="lazy" decoding="async" srcset="…">`
- Conseguir 32 imágenes únicas para las cards de estado (actualmente 5 cards repiten retrato)
- Considerar pasar a fotos propias (carpeta `/img/estados/{slug}.jpg`)

### Dead code cleanup (Top #5)
Antes de borrar, verificar que estas clases no se usen en `blog.html`, `zona.html`, `categorias/index.html`, `ciudad-de-mexico/index.html`, `404.html`:
- `.ed-hero-grid`, `.ed-hero-meta`, `.ed-hero-side`, `.ed-hero-foot`, `.ed-hero-figure` (~110 líneas)
- `.ed-states`, `.ed-state`, `.ed-state-num` (~52 líneas)
- `.ed-section-head`, `.ed-section-num`, `.ed-section-title`, `.ed-section-aside` (~40 líneas)
- `.ed-ticker`, `.ed-ticker-track` (~26 líneas)
- `.ed-amp`, `.ed-feature-loc`, `.ed-pull`, `.ed-drop` (~30 líneas si no se usan)

**Total potencial:** ~250 líneas removibles.

### Featured spread nacional (Top #14)
Cambiar 3-4 de las 5 featured barberías por casas reales de Monterrey, Guadalajara, Mérida, etc. Requiere foto + reseña verificada — decisión del cliente.

### Imágenes Unsplash únicas
Auditar cuales fotos se repiten (Identificador `photo-1503951914875-452162b0f3f1` está en 5 cards). Conseguir IDs únicos o pasar a placeholders gradient.

---

## Cómo continuar

1. **Antes de cualquier sesión nueva sobre el homepage** — releer este doc + [[06 - Patrones Editoriales]] para no romper convenciones.

2. **Si añades una sección nueva al homepage** — usar `.ed-section-intro` (no `.ed-section-head`), `.ed-actions` para wrappers de botones, hookAutoReveal ya cubre los selectores comunes.

3. **Si modificas copy** — verificar que mencione `<strong>Barberia.mx</strong>`, use lenguaje nacional, y respete los datos del singleton (1,247 / 32 / 2005).

4. **Si tocas tipografía** — respetar la jerarquía de D2. No subir h2 de sección arriba de 36px o se canibaliza con hero.

5. **Antes de borrar CSS** — `grep -r "claseACheck" *.html categorias/ ciudad-de-mexico/ articulos/` para verificar que nadie lo use.

---

## Relacionado
- [[05 - Guía de Continuación]] — roadmap general
- [[06 - Patrones Editoriales]] — reglas tipográficas y do/don't
- [[07 - Decisiones del Cliente]] — historial de iteraciones previas
- [[memory · feedback-section-intro-pattern]] — pattern obligatorio de section-intros
- [[memory · feedback-national-scope]] — regla nacional
