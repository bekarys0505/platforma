// ================================
// scripts.js
// ================================
document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href").substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
        history.replaceState(null, "", "#" + targetId);
      }
    });
  });

  // Contact form validation
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Хабарлама сәтті жіберілді ✅");
      form.reset();
    });
  }

  // Language dropdown
  const langSwitch = document.querySelector(".lang-switch");
  const langBtn = document.querySelector(".lang-btn");
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      langSwitch.classList.toggle("open");
    });

    document.querySelectorAll(".lang-dropdown li").forEach(li => {
      li.addEventListener("click", () => {
        langBtn.textContent = li.textContent + " ▾";
        langSwitch.classList.remove("open");
        alert("Тіл ауыстыру: " + li.dataset.lang);
      });
    });
  }

  // Theme toggle
  const themeToggle = document.getElementById("themeToggle");
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  });
});
