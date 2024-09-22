import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repositories/sequilize/models/product.model";
import ProductRepository from "../../../infrastructure/product/repositories/product.repository";
import { FindProductUseCase } from "./find.product.usecase";
import ProductFactory from "../../../domain/product/factories/product.factory";

describe("Integration test find product use case", () => {

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

  it("should find product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new FindProductUseCase(productRepository);

    const product = ProductFactory.create("Product", 10);
    await productRepository.create(product);

    const input = { id: product.id };

    const output = {
      id: product.id,
      name: product.name,
      price: product.price,
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });
});