// State
let activeFilter = 'all';
let searchQuery = '';

// DOM Elements — safely queried (some only exist on certain pages)
const navbar = document.getElementById('navbar');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const filterBar = document.getElementById('filterBar');
const restaurantGrid = document.getElementById('restaurantGrid');
const resultCount = document.getElementById('resultCount');
const emptyState = document.getElementById('emptyState');
const heroBg = document.getElementById('heroBg');

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
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

// Filter and render restaurants
function filterAndRender() {
  let filtered = restaurants;

  // Apply search
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.cuisine.toLowerCase().includes(q) ||
      r.area.toLowerCase().includes(q) ||
      (r.tagline && r.tagline.toLowerCase().includes(q))
    );
  }

  // Apply filter pill
  if (activeFilter === 'open') {
    filtered = filtered.filter(r => r.isOpen);
  } else if (activeFilter !== 'all') {
    filtered = filtered.filter(r =>
      r.filterTags && r.filterTags.includes(activeFilter)
    );
  }

  // Render
  restaurantGrid.innerHTML = '';

  // Update result count
  resultCount.textContent = `Showing ${filtered.length} restaurant${filtered.length !== 1 ? 's' : ''} in Jabalpur`;

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

// Search input listener
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    filterAndRender();
  });
}

if (searchBtn) {
  searchBtn.addEventListener('click', () => {
    searchQuery = searchInput.value;
    filterAndRender();
  });
}

// Filter pill listeners
if (filterBar) {
  filterBar.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-pill')) {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      e.target.classList.add('active');
      activeFilter = e.target.dataset.filter;
      filterAndRender();
    }
  });
}

// Set hero background from a random restaurant
function setHeroBackground() {
  if (!heroBg) return;
  const openRestaurants = restaurants.filter(r => r.isOpen && r.heroImage);
  if (openRestaurants.length > 0) {
    const randomRestaurant = openRestaurants[Math.floor(Math.random() * openRestaurants.length)];
    heroBg.style.backgroundImage = `url('${randomRestaurant.heroImage}')`;
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  setHeroBackground();
  filterAndRender();
});