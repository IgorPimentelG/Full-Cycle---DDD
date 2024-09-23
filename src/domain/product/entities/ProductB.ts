import Entity from "../../@shared/entitiy/Entity";
import NotificationError from "../../@shared/notification/notification.error";
import ProductInterface from './Product.interface';

export default class ProductB extends Entity implements ProductInterface {

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
    if (!this._id) {
      this._notification.addError({
        context: "product",
        message: "ID is required",
      });
    }

    if (!this._name) {
      this._notification.addError({
        context: "product",
        message: "Name is required",
      });
    }

    if (!this._price) {
      this._notification.addError({
        context: "product",
        message: "Price is required",
      });
    }

    if (this._price < 0) {
      this._notification.addError({
        context: "product",
        message: "Price must be greater than zero",
      });
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