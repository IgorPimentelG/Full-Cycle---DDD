import Address from '../../domain/entities/Address';
import Customer from '../../domain/entities/Customer';
import CustomerRepositoryInterface from '../../domain/repositories/customer-repository';
import CustomerModel from '../db/sequelize/models/customer.model';

export default class CustomerRepository implements CustomerRepositoryInterface {

  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.street,
      city: entity.city,
      number: entity.number,
      zip: entity.zip,
      country: entity.country,
      rewardPoints: entity.rewardPoints,
      active: entity.isActive(),
    });
  }
  async update(entity: Customer): Promise<void> {
    await CustomerModel.update({
      name: entity.name,
      street: entity.street,
      city: entity.city,
      number: entity.number,
      zip: entity.zip,
      country: entity.country,
      rewardPoints: entity.rewardPoints,
      active: entity.isActive(),
    }, { where: { id: entity.id } });
  }
  async find(id: string): Promise<Customer> {
    try {
      const customerModel = await CustomerModel.findOne({ where: { id }, rejectOnEmpty: true });
      const address = new Address(
        customerModel.street,
        customerModel.number,
        customerModel.zip,
        customerModel.city,
        customerModel.country
      );

      const customer = new Customer(customerModel.id, customerModel.name);
      customer.changeAddress(address);

      return customer;
    } catch {
      throw new Error('Customer not found');
    }
  }
  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll();
    return customerModels.map(customerModel => {
      const address = new Address(
        customerModel.street,
        customerModel.number,
        customerModel.zip,
        customerModel.city,
        customerModel.country,
      );

      const customer = new Customer(customerModel.id, customerModel.name);
      customer.changeAddress(address);

      if (customerModel.active) {
        customer.activate();
      }

      return customer;
    });
  }
}