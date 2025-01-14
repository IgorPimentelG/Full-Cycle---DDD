import Order from '../Order';
import OrderItem from '../OrderItem';

describe("Order Unit Tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => new Order("", "123", [])).toThrow("ID is required");
  });

  it("should throw error when customer id is empty", () => {
    expect(() => new Order("123", "", [])).toThrow("Customer ID is required");
  });

  it("should throw error when items are empty", () => {
    expect(() => new Order("123", "123", [])).toThrow("Items qtd must be greater than 0");
  });

  it("should calculate total", () => {
    const item1 = new OrderItem("i1", "Item 1", 100, "p1", 2);
    const item2 = new OrderItem("i2", "Item 2", 200, "p2", 2);
    const order1 = new Order("o1", "c1", [item1]);
    const order2 = new Order("o2", "c2", [item1, item2]);

    let total = order1.total();
    expect(total).toBe(200);

    total = order2.total();
    expect(total).toBe(600);
  });

  it("should throw error if the item qte is less or equal 0", () => {
    expect(() => {
      const item = new OrderItem("i1", "Item 1", 100, "p1", 0);
      new Order("o1", "c1", [item]);
    }).toThrow("Quantity must be greater than 0");
  });
});