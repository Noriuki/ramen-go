class OrderContext {
  order = null

  setOrder(order) {
    this.order = order;
  }

  getOrder() {
    return this.order;
  }
}

const orderContext = new OrderContext();

export default orderContext;