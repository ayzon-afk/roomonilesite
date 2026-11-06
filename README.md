# RooMobile — сайт-каталог с заказом

Статический сайт на чистых HTML, CSS и JavaScript. Без сборки и без сервера.
Покупатель выбирает товары, кладёт в корзину и отправляет заказ магазину
через Telegram (или Instagram, пока Telegram не указан).

## Запуск

Откройте `index.html` в браузере. Или локально через сервер:

```bash
python -m http.server 8000
```

## Выложить на GitHub Pages

```bash
git init
git add .
git commit -m "RooMobile site"
git branch -M main
git remote add origin https://github.com/<ваш-логин>/roomobile.git
git push -u origin main
```

Затем на GitHub: **Settings → Pages → Build and deployment → Deploy from a branch →
`main` / `/ (root)` → Save**. Через 1–2 минуты сайт откроется по адресу
`https://<ваш-логин>.github.io/roomobile/`.

## Что настроить перед запуском

1. **`js/config.js`** — впишите `telegramUsername` магазина (без `@`).
   Пока поле пустое, заказ уходит в Instagram `room_mobilee`.
2. **`data/products.js`** — замените демо-товары и цены на реальные.
3. Фото товаров: положите файлы в папку `images/` и добавьте товару `img: 'images/phone1.jpg'`.
   Пока `img` нет, показывается эмодзи.
4. Логотип: сейчас в шапке простая иконка-сумка. Чтобы поставить настоящий логотип,
   замените `<svg class="logo__icon">` в `index.html` на `<img src="images/logo.png" ...>`.

## Структура

```
index.html
css/    base, header, hero, catalog, cards, cart, checkout, info, toast
data/   categories.js, products.js          ← товары и категории
js/
  config.js          настройки магазина
  utils.js           помощники, события, localStorage
  i18n.js + i18n/    переводы UZ / RU
  state.js           состояние фильтров, цена
  filters.js         поиск, сортировка
  render-*.js        отрисовка категорий, товаров, филиалов
  cart.js            данные корзины (localStorage)
  cart-ui.js         выдвижная корзина
  checkout-form.js   форма и проверка полей
  order.js           сборка и отправка заказа
  main.js            запуск
```

## Как работает заказ

Сервера нет, поэтому сайт собирает текст заказа и открывает чат магазина
(`t.me/<username>?text=...`). Покупателю остаётся нажать «Отправить».
Корзина хранится в браузере и не пропадает после обновления страницы.
