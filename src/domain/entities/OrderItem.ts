export default class OrderItem {
  
  private _id: string;
  private _name: string;
  private _productId: string;
  private _price: number;
  private _quantity: number;
  private _total: number;

  constructor(id: string, name: string, price: number, productId: string, quantity: number) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._productId = productId;
    this._quantity = quantity;
    this._total = this.total();
  }

  total(): number {
    return this._price * this._quantity;
  }

  changeName(name: string) {
    this._name = name;
  }

  changeQuantity(quantity: number) {
    this._quantity = quantity;
  }

  changePrice(price: number) {
    this._price = price;
  }

  get id(): string { return this._id; }

  get name(): string { return this._name; }

  get productId(): string { return this._productId; }

  get price(): number { return this._price; }

  get quantity(): number { return this._quantity; }
}