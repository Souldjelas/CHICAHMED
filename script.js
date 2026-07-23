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
    // Safety fallback to guarantee preloader disappears smoothly even on slow networks
    setTimeout(hidePreloader, 2500);
  }
})();

/* ==========================================================================
   02. MODAL DE BIENVENUE
   ========================================================================== */
function showWelcomeModal() {
  const modal = document.getElementById('welcome-modal');
  if (!modal) return;

  // N'afficher qu'une fois par session
  if (sessionStorage.getItem('chicahmed_welcomed')) return;

  // Affichage élégant
  modal.style.display = 'flex';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => modal.classList.add('visible'));
  });

  // Bouton "Découvrir la boutique"
  const btn = document.getElementById('welcome-btn');
  btn?.addEventListener('click', closeWelcomeModal);

  // Fermeture sur clic hors de la box
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeWelcomeModal();
  });

  // Fermeture Echap
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
  const header    = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const overlay   = document.getElementById('mobile-overlay');
  if (!header) return;

  /* ── Scroll ── */
  const handleScroll = () => {
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });

  /* ── Hamburger ── */
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

  // Fermer sur clic d'un lien mobile
  mobileNav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // Fermer sur Echap
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
  // Défilement fluide sur tous les liens internes
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

  // Mettre à jour le lien actif au scroll
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
    // Fallback : tout afficher
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
    const duration = 2000; // ms
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
  const GAP       = 24; // 1.5rem

  /* Calcul dynamique du nombre de cartes visibles */
  const getCardsVisible = () => {
    if (window.innerWidth >= 900) return 3;
    if (window.innerWidth >= 600) return 2;
    return 1;
  };

  /* Créer les dots */
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

  /* Mise à jour des styles de carte */
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

  /* Déplacement */
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

  /* Autoplay */
  const startAuto = () => {
    stopAuto();
    autoTimer = setInterval(() => {
      const maxIndex = Math.max(0, total - cardsVisible);
      goTo(current >= maxIndex ? 0 : current + 1);
    }, 5500);
  };
  const stopAuto = () => { if (autoTimer) clearInterval(autoTimer); };

  /* Contrôles */
  prevBtn?.addEventListener('click', () => { goTo(current - 1); startAuto(); });
  nextBtn?.addEventListener('click', () => { goTo(current + 1); startAuto(); });

  /* Touch / drag */
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

  /* Pause on hover */
  track.addEventListener('mouseenter', stopAuto);
  track.addEventListener('mouseleave', startAuto);

  /* Resize */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      updateCardSize();
    }, 200);
  }, { passive: true });

  /* Init */
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

  /* Ouvrir */
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

  /* Fermer */
  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => { lightboxImg.src = ''; }, 400);
  };

  /* Navigation */
  const showPrev = () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    openLightbox(currentIndex);
  };
  const showNext = () => {
    currentIndex = (currentIndex + 1) % items.length;
    openLightbox(currentIndex);
  };

  /* Events */
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

  /* Swipe mobile */
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

    // Simulation d'envoi
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

    // Simulation d'envoi
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

  // Effacer l'erreur au focus
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

