// Highlight current day in hours
      document.addEventListener("DOMContentLoaded", function () {
        const days = [
          "Domingo",
          "Lunes",
          "Martes",
          "Miercoles",
          "Jueves",
          "Viernes",
          "Sabado",
        ];
        const today = days[new Date().getDay()];

        document.querySelectorAll(".hours-day").forEach((el) => {
          if (el.textContent === today) {
            el.classList.add("today");
          }
        });

        // Check if currently open (10:00 - 21:00 every day)
        const now = new Date();
        const hour = now.getHours();

        const isOpen = hour >= 10 && hour < 21;

        const statusEl = document.querySelector(".hours-status");
        if (!isOpen) {
          statusEl.classList.remove("open");
          statusEl.classList.add("closed");
          statusEl.innerHTML = '<span class="hours-status-dot"></span> Cerrado';
        }

        // Favorite button
        const favoriteBtns = document.querySelectorAll(".share-btn");
        favoriteBtns.forEach((btn) => {
          btn.addEventListener("click", function () {
            if (this.textContent.includes("Guardar")) {
              this.classList.toggle("active");
            }
          });
        });
      });