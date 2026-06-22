# 🎮 GameStore — O'yin valyutalari do'koni

Professional Telegram Mini App va web sayt — PUBG UC, Telegram Stars va Telegram Premium sotish uchun.

## ✨ Xususiyatlari

- 🎯 **PUBG UC** — 60, 120, 360, 660 UC
- ⭐ **Telegram Stars** — 50, 100, 500, 1000, 2500 Stars
- 💎 **Telegram Premium** — 3, 6, 12 oylik
- 🛍 **Buyurtma tizimi** — avtomatik qabul qilish
- 💳 **To'lov usullari** — Telegram Stars, karta, naqd
- 👤 **Admin panel** — buyurtmalarni boshqarish
- 📊 **Statistika** — daromad va buyurtmalar
- 📱 **Telegram Mini App** — to'liq integratsiyalashgan
- 🌐 **Web sayt** — mustaqil ishlaydi
- 🎨 **Zamonaviy dizayn** — mobile-friendly

## 🚀 O'rnatish

### 1. Repositoriyani klonlash
```bash
git clone https://github.com/muxammadali-gif/gaming-shop.git
cd gaming-shop
```

### 2. Kutubxonalarni o'rnatish
```bash
npm install
```

### 3. Serverni ishga tushirish
```bash
npm start
```

Brauzerda oching: **http://localhost:3000**

## 📱 Render.com'ga deploy qilish (BEPUL)

1. **render.com** da ro'yxatdan o'ting
2. **"New +"** → **"Web Service"** ni bosing
3. **"Connect GitHub"** — `gaming-shop` repository'ni ulang
4. Sozlamalar:
   - **Name**: gaming-shop
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free
5. **"Create Web Service"** bosing
6. 2-3 daqiqa kuting — sayt tayyor!

### Admin panel
- URL: `https://gaming-shop.onrender.com/admin`
- Parol: `admin123` (Render'da Environment Variables orqali o'zgartiring)

## 📱 Telegram Mini App qilish

1. @BotFather ga yozing
2. `/newapp` — yangi Mini App yarating
3. Web sayt URL'ingizni kiriting
4. Tayyor!

## 💰 Narxlar

| Mahsulot | Narx |
|----------|------|
| 60 UC | 12 500 so'm |
| 120 UC | 25 000 so'm |
| 360 UC | 61 000 so'm |
| 660 UC | 119 000 so'm |
| 50 Stars | 12 500 so'm |
| 100 Stars | 24 500 so'm |
| 500 Stars | 120 000 so'm |
| 1000 Stars | 235 000 so'm |
| 2500 Stars | 575 000 so'm |
| Premium 3 oy | 89 000 so'm |
| Premium 6 oy | 165 000 so'm |
| Premium 12 oy | 295 000 so'm |

## 🔧 Sozlash

### Admin parolini o'zgartirish
Render'da **Environment Variables**:
- `ADMIN_TOKEN` = yangi parol

### Support username'ni o'zgartirish
`public/index.html` va `public/app.js` fayllarida `your_support` ni o'zgartiring.

## 📄 Litsenziya

MIT
