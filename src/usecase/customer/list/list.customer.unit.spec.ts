import Address from "../../../domain/customer/entities/Address";
import CustomerFactory from "../../../domain/customer/factories/customer.factory";
import { ListCustomerUseCase } from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress(
  "John Doe",
  new Address("Rua dos Bobos", 123, "12345-678", "São Paulo", "BR")
);

const customer2 = CustomerFactory.createWithAddress(
  "Jane Doe",
  new Address("Rua dos Bobos", 123, "12345-678", "São Paulo", "BR")
);

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
  };
}

describe("Unit test for list customer use case", () => {
  it("shoud list a customer", async () => {
    const customerRepository = MockRepository();
    const usecase = new ListCustomerUseCase(customerRepository);

    const output = await usecase.execute();

    expect(output.customers.length).toEqual(2);

    expect(output.customers[0].id).toBe(customer1.id);
    expect(output.customers[0].name).toBe(customer1.name);
    expect(output.customers[0].address.street).toBe(customer1.address._street);

    expect(output.customers[1].id).toBe(customer2.id);
    expect(output.customers[1].name).toBe(customer2.name);
    expect(output.customers[1].address.street).toBe(customer2.address._street);
  });
});