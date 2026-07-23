/**
 * ChicAhmed — js/wishlist.js
 * Gestion des favoris (localStorage)
 * ====================================
 */

/* ── GETTERS / SETTERS ───────────────────────────────────────── */
function getWishlist() {
  try { return JSON.parse(localStorage.getItem('chicahmed_wishlist') || '[]'); }
  catch { return []; }
}

function saveWishlist(list) {
  localStorage.setItem('chicahmed_wishlist', JSON.stringify(list));
  updateBadges();
}

/* ── TOGGLE ──────────────────────────────────────────────────── */
function toggleWishlist(productId, event) {
  if (event && event.stopPropagation) event.stopPropagation();

  const list = getWishlist();
  const isIn = list.includes(productId);

  if (isIn) {
    saveWishlist(list.filter(id => id !== productId));
    showToast('Retiré des favoris', '💔');
  } else {
    saveWishlist([...list, productId]);
    showToast('Ajouté aux favoris', '❤️');
  }

  // Mettre à jour tous les boutons correspondants sur la page
  document.querySelectorAll(`[data-wishlist-id="${productId}"]`).forEach(btn => {
    btn.classList.toggle('active', !isIn);
  });
}

/* ── IS IN WISHLIST ──────────────────────────────────────────── */
function isInWishlist(productId) {
  return getWishlist().includes(productId);
}

/* ── INIT BOUTONS (appeler après rendu produits) ─────────────── */
function initWishlistButtons() {
  const list = getWishlist();
  document.querySelectorAll('[data-wishlist-id]').forEach(btn => {
    const id = btn.dataset.wishlistId;
    if (list.includes(id)) btn.classList.add('active');
    else btn.classList.remove('active');

    // Avoid duplicate listeners
    if (!btn.dataset.wlInited) {
      btn.dataset.wlInited = '1';
      btn.addEventListener('click', (e) => toggleWishlist(id, e));
    }
  });
}

/* ── BADGE COUNT ─────────────────────────────────────────────── */
function getWishlistCount() {
  return getWishlist().length;
}

/* ── EXPOSER GLOBALEMENT ─────────────────────────────────────── */
window.getWishlist       = getWishlist;
window.toggleWishlist    = toggleWishlist;
window.isInWishlist      = isInWishlist;
window.initWishlistButtons = initWishlistButtons;
window.getWishlistCount  = getWishlistCount;
