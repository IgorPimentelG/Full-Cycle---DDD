import Order from '../entities/Order';
import RepositoryInterface from '../../@shared/repository/repository-interface';

export default interface OrderRepositoryInterface extends RepositoryInterface<Order> { }