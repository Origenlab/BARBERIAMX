# 06 — Patrones Editoriales

> Reglas tipográficas, layout y do/don't del sistema editorial. Esta es la referencia rápida.

---

## Reglas de oro

> **NO usar tipografía display-mega para titles.** Rango editorial siempre.
> Ver [[memory · feedback-smaller-typography]] para el episodio donde Frank lo pidió.

> **Lenguaje siempre nacional.** "México", "32 estados", "toda la república". Nunca limitar a una ciudad excepto en páginas explícitamente locales.
> Ver [[memory · feedback-national-scope]].

> **Siempre mencionar `<strong>Barberia.mx</strong>`** en bloques de copy SEO/marketing.

> **2 columnas = 2 columnas.** Si col 2 tiene varios elementos, apilarlos verticalmente (`flex column`). No subdividir en sub-cols horizontales.
> Ver [[memory · feedback-no-3-cols]].

---

## 1. Section Intro Pattern (homepage)

Pattern obligatorio para secciones del homepage. Ver [[memory · feedback-section-intro-pattern]].

### HTML

```html
<header class="ed-section-intro">
  <div class="ed-section-intro-l">
    <div class="ed-section-intro-num">§ NN — Nombre Sección</div>
    <h2 class="ed-section-intro-title">
      Título con <em>palabra</em> editorial italic.
    </h2>
  </div>
  <div class="ed-section-intro-r">
    <p class="ed-section-intro-copy">
      <strong>Barberia.mx</strong> copy SEO con datos verificables y keyword principal de la sección.
    </p>
    <p class="ed-section-intro-copy">
      Copy marketing con CTA + <a href="#anchor">link interno en cobre</a> mencionando alcance nacional.
    </p>
  </div>
</header>
```

### Grid CSS

```css
grid-template-columns: 5fr 7fr;
align-items: center;
```

### Reglas estrictas

- Col 1: SOLO kicker + h2
- Col 2: 2 párrafos APILADOS (flex column, no grid 1fr 1fr)
- Vertical centrado (`align-items: center`)
- Hairline divider abajo (`border-bottom: 1px solid var(--ink)`)
- En mobile (<980px): stack 1-col con divider arriba en col der

### Anti-patterns

- ❌ NO usar grid 1fr 1fr en `.ed-section-intro-r` (eso son 3 cols visualmente)
- ❌ NO usar `align-items: end` (queda raro con título)
- ❌ NO meter aside text (ese es el pattern viejo `.ed-section-head`)

---

## 2. Hero pattern (homepage)

Hero del homepage usa 2 columnas. Ver `.ed-hero-cols` en CSS.

### Estructura

```html
<header class="ed-hero">
  <div class="ed-wrap">
    <div class="ed-hero-cols">
      <div class="ed-hero-col ed-hero-col-main">
        <p class="ed-kicker">Kicker editorial</p>
        <h1 class="ed-hero-title">Título con <em>palabra</em> italic.</h1>
        <p class="ed-dek">Standfirst dek italic serif.</p>
      </div>
      <aside class="ed-hero-col ed-hero-col-aside" aria-label="Sobre">
        <div class="ed-prose-tight">
          <p><strong>Barberia.mx</strong> párrafo 1 SEO…</p>
          <p>Párrafo 2 con CTA + links cobre…</p>
        </div>
      </aside>
    </div>
    <div class="ed-hero-search-bar">…</div>
  </div>
</header>
```

### Reglas

- Grid `6fr 6fr` (balance simétrico)
- Vertical centrado (`align-items: center`)
- H1: `clamp(2rem, 4.2vw, 3.5rem)` weight 400 opsz 36
- Aside: hairline divider `border-left` (desktop), `border-top` (mobile)
- Search bar full-width en banda separada abajo
- NO meter imagen (Frank la quitó — ver historial en [[07 - Decisiones del Cliente]])

---

## 3. Cover pattern (hubs)

Hubs (blog, zona, categorias, cdmx, 404) usan `.ed-cover` con cover-grid 12-col.

```html
<header class="ed-cover">
  <div class="ed-wrap">
    <nav class="ed-crumbs" aria-label="Migas de pan">
      <a href="/">Inicio</a>
      <span class="sep">/</span>
      <span aria-current="page">Sección</span>
    </nav>
    <div class="ed-cover-grid">
      <div class="ed-cover-eyebrow">§ Sección · Subtitle</div>
      <h1 class="ed-cover-title">Título <em>editorial</em>.</h1>
      <p class="ed-cover-dek">Standfirst italic.</p>
      <aside class="ed-cover-meta">Última edición<br><b data-masthead-date>—</b></aside>
    </div>
  </div>
</header>
```

### Reglas

- Crumbs SIEMPRE con `aria-current="page"` en el último
- Cover title MÁS grande que h1 normal: `clamp(3rem, 8.5vw, 7.5rem)`
- Cover dek MÁS italic, más grande
- Meta lateral con dato dinámico o estático en grande

---

## 4. Tipografía · escala visual

```
Cover Title (hubs)         clamp(3, 8.5vw, 7.5rem)
─────────────────────────────────────────────
Section-intro h2           clamp(1.875, 3.2vw, 2.75rem)
Hero h1                    clamp(2, 4.2vw, 3.5rem)
─────────────────────────────────────────────
Cover dek                  clamp(1.125, 1.7vw, 1.5rem)
Hero aside h2              clamp(1.375, 1.9vw, 1.75rem)
─────────────────────────────────────────────
Body / lead                1rem - 1.125rem
─────────────────────────────────────────────
Kicker                     11px uppercase ls .22em
Meta                       10px uppercase ls .18em
```

### Acentos italic

```html
<h1>El oficio de la <em>navaja</em> & la tijera.</h1>
```

CSS:
```css
h1 em, h2 em {
  font-style: italic;
  font-weight: 400;
  color: var(--copper-deep);
}
```

### Drop cap (artículos largos)

```css
.ed-drop::first-letter {
  font-family: var(--font-display);
  font-size: 5.5em;
  float: left;
  line-height: .85;
  padding: 8px 12px 0 0;
  font-weight: 300;
  color: var(--copper);
}
```

---

## 5. Color · do/don't

### Do

- Negro sobre crema (`#0a0a0a` sobre `#f3ede3`) para texto principal
- Cobre para acentos pequeños: italic en titles, kickers, links underline, dots, hover states
- Negro como bloque oscuro entero para manifesto/footer
- Hairlines crema (`--rule`) para divisores sutiles, negras (`--ink`) para divisores estructurales

### Don't

- ❌ Cobre como background grande (usar negro)
- ❌ Negro 100% como background salvo manifesto/footer
- ❌ Crema sobre crema con poco contraste (verificar AA)
- ❌ Más de 1 acento color por bloque (cobre es exclusivo)
- ❌ Gris azulado (`#888` etc.) — usar warm muted (`--muted` `#6b6457`)

---

## 6. Espaciado · ritmo vertical

### Secciones

```
padding: clamp(4rem, 8vw, 8rem) 0;    ← estándar
padding: clamp(2rem, 4vw, 3.5rem) 0;  ← compacto (hero)
padding: clamp(5rem, 10vw, 9rem) 0;   ← manifesto / dramatic
```

### Entre elementos

- `gap: 1.1em` entre párrafos relacionados (col aside)
- `gap: clamp(1rem, 1.6vw, 1.75rem)` grid global
- `gap: clamp(1.5rem, 3vw, 2.5rem)` grids editoriales (features, atlas)

---

## 7. Componentes recurrentes · uso

| Patrón | Cuándo usar | Páginas que lo usan |
|---|---|---|
| `.ed-section-intro` (2-col) | Section heads en homepage | index |
| `.ed-section-head` (3-elem grid 12) | Section heads en hubs (legacy) | blog · zona · categorias · cdmx |
| `.ed-cover` | Page hero de hubs/landing pages | blog · zona · categorias · cdmx |
| `.ed-features` (1 big + 4 sm) | Spread editorial de destacados | index · cdmx |
| `.ed-states` (grid 4-col) | Grid numerado de items | index · cdmx |
| `.ed-atlas` (3-col tiles) | Grid de tiles con cover image | zona |
| `.ed-depts` (2-col grid) | Department openers | blog · categorias |
| `.ed-articles` (rows) | Lista vertical larga de artículos | blog |
| `.ed-quick-nav` (6-col) | Menú post-hero de secciones | index |
| `.ed-manifesto` | Pull-quote oscuro entre secciones | index · blog |
| `.ed-cta` (registro) | Conversión final con beneficios | index · cdmx |
| `.ed-error` (404) | Página de error | 404 |
| `.ed-prose` | Long-form article body | (pendiente artículos) |

---

## 8. Animation patterns

### Reveal on scroll

```js
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.mi-elemento').forEach(el => el.setAttribute('data-reveal', ''));
});
```

El loader `components.js` los detecta y aplica `.ed-reveal` + observer.

### Ticker (legacy, ya no en uso)

`.ed-ticker .ed-ticker-track` con `animation: ticker 40s linear infinite`. Reemplazado por `.ed-quick-nav` en homepage.

### Hover de cards

```css
.card:hover { transform: translateY(-4px); }
.card:hover .card-img { filter: grayscale(0) contrast(1.05); }
```

---

## 9. A11y · mínimos obligatorios

- [ ] Skip link al `#main` en cada página
- [ ] `<main id="main">` semántico
- [ ] Nav con `aria-label="Navegación principal"`
- [ ] Crumbs con `aria-label="Migas de pan"` y `aria-current="page"` en el último
- [ ] Botones con `type="button"`
- [ ] Imágenes background con `role="img"` y `aria-label`
- [ ] Form labels via `.visually-hidden` cuando no se muestran
- [ ] Touch targets ≥ 44px en mobile
- [ ] Focus-visible con outline cobre (ya global)
- [ ] `prefers-reduced-motion: reduce` respetado (ya global)

---

## Relacionado
- [[01 - Sistema de Diseño]] — tokens y clases
- [[03 - Páginas]] — qué patrón usa cada página
- [[05 - Guía de Continuación]] — cómo aplicar al crear páginas nuevas
- [[07 - Decisiones del Cliente]] — historial de feedback que generó estos patrones
