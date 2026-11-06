// Филиалы, контакты, телефон в шапке, футер.
(function () {
  const RM = (window.RM = window.RM || {});

  function mapUrl(branch) {
    const query = `${RM.config.storeName} ${branch.name} ${RM.config.city}`;
    return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(query);
  }

  function branchHtml(b) {
    return `<article class="branch">
      <div class="branch__top">
        <h3 class="branch__name">📍 ${RM.esc(b.name)}</h3>
        ${b.isNew ? `<span class="branch__new">${RM.esc(RM.t('branch_new'))}</span>` : ''}
      </div>
      <p class="branch__hours">🕘 ${RM.esc(RM.config.hours)}</p>
      <a class="btn btn--ghost btn--sm" href="${mapUrl(b)}" target="_blank" rel="noopener">${RM.esc(RM.t('branch_map'))}</a>
    </article>`;
  }

  function contactItems() {
    const c = RM.config;
    const items = c.phones.map((p) => `<a href="tel:${RM.esc(p.tel)}">📞 ${RM.esc(p.label)}</a>`);
    if (c.telegramUsername) {
      items.push(`<a href="https://t.me/${RM.esc(c.telegramUsername)}" target="_blank" rel="noopener">✈️ Telegram</a>`);
    }
    items.push(`<a href="https://instagram.com/${RM.esc(c.instagram)}" target="_blank" rel="noopener">📷 Instagram</a>`);
    items.push(`<a href="${RM.esc(c.taplink)}" target="_blank" rel="noopener">🔗 Taplink</a>`);
    return items.map((a) => `<li>${a}</li>`).join('');
  }

  RM.renderInfo = () => {
    const c = RM.config;
    const first = c.phones[0];

    RM.$('#branches-grid').innerHTML = c.branches.map(branchHtml).join('');
    RM.$('#contacts-links').innerHTML = contactItems();
    RM.$('#footer-branches').innerHTML = c.branches.map((b) => `<li>📍 ${RM.esc(b.name)}</li>`).join('');
    RM.$('#year').textContent = new Date().getFullYear();

    // телефон в верхней полосе, шапке и круглой кнопке
    RM.$$('[data-phone-link]').forEach((a) => { a.href = 'tel:' + first.tel; });
    RM.$$('[data-phone-text]').forEach((s) => { s.textContent = first.label; });

    // баннер нового филиала → карта этого филиала
    const fresh = c.branches.find((b) => b.isNew);
    if (fresh) RM.$('#promo-map').href = mapUrl(fresh);
  };
})();
