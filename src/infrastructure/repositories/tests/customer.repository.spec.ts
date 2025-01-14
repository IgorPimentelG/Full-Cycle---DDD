import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../../db/sequelize/models/customer.model';
import CustomerRepository from '../customer.repository';
import Customer from '../../../domain/entities/Customer';
import Address from '../../../domain/entities/Address';

describe("Customer repository test", () => {

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "11111-111", "City 1", "Country 1");
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

    expect(customerModel?.toJSON()).toStrictEqual({
      id: "1",
      name: "Customer 1",
      street: "Street 1",
      number: 1,
      zip: "11111-111",
      city: "City 1",
      country: "Country 1",
      rewardPoints: 0,
      active: true,
    });
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "11111-111", "City 1", "Country 1");
    customer.changeAddress(address);

    await customerRepository.create(customer);
    customer.changeName("Customer 2");

    await customerRepository.update(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

    expect(customerModel?.toJSON()).toStrictEqual({
      id: "1",
      name: "Customer 2",
      street: "Street 1",
      number: 1,
      zip: "11111-111",
      city: "City 1",
      country: "Country 1",
      rewardPoints: 0,
      active: true,
    });
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "11111-111", "City 1", "Country 1");
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "1" } });
    const findCustomer = await customerRepository.find("1");

    expect(customerModel?.toJSON()).toStrictEqual({
      id: findCustomer.id,
      name: findCustomer.name,
      street: findCustomer.street,
      number: findCustomer.number,
      zip: findCustomer.zip,
      city: findCustomer.city,
      country: findCustomer.country,
      rewardPoints: findCustomer.rewardPoints,
      active: findCustomer.isActive(),
    });
  });

  it("should throw an error when customer is not found", () => {
    const customerRepository = new CustomerRepository();

    expect(async () => {
      await customerRepository.find("456");
    }).rejects.toThrow("Customer not found");
  });

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address("Street 1", 1, "11111-111", "City 1", "Country 1");
    const customer1 = new Customer("1", "Customer 1");
    const customer2 = new Customer("2", "Customer 2");
    customer1.changeAddress(address);
    customer2.changeAddress(address);

    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const foundCustomers = await customerRepository.findAll();
    const customers = [customer1, customer2];

    expect(customers).toEqual(foundCustomers);
  });
});