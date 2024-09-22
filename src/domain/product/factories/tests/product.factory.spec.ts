import ProductFactory from '../product.factory';

describe("Product factory unit test", () => {

  it("should create a product type A", () => {
    const product = ProductFactory.createWithType("TYPE_A", "Product A", 1);
    expect(product).toBeDefined();
    expect(product.name).toBe("Product A");
    expect(product.price).toBe(1);
    expect(product.constructor.name).toBe("Product");
  });

  it("should create a product type B", () => {
    const product = ProductFactory.createWithType("TYPE_B", "Product B", 1);
    expect(product).toBeDefined();
    expect(product.name).toBe("Product B");
    expect(product.price).toBe(1);
    expect(product.constructor.name).toBe("ProductB");
  });
});