// Товары. ДЕМО-данные: названия и цены (в сумах) замените на реальные.
// Поля:
//   id     — уникальный номер (не повторять)
//   cat    — id категории из categories.js
//   name   — название
//   price  — цена в сумах (число)
//   emoji  — иконка, пока нет фото
//   img    — (необязательно) путь к фото, например 'images/p1.jpg'
//   badge  — (необязательно) 'new' или 'hit'
(function () {
  const RM = (window.RM = window.RM || {});

  RM.products = [
    // Телефоны
    { id: 1,  cat: 'phones', name: 'Samsung Galaxy A15 4/128GB',   price: 1890000, emoji: '📱', badge: 'hit' },
    { id: 2,  cat: 'phones', name: 'Xiaomi Redmi 13C 6/128GB',     price: 1650000, emoji: '📱' },
    { id: 3,  cat: 'phones', name: 'iPhone 13 128GB (ishlatilgan)',  price: 6200000, emoji: '📱', badge: 'new' },
    { id: 4,  cat: 'phones', name: 'Realme C55 8/256GB',           price: 2350000, emoji: '📱' },

    // Чехлы
    { id: 5,  cat: 'cases', name: 'Silikon chexol iPhone 15',        price: 55000,  emoji: '🛡️', badge: 'hit' },
    { id: 6,  cat: 'cases', name: 'MagSafe chexol iPhone 15 Pro',    price: 95000,  emoji: '🛡️' },
    { id: 7,  cat: 'cases', name: 'Shaffof chexol Samsung A15',      price: 35000,  emoji: '🛡️' },
    { id: 8,  cat: 'cases', name: 'Karta ushlagichli chexol',        price: 65000,  emoji: '🛡️', badge: 'new' },

    // Power bank
    { id: 9,  cat: 'powerbank', name: 'Power Bank 10 000 mAh',          price: 180000, emoji: '🔋' },
    { id: 10, cat: 'powerbank', name: 'Power Bank 20 000 mAh 22.5W',    price: 320000, emoji: '🔋', badge: 'hit' },
    { id: 11, cat: 'powerbank', name: 'Mini Power Bank 5 000 mAh',      price: 120000, emoji: '🔋' },

    // Колонки
    { id: 12, cat: 'speakers', name: 'Bluetooth kolonka mini',          price: 110000, emoji: '🔊' },
    { id: 13, cat: 'speakers', name: 'Bluetooth kolonka RGB 20W',       price: 290000, emoji: '🔊', badge: 'new' },
    { id: 14, cat: 'speakers', name: 'Karaoke kolonka + mikrofon',      price: 450000, emoji: '🎤' },

    // Наушники
    { id: 15, cat: 'headphones', name: 'Simsiz naushnik TWS',           price: 150000, emoji: '🎧', badge: 'hit' },
    { id: 16, cat: 'headphones', name: 'Ustki naushnik (over-ear) BT',  price: 260000, emoji: '🎧' },
    { id: 17, cat: 'headphones', name: 'Simli naushnik Type-C',         price: 45000,  emoji: '🎧' },

    // Часы
    { id: 18, cat: 'watches', name: 'Smart soat Sport',                 price: 280000, emoji: '⌚', badge: 'new' },
    { id: 19, cat: 'watches', name: 'Bolalar uchun smart soat',         price: 220000, emoji: '⌚' },

    // Подарки
    { id: 20, cat: 'gifts', name: 'Yumshoq ayiqcha 40 sm',              price: 120000, emoji: '🧸', badge: 'hit' },
    { id: 21, cat: 'gifts', name: "Sovg'a qutisi «Surprise»",           price: 190000, emoji: '🎁' },
    { id: 22, cat: 'gifts', name: 'LED tungi chiroq',                   price: 85000,  emoji: '💡' },

    // Украшения
    { id: 23, cat: 'jewelry', name: "Bilaguzuk «Gold Wave»",            price: 75000,  emoji: '📿', badge: 'new' },
    { id: 24, cat: 'jewelry', name: "Zanjir va marjon to'plami",        price: 98000,  emoji: '💍' },
    { id: 25, cat: 'jewelry', name: "Quloq sirg'alari (juft)",          price: 45000,  emoji: '✨' },

    // Аксессуары
    { id: 26, cat: 'accessories', name: 'Avtomobil telefon ushlagichi', price: 70000,  emoji: '🚗' },
    { id: 27, cat: 'accessories', name: 'Zaryadka adapter 25W',         price: 95000,  emoji: '🔌', badge: 'hit' },
    { id: 28, cat: 'accessories', name: 'Type-C kabel 1 m',             price: 30000,  emoji: '🔌' },
    { id: 29, cat: 'accessories', name: 'Ekran himoya oynasi',          price: 25000,  emoji: '🪟' },
    { id: 30, cat: 'accessories', name: 'Ring light selfi halqasi',     price: 130000, emoji: '💫', badge: 'new' },
  ];
})();
