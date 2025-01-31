import Product from '../entities/Product';

export default class ProductService {

  static increasePrice(products: Product[], percentage: number) {
    products.forEach(product => {
      product.changePrice((product.price * percentage) / 100 + product.price);
    });
  }
}