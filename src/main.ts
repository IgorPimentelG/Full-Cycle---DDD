import Address from "./domain/customer/entities/Address";
import Customer from "./domain/customer/entities/Customer";
import Order from "./domain/checkout/entities/Order";
import OrderItem from "./domain/checkout/entities/OrderItem";

let customer = new Customer("123", "Igor");
const address = new Address("Rua dois", 2, "12354-496", "São Paulo", "BR");
customer.changeAddress(address);
customer.activate();

const item1 = new OrderItem("1", "Item 1", 10.0, "p1", 1);
const item2 = new OrderItem("2", "Item 2", 10.0, "p1", 1);

const order = new Order("1", "123", [item1, item2])
