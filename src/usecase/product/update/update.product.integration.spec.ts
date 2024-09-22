import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repositories/sequilize/models/product.model";
import ProductRepository from "../../../infrastructure/product/repositories/product.repository";
import { UpdateProductUseCase } from "./update.product.usecase";
import ProductFactory from "../../../domain/product/factories/product.factory";

describe("Integration test update product use case", () => {

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    const product = ProductFactory.create("Product", 100);
    productRepository.create(product);

    const input = { id: product.id, name: "Product Updated", price: 200 };
    const result = await usecase.execute(input);

    expect(result).toEqual({
      id: input.id,
      name: input.name,
      price: input.price,
    });
  });
});