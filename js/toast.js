// Короткие уведомления внизу экрана.
(function () {
  const RM = (window.RM = window.RM || {});

  RM.toast = (message, ms = 2000) => {
    const region = RM.$('#toast-region');
    if (!region) return;

    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = message;
    region.appendChild(el);

    setTimeout(() => {
      el.classList.add('is-leaving');
      setTimeout(() => el.remove(), 220);
    }, ms);
  };
})();
