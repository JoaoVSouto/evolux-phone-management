class StorageService {
  constructor() {
    this.ORDER_STORAGE_KEY = '@evolux:order-option';
  }

  getOrder() {
    const order =
      JSON.parse(localStorage.getItem(this.ORDER_STORAGE_KEY)) || {};

    return order;
  }

  setOrder(order) {
    localStorage.setItem(this.ORDER_STORAGE_KEY, JSON.stringify(order));
  }
}

export default StorageService;
