// Global cart state (shared across pages via localStorage)
let globalCart = JSON.parse(localStorage.getItem('eatLocalCart')) || {};

// DOM Elements
const navbar = document.getElementById('navbar');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const filterBar = document.getElementById('filterBar');
const restaurantGrid = document.getElementById('restaurantGrid');
const resultCount = document.getElementById('resultCount');
const emptyState = document.getElementById('emptyState');
const heroBg = document.getElementById('heroBg');
const navbarCart = document.getElementById('navbarCart');
const cartDropdown = document.getElementById('cartDropdown');
const navCartBadge = document.getElementById('navCartBadge');
const cartDropdownItems = document.getElementById('cartDropdownItems');
const cartDropdownFooter = document.getElementById('cartDropdownFooter');
const dropdownTotal = document.getElementById('dropdownTotal');

// State
let activeFilter = 'all';
let searchQuery = '';

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('eatLocalCart', JSON.stringify(globalCart));
}

// Get total items and price
function getCartTotal() {
  const items = Object.values(globalCart);
  const totalItems = items.reduce((sum, qty) => sum + qty, 0);
  const totalPrice = items.reduce((sum, [price, qty]) => sum + (price * qty), 0);
  return { totalItems, totalPrice };
}

// Update navbar cart badge
function updateNavbarCart() {
  const { totalItems } = getCartTotal();
  if (totalItems > 0) {
    navCartBadge.style.display = 'flex';
    navCartBadge.textContent = totalItems;
    navbarCart.classList.remove('empty');
  } else {
    navCartBadge.style.display = 'none';
    navbarCart.classList.add('empty');
  }
}

// Update cart dropdown
function updateCartDropdown() {
  const items = Object.entries(globalCart);
  
  if (items.length === 0) {
    cartDropdownItems.innerHTML = '<div class="cart-empty-msg">Your cart is empty</div>';
    cartDropdownFooter.style.display = 'none';
    return;
  }

  let itemsHtml = '';
  let total = 0;
  let currentRestaurantId = null;

  items.forEach(([itemId, [name, price, qty, restaurantId]]) => {
    currentRestaurantId = restaurantId;
    total += price * qty;
    itemsHtml += `
      <div class="cart-dropdown-item">
        <div class="cart-item-info">
          <div class="cart-item-name">${name}</div>
          <div class="cart-item-price">₹${price} × ${qty}</div>
        </div>
        <div class="cart-item-qty" onclick="event.stopPropagation()">
          <button class="cart-qty-btn minus" data-id="${itemId}" data-delta="-1">−</button>
          <span class="cart-qty-count">${qty}</span>
          <button class="cart-qty-btn plus" data-id="${itemId}" data-delta="1">+</button>
        </div>
        <div class="cart-item-total">₹${price * qty}</div>
      </div>
    `;
  });

  // Get restaurant name
  const restaurant = restaurants.find(r => r.id === currentRestaurantId);
  const restaurantName = restaurant ? restaurant.name : '';

  cartDropdownItems.innerHTML = `
    <div class="cart-header-row">
      <div class="cart-restaurant-info">📍 ${restaurantName}</div>
      <button class="clear-cart-btn" id="clearCartBtn">Clear</button>
    </div>
    ${itemsHtml}
  `;
  
  // Add event listener for clear button
  document.getElementById('clearCartBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    window.clearCart();
  });
  dropdownTotal.textContent = `₹${total}`;
  cartDropdownFooter.style.display = 'block';
}

// Update cart item quantity from dropdown
window.updateCartItem = function(itemId, delta) {
  if (globalCart[itemId]) {
    globalCart[itemId][2] += delta;
    if (globalCart[itemId][2] <= 0) {
      delete globalCart[itemId];
    }
    saveCart();
    updateNavbarCart();
    updateCartDropdown();
    // Also update restaurant page if open
    if (typeof renderCart === 'function' && document.getElementById('stickyCart')) {
      renderCart();
    }
    if (typeof renderMenu === 'function') {
      renderMenu();
    }
  }
};

// Clear entire cart
window.clearCart = function() {
  globalCart = {};
  saveCart();
  updateNavbarCart();
  updateCartDropdown();
  // Also clear restaurant page cart
  if (typeof renderCart === 'function') {
    renderCart();
  }
  if (typeof renderMenu === 'function') {
    renderMenu();
  }
};

// Toggle cart dropdown
navbarCart.addEventListener('click', (e) => {
  e.stopPropagation();
  cartDropdown.classList.toggle('visible');
});

// Cart item buttons event delegation
cartDropdownItems.addEventListener('click', (e) => {
  const btn = e.target.closest('.cart-qty-btn');
  if (btn) {
    const itemId = btn.dataset.id;
    const delta = parseInt(btn.dataset.delta);
    window.updateCartItem(itemId, delta);
  }
});

// Close dropdown when clicking outside
document.addEventListener('click', () => {
  cartDropdown.classList.remove('visible');
});

// Go to checkout (first restaurant with items)
function goToCheckout() {
  const items = Object.entries(globalCart);
  if (items.length > 0) {
    const restaurantId = items[0][1][3];
    window.location.href = `restaurant.html?id=${restaurantId}`;
  }
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Get initials from restaurant name
function getInitials(name) {
  return name.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase();
}

// Create restaurant card HTML
function createRestaurantCard(restaurant, index) {
  const card = document.createElement('a');
  card.href = `restaurant.html?id=${restaurant.id}`;
  card.className = 'restaurant-card';
  card.setAttribute('data-aos', 'fade-up');
  card.setAttribute('data-aos-delay', (index % 3) * 100);

  const badgeClass = restaurant.isOpen ? 'open' : 'closed';
  const badgeText = restaurant.isOpen ? '● Open' : '● Closed';
  
  let coverContent = '';
  if (restaurant.image) {
    coverContent = `<img src="${restaurant.image}" alt="${restaurant.name}">`;
  } else {
    coverContent = `<div class="card-cover-gradient"><span class="card-cover-initials">${getInitials(restaurant.name)}</span></div>`;
  }

  card.innerHTML = `
    <div class="card-cover">
      ${coverContent}
      <span class="card-badge ${badgeClass}">${badgeText}</span>
      <span class="card-cuisine-tag">${restaurant.cuisine.split('·')[0].trim()}</span>
    </div>
    <div class="card-body">
      <h3 class="card-name">${restaurant.name}</h3>
      <p class="card-tagline">${restaurant.tagline}</p>
      <div class="card-divider"></div>
      <div class="card-info">
        <span class="card-rating">
          <span class="star">★</span>
          ${restaurant.rating} (${restaurant.reviews})
        </span>
        <span class="card-info-item">${restaurant.deliveryTime}</span>
        <span class="card-info-item">₹${restaurant.priceForTwo} for two</span>
        <span class="card-info-item">📍 ${restaurant.area}</span>
      </div>
    </div>
  `;

  return card;
}

// Filter restaurants based on search and active filter
function getFilteredRestaurants() {
  return restaurants.filter(restaurant => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery ||
      restaurant.name.toLowerCase().includes(searchLower) ||
      restaurant.cuisine.toLowerCase().includes(searchLower) ||
      restaurant.area.toLowerCase().includes(searchLower) ||
      restaurant.tagline.toLowerCase().includes(searchLower);

    let matchesFilter = true;
    if (activeFilter === 'open') {
      matchesFilter = restaurant.isOpen;
    } else if (activeFilter !== 'all') {
      matchesFilter = restaurant.filterTags.includes(activeFilter);
    }

    return matchesSearch && matchesFilter;
  });
}

// Render all restaurant cards
function renderRestaurants() {
  const filtered = getFilteredRestaurants();
  restaurantGrid.innerHTML = '';

  if (searchQuery || activeFilter !== 'all') {
    resultCount.textContent = `Showing ${filtered.length} restaurant${filtered.length !== 1 ? 's' : ''} in Jabalpur`;
  } else {
    resultCount.textContent = `Showing ${filtered.length} restaurant${filtered.length !== 1 ? 's' : ''} in Jabalpur`;
  }

  if (filtered.length === 0) {
    emptyState.style.display = 'block';
    restaurantGrid.style.display = 'none';
  } else {
    emptyState.style.display = 'none';
    restaurantGrid.style.display = 'grid';

    filtered.forEach((restaurant, index) => {
      const card = createRestaurantCard(restaurant, index);
      restaurantGrid.appendChild(card);
    });

    if (window.AOS) {
      window.AOS.refresh();
    }
  }
}

// Search input event
searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value;
  renderRestaurants();
});

searchBtn.addEventListener('click', () => {
  searchQuery = searchInput.value;
  renderRestaurants();
});

// Filter pills click event
filterBar.addEventListener('click', (e) => {
  if (e.target.classList.contains('filter-pill')) {
    document.querySelectorAll('.filter-pill').forEach(pill => {
      pill.classList.remove('active');
    });
    e.target.classList.add('active');
    activeFilter = e.target.dataset.filter;
    renderRestaurants();
  }
});

// Set hero background from a random restaurant
function setHeroBackground() {
  const openRestaurants = restaurants.filter(r => r.isOpen && r.heroImage);
  if (openRestaurants.length > 0) {
    const randomRestaurant = openRestaurants[Math.floor(Math.random() * openRestaurants.length)];
    heroBg.style.backgroundImage = `url('${randomRestaurant.heroImage}')`;
  }
}

// Listen for cart changes from other tabs/pages
window.addEventListener('storage', (e) => {
  if (e.key === 'eatLocalCart') {
    globalCart = JSON.parse(e.newValue) || {};
    updateNavbarCart();
    updateCartDropdown();
  }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  setHeroBackground();
  updateNavbarCart();
  updateCartDropdown();
  renderRestaurants();
});

// Make functions available globally
window.addToGlobalCart = function(itemId, name, price, restaurantId) {
  if (globalCart[itemId]) {
    globalCart[itemId][2] += 1;
  } else {
    globalCart[itemId] = [name, price, 1, restaurantId];
  }
  saveCart();
  updateNavbarCart();
  updateCartDropdown();
};

window.removeFromGlobalCart = function(itemId) {
  delete globalCart[itemId];
  saveCart();
  updateNavbarCart();
  updateCartDropdown();
};

window.getGlobalCart = function() {
  return globalCart;
};

window.clearGlobalCart = function() {
  globalCart = {};
  saveCart();
  updateNavbarCart();
  updateCartDropdown();
};