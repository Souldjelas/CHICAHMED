/**
 * ChicAhmed — js/cart.js
 * Gestion du panier (localStorage) — sidebar panier
 * =====================================================
 * Fonctionne en tandem avec app.js (déjà chargé avant)
 */

/* ── STRUCTURE PANIER ────────────────────────────────────────── */
// cart = [ { id, size, color, quantity }, ... ]

function getCart() {
  try { return JSON.parse(localStorage.getItem('chicahmed_cart') || '[]'); }
  catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem('chicahmed_cart', JSON.stringify(cart));
  updateBadges();
  renderCartSidebar();
}

/* ── AJOUTER ─────────────────────────────────────────────────── */
function addToCart(productId, size = '', color = '') {
  const cart = getCart();
  const key = productId + '|' + size + '|' + color;
  const existing = cart.find(i => i.id + '|' + i.size + '|' + i.color === key);

  if (existing) {
    existing.quantity = Math.min(existing.quantity + 1, 10);
  } else {
    cart.push({ id: productId, size, color, quantity: 1 });
  }

  saveCart(cart);
  openCartSidebar();
  showToast('Article ajouté au panier', '🛍️');
}

/* ── MODIFIER QTÉ ────────────────────────────────────────────── */
function changeQty(productId, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.quantity = Math.max(1, Math.min(10, item.quantity + delta));
  saveCart(cart);
}

/* ── SUPPRIMER ───────────────────────────────────────────────── */
function removeCartItem(productId) {
  const cart = getCart().filter(i => i.id !== productId);
  saveCart(cart);
}

/* ── VIDER ───────────────────────────────────────────────────── */
function clearCart() {
  saveCart([]);
}

/* ── TOTAL ───────────────────────────────────────────────────── */
function getCartTotal() {
  const cart = getCart();
  const db = window.PRODUCTS || [];
  return cart.reduce((sum, item) => {
    const product = db.find(p => p.id === item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);
}

/* ── RENDU SIDEBAR ───────────────────────────────────────────── */
function renderCartSidebar() {
  const itemsWrap = document.getElementById('cart-items');
  const subtotalEl = document.getElementById('cart-subtotal-price');
  if (!itemsWrap) return;

  const cart = getCart();
  const db = window.PRODUCTS || [];

  if (!cart.length) {
    itemsWrap.innerHTML = `
      <div style="text-align:center;padding:3rem 1rem;color:var(--text-500)">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" style="margin:0 auto 1rem;display:block;opacity:.4"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6L18 2H6z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        <p style="font-size:.85rem">Votre panier est vide</p>
        <a href="boutique.html" style="display:inline-block;margin-top:1rem;font-size:.75rem;color:var(--gold-300);text-decoration:underline;text-underline-offset:3px" onclick="closeCartSidebar()">Découvrir la boutique</a>
      </div>`;
    if (subtotalEl) subtotalEl.textContent = formatPrice(0);
    return;
  }

  let html = '';
  let subtotal = 0;

  cart.forEach(item => {
    const p = db.find(x => x.id === item.id);
    if (!p) return;
    const lineTotal = p.price * item.quantity;
    subtotal += lineTotal;
    html += `
      <div class="cart-item" id="cart-item-${item.id}">
        <a href="produit.html?id=${p.id}" onclick="closeCartSidebar()">
          <img src="${p.images[0]}" alt="${p.name}" class="cart-item-img" loading="lazy">
        </a>
        <div class="cart-item-info">
          <a href="produit.html?id=${p.id}" onclick="closeCartSidebar()" class="cart-item-name">${p.name}</a>
          ${item.size ? `<span class="cart-item-meta">Taille: ${item.size}</span>` : ''}
          <span class="cart-item-price">${formatPrice(p.price)}</span>
          <div class="cart-item-controls">
            <div class="cart-qty-ctrl">
              <button onclick="changeQty('${item.id}', -1)">−</button>
              <span>${item.quantity}</span>
              <button onclick="changeQty('${item.id}', 1)">+</button>
            </div>
            <button class="cart-remove-btn" onclick="removeCartItem('${item.id}')" aria-label="Supprimer">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>
      </div>`;
  });

  itemsWrap.innerHTML = html;
  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
}

/* ── EXPOSER GLOBALEMENT ─────────────────────────────────────── */
window.addToCart        = addToCart;
window.changeQty        = changeQty;
window.removeCartItem   = removeCartItem;
window.clearCart        = clearCart;
window.getCart          = getCart;
window.getCartTotal     = getCartTotal;
window.renderCartSidebar = renderCartSidebar;
