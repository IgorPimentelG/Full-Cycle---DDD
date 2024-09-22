import Address from "../../../domain/customer/entities/Address";
import CustomerFactory from "../../../domain/customer/factories/customer.factory";
import CustomerRepositoryInterface from "../../../domain/customer/repositories/customer-repository";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create.customer.dto";

export class CreateCustomerUseCase {

  private customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
    const customer = CustomerFactory.createWithAddress(input.name, new Address(
      input.address.street,
      input.address.number,
      input.address.zipcode,
      input.address.city,
      input.address.country
    ));

    await this.customerRepository.create(customer);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.street,
        zipcode: customer.zipcode,
        city: customer.city,
        number: customer.number,
        country: customer.country,
      },
    };
  }
}