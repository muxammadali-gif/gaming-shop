// Telegram Mini App integratsiya
let tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
if (tg) {
  tg.ready();
  tg.expand();
  const user = tg.initDataUnsafe && tg.initDataUnsafe.user;
  if (user) {
    document.getElementById('userName').textContent = user.first_name || 'Foydalanuvchi';
    document.getElementById('userInfo').style.display = 'flex';
  }
}

// Mahsulotlar katalogi
const CATALOG = {
  pubg_uc: [
    { id: 'uc60', name: '60 UC', price: 12500, icon: '🎯' },
    { id: 'uc120', name: '120 UC', price: 25000, icon: '🎯' },
    { id: 'uc360', name: '360 UC', price: 61000, icon: '🎯' },
    { id: 'uc660', name: '660 UC', price: 119000, icon: '🎯' }
  ],
  telegram_stars: [
    { id: 'stars50', name: '50 Stars', price: 12500, icon: '⭐' },
    { id: 'stars100', name: '100 Stars', price: 24500, icon: '⭐' },
    { id: 'stars500', name: '500 Stars', price: 120000, icon: '⭐' },
    { id: 'stars1000', name: '1000 Stars', price: 235000, icon: '⭐' },
    { id: 'stars2500', name: '2500 Stars', price: 575000, icon: '⭐' }
  ],
  telegram_premium: [
    { id: 'prem3', name: 'Premium 3 oy', price: 89000, icon: '💎' },
    { id: 'prem6', name: 'Premium 6 oy', price: 165000, icon: '💎' },
    { id: 'prem12', name: 'Premium 12 oy', price: 295000, icon: '💎' }
  ]
};

let currentCategory = 'pubg_uc';
let selectedProduct = null;

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const items = CATALOG[currentCategory] || [];
  grid.innerHTML = items.map(p => `
    <div class="product-card" onclick="openProduct('${p.id}')">
      <div class="product-icon">${p.icon}</div>
      <div class="product-name">${p.name}</div>
      <div class="product-price">${formatPrice(p.price)} <small>so'm</small></div>
    </div>
  `).join('');
}

function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

document.querySelectorAll('.cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.dataset.cat;
    renderProducts();
  });
});

function openProduct(id) {
  const allItems = [...CATALOG.pubg_uc, ...CATALOG.telegram_stars, ...CATALOG.telegram_premium];
  selectedProduct = allItems.find(p => p.id === id);
  if (!selectedProduct) return;
  document.getElementById('modalTitle').textContent = 'Buyurtma berish';
  document.getElementById('modalBody').innerHTML = `
    <div class="big-icon">${selectedProduct.icon}</div>
    <div class="big-name">${selectedProduct.name}</div>
    <div class="big-price">${formatPrice(selectedProduct.price)} so'm</div>
  `;
  document.getElementById('playerId').value = '';
  document.getElementById('buyModal').classList.add('active');
}

function closeModal() {
  document.getElementById('buyModal').classList.remove('active');
  selectedProduct = null;
}

document.getElementById('submitOrder').addEventListener('click', async () => {
  const playerId = document.getElementById('playerId').value.trim();
  const payment = document.querySelector('input[name="payment"]:checked').value;
  if (!playerId) {
    showToast("❌ Player ID yoki username kiriting", 'error');
    return;
  }
  const btn = document.getElementById('submitOrder');
  btn.disabled = true;
  btn.textContent = 'Yuborilmoqda...';
  const order = {
    product: selectedProduct,
    playerId,
    payment,
    user: tg && tg.initDataUnsafe && tg.initDataUnsafe.user ? tg.initDataUnsafe.user : null,
    timestamp: Date.now()
  };
  try {
    const res = await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    });
    const data = await res.json();
    if (data.ok) {
      showToast('✅ Buyurtma qabul qilindi! ID: ' + data.orderId, 'success');
      closeModal();
      if (tg) tg.sendData(JSON.stringify(order));
    } else {
      showToast('❌ Xatolik: ' + (data.error || "noma'lum"), 'error');
    }
  } catch (e) {
    saveOrderLocally(order);
    showToast('✅ Buyurtma qabul qilindi! Admin tez orada aloqaga chiqadi', 'success');
    closeModal();
  }
  btn.disabled = false;
  btn.textContent = 'Buyurtma berish';
});

function saveOrderLocally(order) {
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  order.id = 'LOCAL-' + Date.now();
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));
}

function showToast(text, type) {
  const toast = document.getElementById('toast');
  toast.textContent = text;
  toast.className = 'toast show ' + (type || '');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

function openSupport() { document.getElementById('supportModal').classList.add('active'); }
function closeSupport() { document.getElementById('supportModal').classList.remove('active'); }
function openInfo() { document.getElementById('infoModal').classList.add('active'); }
function closeInfo() { document.getElementById('infoModal').classList.remove('active'); }

document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
});

renderProducts();