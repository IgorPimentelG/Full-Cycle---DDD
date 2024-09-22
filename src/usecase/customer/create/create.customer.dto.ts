export interface InputCreateCustomerDto {
  name: string;
  address: {
    street: string;
    zipcode: string;
    city: string;
    number: number;
    country: string;
  };
}

export interface OutputCreateCustomerDto {
  id: string;
  name: string;
  address: {
    street: string;
    zipcode: string;
    city: string;
    number: number;
    country: string;
  };
}