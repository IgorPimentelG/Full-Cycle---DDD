import express, { Request, Response } from "express";
import ProductRepository from "../../product/repositories/product.repository";
import { CreateProductUseCase } from "../../../usecase/product/create/create.product.uescase";
import { ListProductUseCase } from "../../../usecase/product/list/list.product.usecase";
import { UpdateProductUseCase } from "../../../usecase/product/update/update.product.usecase";
import { FindProductUseCase } from "../../../usecase/product/find/find.product.usecase";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const productRepository = new ProductRepository();
  const usecase = new CreateProductUseCase(productRepository);

  try {
    const input = {
      name: req.body.name,
      price: req.body.price,
    };

    const output = await usecase.execute(input);
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

productRoute.get("/", async (req: Request, res: Response) => {
  const productRepository = new ProductRepository();
  const usecase = new ListProductUseCase(productRepository);

  try {
    const output = await usecase.execute();
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

productRoute.get("/:id", async (req: Request, res: Response) => {
  const productRepository = new ProductRepository();
  const usecase = new FindProductUseCase(productRepository);

  try {
    const input = { id: `${req.params.id}` };

    const output = await usecase.execute(input);
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

productRoute.put("/:id", async (req: Request, res: Response) => {
  const productRepository = new ProductRepository();
  const usecase = new UpdateProductUseCase(productRepository);

  try {
    const input = {
      id: `${req.params.id}`,
      name: req.body.name,
      price: req.body.price,
    };

    const output = await usecase.execute(input);
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});