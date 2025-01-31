import Address from '../Address';
import Customer from '../Customer';

describe("Customer Unit Tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => new Customer("", "John Doe")).toThrow("ID is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => new Customer("123", "")).toThrow("Name is required");
  });

  it("should change name", () => {
    const customer = new Customer("123", "John");
    customer.changeName("Jane Doe");
    expect(customer.name).toBe("Jane Doe");
  });

  it("should activate customer", () => {
    const customer = new Customer("123", "John");
    const address = new Address("Any street", 1, "13330-205", "Any city", "Any Country")
    customer.changeAddress(address);

    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it("should deactivate customer", () => {
    const customer = new Customer("123", "John");
    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it("should throw error when address is undefined", () => {
    const customer = new Customer("123", "John");
    expect(() => customer.activate()).toThrow("Address is required to activate a customer");
  });


  it("should add reward points", () => {
    const customer = new Customer("c1", "Customer 1");
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(100);
    expect(customer.rewardPoints).toBe(100);

    customer.addRewardPoints(200);
    expect(customer.rewardPoints).toBe(300);
  });
});