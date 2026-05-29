# 09 — Interlinking Strategy

> Estrategia de enlaces internos para SEO + descubrimiento. Regla: cero páginas huérfanas, cada hub conectado a sus hermanos.

---

## Principio rector

> **Toda página nueva debe linkearse desde al menos 3 lugares del sitio.**
> Ver [[memory · feedback-interlinking-mandatory]].

Una página huérfana (no linkeada inline desde otras) no se descubre por crawlers ni por usuarios. El interlinking distribuye PageRank, mejora discoverability y reduce bounce rate.

---

## Mecanismos de interlinking del sistema

| Mecanismo | Cobertura | Implementación |
|---|---|---|
| **Nav header** | Secciones principales (nivel 1) | `components/header.html` con `data-match="slug"` |
| **Footer** | Sitemap completo de hubs | `components/footer.html` con 3 columnas |
| **Breadcrumbs** | Páginas con padre | `.ed-crumbs` en cada `.ed-cover` |
| **Related block** | Final de cada hub | `.ed-related` con 4 cross-links a hermanos |
| **Inline copy links** | Contextual en párrafos editoriales | `<a href="/x/">término</a>` con `border-bottom: 1px var(--copper)` |
| **Cards** | Cuando hay datos relacionados | State cards linkean a `/estados/{slug}/`, etc. |
| **CTAs** | Buttons al final de secciones | `.ed-btn` con destino estratégico |

---

## Sitemap actual + relaciones

```
                          /
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
    /directorio/      /blog.html       /ciudad-de-mexico/
        │                 │                 │
        ├── chips × 12    ├── /categorias/  ├── barberias × 5
        ├── regiones × 6  │     ├── tendencias    └── alcaldías → /zona.html
        ├── destacadas × 8│     ├── técnicas
        ├── estados × 32  │     ├── productos
        │   └── CDMX → /ciudad-de-mexico/
        │     └── (31 pendientes)
        │                 ├── /articulos/ × 3
        └── /registro     └── boletín
        
    /zona.html              /404.html
        │                 (links a portada + directorio + cdmx + blog + zona)
        └── tiles × 9 → barberias detalle
```

---

## Matriz de interlinking actual

Estado de cross-links inline (excluye header/footer que vienen via componentes):

| ↓ Desde / Hacia → | /directorio | /blog | /zona | /categorias | /ciudad-de-mexico | / |
|---|---|---|---|---|---|---|
| **/** (homepage) | ✅ (2: quick-nav + § 01 CTA) | ✅ (3: blog teasers + copy) | ✅ (1: quick-nav) | — | ✅ (3: § 01 + featured + CTA) | — |
| **/directorio/** | — | ✅ (related) | ✅ (related) | ✅ (related) | ✅ (related + featured) | ✅ (related + crumbs) |
| **/blog.html** | ✅ (related) | — | ✅ (related) | ✅ (intro + related) | ✅ (related) | ✅ (crumbs) |
| **/zona.html** | ✅ (related + CTA) | ✅ (related) | — | ✅ (related) | ✅ (related + tiles) | ✅ (crumbs) |
| **/categorias/** | ✅ (related) | ✅ (related + 5 sub) | ✅ (related) | — | ✅ (related) | ✅ (crumbs) |
| **/ciudad-de-mexico/** | ✅ (related + crumbs) | ✅ (related) | ✅ (related) | ✅ (related) | — | ✅ (crumbs) |
| **/404.html** | ✅ (1) | ✅ (1) | ✅ (1) | — | ✅ (1) | ✅ (1) |

**Resultado:** matriz casi llena. Toda página hub linkea inline a las 4 hermanas vía bloque `.ed-related`.

---

## Componente `.ed-related` — uso obligatorio

Patrón estándar al final de cada hub, antes del footer:

```html
<section class="ed-related" aria-label="Sigue navegando">
  <div class="ed-wrap">
    <div class="ed-related-head">
      <p class="ed-related-eyebrow">Sigue navegando</p>
      <h2 class="ed-related-title">[H2 contextual al hub] <em>Barberia.mx</em>.</h2>
    </div>
    <div class="ed-related-grid">
      <a href="/X/" class="ed-related-link">
        <span class="ed-related-link-num">→ [Etiqueta corta]</span>
        <span class="ed-related-link-name">[Título con <em>palabra italic</em>]</span>
        <span class="ed-related-link-meta">[Métrica · descripción]</span>
        <svg class="ed-related-link-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg>
      </a>
      <!-- 3-4 links totales -->
    </div>
  </div>
</section>
```

**Reglas:**
- 4 links exactos (grid 4-col → 2-col mobile → 1-col tiny)
- Cada link: kicker corto + nombre serif italic + meta mono uppercase + arrow
- Hover invierte a `ink` bg + `paper` text + cobre accents
- Eyebrow es siempre "Sigue navegando" (o variante)
- Título h2 contextualiza al hub origen
- NO linkear al hub actual (cero auto-link)

**Combinaciones recomendadas por página:**

| Hub | Cross-links sugeridos |
|---|---|
| `/directorio/` | CDMX · Atlas Zonas · Blog · Categorías |
| `/blog.html` | Directorio · Categorías · CDMX · Atlas |
| `/zona.html` | Directorio · CDMX · Blog · Categorías |
| `/categorias/` | Blog (Archivo) · Directorio · CDMX · Atlas |
| `/ciudad-de-mexico/` | Directorio · Atlas · Blog · Categorías |

---

## Footer columns — orden final

Comprehensive site map. Cada columna se actualiza al añadir pages nuevas.

```
Directorio                Editorial                Comunidad
──────────                ─────────                ─────────
Directorio Nacional       Todos los artículos      Marketplace
Por estado · 32           Tendencias               Bolsa de trabajo
Por región · 6            Técnicas                 Para barberos
Guía CDMX                 Productos                Sobre nosotros
Atlas de zonas            Negocios                 Contacto
Registrar barbería        Estilo de vida
```

---

## Checklist al crear página nueva

Al crear `/X/`:

- [ ] **Nav header** — si es sección principal nivel 1, agregar `<li>` en `components/header.html` (desktop + mobile drawer) con `data-match="slug"`
- [ ] **Footer** — agregar `<li><a href="/X/">Nombre</a></li>` en la columna apropiada de `components/footer.html`
- [ ] **Breadcrumb propio** — si tiene padre, incluir `.ed-crumbs` en `.ed-cover` con `aria-current="page"` en el último
- [ ] **Related block** — añadir `.ed-related` al final con 4 cross-links a páginas hermanas (NO incluir self)
- [ ] **Páginas hermanas** — buscar las 4 hermanas y añadir/actualizar link a `/X/` en su `.ed-related`
- [ ] **Cards en otras páginas** — si hay cards que mencionan el tema de X (ej: barbería de cierto estado), linkear a X
- [ ] **Inline copy** — buscar oportunidades en párrafos de hubs hermanos donde mencionar X con link contextual
- [ ] **Schema.org** — agregar `BreadcrumbList` en X y referenciar X en `ItemList`s relevantes
- [ ] **Sitemap.xml** — incluir nueva URL
- [ ] **Verify** — `grep -rn "/X/" --include="*.html"` debe mostrar al menos 6-8 referencias

---

## Anchor links del directorio

Al directorio se puede deep-link via anchors:

- `/directorio/` — top of page
- `/directorio/#por-region` — sección regiones
- `/directorio/#por-estado` — sección 32 estados
- `/directorio/#registro` — CTA registro

Footer ya usa `/directorio/#por-estado` y `/directorio/#por-region`.

---

## SEO impact esperado

Beneficios del interlinking robusto:

1. **Distribución de PageRank** — el homepage transfiere autoridad a `/directorio/` (now-target principal SEO), que la pasa a estados/regiones/destacadas
2. **Crawl depth reducido** — cada hub está a máximo 2 clicks del homepage
3. **Topical authority** — keywords se refuerzan via links contextuales en copy
4. **Bounce rate** — usuarios ven sugerencias post-scroll y siguen explorando
5. **Sitelinks** — Google puede generar sitelinks bajo el dominio por la estructura clara

---

## Relacionado
- [[02 - Arquitectura]] — components.js y data-match para `aria-current`
- [[04 - SEO y Schema]] — Schema.org `BreadcrumbList` y `ItemList`
- [[06 - Patrones Editoriales]] — pattern `.ed-related` documentado
- [[memory · feedback-interlinking-mandatory]] — la regla guardada
