// Движок переводов. Тексты лежат в js/i18n/uz.js и js/i18n/ru.js.
(function () {
  const RM = (window.RM = window.RM || {});
  const FALLBACK = 'uz';

  let lang = RM.storage.get('rm_lang', FALLBACK);
  if (!RM.dict[lang]) lang = FALLBACK;

  RM.getLang = () => lang;

  RM.t = (key, vars) => {
    let text = (RM.dict[lang] && RM.dict[lang][key]) ?? RM.dict[FALLBACK][key] ?? key;
    if (vars) {
      Object.keys(vars).forEach((k) => {
        text = text.split('{' + k + '}').join(vars[k]);
      });
    }
    return text;
  };

  RM.catLabel = (cat) => cat[lang] || cat[FALLBACK];

  RM.applyI18n = (root = document) => {
    RM.$$('[data-i18n]', root).forEach((el) => { el.textContent = RM.t(el.dataset.i18n); });
    RM.$$('[data-i18n-ph]', root).forEach((el) => { el.placeholder = RM.t(el.dataset.i18nPh); });
    RM.$$('[data-i18n-aria]', root).forEach((el) => { el.setAttribute('aria-label', RM.t(el.dataset.i18nAria)); });
    document.title = RM.t('page_title');
    document.documentElement.lang = lang;
    RM.$$('[data-lang]').forEach((btn) => {
      btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
    });
  };

  RM.setLang = (next) => {
    if (!RM.dict[next] || next === lang) return;
    lang = next;
    RM.storage.set('rm_lang', lang);
    RM.applyI18n();
    RM.emit('lang:change');
  };

  RM.initI18n = () => {
    RM.applyI18n();
    RM.$$('[data-lang]').forEach((btn) => {
      btn.addEventListener('click', () => RM.setLang(btn.dataset.lang));
    });
  };
})();
