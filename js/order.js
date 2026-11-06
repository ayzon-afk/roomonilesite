// Отправка заказа. Сервера нет: открываем чат магазина с готовым текстом.
// Telegram (если задан в config.js) → иначе Instagram + копирование текста.
(function () {
  const RM = (window.RM = window.RM || {});

  function buildMessage(data) {
    const lines = RM.cart.lines().map(({ product: p, qty }, i) =>
      `${i + 1}. ${p.name} × ${qty} = ${RM.formatPrice(p.price * qty)}`);

    const where = data.method === 'delivery'
      ? `${RM.t('msg_delivery')}: ${data.address}`
      : `${RM.t('msg_pickup')}: ${data.branch}`;

    const parts = [
      '🛒 ' + RM.t('msg_title'),
      '',
      ...lines,
      '',
      `${RM.t('msg_total')}: ${RM.formatPrice(RM.cart.total())}`,
      '',
      `${RM.t('msg_name')}: ${data.name}`,
      `${RM.t('msg_phone')}: ${data.phone}`,
      where,
    ];
    if (data.comment) parts.push(`${RM.t('msg_comment')}: ${data.comment}`);
    return parts.join('\n');
  }

  function copyText(text) {
    const fallback = () => {
      const area = RM.$('#order-preview');
      area.value = text;
      area.focus();
      area.select();
      try { return document.execCommand('copy'); } catch (e) { return false; }
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).then(() => true, () => fallback());
    }
    return Promise.resolve(fallback());
  }

  RM.order = {
    channel() {
      return RM.config.telegramUsername ? 'tg' : 'ig';
    },

    chatUrl(text) {
      if (this.channel() === 'tg') {
        return `https://t.me/${RM.config.telegramUsername}?text=${encodeURIComponent(text)}`;
      }
      return `https://ig.me/m/${RM.config.instagram}`;
    },

    send(data) {
      const text = buildMessage(data);
      const url = this.chatUrl(text);
      const tg = this.channel() === 'tg';

      RM.$('#order-preview').value = text;
      RM.$('#done-text').textContent = RM.t(tg ? 'done_text_tg' : 'done_text_ig');
      const link = RM.$('#open-chat');
      link.href = url;
      link.textContent = RM.t(tg ? 'done_open_tg' : 'done_open_ig');

      if (!tg) copyText(text); // для Instagram текст нужно вставить вручную
      window.open(url, '_blank', 'noopener');

      RM.cartUI.showView('done');
    },

    copy() {
      return copyText(RM.$('#order-preview').value).then((ok) => {
        RM.toast(RM.t(ok ? 'toast_copied' : 'toast_copy_fail'));
      });
    },
  };

  RM.initOrder = () => {
    RM.$('#checkout-form').addEventListener('submit', (event) => {
      event.preventDefault();
      if (!RM.checkoutForm.validateAll()) return;
      RM.order.send(RM.checkoutForm.getData());
    });
    RM.$('#copy-order').addEventListener('click', () => RM.order.copy());
  };
})();
