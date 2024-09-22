import { v4 as uuid } from 'uuid';
import OrderFactory from '../order.factory';

describe("Order factory unit test", () => {
  it("should create an order", () => {
    const orderProps = {
      id: uuid(),
      customerId: uuid(),
      items: [
        {
          id: uuid(),
          name: 'Product A',
          productId: uuid(),
          price: 10,
          quantity: 2,
        }
      ],
    };

    const order = OrderFactory.create(orderProps);
    expect(order.id).toEqual(orderProps.id);
    expect(order.customerId).toEqual(orderProps.customerId);
    expect(order.items).toHaveLength(1);
  });
});