export interface InputFindCustomerDto {
  id: string;
}

export interface OutputFindCustomerDto {
  id: string;
  name: string;
  address: {
    street: string;
    zipcode: string;
    city: string;
    number: number;
    country: string;
  }
}