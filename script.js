/**
 * ChicAhmed — script.js
 * Prêt-à-porter de luxe | Animations, interactions, UX
 * ========================================================
 * 01. Preloader
 * 02. Modal de bienvenue
 * 03. Header (scroll + hamburger)
 * 04. Navigation fluide
 * 05. Scroll Reveal
 * 06. Compteurs animés
 * 07. Slider témoignages
 * 08. Galerie / Lightbox
 * 09. Newsletter (validation)
 * 10. Formulaire contact (validation)
 * 11. Bouton Retour en haut
 * 12. Lien actif dans la nav
 */

/* ==========================================================================
   01. PRELOADER
   ========================================================================== */
(function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  let hidden = false;
  const hidePreloader = () => {
    if (hidden) return;
    hidden = true;
    preloader.classList.add('hidden');
    setTimeout(showWelcomeModal, 400);
  };

  if (document.readyState === 'complete') {
    hidePreloader();
  } else {
    window.addEventListener('load', hidePreloader, { once: true });
    setTimeout(hidePreloader, 1200);
  }
})();

/* ==========================================================================
   02. MODAL DE BIENVENUE
   ========================================================================== */
function showWelcomeModal() {
  const modal = document.getElementById('welcome-modal');
  if (!modal) return;

  if (sessionStorage.getItem('chicahmed_welcomed')) return;

  modal.style.display = 'flex';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => modal.classList.add('visible'));
  });

  const btn = document.getElementById('welcome-btn');
  btn?.addEventListener('click', closeWelcomeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeWelcomeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeWelcomeModal();
  }, { once: true });
}

function closeWelcomeModal() {
  const modal = document.getElementById('welcome-modal');
  if (!modal) return;
  modal.classList.add('hiding');
  sessionStorage.setItem('chicahmed_welcomed', '1');
  setTimeout(() => {
    modal.style.display = 'none';
    modal.classList.remove('visible', 'hiding');
  }, 600);
}

/* ==========================================================================
   03. HEADER — SCROLL & HAMBURGER
   ========================================================================== */
(function initHeader() {
  const header    = document.getElementById('header') || document.querySelector('.header');
  const hamburger = document.getElementById('hamburger') || document.querySelector('.hamburger') || document.querySelector('.menu-toggle');
  const mobileNav = document.getElementById('mobile-nav') || document.querySelector('.mobile-nav');
  const overlay   = document.getElementById('mobile-overlay') || document.querySelector('.mobile-overlay');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });

  const closeMobileNav = () => {
    hamburger?.classList.remove('open');
    mobileNav?.classList.remove('active');
    overlay?.classList.remove('active');
    document.body.style.overflow = '';
    hamburger?.setAttribute('aria-expanded', 'false');
  };

  const openMobileNav = () => {
    hamburger?.classList.add('open');
    mobileNav?.classList.add('active');
    overlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
    hamburger?.setAttribute('aria-expanded', 'true');
  };

  hamburger?.addEventListener('click', () => {
    const isOpen = mobileNav?.classList.contains('active');
    isOpen ? closeMobileNav() : openMobileNav();
  });

  overlay?.addEventListener('click', closeMobileNav);

  const closeBtn = mobileNav?.querySelector('.mobile-nav-close');
  closeBtn?.addEventListener('click', closeMobileNav);

  mobileNav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav?.classList.contains('active')) {
      closeMobileNav();
    }
  });
})();

/* ==========================================================================
   04. NAVIGATION FLUIDE + LIEN ACTIF
   ========================================================================== */
(function initSmoothNav() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#' || href.length <= 1) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();

      const headerH = document.getElementById('header')?.offsetHeight || 80;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');
  const headerH   = () => document.getElementById('header')?.offsetHeight || 80;

  const setActive = () => {
    const scrollPos = window.scrollY + headerH() + 60;
    sections.forEach(section => {
      const top    = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id     = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${id}`) link.classList.add('active');
          else link.classList.remove('active');
        });
      }
    });
  };

  window.addEventListener('scroll', setActive, { passive: true });
  setActive();
})();

/* ==========================================================================
   05. SCROLL REVEAL
   ========================================================================== */
(function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length || !('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el    = entry.target;
      const delay = parseInt(el.dataset.delay || 0);

      setTimeout(() => el.classList.add('revealed'), delay);
      observer.unobserve(el);
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => observer.observe(el));
})();

/* ==========================================================================
   06. COMPTEURS ANIMÉS
   ========================================================================== */
(function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length || !('IntersectionObserver' in window)) return;

  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  const animate = (el) => {
    const target   = parseInt(el.dataset.target || 0);
    const duration = 2000;
    let startTime  = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed  = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = easeOut(progress);

      el.textContent = Math.floor(eased * target).toLocaleString('fr-FR');

      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString('fr-FR');
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animate(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();

/* ==========================================================================
   07. SLIDER TÉMOIGNAGES
   ========================================================================== */
(function initTestimonialsSlider() {
  const track     = document.getElementById('testimonials-track');
  const dotsWrap  = document.getElementById('t-dots');
  const prevBtn   = document.getElementById('t-prev');
  const nextBtn   = document.getElementById('t-next');
  if (!track) return;

  const cards     = Array.from(track.querySelectorAll('.testimonial-card'));
  const total     = cards.length;
  let current     = 0;
  let autoTimer   = null;
  let cardsVisible = 1;
  const GAP       = 24;

  const getCardsVisible = () => {
    if (window.innerWidth >= 900) return 3;
    if (window.innerWidth >= 600) return 2;
    return 1;
  };

  const buildDots = () => {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    const maxIndex = total - cardsVisible;
    const dotCount = Math.max(1, maxIndex + 1);

    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement('button');
      dot.className = 't-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Témoignage ${i + 1}`);
      dot.addEventListener('click', () => { goTo(i); startAuto(); });
      dotsWrap.appendChild(dot);
    }
  };

  const updateCardSize = () => {
    cardsVisible = getCardsVisible();
    const trackW = track.parentElement?.offsetWidth || 900;
    const cardW  = (trackW - GAP * (cardsVisible - 1)) / cardsVisible;
    cards.forEach(card => {
      card.style.flex = `0 0 ${cardW}px`;
    });
    buildDots();
    goTo(Math.min(current, Math.max(0, total - cardsVisible)));
  };

  const goTo = (index) => {
    const maxIndex = Math.max(0, total - cardsVisible);
    current = Math.max(0, Math.min(index, maxIndex));
    const trackW   = track.parentElement?.offsetWidth || 900;
    const cardW    = (trackW - GAP * (cardsVisible - 1)) / cardsVisible;
    track.style.transform = `translateX(-${current * (cardW + GAP)}px)`;

    dotsWrap?.querySelectorAll('.t-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  };

  const startAuto = () => {
    stopAuto();
    autoTimer = setInterval(() => {
      const maxIndex = Math.max(0, total - cardsVisible);
      goTo(current >= maxIndex ? 0 : current + 1);
    }, 5500);
  };
  const stopAuto = () => { if (autoTimer) clearInterval(autoTimer); };

  prevBtn?.addEventListener('click', () => { goTo(current - 1); startAuto(); });
  nextBtn?.addEventListener('click', () => { goTo(current + 1); startAuto(); });

  let touchStartX = 0;
  track.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    stopAuto();
  }, { passive: true });
  track.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      goTo(dx < 0 ? current + 1 : current - 1);
    }
    startAuto();
  }, { passive: true });

  track.addEventListener('mouseenter', stopAuto);
  track.addEventListener('mouseleave', startAuto);

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      updateCardSize();
    }, 200);
  }, { passive: true });

  updateCardSize();
  startAuto();
})();

/* ==========================================================================
   08. GALERIE & LIGHTBOX
   ========================================================================== */
(function initGallery() {
  const items        = Array.from(document.querySelectorAll('.gallery-item'));
  const lightbox     = document.getElementById('lightbox');
  const lightboxImg  = document.getElementById('lightbox-img');
  const lightboxCap  = document.getElementById('lightbox-caption');
  const closeBtn     = document.getElementById('lightbox-close');
  const prevBtn      = document.getElementById('lb-prev');
  const nextBtn      = document.getElementById('lb-next');
  if (!lightbox || !items.length) return;

  let currentIndex = 0;

  const openLightbox = (index) => {
    currentIndex = index;
    const item = items[index];
    const src  = item.dataset.src || item.querySelector('img')?.src;
    const cap  = item.dataset.caption || '';

    lightboxImg.src = src;
    lightboxImg.alt = cap;
    if (lightboxCap) lightboxCap.textContent = cap;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    lightboxImg.style.opacity    = '0';
    setTimeout(() => { lightboxImg.style.opacity = '1'; lightboxImg.style.transition = 'opacity .35s'; }, 10);
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => { lightboxImg.src = ''; }, 400);
  };

  const showPrev = () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    openLightbox(currentIndex);
  };
  const showNext = () => {
    currentIndex = (currentIndex + 1) % items.length;
    openLightbox(currentIndex);
  };

  items.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
  });

  closeBtn?.addEventListener('click', closeLightbox);
  prevBtn?.addEventListener('click', showPrev);
  nextBtn?.addEventListener('click', showNext);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'ArrowLeft')  showPrev();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'Escape')     closeLightbox();
  });

  let touchX = 0;
  lightbox.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 60) { dx < 0 ? showNext() : showPrev(); }
  }, { passive: true });
})();

/* ==========================================================================
   09. NEWSLETTER — VALIDATION
   ========================================================================== */
(function initNewsletter() {
  const form  = document.getElementById('newsletter-form');
  const input = document.getElementById('newsletter-email');
  const msg   = document.getElementById('newsletter-msg');
  if (!form) return;

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const setMsg = (text, type = '') => {
    msg.textContent = text;
    msg.className   = 'form-message ' + type;
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = input?.value.trim();

    if (!email) {
      setMsg('Veuillez saisir votre adresse email.', 'error');
      input?.focus();
      return;
    }

    if (!isValidEmail(email)) {
      setMsg('Adresse email invalide. Vérifiez le format.', 'error');
      input?.focus();
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    if (btn) { btn.disabled = true; btn.textContent = 'Inscription…'; }

    setTimeout(() => {
      setMsg('✓ Merci ! Vous êtes bien inscrit(e) à notre newsletter.', 'success');
      if (input)  input.value = '';
      if (btn) { btn.disabled = false; btn.textContent = 'Je m\'inscris'; }

      setTimeout(() => setMsg(''), 5000);
    }, 900);
  });
})();

/* ==========================================================================
   10. FORMULAIRE CONTACT — VALIDATION
   ========================================================================== */
(function initContactForm() {
  const form   = document.getElementById('contact-form');
  const submit = document.getElementById('contact-submit');
  const msg    = document.getElementById('contact-msg');
  if (!form) return;

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const setFieldError = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };

  const clearErrors = () => {
    ['err-name', 'err-email', 'err-message'].forEach(id => setFieldError(id, ''));
    if (msg) { msg.textContent = ''; msg.className = 'form-message'; }
  };

  const setMsg = (text, type) => {
    if (!msg) return;
    msg.textContent = text;
    msg.className   = 'form-message ' + type;
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    const name    = form.querySelector('#c-name')?.value.trim() || '';
    const email   = form.querySelector('#c-email')?.value.trim() || '';
    const message = form.querySelector('#c-message')?.value.trim() || '';

    let hasError = false;

    if (name.length < 2) {
      setFieldError('err-name', 'Veuillez saisir votre nom (2 caractères minimum).');
      hasError = true;
    }

    if (!isValidEmail(email)) {
      setFieldError('err-email', 'Adresse email invalide.');
      hasError = true;
    }

    if (message.length < 10) {
      setFieldError('err-message', 'Votre message doit contenir au moins 10 caractères.');
      hasError = true;
    }

    if (hasError) return;

    if (submit) {
      submit.disabled = true;
      submit.querySelector('span').textContent = 'Envoi en cours…';
    }

    setTimeout(() => {
      setMsg('✓ Message envoyé ! Nous vous répondrons dans les plus brefs délais.', 'success');
      form.reset();
      if (submit) {
        submit.disabled = false;
        submit.querySelector('span').textContent = 'Envoyer le message';
      }
    }, 1200);
  });

  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('focus', () => {
      const errId = 'err-' + field.id.replace('c-', '');
      setFieldError(errId, '');
    });
  });
})();

/* ==========================================================================
   11. BOUTON RETOUR EN HAUT
   ========================================================================== */
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  const toggle = () => {
    if (window.scrollY > 400) btn.classList.add('visible');
    else btn.classList.remove('visible');
  };

  window.addEventListener('scroll', toggle, { passive: true });
  toggle();

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ==========================================================================
   UTILITAIRE — Effet de mise en évidence sur les cartes produits (tilt léger)
   ========================================================================== */
(function initProductTilt() {
  const cards = document.querySelectorAll('.product-card, .cat-card');

  cards.forEach(card => {
    let ticking = false;
    card.addEventListener('mousemove', (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const cx = rect.width  / 2;
          const cy = rect.height / 2;
          const rotX = ((y - cy) / cy) * -3;
          const rotY = ((x - cx) / cx) *  3;

          card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* ==========================================================================
   13. THEME TOGGLER (DARK / LIGHT)
   ========================================================================== */
(function initTheme() {
  const savedTheme = localStorage.getItem('chicahmed-theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  
  if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
    document.body.classList.add('light-theme');
  } else {
    document.body.classList.remove('light-theme');
  }

  const bindToggles = () => {
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach(btn => {
      if (btn.dataset.themeBound) return;
      btn.dataset.themeBound = 'true';
      btn.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('light-theme');
        localStorage.setItem('chicahmed-theme', isLight ? 'light' : 'dark');
      });
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindToggles);
  } else {
    bindToggles();
  }
})();

/* ==========================================================================
   14. PRODUCT GALLERY (CATEGORY PAGES)
   ========================================================================== */
window.changeMainImg = function(btn, newSrc) {
  const wrap = btn.closest('.product-img-wrap');
  if (!wrap) return;
  
  const mainImg = wrap.querySelector('img:first-of-type, .main-product-img');
  if (mainImg) {
    mainImg.src = newSrc;
  }
  
  const siblings = wrap.querySelectorAll('.cat-product-thumb');
  siblings.forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
};

/* ==========================================================================
   15. BASE DE DONNÉES DES PRODUITS & MODAL POP-UP (GALERIE PHOTOS + VIDÉOS)
   ========================================================================== */
const PRODUCTS_DATABASE = {
  "costume-bleu-nuit": {
    id: "costume-bleu-nuit",
    title: "Costume Tailleur Sur Mesure (Bleu Nuit)",
    category: "Costumes",
    price: "285 000 FCFA",
    oldPrice: "335 000 FCFA",
    stars: "★★★★★",
    desc: "Laine italienne 150s, doublure en soie pur grain, coupe sur-mesure architecturale. L'autorité et le raffinement au quotidien pour rendez-vous d'affaires et réceptions d'exception.",
    media: [
      { type: "image", src: "BLEU NUIT.jpeg", label: "Vue principale" }
    ]
  },
  "derby-croco": {
    id: "derby-croco",
    title: "Derby Oxford en Cuir Patiné Croco",
    category: "Chaussures en cuir",
    price: "125 000 FCFA",
    oldPrice: "",
    stars: "★★★★☆",
    desc: "Cuir veau pleine fleur patiné à la main effet crocodile, semelle Goodyear ultra-résistante. Livré avec embauchoirs et crème de soin.",
    media: [
      { type: "image", src: "cuire croco.jpeg", label: "Photo 1" },
      { type: "image", src: "cuire croco 2.jpeg", label: "Photo 2" },
      { type: "video", src: "CROCO.mp4", label: "Vidéo Démonstration HD 🎬" }
    ]
  },
  "trench-coat": {
    id: "trench-coat",
    title: "Trench-coat Signature",
    category: "Vestes femme",
    price: "155 000 FCFA",
    oldPrice: "",
    stars: "★★★★★",
    desc: "Manteau trench-coat croisé d'exception avec ceinture amovible, col tailleur ajusté. La sophistication au naturel pour femme distinguée.",
    media: [
      { type: "image", src: "Trench-coat.jpg", label: "Photo Officielle 1" },
      { type: "image", src: "VESTE FEMME.jpg", label: "Photo Officielle 2" }
    ]
  },
  "robe-soie": {
    id: "robe-soie",
    title: "Robe de Soirée en Soie",
    category: "Femmes",
    price: "220 000 FCFA",
    oldPrice: "",
    stars: "★★★★★",
    desc: "Soie de mûrier 100% pure, tombé exceptionnel. Une pièce signature d'exception créée pour faire sensation lors des grands événements.",
    media: [
      { type: "image", src: "ROBE DE SOIREE EN SOIE.jpg", label: "Photo Officielle 1" },
      { type: "image", src: "femme.jpg", label: "Photo Officielle 2" }
    ]
  },
  "costume-noir": {
    id: "costume-noir",
    title: "Costume Luxe Noir Présidentiel",
    category: "Costumes",
    price: "295 000 FCFA",
    oldPrice: "",
    stars: "★★★★★",
    desc: "Costume 3 pièces noir profond, laine peignée italienne Super 160s, doublure en soie. Élégance intemporelle pour dirigeants et réceptions VIP.",
    media: [
      { type: "image", src: "NOIRE.jpeg", label: "Photo 1" },
      { type: "image", src: "P NOIR.jpeg", label: "Photo 2" },
      { type: "video", src: "NOIRE.mp4", label: "Vidéo Présentation 🎬" },
      { type: "video", src: "NOIRE 5.mp4", label: "Vidéo Détails 🎬" }
    ]
  },
  "costume-violet": {
    id: "costume-violet",
    title: "Costume Princier Violet Impérial",
    category: "Costumes",
    price: "310 000 FCFA",
    oldPrice: "",
    stars: "★★★★★",
    desc: "Teinte violet magenta impérial d'une rareté captivante, veste ajustée et finitions faites main. Présenté sous tous les angles avec 4 vidéos HD d'essayages.",
    media: [
      { type: "image", src: "VIOLET.jpeg", label: "Photo 1" },
      { type: "image", src: "VIOLET 2.jpeg", label: "Photo 2" },
      { type: "image", src: "VIOLET 3.jpeg", label: "Photo 3" },
      { type: "video", src: "VIOLET.mp4", label: "Vidéo Essayage 1 🎬" },
      { type: "video", src: "VIOLET (2).mp4", label: "Vidéo Essayage 2 🎬" },
      { type: "video", src: "VIOLET (3).mp4", label: "Vidéo Zoom 3 🎬" },
      { type: "video", src: "VIOLET 9.mp4", label: "Vidéo Vue globale 🎬" }
    ]
  },
  "costume-gris": {
    id: "costume-gris",
    title: "Costume Exécutif Gris Anthracite",
    category: "Costumes",
    price: "290 000 FCFA",
    oldPrice: "",
    stars: "★★★★★",
    desc: "Nuances de gris italien raffinées, laine peignée haute performance anti-plis. Livré avec galerie de 7 photos et vidéo d'essayage.",
    media: [
      { type: "image", src: "GRIS.jpeg", label: "Photo 1" },
      { type: "image", src: "GRIS 3.jpeg", label: "Photo 2" },
      { type: "image", src: "GRIS 5.jpeg", label: "Photo 3" },
      { type: "image", src: "GRIS6.jpeg", label: "Photo 4" },
      { type: "image", src: "GRIS7.jpeg", label: "Photo 5" },
      { type: "image", src: "GRIS 8.jpeg", label: "Photo 6" },
      { type: "image", src: "GRIS 10.jpeg", label: "Photo 7" },
      { type: "video", src: "GRIS.mp4", label: "Vidéo Essayage 🎬" }
    ]
  },
  "costume-beige": {
    id: "costume-beige",
    title: "Costume Royal Beige Sahara",
    category: "Costumes",
    price: "300 000 FCFA",
    oldPrice: "",
    stars: "★★★★★",
    desc: "Beige lumineux et chaleureux, mélange laine et lin d'été. Idéal pour mariages et cérémonies VIP. Livré avec 8 vidéos HD complètes.",
    media: [
      { type: "image", src: "BEIGE 1.jpeg", label: "Photo 1" },
      { type: "video", src: "BEIGE.mp4", label: "Vidéo 1 🎬" },
      { type: "video", src: "BEEIGE3.mp4", label: "Vidéo 2 🎬" },
      { type: "video", src: "BEIGE 4.mp4", label: "Vidéo 3 🎬" },
      { type: "video", src: "BEIGE 6.mp4", label: "Vidéo 4 🎬" },
      { type: "video", src: "BEIGE 8.mp4", label: "Vidéo 5 🎬" },
      { type: "video", src: "BEIGE 10.mp4", label: "Vidéo 6 🎬" },
      { type: "video", src: "BEIGE 11.mp4", label: "Vidéo 7 🎬" },
      { type: "video", src: "BEIGE FONCE.mp4", label: "Vidéo 8 (Beige Foncé) 🎬" }
    ]
  },
  "costume-bleu-ciel": {
    id: "costume-bleu-ciel",
    title: "Costume Sur-Mesure Bleu Ciel",
    category: "Costumes",
    price: "280 000 FCFA",
    oldPrice: "",
    stars: "★★★★★",
    desc: "Teinte bleu ciel rafraîchissante, coupe italienne cintrée. L'élégance décontractée des beaux jours.",
    media: [
      { type: "image", src: "BLEU CIEL.jpeg", label: "Photo 1" },
      { type: "image", src: "BELU CIEL 2.jpeg", label: "Photo 2" },
      { type: "image", src: "BLEU CIEL 3.jpeg", label: "Photo 3" }
    ]
  },
  "mocassins-cuir-noir": {
    id: "mocassins-cuir-noir",
    title: "Mocassins Cuir Noir à Boucle Prestige",
    category: "Chaussures en cuir",
    price: "135 000 FCFA",
    oldPrice: "",
    stars: "★★★★★",
    desc: "Cuir véritable noir patiné, boucle métallique dorée, semelle cousue main. Le comble du raffinement.",
    media: [
      { type: "image", src: "CUIRE NOIR.jpeg", label: "Photo 1" },
      { type: "image", src: "CUIRE NOIRE.jpeg", label: "Photo 2" },
      { type: "video", src: "CUIRE NOIRE.mp4", label: "Vidéo Présentation 🎬" }
    ]
  },
  "ceinture-cuir": {
    id: "ceinture-cuir",
    title: "Ceinture Cuir Véritable Artisanale",
    category: "Ceintures",
    price: "35 000 FCFA",
    oldPrice: "",
    stars: "★★★★★",
    desc: "Cuir véritable pleine fleur, boucle dorée brossée résistant à la corrosion. L'accessoire indispensable.",
    media: [
      { type: "image", src: "ceinture.jpg", label: "Photo 1" },
      { type: "image", src: "WhatsApp Image 2026-07-26 at 03.16.28.jpeg", label: "Boutique Ceintures" }
    ]
  }
};

window.openProductModal = function(productId) {
  const prod = PRODUCTS_DATABASE[productId];
  if (!prod) return;

  let modal = document.getElementById('product-detail-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'product-detail-modal';
    modal.className = 'product-modal-backdrop';
    document.body.appendChild(modal);
  }

  const imgCount = prod.media.filter(m => m.type === 'image').length;
  const vidCount = prod.media.filter(m => m.type === 'video').length;

  let mediaBadgeText = [];
  if (imgCount > 0) mediaBadgeText.push(`📸 ${imgCount} Photo${imgCount > 1 ? 's' : ''}`);
  if (vidCount > 0) mediaBadgeText.push(`🎬 ${vidCount} Vidéo${vidCount > 1 ? 's' : ''} HD`);

  const waText = encodeURIComponent(`Bonjour ChicAhmed, je souhaite commander le modèle ${prod.title} (${prod.price}).`);
  const waUrl = `https://wa.me/22890022197?text=${waText}`;

  modal.innerHTML = `
    <div class="product-modal-container">
      <button class="product-modal-close" onclick="closeProductModal()" aria-label="Fermer">&times;</button>
      
      <div class="product-modal-media">
        <div class="product-modal-main-view" id="modal-main-view">
          <!-- Chargé dynamiquement -->
        </div>
        ${prod.media.length > 1 ? `<span class="product-modal-thumbs-label">Galerie Media (${prod.media.length})</span>` : ''}
        <div class="product-modal-thumbs" id="modal-thumbs">
          <!-- Vignettes -->
        </div>
      </div>

      <div class="product-modal-info">
        <div>
          <span class="product-modal-cat">${prod.category}</span>
          <h2 class="product-modal-title">${prod.title}</h2>
          <div class="product-modal-price">
            <span>${prod.price}</span>
            ${prod.oldPrice ? `<span class="product-modal-old-price">${prod.oldPrice}</span>` : ''}
          </div>
          <div class="product-modal-badge-count">${mediaBadgeText.join(' · ')}</div>
          <p class="product-modal-desc" style="margin-top:1.2rem;">${prod.desc}</p>
        </div>

        <div class="product-modal-actions">
          <a href="${waUrl}" target="_blank" rel="noopener" class="product-modal-btn-wa">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
            Commander via WhatsApp
          </a>
          <a href="https://vm.tiktok.com/ZN8J6RQVL/" target="_blank" rel="noopener" class="product-modal-btn-tiktok">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="color:#ff0050;"><path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 1.83 6.338 6.338 0 0 0 8.857 9.006 6.325 6.325 0 0 0 5.215-6.191V9.566a8.211 8.211 0 0 0 4.954 1.63V7.75a4.794 4.794 0 0 1-4.399-1.064z"/></svg>
            Voir la boutique sur TikTok 🎬
          </a>
        </div>
      </div>
    </div>
  `;

  const mainView = modal.querySelector('#modal-main-view');
  const thumbsWrap = modal.querySelector('#modal-thumbs');

  const setMainMedia = (item, thumbEl) => {
    if (item.type === 'video') {
      mainView.innerHTML = `<video src="${item.src}" controls autoplay loop style="width:100%;height:100%;object-fit:cover;"></video>`;
    } else {
      mainView.innerHTML = `<img src="${item.src}" alt="${prod.title}">`;
    }
    thumbsWrap.querySelectorAll('.product-modal-thumb').forEach(t => t.classList.remove('active'));
    if (thumbEl) thumbEl.classList.add('active');
  };

  if (prod.media && prod.media.length > 0) {
    prod.media.forEach((m, idx) => {
      const t = document.createElement('div');
      t.className = 'product-modal-thumb' + (idx === 0 ? ' active' : '');
      if (m.type === 'video') {
        t.innerHTML = `<video src="${m.src}#t=0.5" muted style="width:100%;height:100%;object-fit:cover;"></video><span class="product-modal-thumb-badge">🎬</span>`;
      } else {
        t.innerHTML = `<img src="${m.src}" alt="${m.label}">`;
      }
      t.addEventListener('click', () => setMainMedia(m, t));
      thumbsWrap.appendChild(t);
    });

    setMainMedia(prod.media[0], thumbsWrap.children[0]);
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  modal.onclick = (e) => {
    if (e.target === modal) closeProductModal();
  };
};

window.closeProductModal = function() {
  const modal = document.getElementById('product-detail-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    const mainView = modal.querySelector('#modal-main-view');
    if (mainView) mainView.innerHTML = '';
  }
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.product-card[data-product-id]').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a') && e.target.closest('a').classList.contains('btn-product-wa')) return;
      const pid = card.dataset.productId;
      if (pid) openProductModal(pid);
    });
  });
});
