import CustomerChangeAddressEvent from "../events/customer/customer-change-address.event";
import { CustomerCreatedEvent } from "../events/customer/customer-created.event";
import Entity from "./@shared/Entity";
import Address from "./Address";

export default class Customer extends Entity {

  private _id: string;
  private _name: string = "";
  private _address!: Address;
  private _active: boolean = true;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    super();
    this._id = id;
    this._name = name;

    this.validate();
  }

  static create(id: string, name: string): Customer {
    const customer = new Customer(id, name);
    customer.addEvent(new CustomerCreatedEvent(`ID: ${id}, Name: ${name}`));
    return customer;
  }

  validate() {
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }

    if (this._id.length === 0) {
      throw new Error("ID is required");
    }
  }

  changeName(name: string) {
    this._name = name;
  }

  changeAddress(address: Address) {
    this._address = address;

    this.addEvent(new CustomerChangeAddressEvent({
      id: this._id,
      name: this._name,
      address: {
        street: address._street,
        number: address._number,
        zipcode: address._zipcode,
        city: address._city,
        country: address._country,
      }
    }));
  }

  activate() {
    if (!this._address) {
      throw new Error("Address is required to activate a customer");
    }

    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  isActive(): boolean {
    return this._active;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  get street(): string {
    return this._address._street;
  }

  get zipcode(): string {
    return this._address._zipcode;
  }

  get city(): string {
    return this._address._city;
  }

  get number(): number {
    return this._address._number;
  }

  get country(): string {
    return this._address._country;
  }
}