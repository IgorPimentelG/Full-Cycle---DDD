import ProductFactory from "../../../domain/product/factories/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repositories/product-repository";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";

export class CreateProductUseCase {

  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
    const product = ProductFactory.create(input.name, input.price);

    await this.productRepository.create(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}