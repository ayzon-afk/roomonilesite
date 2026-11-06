// Состояние каталога (то, что выбрал покупатель в фильтрах).
(function () {
  const RM = (window.RM = window.RM || {});

  RM.state = {
    category: 'all',
    query: '',
    sort: 'default',
  };

  RM.resetFilters = () => {
    RM.state.category = 'all';
    RM.state.query = '';
    RM.state.sort = 'default';
  };

  RM.getProduct = (id) => RM.products.find((p) => p.id === id);

  RM.formatPrice = (value) =>
    new Intl.NumberFormat('ru-RU').format(value).replace(/ | /g, ' ') + ' ' + RM.t('currency');
})();
