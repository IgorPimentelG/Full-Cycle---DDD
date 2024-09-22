import Product from '../entities/Product';
import ProductInterface from '../entities/Product.interface';
import { v4 as uuid } from 'uuid';
import ProductB from '../entities/ProductB';

type ProductType = "TYPE_A" | "TYPE_B";

export default class ProductFactory {

  public static createWithType(type: ProductType, name: string, price: number): ProductInterface {
    switch (type) {
      case "TYPE_A":
        return new Product(uuid(), name, price);
      case "TYPE_B":
        return new ProductB(uuid(), name, price);
      default:
        throw new Error("Product type not supported");
    }
  }

  public static create(name: string, price: number): Product {
    return new Product(uuid(), name, price);
  }
}