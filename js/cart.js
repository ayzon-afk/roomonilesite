// Данные корзины. Хранится в localStorage, поэтому не пропадает после обновления.
(function () {
  const RM = (window.RM = window.RM || {});
  const KEY = 'rm_cart';
  const MAX_QTY = 99;

  // Убираем из сохранённой корзины товары, которых больше нет в каталоге.
  let items = RM.storage.get(KEY, [])
    .filter((i) => i && RM.getProduct(i.id) && Number.isInteger(i.qty) && i.qty > 0)
    .map((i) => ({ id: i.id, qty: Math.min(i.qty, MAX_QTY) }));

  function save() {
    RM.storage.set(KEY, items);
    RM.emit('cart:change');
  }

  RM.cart = {
    qtyOf(id) {
      const line = items.find((i) => i.id === id);
      return line ? line.qty : 0;
    },

    add(id) {
      if (!RM.getProduct(id)) return;
      const line = items.find((i) => i.id === id);
      if (line) line.qty = Math.min(line.qty + 1, MAX_QTY);
      else items.push({ id, qty: 1 });
      save();
    },

    setQty(id, qty) {
      if (qty <= 0) return this.remove(id);
      const line = items.find((i) => i.id === id);
      if (!line) return;
      line.qty = Math.min(qty, MAX_QTY);
      save();
    },

    remove(id) {
      items = items.filter((i) => i.id !== id);
      save();
    },

    clear() {
      items = [];
      save();
    },

    // Строки корзины вместе с данными товара
    lines() {
      return items.map((i) => ({ product: RM.getProduct(i.id), qty: i.qty }));
    },

    count() {
      return items.reduce((sum, i) => sum + i.qty, 0);
    },

    total() {
      return this.lines().reduce((sum, l) => sum + l.product.price * l.qty, 0);
    },
  };
})();
