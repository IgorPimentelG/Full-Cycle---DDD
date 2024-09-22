import Entity from "../../@shared/entitiy/Entity";
import ProductInterface from './Product.interface';

export default class ProductB extends Entity implements ProductInterface {

  private _id: string;
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super();
    this._id = id;
    this._name = name;
    this._price = price;

    this.validate();
  }

  validate() {
    if (!this._id) {
      throw new Error("ID is required");
    }

    if (!this._name) {
      throw new Error("Name is required");
    }

    if (!this._price) {
      throw new Error("Price is required");
    }

    if (this._price < 0) {
      throw new Error("Price must be greater than zero");
    }
  }

  changeName(name: string) {
    this._name = name;
  }

  changePrice(price: number) {
    this._price = price;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }
}