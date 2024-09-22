import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repositories/sequilize/models/product.model";
import ProductRepository from "../../../infrastructure/product/repositories/product.repository";
import ProductFactory from "../../../domain/product/factories/product.factory";
import { ListProductUseCase } from "./list.product.usecase";

describe("Integration test list product use case", () => {

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

  it("should list product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new ListProductUseCase(productRepository);

    const product1 = ProductFactory.create("Product 1", 10);
    const product2 = ProductFactory.create("Product 2", 10);
    await productRepository.create(product1);
    await productRepository.create(product2);

    const result = await usecase.execute();

    expect(result.products.length).toEqual(2);

    expect(result.products[0].id).toBe(product1.id);
    expect(result.products[0].name).toBe(product1.name);
    expect(result.products[0].price).toBe(product1.price);

    expect(result.products[1].id).toBe(product2.id);
    expect(result.products[1].name).toBe(product2.name);
    expect(result.products[1].price).toBe(product2.price);
  });
});