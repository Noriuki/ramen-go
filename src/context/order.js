class OrderContext {
  order = null

  setOrder(order) {
    this.order = order;
  }
}

const orderContext = new OrderContext();

export default orderContext;