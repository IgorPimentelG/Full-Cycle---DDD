import Entity from "../../@shared/entitiy/Entity";
import NotificationError from "../../@shared/notification/notification.error";
import ProductValidatorFactory from "../factories/product.validator.factory";
import ProductInterface from "./Product.interface";

export default class Product extends Entity implements ProductInterface {

  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super();
    this._id = id;
    this._name = name;
    this._price = price;

    this.validate();

    if (this._notification.hasErrors()) {
      throw new NotificationError(this._notification.errors);
    }
  }

  validate() {
    ProductValidatorFactory.create().validate(this);
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