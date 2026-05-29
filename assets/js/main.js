/* main.js — Navigation, mobile menu, scroll animations */

/* ── Navigation scroll effect ── */
const nav        = document.querySelector('.nav');
const navToggle  = document.querySelector('.nav__toggle');
const navLinks   = document.querySelector('.nav__links');
const allLinks   = document.querySelectorAll('.nav__links a');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
  highlightActiveSection();
}, { passive: true });

/* ── Mobile menu toggle ── */
navToggle?.addEventListener('click', () => {
  const isOpen = navToggle.classList.toggle('open');
  navLinks.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

/* Close mobile menu when a link is clicked */
allLinks.forEach(link => {
  link.addEventListener('click', () => {
    navToggle?.classList.remove('open');
    navLinks?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

/* ── Active section highlighting ── */
const sections = document.querySelectorAll('section[id]');

function highlightActiveSection() {
  const scrollPos = window.scrollY + 120;
  sections.forEach(section => {
    const id   = section.getAttribute('id');
    const link = document.querySelector(`.nav__links a[href="#${id}"]`);
    if (!link) return;
    const top  = section.offsetTop;
    const bot  = top + section.offsetHeight;
    link.classList.toggle('active', scrollPos >= top && scrollPos < bot);
  });
}

/* ── Intersection Observer for scroll-in animations ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 55);  /* stagger siblings that enter together */
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll(
  '.fade-in, .timeline-item, .project-card, .cert-card'
).forEach(el => observer.observe(el));

/* ── Current year in footer ── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ── Initial active-link check on load ── */
highlightActiveSection();
