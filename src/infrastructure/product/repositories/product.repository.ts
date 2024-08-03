import Product from "../../../domain/product/entities/Product";
import ProductRepositoryInterface from "../../../domain/product/repositories/product-repository";
import ProductModel from "./sequilize/models/product.model";

export default class ProductRepository implements ProductRepositoryInterface {

  async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
    });
  }

  async update(entity: Product): Promise<void> {
    await ProductModel.update({
      name: entity.name,
      price: entity.price,
    }, { where: { id: entity.id } });
  }

  async find(id: string): Promise<Product> {
    const product = await ProductModel.findOne({ where: { id }, rejectOnEmpty: true });

    if (!product) {
      throw new Error("Product not found");
    }

    return new Product(
      product.id,
      product.name,
      product.price,
    );
  }

  async findAll(): Promise<Product[]> {
    const productsModel = await ProductModel.findAll();
    return productsModel.map(product => new Product(
      product.id,
      product.name,
      product.price,
    ));
  }
}