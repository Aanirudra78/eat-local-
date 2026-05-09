// Cart state
let cart = {};

// State
let currentRestaurant = null;
let selectedOrderType = 'dine-in';

// DOM Elements
const backBtn = document.getElementById('backBtn');
const restaurantCover = document.getElementById('restaurantCover');
const coverGradient = document.getElementById('coverGradient');
const coverImage = document.getElementById('coverImage');
const restaurantName = document.getElementById('restaurantName');
const restaurantTagline = document.getElementById('restaurantTagline');
const statusBadge = document.getElementById('statusBadge');
const ratingText = document.getElementById('ratingText');
const timingText = document.getElementById('timingText');
const areaText = document.getElementById('areaText');
const priceText = document.getElementById('priceText');
const deliveryTimeEl = document.getElementById('deliveryTime');
const menuTabs = document.getElementById('menuTabs');
const menuSection = document.getElementById('menuSection');
const stickyCart = document.getElementById('stickyCart');
const cartItemName = document.getElementById('cartItemName');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const placeOrderBtn = document.getElementById('placeOrderBtn');
const whatsappFloat = document.getElementById('whatsappFloat');
const orderModal = document.getElementById('orderModal');
const modalClose = document.getElementById('modalClose');
const custName = document.getElementById('custName');
const custPhone = document.getElementById('custPhone');
const custEmail = document.getElementById('custEmail');
const specialRequest = document.getElementById('specialRequest');
const orderTypeCards = document.querySelectorAll('.order-type-card');
const conditionalFields = document.getElementById('conditionalFields');
const orderDetail = document.getElementById('orderDetail');
const orderItems = document.getElementById('orderItems');
const summaryTotal = document.getElementById('summaryTotal');
const confirmBtn = document.getElementById('confirmBtn');
const toast = document.getElementById('toast');

// Get restaurant ID from URL
function getRestaurantId() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

// Find restaurant by ID
function findRestaurant(id) {
  return restaurants.find(r => r.id === id);
}

// Initialize restaurant page
function initRestaurant() {
  const restaurantId = getRestaurantId();
  currentRestaurant = findRestaurant(restaurantId);

  if (!currentRestaurant) {
    document.body.innerHTML = `
      <div style="text-align:center; padding:80px 20px;">
        <p style="font-size:48px">🍽️</p>
        <h2>Restaurant not found</h2>
        <a href="index.html">← Back to home</a>
      </div>`;
    return;
  }

  document.title = `${currentRestaurant.name} - EatLocal`;
  populateRestaurantInfo();
  renderMenuTabs();
  renderMenu();
  setupWhatsAppLink();
  renderCart();
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Populate restaurant info
function populateRestaurantInfo() {
  if (currentRestaurant.image) {
    coverImage.src = currentRestaurant.image;
    coverImage.style.display = 'block';
    coverGradient.style.display = 'none';
  }

  restaurantName.textContent = currentRestaurant.name;
  restaurantTagline.textContent = currentRestaurant.tagline;

  // Add rating in cover
  const ratingHtml = `
    <div class="restaurant-cover-rating">
      <span class="star">★</span>
      <span>${currentRestaurant.rating}</span>
      <span style="opacity: 0.7">(${currentRestaurant.reviews})</span>
    </div>
  `;
  document.querySelector('.restaurant-cover-meta').innerHTML = ratingHtml + 
    `<div class="restaurant-cover-cuisine">${currentRestaurant.cuisine.split('·')[0].trim()}</div>`;

  if (currentRestaurant.isOpen) {
    statusBadge.className = 'status-badge open';
    statusBadge.textContent = '● Open';
  } else {
    statusBadge.className = 'status-badge closed';
    statusBadge.textContent = '● Closed';
  }

  ratingText.innerHTML = `<strong>${currentRestaurant.rating}</strong> (${currentRestaurant.reviews} reviews)`;
  timingText.textContent = currentRestaurant.timing;
  const areaClean = currentRestaurant.area.replace(', Jabalpur', '').replace(',Jabalpur', '');
  areaText.innerHTML = `<span class="icon">📍</span>${areaClean}`;
  priceText.innerHTML = `<span class="icon">💰</span>₹${currentRestaurant.priceForTwo} for two`;
  deliveryTimeEl.textContent = currentRestaurant.deliveryTime;
}

// Render menu category tabs
function renderMenuTabs() {
  // Add "Popular" tab first
  const popularTab = document.createElement('button');
  popularTab.className = 'menu-tab';
  popularTab.innerHTML = '<span>🔥 Popular</span>';
  popularTab.addEventListener('click', () => {
    const section = document.getElementById('popular-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
  menuTabs.appendChild(popularTab);

  currentRestaurant.menu.forEach((category, index) => {
    const tab = document.createElement('button');
    tab.className = 'menu-tab' + (index === 0 ? ' active' : '');
    tab.innerHTML = `<span>${category.category}</span>`;
    tab.dataset.category = index;
    tab.addEventListener('click', () => {
      const section = document.getElementById(`category-${index}`);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
    menuTabs.appendChild(tab);
  });

  setupMenuTabsObserver();
}

// Observe menu sections to highlight active tab
function setupMenuTabsObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = entry.target.dataset.index;
        document.querySelectorAll('.menu-tab').forEach((tab, i) => {
          tab.classList.toggle('active', i === parseInt(index));
        });
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.menu-category').forEach(category => {
    observer.observe(category);
  });
}

// Find menu item
function findMenuItem(itemId) {
  for (const category of currentRestaurant.menu) {
    const item = category.items.find(i => i.id === itemId);
    if (item) return item;
  }
  return null;
}

// Render menu items
function renderMenu() {
  // Render popular items section
  const allItems = currentRestaurant.menu.flatMap(c => c.items);
  const popularItems = allItems.filter(item => item.badge === 'Bestseller' || item.badge === 'Must Try');
  
  if (popularItems.length > 0) {
    const popularSection = document.createElement('div');
    popularSection.className = 'menu-category';
    popularSection.id = 'popular-section';
    popularSection.dataset.category = 'popular';
    
    let itemsHtml = '';
    popularItems.slice(0, 4).forEach(item => {
      const inCart = cart[item.id] ? cart[item.id].qty : 0;
      const imageHtml = item.image ? `<img src="${item.image}" alt="${item.name}">` : '<div class="item-img-placeholder"></div>';
      
      let buttonHtml = '';
      if (inCart > 0) {
        buttonHtml = `
          <div class="quantity-control">
            <button class="qty-btn" onclick="updateQuantity('${item.id}', -1)">−</button>
            <span class="qty-count">${inCart}</span>
            <button class="qty-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
          </div>
        `;
      } else {
        buttonHtml = `<button class="add-btn" onclick="addToCart('${item.id}')"><span>Add</span><span>→</span></button>`;
      }
      
      itemsHtml += `
        <div class="menu-item">
          <div class="menu-item-info">
            <div class="menu-item-header">
              <span class="veg-indicator ${item.veg ? 'veg' : 'non-veg'}"></span>
              <span class="menu-item-name">${item.name}</span>
              ${item.badge ? `<span class="menu-item-badge">${item.badge}</span>` : ''}
            </div>
            <p class="menu-item-description">${item.description}</p>
            <div class="menu-item-footer">
              <span class="menu-item-price">${item.price}</span>
              ${buttonHtml}
            </div>
          </div>
          <div class="menu-item-image">${imageHtml}</div>
        </div>
      `;
    });
    
    popularSection.innerHTML = `
      <div class="category-header">
        <h3 class="category-heading">🔥 Popular This Week</h3>
        <span class="category-item-count">${popularItems.slice(0, 4).length} items</span>
      </div>
      <div class="category-divider"></div>
      <div class="popular-items-grid">${itemsHtml}</div>
    `;
    
    menuSection.appendChild(popularSection);
  }
  
  currentRestaurant.menu.forEach((category, categoryIndex) => {
    const section = document.createElement('div');
    section.className = 'menu-category';
    section.id = `category-${categoryIndex}`;
    section.dataset.category = categoryIndex;
    section.dataset.index = categoryIndex;

    section.innerHTML = `
      <div class="category-header">
        <h3 class="category-heading">${category.category}</h3>
        <span class="category-item-count">${category.items.length} items</span>
      </div>
      <div class="category-divider"></div>
    `;

    category.items.forEach(item => {
      const inCart = cart[item.id] ? cart[item.id].qty : 0;
      
      const itemEl = document.createElement('div');
      itemEl.className = 'menu-item';
      
      let imageHtml = '';
      if (item.image) {
        imageHtml = `<img src="${item.image}" alt="${item.name}">`;
      } else {
        imageHtml = '<div class="item-img-placeholder"></div>';
      }
      
      let buttonHtml = '';
      if (inCart > 0) {
        buttonHtml = `
          <div class="quantity-control">
            <button class="qty-btn" onclick="updateQuantity('${item.id}', -1)">−</button>
            <span class="qty-count">${inCart}</span>
            <button class="qty-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
          </div>
        `;
      } else {
        buttonHtml = `<button class="add-btn" onclick="addToCart('${item.id}')"><span>Add</span><span>→</span></button>`;
      }
      
      itemEl.innerHTML = `
        <div class="menu-item-info">
          <div class="menu-item-header">
            <span class="veg-indicator ${item.veg ? 'veg' : 'non-veg'}"></span>
            <span class="menu-item-name">${item.name}</span>
            ${item.badge ? `<span class="menu-item-badge">${item.badge}</span>` : ''}
          </div>
          <p class="menu-item-description">${item.description}</p>
          <div class="menu-item-footer">
            <span class="menu-item-price">${item.price}</span>
            ${buttonHtml}
          </div>
        </div>
        <div class="menu-item-image">${imageHtml}</div>
      `;

      section.appendChild(itemEl);
    });

    menuSection.appendChild(section);
  });
}

// Cart functions
window.addToCart = function(itemId) {
  const item = findMenuItem(itemId);
  if (!item) return;

  if (cart[itemId]) {
    cart[itemId].qty += 1;
  } else {
    cart[itemId] = { name: item.name, price: item.price, qty: 1 };
  }
  
  renderCart();
  renderMenu();
};

window.updateQuantity = function(itemId, delta) {
  if (!cart[itemId]) return;

  cart[itemId].qty += delta;
  if (cart[itemId].qty <= 0) {
    delete cart[itemId];
  }
  renderCart();
  renderMenu();
};

function renderCart() {
  const items = Object.values(cart);
  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.qty), 0);

  // Get first item name for display
  const firstItemName = items.length > 0 ? items[0].name : '';

  if (totalItems > 0) {
    stickyCart.classList.add('visible');
    cartItemName.textContent = firstItemName + (items.length > 1 ? ` +${items.length - 1} more` : '');
    cartCount.textContent = `${totalItems} item${totalItems !== 1 ? 's' : ''}`;
    cartTotal.textContent = `₹${totalPrice}`;
    whatsappFloat.classList.add('with-cart');
  } else {
    stickyCart.classList.remove('visible');
    whatsappFloat.classList.remove('with-cart');
  }
}

function setupWhatsAppLink() {
  whatsappFloat.href = `https://wa.me/${currentRestaurant.phone}`;
}

// Setup call button
const callBtn = document.getElementById('callBtn');
if (callBtn) {
  callBtn.style.cursor = 'pointer';
  callBtn.addEventListener('click', () => {
    window.location.href = `tel:${currentRestaurant.phone}`;
  });
}

// Setup favorite button
const favoriteBtn = document.getElementById('favoriteBtn');
if (favoriteBtn) {
  favoriteBtn.addEventListener('click', () => {
    favoriteBtn.classList.toggle('active');
  });
}

// Setup share button
const shareBtn = document.getElementById('shareBtn');
if (shareBtn) {
  shareBtn.addEventListener('click', async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentRestaurant.name,
          text: `Check out ${currentRestaurant.name} - ${currentRestaurant.tagline}`,
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  });
}

// Modal functions
placeOrderBtn.addEventListener('click', () => {
  openOrderModal();
});

modalClose.addEventListener('click', () => {
  closeOrderModal();
});

orderModal.addEventListener('click', (e) => {
  if (e.target === orderModal) {
    closeOrderModal();
  }
});

function openOrderModal() {
  orderModal.classList.add('visible');
  renderOrderSummary();
}

function closeOrderModal() {
  orderModal.classList.remove('visible');
  // Clear form
  custName.value = '';
  custPhone.value = '';
  custEmail.value = '';
  specialRequest.value = '';
  orderDetail.value = '';
  document.querySelectorAll('.form-input').forEach(el => {
    el.classList.remove('error');
  });
  document.querySelectorAll('.error-message').forEach(el => {
    el.classList.remove('visible');
  });
}

// Order type selection
orderTypeCards.forEach(card => {
  card.addEventListener('click', () => {
    orderTypeCards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    selectedOrderType = card.dataset.type;
    updateConditionalFields();
  });
});

function updateConditionalFields() {
  conditionalFields.classList.add('visible');
  switch (selectedOrderType) {
    case 'dine-in':
      orderDetail.placeholder = 'Table Number *';
      orderDetail.type = 'text';
      break;
    case 'takeaway':
      orderDetail.placeholder = 'Pickup Time *';
      orderDetail.type = 'time';
      break;
    case 'delivery':
      orderDetail.placeholder = 'Delivery Address *';
      orderDetail.type = 'text';
      break;
  }
}

// Render order summary
function renderOrderSummary() {
  const itemsHtml = Object.entries(cart).map(([id, item]) => {
    return `
      <div class="summary-item">
        <span>${item.name} × ${item.qty}</span>
        <span>₹${item.price * item.qty}</span>
      </div>
    `;
  }).join('');

  orderItems.innerHTML = itemsHtml;

  const totalPrice = Object.values(cart).reduce((sum, item) => sum + (item.price * item.qty), 0);
  summaryTotal.textContent = `₹${totalPrice}`;
}

// Validation
function validateForm() {
  let isValid = true;
  let firstError = null;

  // Name
  if (!custName.value.trim()) {
    document.getElementById('nameError').classList.add('visible');
    custName.classList.add('error');
    if (!firstError) firstError = custName;
    isValid = false;
  } else {
    document.getElementById('nameError').classList.remove('visible');
    custName.classList.remove('error');
  }

  // Phone
  if (!custPhone.value.trim() || custPhone.value.length < 10) {
    document.getElementById('phoneError').classList.add('visible');
    custPhone.classList.add('error');
    if (!firstError) firstError = custPhone;
    isValid = false;
  } else {
    document.getElementById('phoneError').classList.remove('visible');
    custPhone.classList.remove('error');
  }

  // Order detail
  if (!orderDetail.value.trim()) {
    document.getElementById('orderDetailError').classList.add('visible');
    orderDetail.classList.add('error');
    if (!firstError) firstError = orderDetail;
    isValid = false;
  } else {
    document.getElementById('orderDetailError').classList.remove('visible');
    orderDetail.classList.remove('error');
  }

  if (firstError) {
    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  return isValid;
}

// Build WhatsApp message
function buildWhatsAppMessage() {
  const totalPrice = Object.values(cart).reduce((sum, item) => sum + (item.price * item.qty), 0);

  const orderItemsText = Object.entries(cart).map(([id, item]) => {
    return `• ${item.name} × ${item.qty} – ₹${item.price * item.qty}`;
  }).join('\n');

  let orderTypeLabel = '';
  let orderDetailLabel = '';
  switch (selectedOrderType) {
    case 'dine-in': 
      orderTypeLabel = 'Dine In'; 
      orderDetailLabel = `🪑 *Table Number:* ${orderDetail.value}`;
      break;
    case 'takeaway': 
      orderTypeLabel = 'Takeaway'; 
      orderDetailLabel = `⏰ *Pickup Time:* ${orderDetail.value}`;
      break;
    case 'delivery': 
      orderTypeLabel = 'Delivery'; 
      orderDetailLabel = `📍 *Delivery Address:* ${orderDetail.value}`;
      break;
  }

  const message = `🍽️ *New Order – EatLocal*

*Restaurant:* ${currentRestaurant.name}
━━━━━━━━━━━━━━━━━━━

👤 *Customer Details*
Name: ${custName.value}
Phone: ${custPhone.value}
${custEmail.value ? `Email: ${custEmail.value}` : 'Email: Not provided'}

🏷️ *Order Type:* ${orderTypeLabel}
${orderDetailLabel}

🛒 *Order Items:*
${orderItemsText}

💰 *Subtotal:* ₹${totalPrice}
${specialRequest.value ? `\n📝 *Special Request:* ${specialRequest.value}` : ''}

─────────────────────
_Placed via EatLocal – Jabalpur_
_Direct ordering, no commission_ 🟢`;

  return encodeURIComponent(message);
}

// Confirm order
confirmBtn.addEventListener('click', () => {
  if (!validateForm()) return;

  const message = buildWhatsAppMessage();
  const whatsappUrl = `https://wa.me/${currentRestaurant.phone}?text=${message}`;

  window.open(whatsappUrl, '_blank');
  closeOrderModal();
  showToast();
});

function showToast() {
  toast.classList.add('visible');
  setTimeout(() => {
    toast.classList.remove('visible');
  }, 2500);
}

// Back button
backBtn.addEventListener('click', () => {
  window.history.back();
});

// Initialize on load
document.addEventListener('DOMContentLoaded', initRestaurant);