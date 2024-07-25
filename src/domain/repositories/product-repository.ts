import Product from '../entities/Product';
import RepositoryInterface from './repository-interface';

export default interface ProductRepositoryInterface extends RepositoryInterface<Product> { }