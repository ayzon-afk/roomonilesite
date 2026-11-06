// Кнопки категорий над каталогом.
(function () {
  const RM = (window.RM = window.RM || {});

  RM.renderCategories = () => {
    const box = RM.$('#chips');
    const all = { id: 'all', icon: '✨', uz: RM.t('cat_all'), ru: RM.t('cat_all') };

    box.innerHTML = [all, ...RM.categories]
      .map((c) => {
        const active = RM.state.category === c.id;
        return `<button class="chip" type="button" data-chip="${RM.esc(c.id)}" aria-pressed="${active}">
          <span aria-hidden="true">${c.icon}</span>${RM.esc(c.id === 'all' ? c.uz : RM.catLabel(c))}
        </button>`;
      })
      .join('');
  };

  RM.initCategories = () => {
    RM.$('#chips').addEventListener('click', (event) => {
      const btn = event.target.closest('[data-chip]');
      if (!btn) return;
      RM.state.category = btn.dataset.chip;
      RM.renderCategories();
      RM.renderProducts();
    });
  };
})();
