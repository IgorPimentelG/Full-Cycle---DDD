import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../customer/sequelize/models/customer.model";
import ProductModel from "../../../product/repositories/sequilize/models/product.model";
import OrderItemModel from "../sequelize/models/order-item.model";
import CustomerRepository from "../../../customer/repositories/customer.repository";
import Customer from "../../../../domain/customer/entities/Customer";
import Address from "../../../../domain/customer/entities/Address";
import ProductRepository from "../../../product/repositories/product.repository";
import OrderItem from "../../../../domain/checkout/entities/OrderItem";
import Order from "../../../../domain/checkout/entities/Order";
import { OrderRepository } from "../order.repository";
import OrderModel from "../sequelize/models/order.model";
import CustomerDispatcher from "../../../../domain/customer/entities/events/customer-dispatcher";
import Product from "../../../../domain/product/entities/Product";

describe("Order repository test", () => {

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerDispatcher = new CustomerDispatcher();
    const customerRepository = new CustomerRepository(customerDispatcher);
    const productRepository = new ProductRepository();
    const orderRepository = new OrderRepository();

    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "11111-111", "City 1", "Country 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const product = new Product("1", "Product 1", 100);
    await productRepository.create(product);

    const orderItem = new OrderItem("1", "Order Item 1", 100, "1", 2);
    const order = new Order("1", customer.id, [orderItem]);
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: "1" },
      include: ["items"],
    });

    expect(orderModel?.toJSON()).toStrictEqual({
      id: "1",
      customerId: "1",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          orderId: order.id,
          price: orderItem.price,
          productId: orderItem.productId,
          quantity: orderItem.quantity,
          total: orderItem.total(),
        }
      ],
    });
  });

  it("should update an order", async () => {
    const customerDispatcher = new CustomerDispatcher();
    const customerRepository = new CustomerRepository(customerDispatcher);
    const productRepository = new ProductRepository();
    const orderRepository = new OrderRepository();

    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "11111-111", "City 1", "Country 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const product = new Product("1", "Product 1", 100);
    await productRepository.create(product);

    const orderItem = new OrderItem("1", "Order Item 1", 100, "1", 2);
    const order = new Order("1", customer.id, [orderItem]);
    await orderRepository.create(order);

    orderItem.changeName("Order Item 2");
    orderItem.changeQuantity(5);
    orderItem.changePrice(50);

    await orderRepository.update(order);

    const orderModel = await OrderModel.findOne({
      where: { id: "1" },
      include: [{ model: OrderItemModel }],
    });

    expect(orderModel?.toJSON()).toStrictEqual({
      id: order.id,
      customerId: order.customerId,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          orderId: order.id,
          price: orderItem.price,
          productId: orderItem.productId,
          quantity: orderItem.quantity,
          total: orderItem.total(),
        }
      ],
    });
  });

  it("should find an order", async () => {
    const customerDispatcher = new CustomerDispatcher();
    const customerRepository = new CustomerRepository(customerDispatcher);
    const productRepository = new ProductRepository();
    const orderRepository = new OrderRepository();

    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "11111-111", "City 1", "Country 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const product = new Product("1", "Product 1", 100);
    await productRepository.create(product);

    const orderItem = new OrderItem("1", "Order Item 1", 100, "1", 2);
    const order = new Order("1", customer.id, [orderItem]);
    await orderRepository.create(order);

    const foundOrder = await orderRepository.find("1");
    const orderModel = await OrderModel.findOne({
      where: { id: "1" },
      include: [{ model: OrderItemModel }]
    });
    const orderItemModel = orderModel?.items[0];

    expect(orderModel?.toJSON()).toStrictEqual({
      id: foundOrder.id,
      customerId: foundOrder.customerId,
      total: foundOrder.total(),
      items: [
        {
          id: orderItemModel?.id,
          name: orderItemModel?.name,
          orderId: orderModel?.id,
          price: orderItemModel?.price,
          productId: orderItemModel?.productId,
          quantity: orderItemModel?.quantity,
          total: orderItemModel?.total,
        }
      ],
    });
    expect(foundOrder.items).toHaveLength(1);
  });

  it("should find an order", async () => {
    const orderRepository = new OrderRepository();

    expect(async () => {
      await orderRepository.find("123");
    }).rejects.toThrow("Order not found");
  });

  it("should find all orders", async () => {
    const customerDispatcher = new CustomerDispatcher();
    const customerRepository = new CustomerRepository(customerDispatcher);
    const productRepository = new ProductRepository();
    const orderRepository = new OrderRepository();

    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "11111-111", "City 1", "Country 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const product = new Product("1", "Product 1", 100);
    await productRepository.create(product);

    const orderItem1 = new OrderItem("1", "Order Item 1", 100, "1", 1);
    const orderItem2 = new OrderItem("2", "Order Item 2", 200, "1", 2);
    const order1 = new Order("1", customer.id, [orderItem1]);
    const order2 = new Order("2", customer.id, [orderItem2]);
    await orderRepository.create(order1);
    await orderRepository.create(order2);

    const foundOrders = await orderRepository.findAll();
    const orders = [order1, order2];

    expect(orders).toEqual(foundOrders);
  });
});