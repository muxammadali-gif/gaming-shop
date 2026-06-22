const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'admin123';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const DB_FILE = path.join(__dirname, 'data.json');

function readDB() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const initial = { orders: [] };
      fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2));
      return initial;
    }
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } catch (e) {
    return { orders: [] };
  }
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// PUBLIC API
app.post('/api/order', (req, res) => {
  const { product, playerId, payment, user } = req.body;
  if (!product || !playerId || !payment) {
    return res.json({ ok: false, error: "Barcha maydonlarni to'ldiring" });
  }
  const db = readDB();
  const orderId = 'ORD-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
  const order = { id: orderId, product, playerId, payment, user: user || null, status: 'new', createdAt: new Date().toISOString() };
  db.orders.push(order);
  writeDB(db);
  console.log('Yangi buyurtma:', orderId, '|', product.name, '|', playerId);
  res.json({ ok: true, orderId });
});

app.get('/api/order/:id', (req, res) => {
  const db = readDB();
  const order = db.orders.find(o => o.id === req.params.id);
  if (!order) return res.json({ ok: false, error: 'Buyurtma topilmadi' });
  res.json({ ok: true, order });
});

// ADMIN API
app.post('/api/admin/login', (req, res) => {
  const { token } = req.body;
  if (token === ADMIN_TOKEN) res.json({ ok: true });
  else res.json({ ok: false, error: "Noto'g'ri parol" });
});

app.get('/api/admin/orders', (req, res) => {
  const db = readDB();
  res.json({ ok: true, orders: db.orders.reverse() });
});

app.post('/api/admin/order/:id/status', (req, res) => {
  const { status } = req.body;
  const db = readDB();
  const order = db.orders.find(o => o.id === req.params.id);
  if (!order) return res.json({ ok: false, error: 'Buyurtma topilmadi' });
  order.status = status;
  order.updatedAt = new Date().toISOString();
  writeDB(db);
  res.json({ ok: true, order });
});

app.get('/api/admin/stats', (req, res) => {
  const db = readDB();
  const stats = {
    total: db.orders.length,
    new: db.orders.filter(o => o.status === 'new').length,
    paid: db.orders.filter(o => o.status === 'paid').length,
    done: db.orders.filter(o => o.status === 'done').length,
    revenue: db.orders.filter(o => o.status === 'done').reduce((sum, o) => sum + (o.product.price || 0), 0)
  };
  res.json({ ok: true, stats });
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.use((req, res) => {
  res.status(404).json({ ok: false, error: 'Topilmadi' });
});

app.listen(PORT, () => {
  console.log('GameStore serveri: http://localhost:' + PORT);
  console.log('Admin panel: http://localhost:' + PORT + '/admin');
  console.log('Admin parol: ' + ADMIN_TOKEN);
});