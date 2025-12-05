/* DOMWAY - Main JavaScript */
document.addEventListener("DOMContentLoaded", function () {
  initHeader();
  initMobileMenu();
  initScrollAnimations();
  initFormValidation();
  initSmoothScroll();
  initCounterAnimation();
});

function initHeader() {
  const header = document.querySelector(".header");
  if (!header) return;
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 50);
  });
}

function initMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  if (!menuToggle || !navMenu) return;

  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    menuToggle.classList.toggle("active");
    const spans = menuToggle.querySelectorAll("span");
    if (menuToggle.classList.contains("active")) {
      spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
    } else {
      spans[0].style.transform = "none";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "none";
    }
  });

  navMenu.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      menuToggle.classList.remove("active");
    });
  });
}

function initScrollAnimations() {
  const elements = document.querySelectorAll(".animate-on-scroll");
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  elements.forEach((el) => observer.observe(el));
}

function initFormValidation() {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    let isValid = true;

    form.querySelectorAll("input, textarea, select").forEach((input) => {
      input.classList.remove("error");
      const errorMsg = input.parentElement.querySelector(".error-message");
      if (errorMsg) errorMsg.remove();

      if (input.hasAttribute("required") && !input.value.trim()) {
        isValid = false;
        showError(input, "Ce champ est obligatoire");
      } else if (
        input.type === "email" &&
        input.value &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)
      ) {
        isValid = false;
        showError(input, "Email invalide");
      }
    });

    if (!isValid) {
      e.preventDefault();
    }
  });
}

function showError(input, message) {
  input.classList.add("error");
  const div = document.createElement("div");
  div.className = "error-message";
  div.textContent = message;
  div.style.cssText = "color:#dc3545;font-size:0.85rem;margin-top:5px;";
  input.parentElement.appendChild(div);
}

function showSuccess() {
  const notification = document.createElement("div");
  notification.innerHTML =
    "<strong>✓ Message envoyé !</strong><br>Nous vous répondrons rapidement.";
  notification.style.cssText =
    "position:fixed;top:100px;right:20px;background:#28a745;color:white;padding:20px 30px;border-radius:12px;box-shadow:0 10px 40px rgba(40,167,69,0.3);z-index:10000;animation:slideIn 0.5s ease;";
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 5000);
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector(".header").offsetHeight;
        window.scrollTo({
          top:
            target.getBoundingClientRect().top +
            window.pageYOffset -
            headerHeight,
          behavior: "smooth",
        });
      }
    });
  });
}

function initCounterAnimation() {
  const counters = document.querySelectorAll(
    ".stat-number, .experience-number"
  );
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function animateCounter(el) {
  const match = el.textContent.match(/(\d+)/);
  if (!match) return;
  const target = parseInt(match[1]);
  const suffix = el.textContent.replace(match[1], "");
  let current = 0;
  const step = target / 100;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + suffix;
  }, 20);
}

// Add animation keyframe
const style = document.createElement("style");
style.textContent =
  "@keyframes slideIn{from{opacity:0;transform:translateX(100px)}to{opacity:1;transform:translateX(0)}}.form-group input.error,.form-group textarea.error,.form-group select.error{border-color:#dc3545!important;box-shadow:0 0 0 4px rgba(220,53,69,0.1)!important}";
document.head.appendChild(style);
