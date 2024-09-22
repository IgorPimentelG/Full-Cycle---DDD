import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/sequelize/models/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repositories/customer.repository";
import Customer from "../../../domain/customer/entities/Customer";
import Address from "../../../domain/customer/entities/Address";
import CustomerDispatcher from "../../../domain/customer/entities/events/customer-dispatcher";
import { FindCustomerUseCase } from "./find.customer.usecase";

describe("Test find customer use case", () => {

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a customer", async () => {
    const customerDispatcher = new CustomerDispatcher();
    const customerRepository = new CustomerRepository(customerDispatcher);
    const usecase = new FindCustomerUseCase(customerRepository);

    const customer = new Customer("1", "John");
    const address = new Address("street", 1, "zipcode", "city", "country");
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const input = {
      id: "1",
    };

    const output = {
      id: "1",
      name: "John",
      address: {
        street: "street",
        number: 1,
        zipcode: "zipcode",
        city: "city",
        country: "country",
      },
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });
});