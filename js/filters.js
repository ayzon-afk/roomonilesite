// Фильтрация, поиск и сортировка товаров.
(function () {
  const RM = (window.RM = window.RM || {});

  RM.getVisibleProducts = () => {
    const { category, query, sort } = RM.state;
    const q = query.trim().toLowerCase();

    const list = RM.products.filter((p) => {
      if (category !== 'all' && p.cat !== category) return false;
      if (!q) return true;
      const cat = RM.categories.find((c) => c.id === p.cat);
      const haystack = (p.name + ' ' + (cat ? cat.uz + ' ' + cat.ru : '')).toLowerCase();
      return haystack.includes(q);
    });

    if (sort === 'asc') list.sort((a, b) => a.price - b.price);
    if (sort === 'desc') list.sort((a, b) => b.price - a.price);
    if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  };

  RM.initFilters = () => {
    const search = RM.$('#search');
    const sort = RM.$('#sort');

    search.addEventListener('input', RM.debounce(() => {
      RM.state.query = search.value;
      RM.renderProducts();
    }, 150));

    sort.addEventListener('change', () => {
      RM.state.sort = sort.value;
      RM.renderProducts();
    });

    RM.$('#empty-reset').addEventListener('click', () => {
      RM.resetFilters();
      search.value = '';
      sort.value = 'default';
      RM.renderCategories();
      RM.renderProducts();
    });
  };
})();
