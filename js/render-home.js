// Блоки главной: плитки категорий и лента хитов.
(function () {
  const RM = (window.RM = window.RM || {});

  RM.renderTiles = () => {
    RM.$('#tiles').innerHTML = RM.categories
      .map((c) => {
        const n = RM.products.filter((p) => p.cat === c.id).length;
        return `<button class="tile" type="button" data-tile="${RM.esc(c.id)}" data-cat="${RM.esc(c.id)}">
          <span class="tile__icon" aria-hidden="true">${c.icon}</span>
          <span class="tile__name">${RM.esc(RM.catLabel(c))}</span>
          <span class="tile__count">${RM.esc(RM.t('tile_count', { n }))}</span>
        </button>`;
      })
      .join('');
  };

  RM.renderHits = () => {
    const hits = RM.products.filter((p) => p.badge === 'hit');
    RM.$('#hits-strip').innerHTML = hits.map(RM.cardHtml).join('');
    RM.updateCardButtons();
  };

  RM.initTiles = () => {
    RM.$('#tiles').addEventListener('click', (event) => {
      const tile = event.target.closest('[data-tile]');
      if (!tile) return;

      RM.resetFilters();
      RM.state.category = tile.dataset.tile;
      RM.$('#search').value = '';
      RM.$('#sort').value = 'default';
      RM.renderCategories();
      RM.renderProducts();

      const catalog = RM.$('#catalog');
      if (catalog.scrollIntoView) catalog.scrollIntoView({ behavior: 'smooth' });
    });
  };
})();
