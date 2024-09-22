import Address from '../entities/Address';
import Customer from '../entities/Customer';
import { v4 as uuid } from 'uuid';

export default class CustomerFactory {
  static create(name: string): Customer {
    return new Customer(uuid(), name);
  }

  static createWithAddress(name: string, address: Address): Customer {
    const customer = new Customer(uuid(), name)
    customer.changeAddress(address);
    return customer;
  }
}