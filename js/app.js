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
  // Newsletter Form
  // ============================================
  document.querySelectorAll('.ed-news-form, .ed-widget-news-form').forEach(function(newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput ? emailInput.value.trim() : '';
      if (!email || !isValidEmail(email)) {
        if (emailInput) emailInput.setCustomValidity('Escribe un correo válido.');
        if (emailInput) emailInput.reportValidity();
        return;
      }
      if (emailInput) emailInput.setCustomValidity('');
      const subject = encodeURIComponent('Suscripción al boletín');
      const body = encodeURIComponent(`Quiero recibir el boletín en: ${email}`);
      window.location.href = `mailto:hola@barberia.mx?subject=${subject}&body=${body}`;
      let confirmation = this.nextElementSibling;
      if (!confirmation || !confirmation.classList.contains('newsletter-confirmation')) {
        confirmation = document.createElement('p');
        confirmation.className = 'newsletter-confirmation';
        this.insertAdjacentElement('afterend', confirmation);
      }
      confirmation.textContent = 'Listo: se abrió tu correo para confirmar la suscripción.';
    });
  });

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

})();
