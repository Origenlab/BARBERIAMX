/**
 * Barberia.mx - Main JavaScript
 * Dise�o Minimalista Estilo Apple
 */

(function() {
  'use strict';

  // ============================================
  // DOM Elements
  // ============================================
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // ============================================
  // Mobile Navigation Toggle
  // ============================================
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ============================================
  // Navbar Scroll Effect
  // ============================================
  let lastScroll = 0;
  const scrollThreshold = 100;

  function handleNavbarScroll() {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      navbar.classList.remove('nav-scrolled');
      navbar.classList.remove('nav-hidden');
      return;
    }

    if (currentScroll > scrollThreshold) {
      navbar.classList.add('nav-scrolled');
    } else {
      navbar.classList.remove('nav-scrolled');
    }

    // Optional: Hide navbar on scroll down, show on scroll up
    // Uncomment if desired
    /*
    if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
      navbar.classList.add('nav-hidden');
    } else {
      navbar.classList.remove('nav-hidden');
    }
    */

    lastScroll = currentScroll;
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });

  // ============================================
  // Smooth Scroll for Anchor Links
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      if (href === '#') return;

      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();

        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'auto'
        });
      }
    });
  });

  // ============================================
  // Search Box Interaction
  // ============================================
  const searchInput = document.querySelector('.search-input');
  const searchBtn = document.querySelector('.search-btn');

  if (searchInput && searchBtn) {
    searchBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const query = searchInput.value.trim();

      if (query) {
        // For now, just log the search query
        // In production, this would redirect to search results
        console.log('Buscando:', query);

        // Visual feedback
        searchBtn.textContent = 'Buscando...';
        setTimeout(function() {
          searchBtn.textContent = 'Buscar';
        }, 1000);
      }
    });

    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        searchBtn.click();
      }
    });
  }

  // ============================================
  // Newsletter Form
  // ============================================
  const newsletterForm = document.querySelector('.newsletter-form');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const emailInput = this.querySelector('.newsletter-input');
      const submitBtn = this.querySelector('.btn');
      const email = emailInput.value.trim();

      if (email && isValidEmail(email)) {
        submitBtn.textContent = 'Enviando...';

        // Simulate API call
        setTimeout(function() {
          submitBtn.textContent = '�Suscrito!';
          emailInput.value = '';

          setTimeout(function() {
            submitBtn.textContent = 'Suscribirse';
          }, 2000);
        }, 1000);
      }
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // ============================================
  // Add CSS for Nav States (No animations)
  // ============================================
  const style = document.createElement('style');
  style.textContent = `
    .nav-scrolled {
      box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
  `;
  document.head.appendChild(style);

  // ============================================
  // Console Welcome Message
  // ============================================
  console.log('%c>� Barberia.mx', 'font-size: 24px; font-weight: bold; color: #0071e3;');
  console.log('%cEl directorio de barber�as m�s completo de M�xico', 'font-size: 12px; color: #86868b;');

})();
