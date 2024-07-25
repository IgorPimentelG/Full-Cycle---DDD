import Order from '../../domain/entities/Order';
import OrderRepositoryInterface from '../../domain/repositories/order-repository';
import OrderItemModel from '../db/sequelize/models/order-item.model';
import OrderModel from '../db/sequelize/models/order.model';
import OrderItem from '../../domain/entities/OrderItem';

export class OrderRepository implements OrderRepositoryInterface {

  async create(entity: Order): Promise<void> {
    await OrderModel.create({
      id: entity.id,
      customerId: entity.customerId,
      total: entity.total(),
      items: entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        productId: item.productId,
        price: item.price,
        quantity: item.quantity,
        total: item.total(),
      })),
    }, {
      include: [{ model: OrderItemModel }],
    });
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.update({
      customerId: entity.customerId,
      total: entity.total(),
    }, { where: { id: entity.id } });

    entity.items.forEach(async (item) => {
      await OrderItemModel.update({
        name: item.name,
        productId: item.productId,
        price: item.price,
        quantity: item.quantity,
        total: item.total(),
      }, { where: { id: item.id } });
    });
  }

  async find(id: string): Promise<Order> {
    try {
      const orderModel = await OrderModel.findOne({
        where: { id },
        rejectOnEmpty: true,
        include: [{ model: OrderItemModel }],
      });

      const items = orderModel.items.map((item) =>
        new OrderItem(
          item.id,
          item.name,
          item.price,
          item.productId,
          item.quantity,
        )
      );
      return new Order(orderModel.id, orderModel.customerId, items);
    } catch {
      throw new Error('Order not found');
    }
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: [{ model: OrderItemModel }],
    });

    return orderModels.map((orderModel) => {
      const items = orderModel.items.map((item) =>
        new OrderItem(
          item.id,
          item.name,
          item.price,
          item.productId,
          item.quantity,
        )
      );
      return new Order(orderModel.id, orderModel.customerId, items);
    });
  }
}