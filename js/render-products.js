// Сетка карточек товаров.
(function () {
  const RM = (window.RM = window.RM || {});

  function mediaHtml(p) {
    const inner = p.img
      ? `<img src="${RM.esc(p.img)}" alt="${RM.esc(p.name)}" loading="lazy">`
      : `<span class="card__emoji" aria-hidden="true">${p.emoji || '🛍️'}</span>`;
    const badge = p.badge
      ? `<span class="badge ${p.badge === 'hit' ? 'badge--hit' : ''}">${RM.esc(RM.t('badge_' + p.badge))}</span>`
      : '';
    return `<div class="card__media">${inner}${badge}</div>`;
  }

  function cardHtml(p) {
    const cat = RM.categories.find((c) => c.id === p.cat);
    return `<article class="card" data-cat="${RM.esc(p.cat)}">
      ${mediaHtml(p)}
      <div class="card__body">
        <p class="card__cat">${cat ? RM.esc(RM.catLabel(cat)) : ''}</p>
        <h3 class="card__title">${RM.esc(p.name)}</h3>
        <div class="card__foot">
          <span class="card__price">${RM.formatPrice(p.price)}</span>
          <button class="btn btn--primary btn--sm" type="button" data-add="${p.id}"></button>
        </div>
      </div>
    </article>`;
  }

  RM.cardHtml = cardHtml; // используется и в ленте хитов

  // Подпись на кнопке: «Savatga» или «Savatda · 2»
  RM.updateCardButtons = () => {
    RM.$$('[data-add]').forEach((btn) => {
      const qty = RM.cart.qtyOf(Number(btn.dataset.add));
      btn.textContent = qty ? `${RM.t('in_cart')} · ${qty}` : RM.t('add_to_cart');
    });
  };

  RM.renderProducts = () => {
    const list = RM.getVisibleProducts();
    RM.$('#grid').innerHTML = list.map(cardHtml).join('');
    RM.$('#empty').hidden = list.length > 0;
    RM.$('#results-count').textContent = list.length ? RM.t('results', { n: list.length }) : '';
    RM.updateCardButtons();
  };
})();
