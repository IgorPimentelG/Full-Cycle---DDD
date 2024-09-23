import express, { Request, Response } from "express";
import { CreateCustomerUseCase } from "../../../usecase/customer/create/create.customer.usecase";
import CustomerRepository from "../../customer/repositories/customer.repository";
import CustomerDispatcher from "../../../domain/customer/entities/events/customer-dispatcher";
import { ListCustomerUseCase } from "../../../usecase/customer/list/list.customer.usecase";

export const customerRoute = express.Router();

customerRoute.post("/", async (req: Request, res: Response) => {
  const customerEventDispatcher = new CustomerDispatcher();
  const customerRepository = new CustomerRepository(customerEventDispatcher);
  const usecase = new CreateCustomerUseCase(customerRepository);

  try {
    const input = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        city: req.body.address.city,
        country: req.body.address.country,
        zipcode: req.body.address.zipcode,
        number: req.body.address.number
      },
    };

    const output = await usecase.execute(input);
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

customerRoute.get('/', async (req: Request, res: Response) => {
  const customerEventDispatcher = new CustomerDispatcher();
  const customerRepository = new CustomerRepository(customerEventDispatcher);

  const usecase = new ListCustomerUseCase(customerRepository);

  try {
    const output = await usecase.execute();
    res.send(output);
  } catch (error) { 
    res.status(500).send(error);
  }
});