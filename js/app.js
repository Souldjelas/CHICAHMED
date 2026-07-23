/**
 * CHIC AHMED — Core App
 * Navbar, Search, Mobile Menu, WhatsApp, Toast
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initSearch();
  initCartSidebar();
  updateBadges();
  initNewsletter();
  initWhatsAppFloat();
});

/* ── NAVBAR ─────────────────────────────────────────────────── */
function initNavbar() {
  const header = document.querySelector('.header');
  if (!header) return;

  let lastY = 0;
  const onScroll = () => {
    const y = window.scrollY;
    if (y > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
    lastY = y;
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Active nav link
  const links = document.querySelectorAll('.nav-link');
  const page = location.pathname.split('/').pop() || 'index.html';
  links.forEach(l => {
    const href = l.getAttribute('href')?.split('?')[0];
    if (href === page) l.classList.add('active');
  });
}

/* ── MOBILE MENU ─────────────────────────────────────────────── */
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.mobile-nav');
  const overlay = document.querySelector('.mobile-overlay');
  if (!toggle || !nav) return;

  const close = () => {
    toggle.classList.remove('open');
    nav.classList.remove('active');
    overlay?.classList.remove('active');
    document.body.style.overflow = '';
  };

  const open = () => {
    toggle.classList.add('open');
    nav.classList.add('active');
    overlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  toggle.addEventListener('click', () => {
    nav.classList.contains('active') ? close() : open();
  });

  overlay?.addEventListener('click', close);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
  });
}

/* ── SEARCH ─────────────────────────────────────────────────── */
function initSearch() {
  const searchBtns = document.querySelectorAll('[data-search-open]');
  const modal = document.getElementById('search-modal');
  const closeBtn = document.getElementById('search-close-btn');
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  if (!modal) return;

  const openSearch = e => {
    e?.preventDefault();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => input?.focus(), 350);
  };

  const closeSearch = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    if (input) input.value = '';
    if (results) { results.innerHTML = ''; results.classList.remove('active'); }
  };

  searchBtns.forEach(btn => btn.addEventListener('click', openSearch));
  closeBtn?.addEventListener('click', closeSearch);
  modal.addEventListener('click', e => { if (e.target === modal) closeSearch(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeSearch();
  });

  // Live search
  let debounceTimer;
  input?.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const q = input.value.trim().toLowerCase();
      if (q.length < 2) {
        results.innerHTML = '';
        results.classList.remove('active');
        return;
      }

      const db = window.PRODUCTS || [];
      const matches = db.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.gender.toLowerCase().includes(q)
      ).slice(0, 6);

      if (!matches.length) {
        results.innerHTML = `<div style="padding:1rem 1.25rem;font-size:0.85rem;color:var(--text-400);">Aucun résultat pour « ${q} »</div>`;
      } else {
        results.innerHTML = matches.map(p => `
          <a href="produit.html?id=${p.id}" class="search-result-item" onclick="closeSearch()">
            <img src="${p.images[0]}" alt="${p.name}" loading="lazy">
            <div>
              <div class="search-result-name">${p.name}</div>
              <div class="search-result-price">${formatPrice(p.price)}</div>
            </div>
          </a>
        `).join('');
      }
      results.classList.add('active');
    }, 220);
  });

  window.closeSearch = closeSearch;
}

/* ── CART SIDEBAR ────────────────────────────────────────────── */
function initCartSidebar() {
  const overlay = document.querySelector('.cart-overlay');
  const sidebar = document.querySelector('.cart-sidebar');
  const closeBtn = document.querySelector('.cart-close');
  if (!sidebar) return;

  const closeCart = () => {
    sidebar.classList.remove('active');
    overlay?.classList.remove('active');
    document.body.style.overflow = '';
  };

  overlay?.addEventListener('click', closeCart);
  closeBtn?.addEventListener('click', closeCart);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && sidebar.classList.contains('active')) closeCart();
  });

  window.openCartSidebar = () => {
    renderCartSidebar();
    sidebar.classList.add('active');
    overlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeCartSidebar = closeCart;
}

function renderCartSidebar() {
  const cart = getCart();
  const itemsEl = document.getElementById('cart-items');
  const subtotalEl = document.getElementById('cart-subtotal-price');
  if (!itemsEl) return;

  if (!cart.length) {
    itemsEl.innerHTML = `
      <div class="cart-empty">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6L18 2H6z"/><line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
        <p>Votre panier est vide</p>
        <a href="boutique.html" class="btn btn-outline" onclick="closeCartSidebar()">Voir la boutique</a>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = formatPrice(0);
    return;
  }

  const db = window.PRODUCTS || [];
  let total = 0;

  itemsEl.innerHTML = cart.map(item => {
    const p = db.find(x => x.id === item.id);
    if (!p) return '';
    const lineTotal = p.price * item.quantity;
    total += lineTotal;
    return `
      <div class="cart-item" id="cart-item-${item.id}">
        <img class="cart-item-img" src="${p.images[0]}" alt="${p.name}" loading="lazy">
        <div class="cart-item-info">
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-meta">${item.size ? `Taille: ${item.size}` : ''}${item.color ? ` · ${item.color}` : ''}</div>
          <div class="cart-item-price">${formatPrice(p.price)}</div>
          <div class="cart-item-controls">
            <button class="qty-btn" onclick="changeQty('${item.id}', -1)">−</button>
            <span class="qty-value">${item.quantity}</span>
            <button class="qty-btn" onclick="changeQty('${item.id}', 1)">+</button>
            <button class="cart-item-remove" onclick="removeCartItem('${item.id}')">Retirer</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (subtotalEl) subtotalEl.textContent = formatPrice(total);
}

/* ── CART LOGIC ─────────────────────────────────────────────── */
const CART_KEY = 'chicahmed_cart';

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateBadges();
  if (document.querySelector('.cart-sidebar.active')) renderCartSidebar();
}

window.addToCart = function(id, size = '', color = '') {
  const db = window.PRODUCTS || [];
  const product = db.find(p => p.id === id);
  if (!product) return;

  const cart = getCart();
  const existing = cart.find(i => i.id === id && i.size === size && i.color === color);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ id, size, color, quantity: 1 });
  }

  saveCart(cart);
  showToast(`${product.name} ajouté au panier`, '🛍️');
  window.openCartSidebar?.();
};

window.changeQty = function(id, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.quantity = Math.max(1, item.quantity + delta);
  saveCart(cart);
};

window.removeCartItem = function(id) {
  const cart = getCart().filter(i => i.id !== id);
  saveCart(cart);
  renderCartSidebar();
};

window.quickAdd = function(id) {
  window.addToCart(id);
};

/* ── WISHLIST ────────────────────────────────────────────────── */
const WL_KEY = 'chicahmed_wishlist';

function getWishlist() {
  return JSON.parse(localStorage.getItem(WL_KEY) || '[]');
}

window.toggleWishlist = function(id, event) {
  event?.stopPropagation();
  const db = window.PRODUCTS || [];
  const product = db.find(p => p.id === id);
  const wl = getWishlist();
  const btn = document.querySelector(`.product-wishlist-btn[onclick*="${id}"]`);

  if (wl.includes(id)) {
    const updated = wl.filter(x => x !== id);
    localStorage.setItem(WL_KEY, JSON.stringify(updated));
    btn?.classList.remove('active');
    showToast(`Retiré des favoris`, '🤍');
  } else {
    wl.push(id);
    localStorage.setItem(WL_KEY, JSON.stringify(wl));
    btn?.classList.add('active');
    showToast(`${product?.name || 'Produit'} ajouté aux favoris`, '❤️');
  }
  updateBadges();
};

/* ── BADGES ─────────────────────────────────────────────────── */
function updateBadges() {
  const cart = getCart();
  const wl = getWishlist();
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const wlCount = wl.length;

  document.querySelectorAll('.cart-badge').forEach(b => {
    b.textContent = cartCount;
    b.style.display = cartCount > 0 ? 'flex' : 'none';
  });
  document.querySelectorAll('.wishlist-badge').forEach(b => {
    b.textContent = wlCount;
    b.style.display = wlCount > 0 ? 'flex' : 'none';
  });
}

window.updateNavbarBadges = updateBadges;

/* ── TOAST ──────────────────────────────────────────────────── */
function showToast(message, icon = '✓') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('out');
    toast.addEventListener('animationend', () => toast.remove());
  }, 3200);
}

window.showToast = showToast;

/* ── NEWSLETTER ─────────────────────────────────────────────── */
function initNewsletter() {
  document.querySelectorAll('.newsletter-form-el').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const email = input?.value.trim();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast('Veuillez saisir un email valide', '⚠️');
        return;
      }
      showToast('Merci pour votre inscription !', '✉️');
      if (input) input.value = '';
    });
  });
}

/* ── WHATSAPP FLOTTANT ──────────────────────────────────────── */
function initWhatsAppFloat() {
  const phone = '22890000000'; // Numéro WhatsApp
  const text = 'Bonjour, je souhaiterais des informations sur vos collections.';
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

  const btn = document.createElement('a');
  btn.href = url;
  btn.target = '_blank';
  btn.rel = 'noopener';
  btn.className = 'wa-float';
  btn.setAttribute('aria-label', 'Contacter sur WhatsApp');
  btn.innerHTML = `
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
  `;
  document.body.appendChild(btn);
}

/* ── WHATSAPP PRODUIT ────────────────────────────────────────── */
window.contactWhatsApp = function(id, size = '', color = '') {
  const db = window.PRODUCTS || [];
  const p = db.find(x => x.id === id);
  if (!p) return;

  const phone = '22890000000';
  let text = `Bonjour, je souhaite commander *${p.name}* (${formatPrice(p.price)}).`;
  if (size) text += ` Taille: *${size}*.`;
  if (color) text += ` Couleur: *${color}*.`;

  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
};
