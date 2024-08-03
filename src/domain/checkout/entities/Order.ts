import Entity from '../../@shared/entitiy/Entity';
import OrderItem from './OrderItem';

export default class Order extends Entity {

  private _id: string;
  private _customerId: string;
  private _items: OrderItem[] = [];
  private _total: number;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    super();
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.total();
    this.validate();
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.total(), 0);
  }

  validate() {
    if (!this._id) {
      throw new Error("ID is required");
    }

    if (!this._customerId) {
      throw new Error("Customer ID is required");
    }

    if (!this._items.length) {
      throw new Error("Items qtd must be greater than 0");
    }

    if (this._items.some((item) => item.quantity <= 0)) {
      throw new Error("Quantity must be greater than 0");
    }
  }

  get id(): string {
    return this._id;
  }

  get customerId(): string {
    return this._customerId;
  }

  get items(): OrderItem[] {
    return this._items;
  }
}