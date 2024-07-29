import Product from '../entities/Product';
import RepositoryInterface from './@shared/repository-interface';

export default interface ProductRepositoryInterface extends RepositoryInterface<Product> { }