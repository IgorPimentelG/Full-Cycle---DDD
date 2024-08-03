import Address from "../../domain/customer/entities/Address";
import Customer from "../../domain/customer/entities/Customer";
import EventDispatcherInterface from "../../domain/@shared/event/event-dispatcher.interface";
import CustomerRepositoryInterface from "../../domain/customer/repositories/customer-repository";
import CustomerModel from "../db/sequelize/models/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {

  private _customerDispatcher: EventDispatcherInterface;

  constructor(customerDispatcher: EventDispatcherInterface) {
    this._customerDispatcher = customerDispatcher;
  }

  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.street,
      city: entity.city,
      number: entity.number,
      zipcode: entity.zipcode,
      country: entity.country,
      rewardPoints: entity.rewardPoints,
      active: entity.isActive(),
    });

    entity.events.forEach((event) => {
      this._customerDispatcher.notify(event);
    });
    entity.clearEvents();
  }
  async update(entity: Customer): Promise<void> {
    await CustomerModel.update({
      name: entity.name,
      street: entity.street,
      city: entity.city,
      number: entity.number,
      zipcode: entity.zipcode,
      country: entity.country,
      rewardPoints: entity.rewardPoints,
      active: entity.isActive(),
    }, { where: { id: entity.id } });

    entity.events.forEach((event) => {
      this._customerDispatcher.notify(event);
    });
    entity.clearEvents();
  }
  async find(id: string): Promise<Customer> {
    try {
      const customerModel = await CustomerModel.findOne({ where: { id }, rejectOnEmpty: true });
      const address = new Address(
        customerModel.street,
        customerModel.number,
        customerModel.zipcode,
        customerModel.city,
        customerModel.country
      );

      const customer = new Customer(customerModel.id, customerModel.name);
      customer.changeAddress(address);

      return customer;
    } catch {
      throw new Error("Customer not found");
    }
  }
  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll();
    return customerModels.map(customerModel => {
      const address = new Address(
        customerModel.street,
        customerModel.number,
        customerModel.zipcode,
        customerModel.city,
        customerModel.country,
      );

      const customer = Customer.create(customerModel.id, customerModel.name);
      customer.changeAddress(address);

      if (customerModel.active) {
        customer.activate();
      }

      customer.clearEvents();

      return customer;
    });
  }
}