/**
 * CHIC AHMED — Scroll Reveal & Micro-animations
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initParallax();
  initHoverTilt();
});

/* ── SCROLL REVEAL ───────────────────────────────────────────── */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger for siblings
        const delay = entry.target.dataset.revealDelay || 0;
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  // Auto-assign delays to groups
  const groups = {};
  elements.forEach(el => {
    const parent = el.parentElement;
    const key = parent ? parent.dataset.revealGroup || Math.random() : Math.random();
    parent.dataset.revealGroup = key;
    if (!groups[key]) groups[key] = [];
    groups[key].push(el);
  });

  Object.values(groups).forEach(group => {
    group.forEach((el, i) => {
      if (!el.dataset.revealDelay) {
        el.dataset.revealDelay = i * 80;
      }
    });
  });

  elements.forEach(el => observer.observe(el));
}

/* ── PARALLAX ────────────────────────────────────────────────── */
function initParallax() {
  const heroSlides = document.querySelectorAll('.hero-slide-bg');
  if (!heroSlides.length) return;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroSlides.forEach(slide => {
      if (slide.closest('.hero-slide.active')) {
        slide.style.transform = `scale(1) translateY(${y * 0.25}px)`;
      }
    });
  }, { passive: true });
}

/* ── HOVER TILT (PRODUCT CARDS) ──────────────────────────────── */
function initHoverTilt() {
  const cards = document.querySelectorAll('.product-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -3;
      const rotY = ((x - cx) / cx) * 3;
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ── TICKER DUPLICATION ─────────────────────────────────────── */
(function duplicateTicker() {
  const track = document.querySelector('.ticker-track');
  if (!track) return;
  // Already duplicated via HTML, just ensure smooth seamless loop
})();

/* ── COUNTER ANIMATION (STATS) ──────────────────────────────── */
function animateCounter(el, target, duration = 2000) {
  let start = null;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target).toLocaleString('fr-FR');
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// Trigger counters when visible
const counters = document.querySelectorAll('[data-counter]');
if (counters.length) {
  const cObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.counter);
        animateCounter(entry.target, target);
        cObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => cObs.observe(c));
}
