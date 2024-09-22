export interface InputUpdateCustomerDto {
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

export interface OutputUpdateCustomerDto {
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