import Product from "../../../domain/product/entities/Product";
import ProductRepositoryInterface from "../../../domain/product/repositories/product-repository";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";

export class ListProductUseCase {

  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }
  async execute(input: InputListProductDto = {}): Promise<OutputListProductDto> {
    const products = await this.productRepository.findAll();
    return OutputMapper.toOutput(products);
  }
}

class OutputMapper {
  static toOutput(products: Product[]): OutputListProductDto {
    return {
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    };
  }
}