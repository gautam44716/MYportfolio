/* =====================================================
   Gautam Parihar - Portfolio JavaScript
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------- 1. Fill links and email from config.js ---------- */
  document.querySelectorAll("[data-social]").forEach(function (link) {
    link.href = SITE_CONFIG.social[link.dataset.social];
  });

  document.querySelectorAll("[data-repo]").forEach(function (link) {
    link.href = SITE_CONFIG.repos[link.dataset.repo];
  });

  document.querySelectorAll("[data-email-text]").forEach(function (item) {
    item.textContent = SITE_CONFIG.email;
  });

  /* ---------- 2. Footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- 3. Navbar background on scroll ---------- */
  const navbar = document.getElementById("mainNav");

  function handleNavbar() {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleNavbar);
  handleNavbar();

  /* Close the mobile menu after clicking a link */
  document.querySelectorAll("#navMenu .nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
      const menu = document.getElementById("navMenu");
      if (menu.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  /* ---------- 4. "Explore Projects" button -> smooth scroll to projects ---------- */
  document.getElementById("exploreBtn").addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
  });

  /* ---------- 5. Typing effect in hero section ---------- */
  const roles = ["Web Developer", "BCA Student", "Software Developer", "Problem Solver"];
  const typedElement = document.getElementById("typedText");
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    typedElement.textContent = currentRole.substring(0, charIndex);

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
      speed = 1500;          // pause after the full word is typed
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 400;
    }

    setTimeout(typeEffect, speed);
  }

  typeEffect();

  /* ---------- 6. Reveal elements + animate skill bars on scroll ---------- */
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");

        // Fill the progress bars inside this element
        entry.target.querySelectorAll(".progress-bar").forEach(function (bar) {
          bar.style.width = bar.dataset.width + "%";
        });

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".reveal").forEach(function (element) {
    observer.observe(element);
  });

  /* ---------- 7. Back to top arrow ---------- */
  document.getElementById("backToTop").addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- 8. Contact form -> opens Gmail with the message ---------- */
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("cName");
    const email = document.getElementById("cEmail");
    const subject = document.getElementById("cSubject");
    const message = document.getElementById("cMessage");

    // Simple validation: show Bootstrap red error under empty fields
    let isValid = true;
    [name, email, subject, message].forEach(function (field) {
      if (!field.value.trim() || !field.checkValidity()) {
        field.classList.add("is-invalid");
        isValid = false;
      } else {
        field.classList.remove("is-invalid");
      }
    });

    if (!isValid) {
      return;
    }

    // Build the message body
    const body =
      "Hello Gautam,\n\n" +
      message.value.trim() +
      "\n\n-- \nName: " + name.value.trim() +
      "\nEmail: " + email.value.trim();

    // Gmail compose link (asks the visitor to log in to Gmail if needed)
    const gmailUrl =
      "https://mail.google.com/mail/?view=cm&fs=1" +
      "&to=" + encodeURIComponent(SITE_CONFIG.email) +
      "&su=" + encodeURIComponent(subject.value.trim()) +
      "&body=" + encodeURIComponent(body);

    const newTab = window.open(gmailUrl, "_blank");

    // If the browser blocked the pop-up, use the normal mail app instead
    if (!newTab) {
      window.location.href =
        "mailto:" + SITE_CONFIG.email +
        "?subject=" + encodeURIComponent(subject.value.trim()) +
        "&body=" + encodeURIComponent(body);
    }

    form.reset();
  });

  // Remove the red error as soon as the user starts typing again
  form.querySelectorAll(".form-control").forEach(function (field) {
    field.addEventListener("input", function () {
      field.classList.remove("is-invalid");
    });
  });

});
