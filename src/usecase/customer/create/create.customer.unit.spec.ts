import { CreateCustomerUseCase } from "./create.customer.usecase";

const input = {
  name: "John",
  address: {
    street: "street",
    number: 1,
    zipcode: "zipcode",
    city: "city",
    country: "country",
  },
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
}

describe("Unit test create customer use case", () => {
  it("should create a customer", async () => {
    const customerRepository = MockRepository();
    const usecase = new CreateCustomerUseCase(customerRepository);

    const output = await usecase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zipcode: input.address.zipcode,
        city: input.address.city,
        country: input.address.country,
      },
    });
  });

  it("should thrown an error when name is missing", async () => {
    const customerRepository = MockRepository();
    const usecase = new CreateCustomerUseCase(customerRepository);

    input.name = "";

    await expect(usecase.execute(input)).rejects.toThrow("Name is required");
  });
});