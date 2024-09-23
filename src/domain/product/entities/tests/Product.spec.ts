import Product from '../Product';

describe("Product Unit Tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => new Product("", "Product 1", 100)).toThrow("product: ID is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => new Product("123", "", 100)).toThrow("product: Name is required");
  });

  it("should throw error when price is empty", () => {
    expect(() => new Product("123", "Produc 1", 0)).toThrow("product: Price is required");
  });

  it("should throw error when price is less than zero", () => {
    expect(() => new Product("123", "Produc 1", -50)).toThrow("product: Price must be greater than zero");
  });

  it("should throw error when name and price is empty", () => {
    expect(() => new Product("123", "", 0)).toThrow("product: Name is required, product: Price is required");
  });

  it("should change name", () => {
    const product = new Product("123", "Produc 1", 100);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("should change price", () => {
    const product = new Product("123", "Produc 1", 100);
    product.changePrice(150);
    expect(product.price).toBe(150);
  });
});