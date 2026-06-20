# BARBERIA MX — Documentación del Proyecto

> Obsidian vault con la documentación completa del rediseño editorial de **Barberia.mx**, el directorio nacional de barberías en México.

---

## Cómo usar este vault

1. Abre esta carpeta `BARBERIA/DOCS/` como vault en Obsidian (`Open folder as vault`).
2. Empieza por este README, luego sigue el orden numerado de los documentos.
3. Los wikilinks `[[ ]]` te llevan entre documentos relacionados.
4. Cuando hagas cambios significativos en el código, **actualiza el doc correspondiente** para que esta documentación siga siendo la fuente de verdad.

---

## Estructura del vault

| # | Documento | Descripción |
|---|-----------|-------------|
| — | `README.md` | Este archivo · punto de entrada |
| 01 | [[01 - Sistema de Diseño]] | Tokens, paleta, tipografía, layout, grid |
| 02 | [[02 - Arquitectura]] | Estructura de archivos, componentes, `components.js` |
| 03 | [[03 - Páginas]] | Inventario de páginas con concepto y clases clave |
| 04 | [[04 - SEO y Schema]] | Estrategia keywords, Schema.org, meta tags |
| 05 | [[05 - Guía de Continuación]] | Próximos pasos, cómo añadir páginas/componentes |
| 06 | [[06 - Patrones Editoriales]] | Reglas tipográficas, jerarquía, do/don't |
| 07 | [[07 - Decisiones del Cliente]] | Log cronológico de iteraciones |
| 08 | [[08 - Auditoría Index 2026-05-28]] | 78 hallazgos · 21 fixes · estado actual del homepage |
| 09 | [[09 - Interlinking Strategy]] | Sitemap · matriz de cross-links · componente `.ed-related` · checklist obligatorio |
| 10 | [[10 - SEO + GEO Audit]] | Auditoría SEO + GEO profunda · 10 secciones · roadmap 30 fixes · scores por dimensión |

---

## Snapshot del proyecto al 2026-05-28

**Posicionamiento:** Directorio editorial nacional de barberías en México operando desde 2005. 1,247 barberías indexadas en 32 estados.

**Stack:** HTML estático + CSS + JS vanilla. Deploy GitHub Pages. CNAME `barberia.mx`. Sin build step.

**Sistema de diseño:** Editorial / Magazine (estilo Vogue · Monocle). Paleta negro `#0a0a0a` + crema `#f3ede3` + cobre `#b87333`. Tipografía Fraunces (serif display con opsz variable) + Inter (body) + JetBrains Mono (labels).

**Páginas con sistema nuevo:**
- ✅ Homepage (`/index.html`)
- ✅ Blog (`/blog.html`)
- ✅ Zona (`/zona.html`)
- ✅ Categorías hub (`/categorias/index.html`)
- ✅ CDMX guide (`/ciudad-de-mexico/index.html`)
- ✅ 404 (`/404.html`)

**Páginas pendientes de migrar:**
- ⏳ 3 artículos largos (`/articulos/*.html`)
- ⏳ 5 sub-categorías (`/categorias/*/index.html`)
- ⏳ 5 detalle de barberías (`/ciudad-de-mexico/barberia-*.html`)

Ver [[05 - Guía de Continuación]] para el roadmap completo.

---

## Repos y URLs

- **GitHub:** https://github.com/Origenlab/BARBERIAMX
- **Producción:** https://barberia.mx
- **Local dev:** `cd ~/Documents/Claude/Projects/BARBERIA && python3 -m http.server 8000` → http://localhost:8000/

---

## Convenciones del vault

- `[[Wikilinks]]` para cross-referencias entre docs
- Bloques de código con triple backtick y lenguaje
- Tablas para inventarios y comparativas
- Citas `>` para reglas/principios
- Listas con checkbox `- [x]` para tracking de tasks
