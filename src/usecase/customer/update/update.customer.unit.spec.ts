import Address from "../../../domain/customer/entities/Address";
import CustomerFactory from "../../../domain/customer/factories/customer.factory";
import { UpdateCustomerUseCase } from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
  "John",
  new Address("street", 1, "zipcode", "city", "country")
);

const input = {
  id: customer.id,
  name: "John Updated",
  address: {
    street: "street updated",
    number: 123,
    zipcode: "zipcode updated",
    city: "city updated",
    country: "country updated",
  },
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
  };
}

describe("Unit test for customer update use case", () => {
  it("should update a customer", async () => {
    const customerRepository = MockRepository();
    const usecase = new UpdateCustomerUseCase(customerRepository);

    const output = await usecase.execute(input);

    expect(output).toEqual(input);
  });
});