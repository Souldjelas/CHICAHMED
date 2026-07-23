/**
 * CHIC AHMED — Products Database
 * All products available in the store
 */

const PRODUCTS = [
  /* ── VESTES ────────────────────────────────────────────────── */
  {
    id: 'v1',
    name: 'Manteau croisé en laine cachemire',
    category: 'vestes',
    gender: 'homme',
    price: 195000,
    oldPrice: 250000,
    discount: 22,
    rating: 4.8,
    reviews: 34,
    images: [
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Beige', hex: '#D2B48C' },
      { name: 'Noir', hex: '#111111' },
      { name: 'Gris', hex: '#808080' },
      { name: 'Bleu Marine', hex: '#1B263B' },
      { name: 'Bordeaux', hex: '#581845' },
      { name: 'Vert Émeraude', hex: '#097969' },
      { name: 'Doré', hex: '#C9A96E' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Confectionné dans un mélange premium de laine vierge et de cachemire, ce manteau croisé présente une coupe structurée moderne. Parfait pour une silhouette élégante en hiver.',
    composition: '70% Laine Vierge, 20% Cachemire, 10% Polyamide. Doublure: 100% Viscose.',
    details: ['Col tailleur à revers crantés', 'Double boutonnage croisé', 'Poches latérales à rabat', 'Fente d\'aisance au dos'],
    isBestSeller: true,
    isNew: false,
    isHot: true
  },
  {
    id: 'v2',
    name: 'Trench-coat fluide ceinturé',
    category: 'vestes',
    gender: 'femme',
    price: 125000,
    oldPrice: null,
    discount: null,
    rating: 4.9,
    reviews: 56,
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Sable', hex: '#E6D8AD' },
      { name: 'Kaki', hex: '#4B5320' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Une réinterprétation moderne du trench-coat classique. Sa matière fluide et drapée offre une silhouette décontractée mais sophistiquée.',
    composition: '80% Lyocell, 20% Polyester. Doublure partielle: 100% Coton.',
    details: ['Boutonnage simple sous patte', 'Ceinture amovible', 'Poches passepoilées', 'Poignets ajustables'],
    isBestSeller: true,
    isNew: true,
    isHot: false
  },
  {
    id: 'v3',
    name: 'Blazer oversize en lin naturel',
    category: 'vestes',
    gender: 'femme',
    price: 89000,
    oldPrice: 112000,
    discount: 20,
    rating: 4.6,
    reviews: 22,
    images: [
      'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Écru', hex: '#F5F0E8' },
      { name: 'Nude', hex: '#C9A96E' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Ce blazer oversize en lin naturel respirant offre une silhouette relaxée et moderne. Idéal pour les journées estivales ou les soirées.',
    composition: '100% Lin naturel lavé.',
    details: ['Coupe oversize', 'Dos légèrement allongé', 'Poches plaquées', 'Boutons en corne naturelle'],
    isBestSeller: false,
    isNew: true,
    isHot: false
  },

  /* ── T-SHIRTS & CHEMISES ───────────────────────────────────── */
  {
    id: 't1',
    name: 'T-shirt en coton biologique lourd',
    category: 't-shirts',
    gender: 'homme',
    price: 25000,
    oldPrice: 32000,
    discount: 22,
    rating: 4.6,
    reviews: 112,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Blanc Écru', hex: '#F5F5DC' },
      { name: 'Gris Chiné', hex: '#D3D3D3' },
      { name: 'Noir', hex: '#111111' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Jersey de coton biologique lourd 240g/m² pour une excellente tenue et durabilité. Coupe décontractée légèrement boxy.',
    composition: '100% Coton Biologique certifié GOTS.',
    details: ['Col rond bord-côte épais', 'Épaules tombantes', 'Double surpiqûre', 'Matière douce et respirante'],
    isBestSeller: false,
    isNew: false,
    isHot: false
  },
  {
    id: 't2',
    name: 'Chemise fluide en soie lavée',
    category: 't-shirts',
    gender: 'femme',
    price: 95000,
    oldPrice: null,
    discount: null,
    rating: 4.7,
    reviews: 28,
    images: [
      'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Blanc Soie', hex: '#FCF6EB' },
      { name: 'Olive', hex: '#3B3C36' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Soie de mûrier lavée au fini mat et doux. Tombé fluide extrêmement élégant.',
    composition: '100% Soie de Mûrier.',
    details: ['Col classique pointu', 'Boutonnage façade caché', 'Boutons nacre', 'Pli plat au dos'],
    isBestSeller: true,
    isNew: false,
    isHot: false
  },

  /* ── SNEAKERS ──────────────────────────────────────────────── */
  {
    id: 's1',
    name: 'Sneakers minimalistes en cuir lisse',
    category: 'sneakers',
    gender: 'homme',
    price: 85000,
    oldPrice: 105000,
    discount: 19,
    rating: 4.5,
    reviews: 78,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Blanc', hex: '#FFFFFF' },
      { name: 'Blanc/Beige', hex: '#F3EFE0' }
    ],
    sizes: ['40', '41', '42', '43', '44', '45'],
    description: 'Baskets basses artisanales aux lignes épurées. Cuir de veau pleine fleur italien, fabriquées au Portugal.',
    composition: 'Tige: 100% Cuir. Doublure: 100% Cuir. Semelle: Caoutchouc naturel.',
    details: ['Construction cousu Margom', 'Semelle intérieure amovible', 'Lacets coton ciré', 'Logo doré estampé'],
    isBestSeller: true,
    isNew: false,
    isHot: false
  },
  {
    id: 's2',
    name: 'Runner rétro en mesh et suède',
    category: 'sneakers',
    gender: 'femme',
    price: 70000,
    oldPrice: null,
    discount: null,
    rating: 4.8,
    reviews: 43,
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Gris/Écru', hex: '#E1DDD5' },
      { name: 'Pastel', hex: '#F0E1E1' }
    ],
    sizes: ['36', '37', '38', '39', '40', '41'],
    description: 'Inspirée des années 80, cette sneaker combine suède haut de gamme et mesh technique respirant.',
    composition: 'Tige: Suède + Mesh Polyester. Semelle EVA + Caoutchouc.',
    details: ['Mousse EVA double densité', 'Détails réfléchissants', 'Col et languette rembourrés', 'Semelle crantée'],
    isBestSeller: false,
    isNew: true,
    isHot: false
  },

  /* ── JEANS ─────────────────────────────────────────────────── */
  {
    id: 'j1',
    name: 'Jean droit en denim selvedge',
    category: 'jeans',
    gender: 'homme',
    price: 65000,
    oldPrice: 85000,
    discount: 23,
    rating: 4.7,
    reviews: 65,
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Indigo Brut', hex: '#1A2E40' },
      { name: 'Bleu Lavé', hex: '#5C768D' }
    ],
    sizes: ['29', '30', '31', '32', '33', '34'],
    description: 'Denim selvedge japonais 13.5oz qui se patinera avec le temps. Coupe droite indémodable.',
    composition: '100% Coton Selvedge.',
    details: ['Fermeture boutons', 'Rivets cuivre', 'Liseré selvedge rouge', 'Poche gousset selvedge'],
    isBestSeller: false,
    isNew: false,
    isHot: false
  },
  {
    id: 'j2',
    name: 'Jean ajusté taille haute écru',
    category: 'jeans',
    gender: 'femme',
    price: 58000,
    oldPrice: null,
    discount: null,
    rating: 4.6,
    reviews: 51,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Écru', hex: '#FAF5E9' },
      { name: 'Noir Délavé', hex: '#3A3A3A' }
    ],
    sizes: ['25', '26', '27', '28', '29', '30'],
    description: 'Coton éco-responsable avec silhouette élancée. Taille haute flatteuse, jambe légèrement fuselée.',
    composition: '99% Coton Bio, 1% Élasthanne.',
    details: ['Taille très haute', 'Cinq poches', 'Patch jacron végétal', 'Légère extensibilité'],
    isBestSeller: true,
    isNew: false,
    isHot: false
  },

  /* ── ACCESSOIRES ───────────────────────────────────────────── */
  {
    id: 'a1',
    name: 'Sac besace en cuir grainé',
    category: 'accessoires',
    gender: 'femme',
    price: 115000,
    oldPrice: 145000,
    discount: 21,
    rating: 4.9,
    reviews: 19,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Camel', hex: '#A0522D' },
      { name: 'Noir', hex: '#111111' }
    ],
    sizes: ['Unique'],
    description: 'Cuir de vachette grainé résistant avec finitions en laiton brossé. Design intemporel pour le quotidien.',
    composition: 'Extérieur: 100% Cuir Vachette. Doublure: 100% Coton.',
    details: ['Bandoulière réglable', 'Compartiment principal zippé', 'Fermoir aimanté', 'Pieds métalliques'],
    isBestSeller: true,
    isNew: true,
    isHot: true
  },
  {
    id: 'a2',
    name: 'Lunettes de soleil en acétate écaille',
    category: 'accessoires',
    gender: 'homme',
    price: 50000,
    oldPrice: null,
    discount: null,
    rating: 4.4,
    reviews: 33,
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Écaille', hex: '#704214' },
      { name: 'Noir Mat', hex: '#222222' }
    ],
    sizes: ['Unique'],
    description: 'Forme pantos intemporelle façonnée en acétate haut de gamme. Verres polarisés UV Cat.3.',
    composition: 'Monture: Acétate de cellulose. Verres: CR39 Polarisé.',
    details: ['Protection 100% UVA/UVB', 'Charnières 5 charons', 'Livré avec étui', 'Signature gravée'],
    isBestSeller: false,
    isNew: false,
    isHot: false
  }
];

/* ── HELPERS ─────────────────────────────────────────────────── */

/**
 * Formate un prix en FCFA
 */
function formatPrice(amount) {
  return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
}

/**
 * Génère le HTML des étoiles
 */
function renderStars(rating) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    const filled = i <= Math.round(rating);
    html += `<svg viewBox="0 0 24 24" style="opacity:${filled ? '1' : '0.25'}"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>`;
  }
  return html;
}

/**
 * Génère la carte produit HTML complète
 */
function renderProductCard(p) {
  const badges = [];
  if (p.isNew) badges.push(`<span class="p-badge p-badge-new">Nouveau</span>`);
  if (p.discount) badges.push(`<span class="p-badge p-badge-sale">-${p.discount}%</span>`);
  if (p.isHot) badges.push(`<span class="p-badge p-badge-hot">★ Hot</span>`);

  const hasSecondImg = p.images.length > 1;

  return `
    <div class="product-card">
      <div class="product-img-wrap">
        ${badges.length ? `<div class="product-badges">${badges.join('')}</div>` : ''}
        <button class="product-wishlist-btn ${isInWishlist(p.id) ? 'active' : ''}"
          onclick="toggleWishlist('${p.id}', event)"
          aria-label="Ajouter aux favoris">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
          </svg>
        </button>
        <img class="product-img-primary" src="${p.images[0]}" alt="${p.name}" loading="lazy">
        ${hasSecondImg ? `<img class="product-img-secondary" src="${p.images[1]}" alt="${p.name} vue 2" loading="lazy">` : ''}
        <div class="product-action-overlay">
          <button class="product-add-btn" onclick="addToCart('${p.id}')">Ajouter au panier</button>
          <button class="product-icon-btn whatsapp" onclick="contactWhatsApp('${p.id}')" title="Commander via WhatsApp">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
          </button>
          <a href="produit.html?id=${p.id}" class="product-icon-btn" title="Voir le produit">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
            </svg>
          </a>
        </div>
      </div>
      <div class="product-info">
        <div class="product-cat">${p.category}</div>
        <a href="produit.html?id=${p.id}" class="product-name">${p.name}</a>
        <div class="product-rating">
          <div class="stars">${renderStars(p.rating)}</div>
          <span class="rating-count">(${p.reviews})</span>
        </div>
        <div class="product-prices">
          <span class="price-new">${formatPrice(p.price)}</span>
          ${p.oldPrice ? `<span class="price-old">${formatPrice(p.oldPrice)}</span>` : ''}
        </div>
      </div>
    </div>
  `;
}

// Expose globally
if (typeof window !== 'undefined') {
  window.PRODUCTS = PRODUCTS;
  window.formatPrice = formatPrice;
  window.renderStars = renderStars;
  window.renderProductCard = renderProductCard;
}

// Helper: check wishlist
function isInWishlist(id) {
  const wl = JSON.parse(localStorage.getItem('chicahmed_wishlist') || '[]');
  return wl.includes(id);
}
