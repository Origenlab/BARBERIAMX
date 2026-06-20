/**
 * Barberia.mx — Components Loader (Editorial)
 *
 * Auto-carga slots <div data-component="header|footer|masthead"></div>
 * Post-hooks: aria-current="page", año actual, fecha en masthead,
 * nav móvil (toggle, Escape, click-outside, scroll lock), navbar scroll,
 * smooth scroll, dropdowns con teclado.
 *
 * Dispara: document.dispatchEvent(new CustomEvent('components:loaded'))
 */
(function () {
  'use strict';

  const CONFIG = {
    path: '/components/',
    allow: ['masthead', 'header', 'footer'],
    cache: true,
  };

  const cache = Object.create(null);

  // ----------------------------------------------
  // Carga + render
  // ----------------------------------------------
  async function fetchComponent(name) {
    if (CONFIG.cache && cache[name]) return cache[name];
    try {
      const res = await fetch(`${CONFIG.path}${name}.html`, { cache: 'no-cache' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = await res.text();
      if (CONFIG.cache) cache[name] = html;
      return html;
    } catch (err) {
      console.error(`[components] No se pudo cargar "${name}":`, err);
      return '';
    }
  }

  function inflate(slot, html) {
    const tpl = document.createElement('template');
    tpl.innerHTML = html.trim();
    const parent = slot.parentNode;
    while (tpl.content.firstChild) {
      parent.insertBefore(tpl.content.firstChild, slot);
    }
    parent.removeChild(slot);
  }

  // ----------------------------------------------
  // Hooks post-render
  // ----------------------------------------------
  function hookCurrentYear() {
    const year = String(new Date().getFullYear());
    document.querySelectorAll('[data-current-year]').forEach((el) => { el.textContent = year; });
  }

  function hookMastheadDate() {
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const d = new Date();
    const iso = d.toISOString().slice(0, 10);
    const human = `${d.getDate()} · ${meses[d.getMonth()]} · ${d.getFullYear()}`;
    document.querySelectorAll('[data-masthead-date]').forEach((el) => {
      el.setAttribute('datetime', iso);
      el.textContent = human;
    });
  }

  function hookActiveNav() {
    const path = window.location.pathname;
    const isHome = path === '/' || path === '/index.html';
    const links = document.querySelectorAll('a.nav-link[data-match], a.nav-mobile-link[data-match]');

    links.forEach((link) => {
      const matchers = (link.getAttribute('data-match') || '').split('|').filter(Boolean);
      const href = link.getAttribute('href') || '';
      let active = false;

      // Hash links sólo activos en home
      if (href.includes('#') && isHome) {
        active = true === matchers.some((m) => href.includes(`#${m}`));
        // Hash en home no marcamos por defecto (sería ruido); sólo cuando estamos scrolleados.
        active = false;
      } else {
        active = matchers.some((m) => path.includes(`/${m}`));
      }

      if (active) {
        link.setAttribute('aria-current', 'page');
        link.classList.add('is-active');
      }
    });
  }

  // ----------------------------------------------
  // Mobile nav
  // ----------------------------------------------
  function hookMobileNav() {
    const toggle = document.getElementById('nav-toggle');
    const mobile = document.getElementById('nav-mobile');
    if (!toggle || !mobile) return;

    const close = () => {
      mobile.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menú');
      mobile.setAttribute('aria-hidden', 'true');
      document.documentElement.style.overflow = '';
    };

    const open = () => {
      mobile.classList.add('is-open');
      toggle.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Cerrar menú');
      mobile.setAttribute('aria-hidden', 'false');
      document.documentElement.style.overflow = 'hidden';
    };

    toggle.addEventListener('click', () => {
      mobile.classList.contains('is-open') ? close() : open();
    });

    mobile.addEventListener('click', (e) => {
      if (e.target === mobile) close();
    });

    document.querySelectorAll('.nav-mobile-link').forEach((link) => {
      link.addEventListener('click', close);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobile.classList.contains('is-open')) close();
    });
  }

  // ----------------------------------------------
  // Navbar scroll effect
  // ----------------------------------------------
  function hookNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    const onScroll = () => {
      if (window.pageYOffset > 60) navbar.classList.add('nav-scrolled');
      else navbar.classList.remove('nav-scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ----------------------------------------------
  // Smooth scroll (instant, sin saltos bruscos)
  // ----------------------------------------------
  function hookSmoothScroll() {
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navH = (document.getElementById('navbar')?.offsetHeight) || 0;
      const top = target.getBoundingClientRect().top + window.pageYOffset - navH - 12;
      window.scrollTo({ top, behavior: 'smooth' });
      // Update URL hash sin scroll-jump
      history.replaceState(null, '', href);
    });
  }

  // ----------------------------------------------
  // Dropdown a11y (Editorial menu)
  // ----------------------------------------------
  function hookDropdowns() {
    document.querySelectorAll('.nav-item-dropdown').forEach((item) => {
      const trigger = item.querySelector('.nav-link');
      const menu = item.querySelector('.nav-dropdown');
      if (!trigger || !menu) return;

      const open = () => trigger.setAttribute('aria-expanded', 'true');
      const close = () => trigger.setAttribute('aria-expanded', 'false');

      item.addEventListener('mouseenter', open);
      item.addEventListener('mouseleave', close);
      item.addEventListener('focusin', open);
      item.addEventListener('focusout', (e) => {
        if (!item.contains(e.relatedTarget)) close();
      });
    });
  }

  // ----------------------------------------------
  // Auto-reveal selectors editoriales por defecto
  // ----------------------------------------------
  const AUTO_REVEAL_SELECTORS = [
    '.ed-section-head',
    '.ed-section-intro',
    '.ed-feature',
    '.ed-product',
    '.ed-job',
    '.ed-blog-card',
    '.ed-manifesto-inner',
    '.ed-state-card',
    '.ed-feat-story',
    '.ed-dept',
    '.ed-article-row',
    '.ed-atlas-tile',
  ];

  function hookAutoReveal() {
    document.querySelectorAll(AUTO_REVEAL_SELECTORS.join(',')).forEach((el) => {
      if (!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', '');
    });
  }

  // ----------------------------------------------
  // Reveal opcional (intersection observer)
  // ----------------------------------------------
  function hookReveal() {
    if (!('IntersectionObserver' in window)) return;
    const targets = document.querySelectorAll('[data-reveal]');
    if (!targets.length) return;
    document.body.classList.add('has-reveal');
    targets.forEach((el) => el.classList.add('ed-reveal'));

    const vh = window.innerHeight || document.documentElement.clientHeight;
    targets.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.95) el.classList.add('is-visible');
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    targets.forEach((el) => { if (!el.classList.contains('is-visible')) io.observe(el); });
  }

  // ----------------------------------------------
  // Issue editorial calculado (Vol. I, No. NN)
  // basado en meses desde foundingDate 2005-01
  // ----------------------------------------------
  function hookMastheadIssue() {
    const el = document.querySelector('[data-masthead-issue]');
    if (!el || el.dataset.mastheadIssueOverride === 'true') return;
    const now = new Date();
    const founding = new Date(2005, 0, 1);
    const months = (now.getFullYear() - founding.getFullYear()) * 12 + (now.getMonth() - founding.getMonth());
    const vol = Math.floor(months / 12) + 1;
    const no = (months % 12) + 1;
    el.textContent = `Vol. ${toRoman(vol)} · No. ${no}`;
  }
  function toRoman(n) {
    const map = [['M',1000],['CM',900],['D',500],['CD',400],['C',100],['XC',90],['L',50],['XL',40],['X',10],['IX',9],['V',5],['IV',4],['I',1]];
    let r = '';
    for (const [s, v] of map) { while (n >= v) { r += s; n -= v; } }
    return r;
  }

  // ----------------------------------------------
  // Init
  // ----------------------------------------------
  async function init() {
    const slots = Array.from(document.querySelectorAll('[data-component]'));
    await Promise.all(slots.map(async (slot) => {
      const name = slot.dataset.component;
      if (!CONFIG.allow.includes(name)) return;
      const html = await fetchComponent(name);
      if (html) inflate(slot, html);
    }));

    hookCurrentYear();
    hookMastheadDate();
    hookMastheadIssue();
    hookActiveNav();
    hookMobileNav();
    hookNavbarScroll();
    hookSmoothScroll();
    hookDropdowns();
    hookAutoReveal();
    hookReveal();

    document.dispatchEvent(new CustomEvent('components:loaded'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.BarberiaComponents = { load: fetchComponent, init };
})();
