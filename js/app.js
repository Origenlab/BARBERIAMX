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

})();
