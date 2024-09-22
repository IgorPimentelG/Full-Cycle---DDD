import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repositories/sequilize/models/product.model";
import ProductRepository from "../../../infrastructure/product/repositories/product.repository";
import { CreateProductUseCase } from "./create.product.uescase";

describe("Integration test create product use case", () => {

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

  it("should create product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const input = { name: "Product 1", price: 100 };
    const result = await usecase.execute(input);

    expect(result).toEqual({
      id: expect.any(String),
      name: "Product 1",
      price: 100,
    });
  });
});