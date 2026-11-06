// Точка входа: собирает все модули вместе.
document.addEventListener('DOMContentLoaded', () => {
  const RM = window.RM;

  RM.initI18n();
  RM.initCategories();
  RM.renderCategories();
  RM.initFilters();
  RM.renderProducts();
  RM.renderTiles();
  RM.renderHits();
  RM.initTiles();
  RM.cartUI.init();
  RM.checkoutForm.init();
  RM.initOrder();
  RM.renderInfo();
  RM.initMenu();

  // «В корзину» на любой карточке (каталог и хиты)
  document.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-add]');
    if (!btn) return;
    RM.cart.add(Number(btn.dataset.add));
    RM.toast(RM.t('toast_added'), 1200);
  });

  // Любое изменение корзины → обновить корзину и кнопки на карточках
  RM.on('cart:change', () => {
    RM.cartUI.render();
    RM.updateCardButtons();
  });

  // Смена языка → перерисовать всё, что построено из JS
  RM.on('lang:change', () => {
    RM.renderCategories();
    RM.renderProducts();
    RM.renderTiles();
    RM.renderHits();
    RM.cartUI.render();
    RM.checkoutForm.refresh();
    RM.renderInfo();
  });
});
