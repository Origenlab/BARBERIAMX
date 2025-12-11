/**
 * Barberia.mx - Components Loader
 * Sistema profesional para cargar componentes HTML reutilizables
 *
 * Uso:
 * <div data-component="header"></div>
 * <div data-component="footer"></div>
 */

(function() {
  'use strict';

  // Configuración
  const CONFIG = {
    componentsPath: '/components/',
    components: ['header', 'footer'],
    cache: true
  };

  // Cache para componentes cargados
  const componentCache = {};

  /**
   * Carga un componente HTML
   * @param {string} name - Nombre del componente
   * @returns {Promise<string>} - HTML del componente
   */
  async function loadComponent(name) {
    // Verificar cache
    if (CONFIG.cache && componentCache[name]) {
      return componentCache[name];
    }

    try {
      const response = await fetch(`${CONFIG.componentsPath}${name}.html`);

      if (!response.ok) {
        throw new Error(`Error loading component: ${name}`);
      }

      const html = await response.text();

      // Guardar en cache
      if (CONFIG.cache) {
        componentCache[name] = html;
      }

      return html;
    } catch (error) {
      console.error(`Failed to load component "${name}":`, error);
      return '';
    }
  }

  /**
   * Renderiza un componente en el DOM
   * @param {HTMLElement} element - Elemento contenedor
   * @param {string} html - HTML a insertar
   */
  function renderComponent(element, html) {
    // Insertar HTML
    element.innerHTML = html;

    // Reemplazar el contenedor con su contenido
    const parent = element.parentNode;
    while (element.firstChild) {
      parent.insertBefore(element.firstChild, element);
    }
    parent.removeChild(element);
  }

  /**
   * Inicializa los event listeners del header
   */
  function initHeaderEvents() {
    const navToggle = document.getElementById('nav-toggle');
    const navMobile = document.getElementById('nav-mobile');
    const navMobileLinks = document.querySelectorAll('.nav-mobile-link');

    if (navToggle && navMobile) {
      // Toggle mobile menu
      navToggle.addEventListener('click', function() {
        const isOpen = navMobile.classList.contains('active');

        navMobile.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.style.overflow = !isOpen ? 'hidden' : '';

        // Update aria-label
        navToggle.setAttribute('aria-label', !isOpen ? 'Cerrar menú' : 'Abrir menú');
      });

      // Cerrar menú al hacer clic en un enlace móvil
      navMobileLinks.forEach(function(link) {
        link.addEventListener('click', function() {
          navMobile.classList.remove('active');
          navToggle.classList.remove('active');
          document.body.style.overflow = '';
          navToggle.setAttribute('aria-label', 'Abrir menú');
        });
      });

      // Cerrar menú con Escape
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMobile.classList.contains('active')) {
          navMobile.classList.remove('active');
          navToggle.classList.remove('active');
          document.body.style.overflow = '';
          navToggle.setAttribute('aria-label', 'Abrir menú');
        }
      });

      // Cerrar menú al hacer clic fuera
      navMobile.addEventListener('click', function(e) {
        if (e.target === navMobile) {
          navMobile.classList.remove('active');
          navToggle.classList.remove('active');
          document.body.style.overflow = '';
          navToggle.setAttribute('aria-label', 'Abrir menú');
        }
      });
    }

    // Marcar enlace activo
    highlightActiveLink();
  }

  /**
   * Resalta el enlace de navegación activo
   */
  function highlightActiveLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(function(link) {
      const href = link.getAttribute('href');

      // Remover clase activa
      link.classList.remove('nav-link-active');

      // Verificar si es la página actual
      if (href === currentPath ||
          (currentPath === '/' && href === '/index.html') ||
          (currentPath.includes('zona') && href.includes('zona'))) {
        link.classList.add('nav-link-active');
      }
    });
  }

  /**
   * Efecto de scroll en el navbar
   */
  function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let lastScroll = 0;
    const scrollThreshold = 100;

    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;

      if (currentScroll <= 0) {
        navbar.classList.remove('nav-scrolled');
        return;
      }

      if (currentScroll > scrollThreshold) {
        navbar.classList.add('nav-scrolled');
      } else {
        navbar.classList.remove('nav-scrolled');
      }

      lastScroll = currentScroll;
    }, { passive: true });
  }

  /**
   * Smooth scroll para enlaces ancla
   */
  function initSmoothScroll() {
    document.addEventListener('click', function(e) {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;

      const href = link.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navbar = document.getElementById('navbar');
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'auto'
        });
      }
    });
  }

  /**
   * Inicializa todos los componentes
   */
  async function init() {
    // Buscar todos los elementos con data-component
    const componentElements = document.querySelectorAll('[data-component]');

    // Cargar componentes en paralelo
    const loadPromises = Array.from(componentElements).map(async function(element) {
      const componentName = element.dataset.component;

      if (CONFIG.components.includes(componentName)) {
        const html = await loadComponent(componentName);
        if (html) {
          renderComponent(element, html);
        }
      }
    });

    // Esperar a que todos los componentes se carguen
    await Promise.all(loadPromises);

    // Inicializar funcionalidades después de cargar componentes
    initHeaderEvents();
    initNavbarScroll();
    initSmoothScroll();

    // Disparar evento personalizado
    document.dispatchEvent(new CustomEvent('componentsLoaded'));
  }

  // Iniciar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Exponer API pública
  window.BarberiaComponents = {
    load: loadComponent,
    init: init
  };

})();
