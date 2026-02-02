// Mobile navigation toggle
document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      mainNav.classList.toggle("open");
    });

    // Close nav when clicking a link (on mobile)
    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (mainNav.classList.contains("open")) {
          mainNav.classList.remove("open");
        }
      });
    });
  }

  // Smooth scrolling for same-page anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href").substring(1);
      if (!targetId) return;
      const targetElement = document.getElementById(targetId);
      if (!targetElement) return;

      e.preventDefault();
      const headerOffset = 72;
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    });
  });

  // Fade-in on scroll using IntersectionObserver
  const fadeElements = document.querySelectorAll(".fade-in");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    fadeElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback: show all elements
    fadeElements.forEach((el) => el.classList.add("visible"));
  }

  // Light form UX improvements on contact page
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    const inputs = contactForm.querySelectorAll("input[required], textarea[required], select[required]");
    const statusElement = contactForm.querySelector(".form-status");

    function validateField(field) {
      const errorSpan = field.parentElement.querySelector(".form-error");
      if (!errorSpan) return;
      let message = "";

      if (field.validity.valueMissing) {
        message = "This field is required.";
      } else if (field.type === "email" && field.validity.typeMismatch) {
        message = "Please enter a valid email address.";
      }

      errorSpan.textContent = message;
      field.classList.toggle("has-error", Boolean(message));
    }

    inputs.forEach((input) => {
      input.addEventListener("blur", () => validateField(input));
      input.addEventListener("input", () => {
        const errorSpan = input.parentElement.querySelector(".form-error");
        if (errorSpan && errorSpan.textContent) {
          validateField(input);
        }
      });
    });

    contactForm.addEventListener("submit", (e) => {
      let isValid = true;

      inputs.forEach((input) => {
        validateField(input);
        if (!input.checkValidity()) {
          isValid = false;
        }
      });

      if (!isValid) {
        e.preventDefault();
        if (statusElement) {
          statusElement.textContent = "Please correct the highlighted fields and try again.";
          statusElement.style.color = "#c53030";
        }
        return;
      }

      if (statusElement) {
        statusElement.textContent = "Submitting your request...";
        statusElement.style.color = "#4a5568";
      }
    });
  }

  // Dynamic footer year
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
