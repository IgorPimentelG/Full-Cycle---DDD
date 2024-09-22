import Address from "../../../domain/customer/entities/Address";
import CustomerRepositoryInterface from "../../../domain/customer/repositories/customer-repository";
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from "./update.customer.dto";

export class UpdateCustomerUseCase {

  private customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto> {
    const customer = await this.customerRepository.find(input.id);
    customer.changeName(input.name);
    customer.changeAddress(
      new Address(
        input.address.street,
        input.address.number,
        input.address.zipcode,
        input.address.city,
        input.address.country
      ));

    await this.customerRepository.update(customer);

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