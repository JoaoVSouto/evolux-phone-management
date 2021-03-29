class UrlService {
  setOrder(order, key) {
    const url = new URL(window.location);

    url.searchParams.delete('order-desc');
    url.searchParams.delete('order-asc');
    url.searchParams.set(`order-${order}`, key);

    window.history.replaceState({}, '', url);
  }

  setPage(page) {
    const url = new URL(window.location);

    url.searchParams.set('page', page);

    window.history.replaceState({}, '', url);
  }

  setQuery(query) {
    const url = new URL(window.location);

    url.searchParams.set('q', query);

    if (!query) {
      url.searchParams.delete('q');
    }

    window.history.replaceState({}, '', url);
  }

  setAllData({ orderOption = {}, page = 1, query = '' } = {}) {
    this.setPage(page);
    this.setQuery(query);

    const isOrderOptionValid = Boolean(orderOption.order && orderOption.sort);

    if (isOrderOptionValid) {
      this.setOrder(orderOption.order, orderOption.sort);
    }
  }

  getAllData() {
    const url = new URL(window.location);

    const page = Number(url.searchParams.get('page')) || 1;
    const query = url.searchParams.get('q') || '';

    const hasOrdering = Boolean(
      url.searchParams.get('order-asc') || url.searchParams.get('order-desc')
    );
    const order = url.searchParams.get('order-asc') ? 'asc' : 'desc';
    const sort =
      url.searchParams.get('order-asc') || url.searchParams.get('order-desc');

    return {
      page,
      orderOption: hasOrdering ? { sort, order } : {},
      query,
    };
  }
}

export default UrlService;
