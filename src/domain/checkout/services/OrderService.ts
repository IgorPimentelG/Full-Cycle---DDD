import { v4 as uuid } from "uuid";
import OrderItem from "../entities/OrderItem";
import Customer from "../../customer/entities/Customer";
import Order from "../entities/Order";

export default class OrderService {

  static total(orders: Order[]): number {
    return orders.reduce((total, order) => total + order.total(), 0);
  }

  static placeOrder(customer: Customer, items: OrderItem[]): Order {

    if (OrderItem.length === 0) {
      throw new Error("Order must have at least one item");
    }

    const order = new Order(uuid(), customer.id, items);
    customer.addRewardPoints(order.total() / 2);
    return order;
  }
}