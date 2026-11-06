// Настройки магазина. Меняйте здесь — остальной код трогать не нужно.
(function () {
  const RM = (window.RM = window.RM || {});

  RM.config = {
    storeName: 'RooMobile',

    // Telegram магазина БЕЗ @, например 'roomobile_uz'.
    // Пока пусто — заказ уходит в Instagram (директ) + текст копируется в буфер.
    telegramUsername: '',

    instagram: 'room_mobilee',
    taplink: 'https://taplink.cc/roomobile.uzb',
    hours: '09:00 – 23:00',
    city: 'Toshkent',

    phones: [
      { label: '(88) 788-61-61', tel: '+998887886161' },
      { label: '(93) 593-61-61', tel: '+998935936161' },
    ],

    branches: [
      { id: 'ulugbek',  name: "Mirzo Ulug'bek, Parkentskiy", isNew: false },
      { id: 'mirobod',  name: "Mirobod, Qo'yliq Massiv 5",   isNew: false },
      { id: 'bektemir', name: 'Bektemir, Vodnik',            isNew: false },
      { id: 'darvoza',  name: 'Samarqand Darvoza',           isNew: true  },
    ],
  };
})();
