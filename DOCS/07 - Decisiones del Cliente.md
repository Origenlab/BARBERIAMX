# 07 — Decisiones del Cliente (log cronológico)

> Historial de feedback e iteraciones con Frank durante el rediseño editorial. Útil para entender el porqué de cada decisión.

---

## Sesión inicial — 2026-05-28

### Decisión 1 · Dirección estética

**Pregunta:** ¿Qué dirección estética para el rediseño?
**Frank:** Editorial / Magazine.
**Implicación:** Sistema basado en Fraunces (serif decorativo con opsz variable), grid 12-col, hairlines como divisores, kickers mono, italic accents en cobre.

### Decisión 2 · Paleta

**Pregunta:** ¿Paleta base?
**Frank:** Negro + crema + cobre.
**Implicación:** Tokens `--ink #0a0a0a`, `--paper #f3ede3`, `--copper #b87333`. Premium cálido tipo Aesop/Acne.

### Decisión 3 · Alcance inicial

**Pregunta:** ¿Alcance del primer paso?
**Frank:** Solo homepage.
**Implicación:** Foco inicial en `/index.html`. Hubs vinieron después en la sesión "más profesional".

---

## Iteración 1 · "Necesito ser mucho más profesional"

**Frank:** "ok genera el siguiente paso pero necesito que seas mucho mas profesional"

**Pregunta de alcance:** ¿Qué alcance?
**Frank:** Refactor + hubs (extracción de componentes + redesign 5 hubs).

**Pregunta de barómetro:** ¿Qué significa profesional?
**Frank:** TODAS las opciones (arquitectura componentes + tipografía editorial avanzada + a11y/perf + responsive medido).

**Implicación:** 
- Extracción a `/components/` con loader `components.js`
- Refactor de homepage a slots
- 5 hubs nuevos: 404, blog, zona, categorias, cdmx
- A11y obligatorio (skip link, focus-visible, ARIA, semantic HTML)
- Responsive auditado

---

## Iteración 2 · Diseño del hero

**Frank:** "comenzar con el diseño del hero, necesito que sea de dos columnas, la primera con [título + imagen + dek], y la segunda con dos parrafos seo, hablando de BARBERIA MX que tiene mas de 20 años operando dando el servicio de directorio de barberias en mexico, necesito que seas lo mas profesional y que tenga todo lo necesario para la descripcion de la empresa"

**Implicación:**
- Hero 2-col (7/5): portada izq + SEO der
- 2 párrafos sobre Barberia.mx con 20+ años
- Schema.org Organization expandido (foundingDate 2005, areaServed, knowsAbout, etc.)
- Credentials dl con 4 stats grandes en cobre

**Saved memory:** [[memory · feedback-doc-workflow]] (más tarde) — Frank quiere documentación completa.

---

## Iteración 3 · "Quita imagen, achica tipografía"

**Frank:** "ok quita la imagen del hero, y el titulo es muy grande, cambia la tipografia a algo mas simple para que no este tan grande, mejora el acomodo para que no se vea todo tan grande"

**Cambios:**
- Eliminada `<figure>` con imagen del hero
- H1 reducido de `clamp(4.5rem, 14vw, 13rem)` a `clamp(2rem, 4.2vw, 3.5rem)`
- Weight 300 → 400
- `font-variation-settings: "opsz" 36` (glifos menos decorativos)
- Cols rebalanced 7/5 → 6/6
- Spacing más compacto

**Saved memory:** [[memory · feedback-smaller-typography]]

---

## Iteración 4 · "Borra h2 + stats de col 2"

**Frank:** Pidió borrar `Sobre Barberia.mx` + h2 `Veinte años indexando…` + las 4 credenciales (20+, 1247, 32, 48K).

**Resultado:** Col 2 quedó solo con los 2 párrafos SEO + hairline divider con col 1.

---

## Iteración 5 · "Centra verticalmente"

**Frank:** "ahora centra verticalmente las dos columnas"

**Cambio:** `.ed-hero-cols { align-items: center }` (era `start`).

---

## Iteración 6 · "Borra masthead"

**Frank:** Pidió quitar la barra meta superior ("El Directorio · Edición Mensual" / "Indexadas 1247 Ciudades 32 Lectores 48,210").

**Resultado:** Hero arranca directo con las 2 cols.

---

## Iteración 7 · Adaptar a nacional + keywords barbería

**Frank:** "este directorio es a nivel nacional asi que necesito que adaptes los textos del hero a nacional, ahora tambien necesito que los titulos los mejores a palabras clave referentes a BARBERIA"

**Cambios:**
- Kicker col 1: `Portada · Roma Norte` → `Directorio Nacional · 32 Estados`
- H1: `El oficio de la navaja & la tijera` → `Las mejores barberías de México, en un solo directorio`
- Dek: adaptado a "32 estados, de CDMX a Monterrey, de Guadalajara a Mérida"
- 2 párrafos col 2: scope nacional, múltiples ciudades, "toda la república"
- `<title>` y `meta description` actualizados con keywords nacionales

**Saved memory:** [[memory · feedback-national-scope]]

---

## Iteración 8 · Reemplazar ticker por menú secciones

**Frank:** "abajo del hero tenemos un modulo que tiene animacion, quitalo y remplazalo por un modulo menu, como lo tiene https://meseci.com.mx/ abajo del hero tiene un menu de secciones principales del sitio"

**Cambios:**
- Eliminado `.ed-ticker` (marquee con city names)
- Creado `.ed-quick-nav` con 6 links a secciones principales
- Cada link: kicker mono cobre `§ NN` + nombre serif (con italic accent) + meta mono + flecha esquina
- Hover invierte a ink bg + paper text + copper accents
- Responsive: 6col → 3×2 @ 1180px → scroll horizontal con snap @ 640px

---

## Iteración 9 · Section heads 2-col con SEO+marketing

**Frank:** "necesito generar el diseño de los titulos: [pegó ejemplo de section-head actual], este es un titulo, lo necesito que sea dos columnas, la primera el titulo y la segunda con dos columnas con seo y marketing, recuerda siempre hablar de la empresa BARBERIA MX"

**Implementación:**
- Nuevo pattern `.ed-section-intro` con grid 5/7
- Col izq: kicker + h2
- Col der: inicialmente 2 sub-cols horizontales con hairline divider

---

## Iteración 10 · "Eso tiene 3 columnas"

**Frank:** "eso tiene 3 columnas, necesito que sea de dos, la primera con el titulo y la segunda con dos parrafos uno arriba del otro en la misma columna"

**Cambio crítico:** `.ed-section-intro-r` de `grid-template-columns: 1fr 1fr` a `display: flex; flex-direction: column`. Eliminada hairline divider entre párrafos.

**Saved memory:** [[memory · feedback-no-3-cols]] — REGLA: si pide 2 cols, son 2 cols reales; sub-items se apilan, no se subdividen.

---

## Iteración 11 · Centrar verticalmente section-intro

**Frank:** "ahora centra las dos columnas verticalmente"

**Cambio:** `.ed-section-intro { align-items: center }` (era `end`). Removido `align-self: end` del col der.

**Saved memory:** [[memory · feedback-section-intro-pattern]] — pattern final fijado.

---

## Iteración 12 · Documentación

**Frank:** "guarda todo en tu memory y genera un vault en obsidian para tener todo registrado, necesito que sea todo documentado para que crees una guia para continuar con el diseño"

**Implementación:**
- 8 memory entries en `/spaces/.../memory/`
- 7 docs en `/Users/frankoropeza/Documents/Claude/Projects/BARBERIA/DOCS/`
- Wikilinks cross-referenciando docs

---

## Patrones recurrentes en cómo Frank itera

1. **Pide grande, después reduce.** Suele empezar con visión maximalista, luego pedir simplificar.
2. **Repite cuando algo se ve "raro".** Cuando dice "no se ve bien" suele significar tipografía demasiado grande o layout con elementos huérfanos.
3. **Lenguaje directo y corto.** Instrucciones de 1-3 líneas, sin justificación. Espera que el ejecutor las traduzca a buenas decisiones de diseño.
4. **Itera mucho sobre el hero.** Es lo primero que ve el usuario; se obsesiona con que esté bien.
5. **Quiere que se "vea profesional".** Esto suele significar: editorial real, tipografía cuidada, layouts equilibrados, sin shortcuts.

---

## Estado del homepage al cerrar sesión 2026-05-28

✅ Hero 2-col vertical centrado, sin imagen, h1 editorial compacto, 2 párrafos SEO nacionales mencionando Barberia.mx.
✅ Quick-nav 6 secciones tipo meseci.
✅ 4 section-intro 2-col con SEO + marketing siempre Barberia.mx.
✅ Schema.org Organization + WebSite completos.
✅ Meta description nacional con keywords.

**Próximo paso lógico (pendiente):** migrar las páginas hub (blog, zona, categorias, cdmx) a usar el nuevo pattern `.ed-section-intro` para consistencia, o avanzar con templates pendientes (artículos largos, barberías detalle, sub-categorías). Ver [[05 - Guía de Continuación#Roadmap]].

---

## Relacionado
- [[05 - Guía de Continuación]] — qué sigue
- [[06 - Patrones Editoriales]] — reglas establecidas por estas iteraciones
- [[memory]] — feedback persistido para futuras sesiones
