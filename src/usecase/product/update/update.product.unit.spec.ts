import ProductFactory from "../../../domain/product/factories/product.factory";
import { UpdateProductUseCase } from "./update.product.usecase";

const product = ProductFactory.create("Product A", 10.0);

const input = {
  id: product.id,
  name: "Product B",
  price: 15.0,
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
  };
}

describe("Unit test for product update use case", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    const output = await usecase.execute(input);

    expect(output).toEqual(input);
  });

  it("should not update a product that does not exist", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });
    const usecase = new UpdateProductUseCase(productRepository);

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Product not found");
  });
});