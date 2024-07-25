import Order from '../entities/Order';
import RepositoryInterface from './repository-interface';

export default interface OrderRepositoryInterface extends RepositoryInterface<Order> { }