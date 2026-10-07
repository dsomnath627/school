const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  document.body.classList.toggle("menu-open");
  menuToggle.textContent = navMenu.classList.contains("open") ? "✕" : "☰";
});

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuToggle.textContent = "☰";
  });
});

const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

const counters = document.querySelectorAll("[data-count]");
let counted = false;
const statsSection = document.querySelector(".stats");

if (statsSection) {
  const statsObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !counted) {
      counted = true;
      counters.forEach(counter => {
        const target = Number(counter.dataset.count);
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 50));
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          counter.textContent = current;
        }, 25);
      });
    }
  }, { threshold: 0.5 });
  statsObserver.observe(statsSection);
}

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
  topBtn.classList.toggle("show", window.scrollY > 500);

  const sections = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll("nav a:not(.nav-btn)");
  let current = "";

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 150) {
      current = section.id;
    }
  });

  links.forEach(link => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === "#" + current
    );
  });
});

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();

  const message = document.getElementById("formMessage");
  message.textContent =
    "✓ Thank you! Your enquiry has been received. We will contact you soon.";

  event.target.reset();

  setTimeout(() => {
    message.textContent = "";
  }, 5000);
});
