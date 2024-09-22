import Order from '../entities/Order';
import OrderItem from '../entities/OrderItem';

interface OrderFactoryProps {
  id: string;
  customerId: string;
  items: {
    id: string;
    name: string;
    price: number;
    productId: string;
    quantity: number;
  }[];
}

export default class OrderFactory {

  static create(orderProps: OrderFactoryProps): Order {

    const items = orderProps.items.map(item => new OrderItem(
      item.id,
      item.name,
      item.price,
      item.productId,
      item.quantity,
    ));

    return new Order(orderProps.id, orderProps.customerId, items);
  }

}