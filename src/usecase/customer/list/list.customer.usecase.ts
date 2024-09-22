import Customer from "../../../domain/customer/entities/Customer";
import CustomerRepositoryInterface from "../../../domain/customer/repositories/customer-repository";
import { InputListCustomerDto, OutputListCustomerDto } from "./list.customer.dto";

export class ListCustomerUseCase {

  private customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(input: InputListCustomerDto = {}): Promise<OutputListCustomerDto> {
    const customers = await this.customerRepository.findAll();
    return OutputMapper.toOutput(customers);
  }
}

class OutputMapper {
  static toOutput(customers: Customer[]): OutputListCustomerDto {
    return {
      customers: customers.map((customer) => ({
        id: customer.id,
        name: customer.name,
        address: {
          street: customer.street,
          zipcode: customer.zipcode,
          city: customer.city,
          number: customer.number,
          country: customer.country,
        },
      })),
    }
  }
}