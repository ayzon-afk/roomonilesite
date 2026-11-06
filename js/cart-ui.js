// Выдвижная корзина: открытие/закрытие, список позиций, переключение экранов
// (cart → checkout → done).
(function () {
  const RM = (window.RM = window.RM || {});
  const TITLES = { cart: 'cart_title', checkout: 'checkout_title', done: 'done_title' };

  let view = 'cart';
  let lastFocus = null;

  const drawer = () => RM.$('#cart-drawer');
  const overlay = () => RM.$('#overlay');

  function lineHtml({ product: p, qty }) {
    const thumb = p.img
      ? `<img src="${RM.esc(p.img)}" alt="">`
      : `<span aria-hidden="true">${p.emoji || '🛍️'}</span>`;
    return `<li class="line" data-id="${p.id}">
      <div class="line__thumb" data-cat="${RM.esc(p.cat)}">${thumb}</div>
      <p class="line__name">${RM.esc(p.name)}</p>
      <p class="line__price">${RM.formatPrice(p.price * qty)}</p>
      <button class="line__remove" type="button" data-act="remove" aria-label="${RM.esc(RM.t('remove'))}">✕</button>
      <div class="qty">
        <button type="button" data-act="dec" aria-label="${RM.esc(RM.t('qty_dec'))}">−</button>
        <span aria-live="polite">${qty}</span>
        <button type="button" data-act="inc" aria-label="${RM.esc(RM.t('qty_inc'))}">+</button>
      </div>
    </li>`;
  }

  function applyView() {
    RM.$$('[data-view]').forEach((el) => { el.hidden = el.dataset.view !== view; });

    const empty = RM.cart.count() === 0;
    RM.$$('[data-foot]').forEach((el) => {
      let show = el.dataset.foot === view;
      if (view === 'cart' && empty) show = false; // пустая корзина — кнопки не нужны
      el.hidden = !show;
    });
    RM.$('#total-row').hidden = view === 'done' || (view === 'cart' && empty);
    RM.$('#drawer-title').textContent = RM.t(TITLES[view]);
  }

  RM.cartUI = {
    init() {
      RM.$('#cart-open').addEventListener('click', () => this.open('cart'));
      RM.$('#cart-close').addEventListener('click', () => this.close());
      overlay().addEventListener('click', () => this.close());
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen()) this.close();
      });

      RM.$('#cart-list').addEventListener('click', (e) => {
        const btn = e.target.closest('[data-act]');
        if (!btn) return;
        const id = Number(btn.closest('.line').dataset.id);
        const act = btn.dataset.act;
        const qty = RM.cart.qtyOf(id);

        if (act === 'inc') RM.cart.setQty(id, qty + 1);
        if (act === 'dec') RM.cart.setQty(id, qty - 1);
        if (act === 'remove') RM.cart.remove(id);

        // вернуть фокус на ту же кнопку после перерисовки
        const again = RM.$(`.line[data-id="${id}"] [data-act="${act}"]`);
        if (again) again.focus();
      });

      RM.$('#go-checkout').addEventListener('click', () => {
        this.showView('checkout');
        RM.$('#f-name').focus();
      });
      RM.$('#back-to-cart').addEventListener('click', () => this.showView('cart'));
      RM.$('#cart-clear').addEventListener('click', () => RM.cart.clear());
      RM.$('#cart-empty-cta').addEventListener('click', () => {
        this.close();
        location.hash = '#catalog';
      });
      RM.$('#finish-order').addEventListener('click', () => {
        RM.cart.clear();
        this.close();
        this.showView('cart');
      });

      this.render();
    },

    isOpen() {
      return drawer().classList.contains('is-open');
    },

    open(next = 'cart') {
      lastFocus = document.activeElement;
      this.showView(next);
      drawer().classList.add('is-open');
      overlay().classList.add('is-open');
      drawer().setAttribute('aria-hidden', 'false');
      document.body.classList.add('is-locked');
      RM.$('#cart-close').focus();
    },

    close() {
      drawer().classList.remove('is-open');
      overlay().classList.remove('is-open');
      drawer().setAttribute('aria-hidden', 'true');
      document.body.classList.remove('is-locked');
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    },

    showView(next) {
      view = next;
      applyView();
    },

    render() {
      const lines = RM.cart.lines();
      RM.$('#cart-list').innerHTML = lines.map(lineHtml).join('');
      RM.$('#cart-empty').hidden = lines.length > 0;
      RM.$('#cart-total').textContent = RM.formatPrice(RM.cart.total());

      const count = RM.cart.count();
      const badge = RM.$('#cart-count');
      badge.textContent = count;
      badge.hidden = count === 0;

      // если в оформлении корзина вдруг опустела — вернуться в корзину
      if (view === 'checkout' && count === 0) view = 'cart';
      applyView();
    },
  };
})();
