export default class Address {

  _street: string;
  _number: number;
  _zipcode: string;
  _city: string;
  _country: string;

  constructor(street: string, number: number, zipcode: string, city: string, country: string) {
    this._street = street;
    this._number = number;
    this._zipcode = zipcode;
    this._city = city;
    this._country = country;

    this.validate();
  }

  validate() {
    if (!this._street.length) {
      throw new Error("Street is required");
    }

    if (this._number <= 0) {
      throw new Error("Number must be a positive integer");
    }

    if (!this._zipcode.length) {
      throw new Error("Zip is required");
    }

    if (!this._city.length) {
      throw new Error("City is required");
    }

    if (!this._country.length) {
      throw new Error("Country is required");
    }
  }
}