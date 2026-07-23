/**
 * CHIC AHMED — Hero Slider & Testimonials
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initTestimonialsSlider();
  initCarousel();
});

/* ── HERO SLIDER ─────────────────────────────────────────────── */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  const prevBtn = document.getElementById('hero-prev');
  const nextBtn = document.getElementById('hero-next');
  if (!slides.length) return;

  let current = 0;
  let autoplayTimer = null;
  const DELAY = 5500;

  const goTo = (index) => {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
  };

  const startAutoplay = () => {
    stopAutoplay();
    autoplayTimer = setInterval(() => goTo(current + 1), DELAY);
  };

  const stopAutoplay = () => {
    if (autoplayTimer) clearInterval(autoplayTimer);
  };

  // Init
  goTo(0);
  startAutoplay();

  prevBtn?.addEventListener('click', () => { goTo(current - 1); startAutoplay(); });
  nextBtn?.addEventListener('click', () => { goTo(current + 1); startAutoplay(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); startAutoplay(); });
  });

  // Swipe support
  let touchX = 0;
  const hero = document.querySelector('.hero');
  hero?.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  hero?.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) {
      goTo(dx < 0 ? current + 1 : current - 1);
      startAutoplay();
    }
  }, { passive: true });

  // Pause on hover
  hero?.addEventListener('mouseenter', stopAutoplay);
  hero?.addEventListener('mouseleave', startAutoplay);
}

/* ── PRODUCT CAROUSEL ────────────────────────────────────────── */
function initCarousel() {
  const track = document.getElementById('carousel-track');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const dotsContainer = document.getElementById('carousel-dots');
  if (!track) return;

  // Load best sellers
  const db = window.PRODUCTS || [];
  const bestSellers = db.filter(p => p.isBestSeller);
  if (!bestSellers.length) return;

  track.innerHTML = bestSellers.map(p => renderProductCard(p)).join('');

  const cards = track.querySelectorAll('.product-card');
  const itemsPerView = window.innerWidth >= 1200 ? 4 : window.innerWidth >= 768 ? 2 : 1;
  const totalGroups = Math.ceil(cards.length / itemsPerView);

  let currentGroup = 0;

  // Create dots
  if (dotsContainer) {
    dotsContainer.innerHTML = Array.from({ length: totalGroups }, (_, i) =>
      `<button class="carousel-dot${i === 0 ? ' active' : ''}" data-index="${i}" aria-label="Groupe ${i + 1}"></button>`
    ).join('');

    dotsContainer.querySelectorAll('.carousel-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        goToGroup(parseInt(dot.dataset.index));
      });
    });
  }

  const goToGroup = (index) => {
    currentGroup = Math.max(0, Math.min(index, totalGroups - 1));
    const cardWidth = cards[0].getBoundingClientRect().width + 24; // gap 1.5rem = 24px
    track.style.transform = `translateX(-${currentGroup * itemsPerView * cardWidth}px)`;

    dotsContainer?.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === currentGroup);
    });
  };

  prevBtn?.addEventListener('click', () => goToGroup(currentGroup - 1));
  nextBtn?.addEventListener('click', () => goToGroup(currentGroup + 1));

  // Drag/swipe
  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;

  track.addEventListener('mousedown', e => {
    isDragging = true;
    startX = e.pageX;
  });
  track.addEventListener('mouseup', e => {
    if (!isDragging) return;
    isDragging = false;
    const dx = e.pageX - startX;
    if (Math.abs(dx) > 60) {
      goToGroup(dx < 0 ? currentGroup + 1 : currentGroup - 1);
    }
  });
  track.addEventListener('mouseleave', () => { isDragging = false; });

  // Touch
  track.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  }, { passive: true });
  track.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) {
      goToGroup(dx < 0 ? currentGroup + 1 : currentGroup - 1);
    }
  }, { passive: true });

  // Resize
  window.addEventListener('resize', () => {
    goToGroup(0);
  }, { passive: true });
}

/* ── TESTIMONIALS SLIDER ─────────────────────────────────────── */
function initTestimonialsSlider() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dot');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  if (!slides.length) return;

  let current = 0;
  let timer = null;

  const goTo = (i) => {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (i + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
  };

  const startAuto = () => {
    if (timer) clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 6000);
  };

  goTo(0);
  startAuto();

  prevBtn?.addEventListener('click', () => { goTo(current - 1); startAuto(); });
  nextBtn?.addEventListener('click', () => { goTo(current + 1); startAuto(); });
  dots.forEach((d, i) => d.addEventListener('click', () => { goTo(i); startAuto(); }));
}
