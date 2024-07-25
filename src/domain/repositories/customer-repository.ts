import Customer from '../entities/Customer';
import RepositoryInterface from './repository-interface';

export default interface CustomerRepositoryInterface extends RepositoryInterface<Customer> { }