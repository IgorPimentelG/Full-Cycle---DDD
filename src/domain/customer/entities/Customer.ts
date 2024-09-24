import CustomerChangeAddressEvent from "./events/customer-change-address.event";
import { CustomerCreatedEvent } from "./events/customer-created.event";
import Entity from "../../@shared/entitiy/Entity";
import Address from "./Address";
import NotificationError from "../../@shared/notification/notification.error";
import CustomerValidatorFactory from "../factories/customer.validator.factory";

export default class Customer extends Entity {

  private _name: string = "";
  private _address!: Address;
  private _active: boolean = true;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    super();
    this._id = id;
    this._name = name;

    this.validate();

    if (this._notification.hasErrors()) {
      throw new NotificationError(this._notification.errors)
    }
  }

  static create(id: string, name: string): Customer {
    const customer = new Customer(id, name);
    customer.addEvent(new CustomerCreatedEvent(`ID: ${id}, Name: ${name}`));
    return customer;
  }

  validate() {
    CustomerValidatorFactory.create().validate(this);
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

  get address(): Address {
    return this._address;
  }
}