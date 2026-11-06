// Общие помощники. Загружается первым и создаёт глобальный объект RM.
(function () {
  const RM = (window.RM = window.RM || {});

  RM.$ = (selector, root = document) => root.querySelector(selector);
  RM.$$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  RM.esc = (value) => String(value).replace(/[&<>"']/g, (c) => ESC[c]);

  RM.debounce = (fn, ms) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), ms);
    };
  };

  // Простая шина событий: RM.on('cart:change', fn) / RM.emit('cart:change')
  RM.bus = new EventTarget();
  RM.emit = (name, detail) => RM.bus.dispatchEvent(new CustomEvent(name, { detail }));
  RM.on = (name, fn) => RM.bus.addEventListener(name, fn);

  // localStorage с защитой (приватный режим, запрет cookies и т.д.)
  RM.storage = {
    get(key, fallback) {
      try {
        const raw = localStorage.getItem(key);
        return raw === null ? fallback : JSON.parse(raw);
      } catch (e) {
        return fallback;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) { /* ignore */ }
    },
  };
})();
