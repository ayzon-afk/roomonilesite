// Форма оформления заказа: проверка при уходе с поля, ошибки исчезают при вводе.
(function () {
  const RM = (window.RM = window.RM || {});
  const CUSTOMER_KEY = 'rm_customer';

  // Телефон: принимаем 9 цифр (90 123 45 67) или 12 цифр с кодом 998.
  RM.normalizePhone = (value) => {
    let digits = String(value).replace(/\D/g, '');
    if (digits.length === 9) digits = '998' + digits;
    if (digits.length !== 12 || !digits.startsWith('998')) return null;
    return `+998 ${digits.slice(3, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 10)} ${digits.slice(10, 12)}`;
  };

  const errorKeys = {}; // имя поля → ключ текста ошибки (чтобы перевести при смене языка)

  const form = () => RM.$('#checkout-form');
  const method = () => form().elements.method.value;

  const rules = {
    name: (v) => (v.trim().length >= 2 ? null : 'err_name'),
    phone: (v) => (RM.normalizePhone(v) ? null : 'err_phone'),
    address: (v) => (method() !== 'delivery' || v.trim().length >= 5 ? null : 'err_address'),
  };

  function renderError(name) {
    const box = RM.$(`[data-error-for="${name}"]`);
    const field = box.closest('.field');
    const key = errorKeys[name];
    box.hidden = !key;
    box.textContent = key ? RM.t(key) : '';
    field.classList.toggle('has-error', Boolean(key));
    form().elements[name].setAttribute('aria-invalid', key ? 'true' : 'false');
  }

  function validateField(name) {
    errorKeys[name] = rules[name](form().elements[name].value);
    renderError(name);
    return !errorKeys[name];
  }

  function toggleMethod() {
    const delivery = method() === 'delivery';
    RM.$('#group-branch').hidden = delivery;
    RM.$('#group-address').hidden = !delivery;
    if (!delivery) { errorKeys.address = null; renderError('address'); }
  }

  RM.checkoutForm = {
    init() {
      const f = form();

      f.elements.branch.innerHTML = RM.config.branches
        .map((b) => `<option value="${RM.esc(b.id)}">${RM.esc(b.name)}</option>`)
        .join('');

      Object.keys(rules).forEach((name) => {
        f.elements[name].addEventListener('blur', () => validateField(name));
        f.elements[name].addEventListener('input', () => {
          if (errorKeys[name]) { errorKeys[name] = null; renderError(name); }
        });
      });

      RM.$$('input[name="method"]', f).forEach((r) => r.addEventListener('change', toggleMethod));

      // подставляем имя и телефон, которые покупатель вводил раньше
      const saved = RM.storage.get(CUSTOMER_KEY, {});
      if (saved.name) f.elements.name.value = saved.name;
      if (saved.phone) f.elements.phone.value = saved.phone;

      this.refresh();
    },

    // вызывается при смене языка
    refresh() {
      Object.keys(rules).forEach(renderError);
      const hintKey = RM.order && RM.order.channel() === 'tg' ? 'hint_tg' : 'hint_ig';
      RM.$('#form-hint').textContent = RM.t(hintKey);
    },

    validateAll() {
      const results = Object.keys(rules).map(validateField); // проверяем все поля сразу
      const firstBad = Object.keys(rules).find((n) => errorKeys[n]);
      if (firstBad) form().elements[firstBad].focus();
      return results.every(Boolean);
    },

    getData() {
      const f = form();
      const branchId = f.elements.branch.value;
      const branch = RM.config.branches.find((b) => b.id === branchId);
      const data = {
        name: f.elements.name.value.trim(),
        phone: RM.normalizePhone(f.elements.phone.value),
        method: method(),
        branch: branch ? branch.name : '',
        address: f.elements.address.value.trim(),
        comment: f.elements.comment.value.trim(),
      };
      RM.storage.set(CUSTOMER_KEY, { name: data.name, phone: data.phone });
      return data;
    },
  };
})();
