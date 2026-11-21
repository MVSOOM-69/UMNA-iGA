
/* ==========================================
   UMNA-İGA — INTERACTIVE EXPERIENCE
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {

  // 1. LANGUAGE SWITCHER

  const languageToggle = document.getElementById("languageToggle");

  let currentLanguage = "en";

  function changeLanguage(language) {

    currentLanguage = language;

    document.documentElement.lang = language;

    document.querySelectorAll("[data-en][data-tr]").forEach(element => {

      const translation = element.getAttribute(`data-${language}`);

      if (translation) {
        element.textContent = translation;
      }

    });

    if (languageToggle) {
      languageToggle.textContent = language === "en" ? "TR" : "EN";
    }

    document.title = language === "en"
      ? "UMNA-İGA | The Golden Age of Knowledge"
      : "UMNA-İGA | Bilginin Altın Çağı";

  }

  if (languageToggle) {

    languageToggle.addEventListener("click", () => {

      const nextLanguage = currentLanguage === "en" ? "tr" : "en";

      changeLanguage(nextLanguage);

    });

  }


  // 2. MOBILE NAVIGATION

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

      navLinks.classList.toggle("active");

      const isOpen = navLinks.classList.contains("active");

      menuToggle.textContent = isOpen ? "✕" : "☰";

      menuToggle.setAttribute("aria-expanded", String(isOpen));

    });

    document.querySelectorAll(".nav-links a").forEach(link => {

      link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuToggle.textContent = "☰";

        menuToggle.setAttribute("aria-expanded", "false");

      });

    });

  }


  // 3. SMOOTH SCROLLING

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(event) {

      const targetId = this.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    });

  });


  // 4. SCROLL REVEAL ANIMATIONS

  const revealElements = document.querySelectorAll(
    ".intro-grid, .section-heading, .legacy-card, .programme-content"
  );

  revealElements.forEach(element => {
    element.classList.add("reveal");
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("revealed");

        observer.unobserve(entry.target);

      }

    });

  }, {
    threshold: 0.12
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });


  // 5. NAVIGATION SCROLL EFFECT

  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {

    if (navbar) {

      if (window.scrollY > 50) {

        navbar.style.background = "rgba(7, 27, 22, 0.96)";
        navbar.style.borderBottomColor = "rgba(179, 148, 91, 0.25)";

      } else {

        navbar.style.background = "rgba(7, 27, 22, 0.44)";
        navbar.style.borderBottomColor = "rgba(255, 255, 255, 0.07)";

      }

    }

  }, {
    passive: true
  });


  // 6. INITIALIZE WEBSITE

  changeLanguage("en");

  document.body.classList.add("website-ready");

  console.log("UMNA-İGA experience initialized.");

});
        
