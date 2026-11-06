// Бургер-меню на телефонах.
(function () {
  const RM = (window.RM = window.RM || {});

  RM.initMenu = () => {
    const btn = RM.$('#menu-btn');
    const nav = RM.$('#nav');

    const setOpen = (open) => {
      nav.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
    };

    btn.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
    nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  };
})();
