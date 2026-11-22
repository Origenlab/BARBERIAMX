/** Interacciones compartidas de BARBERIA.MX. */
(function () {
  'use strict';

  function mobileNavigation() {
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-mobile');
    if (!toggle || !menu) return;

    const setOpen = (isOpen) => {
      menu.classList.toggle('is-open', isOpen);
      toggle.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
      menu.setAttribute('aria-hidden', String(!isOpen));
      document.documentElement.style.overflow = isOpen ? 'hidden' : '';
    };

    toggle.addEventListener('click', () => setOpen(!menu.classList.contains('is-open')));
    menu.addEventListener('click', (event) => {
      if (event.target === menu || event.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setOpen(false);
    });
  }

  function smoothAnchors() {
    document.addEventListener('click', (event) => {
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) return;
      const selector = anchor.getAttribute('href');
      if (!selector || selector === '#') return;
      const target = document.querySelector(selector);
      if (!target) return;
      event.preventDefault();
      const offset = document.getElementById('navbar')?.offsetHeight ?? 0;
      const top = target.getBoundingClientRect().top + window.scrollY - offset - 12;
      window.scrollTo({ top, behavior: 'smooth' });
      history.replaceState(null, '', selector);
    });
  }

  function accessibleDropdowns() {
    document.querySelectorAll('.nav-item-dropdown').forEach((item) => {
      const trigger = item.querySelector('.nav-link');
      const menu = item.querySelector('.nav-dropdown');
      if (!trigger || !menu) return;
      const close = () => trigger.setAttribute('aria-expanded', 'false');
      const open = () => trigger.setAttribute('aria-expanded', 'true');
      item.addEventListener('mouseenter', open);
      item.addEventListener('mouseleave', close);
      item.addEventListener('focusin', open);
      item.addEventListener('focusout', (event) => {
        if (!item.contains(event.relatedTarget)) close();
      });
    });
  }

  function directoryControls() {
    const grid = document.getElementById('states-grid');
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll('.dp-card'));
    const sort = document.querySelector('[data-directory-sort]');
    const view = document.querySelector('[data-directory-view]');

    sort?.querySelectorAll('[data-sort]').forEach((button) => {
      button.addEventListener('click', () => {
        sort.querySelectorAll('[data-sort]').forEach((item) => item.setAttribute('aria-pressed', 'false'));
        button.setAttribute('aria-pressed', 'true');
        const mode = button.dataset.sort;
        const ordered = cards.slice().sort((a, b) => {
          if (mode === 'region') {
            const region = a.dataset.region.localeCompare(b.dataset.region, 'es');
            return region || Number(a.dataset.rank) - Number(b.dataset.rank);
          }
          return a.dataset.name.localeCompare(b.dataset.name, 'es');
        });
        ordered.forEach((card) => grid.appendChild(card));
      });
    });

    view?.querySelectorAll('[data-view]').forEach((button) => {
      button.addEventListener('click', () => {
        view.querySelectorAll('[data-view]').forEach((item) => item.setAttribute('aria-pressed', 'false'));
        button.setAttribute('aria-pressed', 'true');
        grid.classList.toggle('is-list', button.dataset.view === 'list');
      });
    });
  }

  function initialize() {
    mobileNavigation();
    smoothAnchors();
    accessibleDropdowns();
    directoryControls();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize);
  else initialize();
})();
