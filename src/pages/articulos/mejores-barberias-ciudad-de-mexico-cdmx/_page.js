document.addEventListener('DOMContentLoaded', function() {
      const navToggle = document.getElementById('nav-toggle');
      const navMobile = document.getElementById('nav-mobile');

      if (navToggle && navMobile) {
        navToggle.addEventListener('click', function() {
          navMobile.classList.toggle('active');
          navToggle.classList.toggle('active');
          document.body.style.overflow = navMobile.classList.contains('active') ? 'hidden' : '';
        });
      }

      const navbar = document.getElementById('navbar');
      if (navbar) {
        window.addEventListener('scroll', function() {
          navbar.classList.toggle('nav-scrolled', window.pageYOffset > 100);
        }, { passive: true });
      }
    });