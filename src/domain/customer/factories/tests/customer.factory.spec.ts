import Address from '../../entities/Address';
import CustomerFactory from '../customer.factory';

describe("Customer factory unit tests", () => {
  it("should create a customer", () => {
    const customer = CustomerFactory.create("John");
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.address).toBeUndefined();
  });

  it("hould create a customer with an address", () => {
    const address = new Address("street", 1, "58200-504", "city", "BR");
    const customer = CustomerFactory.createWithAddress("John", address);
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.address).toBe(address);
  });
});