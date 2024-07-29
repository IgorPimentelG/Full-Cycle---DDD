import Customer from '../entities/Customer';
import RepositoryInterface from './@shared/repository-interface';

export default interface CustomerRepositoryInterface extends RepositoryInterface<Customer> { }