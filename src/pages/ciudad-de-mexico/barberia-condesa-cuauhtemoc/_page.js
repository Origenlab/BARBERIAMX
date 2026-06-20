// Highlight current day in hours
    document.addEventListener('DOMContentLoaded', function() {
      const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      const today = days[new Date().getDay()];

      document.querySelectorAll('.hours-day').forEach(el => {
        if (el.textContent === today) {
          el.classList.add('today');
        }
      });

      // Check if currently open
      const now = new Date();
      const hour = now.getHours();
      const day = now.getDay();

      let isOpen = false;

      if (day === 0) { // Domingo
        isOpen = hour >= 10 && hour < 17;
      } else if (day === 6) { // Sábado
        isOpen = hour >= 9 && hour < 19;
      } else { // Lunes a Viernes
        isOpen = hour >= 10 && hour < 20;
      }

      const statusEl = document.querySelector('.hours-status');
      if (!isOpen) {
        statusEl.classList.remove('open');
        statusEl.classList.add('closed');
        statusEl.innerHTML = '<span class="hours-status-dot"></span> Cerrado';
      }

      // Favorite button
      const favoriteBtns = document.querySelectorAll('.share-btn');
      favoriteBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          if (this.textContent.includes('Guardar')) {
            this.classList.toggle('active');
          }
        });
      });
    });