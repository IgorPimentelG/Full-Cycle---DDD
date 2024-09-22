import { CreateProductUseCase } from "./create.product.uescase";

const input = {
  name: "Product 1",
  price: 10.0,
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
  };
}

describe("Unit test create product use case", () => {
  it("should create product", async () => {
    const productRepository = MockRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const output = await usecase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it("should thrown an error when name is missing", async () => {
    const productRepository = MockRepository();
    const usecase = new CreateProductUseCase(productRepository);

    await expect(usecase.execute({
      ...input,
      name: "",
    })).rejects.toThrow("Name is required");
  });

  it("should thrown an error when price is missing", async () => {
    const productRepository = MockRepository();
    const usecase = new CreateProductUseCase(productRepository);

    await expect(usecase.execute({
      ...input,
      price: 0,
    })).rejects.toThrow("Price is required");
  });

  it("should thrown an error when price is less than zero", async () => {
    const productRepository = MockRepository();
    const usecase = new CreateProductUseCase(productRepository);

    await expect(usecase.execute({
      ...input,
      price: -1,
    })).rejects.toThrow("Price must be greater than zero");
  });
});