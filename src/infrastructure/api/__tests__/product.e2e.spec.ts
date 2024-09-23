import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {

  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const input = {
      name: "Product 1",
      price: 100,
    };

    const response = await request(app).post("/product").send(input);

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe("Product 1");
    expect(response.body.price).toBe(100);
  });

  it("should not create a product", async () => {
    const input = {
      name: "",
      price: -1,
    };

    const response = await request(app).post("/product").send(input);

    expect(response.statusCode).toBe(500);
  });

  it("should find a product", async () => {
    const response1 = await request(app).post("/product").send({
      name: "Product 1",
      price: 100,
    });
    expect(response1.statusCode).toBe(200);

    const response2 = await request(app)
    .get(`/product/${response1.body.id}`)
    .send();
  
    expect(response2.statusCode).toBe(200);
    expect(response2.body.name).toBe("Product 1");
    expect(response2.body.price).toBe(100);
  });

  it("should not find product", async () => {
    const response = await request(app)
    .get(`/product/1`)
    .send();
  
    expect(response.statusCode).toBe(500);
  });

  it("should list products", async () => {
    const response1 = await request(app)
      .post("/product")
      .send({ name: "Product 1", price: 100 });

    const response2 = await request(app)
      .post("/product")
      .send({ name: "Product 2", price: 200 });

    expect(response1.statusCode).toBe(200); 
    expect(response2.statusCode).toBe(200); 

    const response3 = await request(app).get(`/product`).send();
  
    expect(response3.statusCode).toBe(200);
    expect(response3.body.products.length).toBe(2);
    expect(response3.body.products[0].name).toBe("Product 1");
    expect(response3.body.products[0].price).toBe(100);
    expect(response3.body.products[1].name).toBe("Product 2");
    expect(response3.body.products[1].price).toBe(200);
  });

  it("should update a product", async () => {
    const response1 = await request(app)
      .post("/product")
      .send({ name: "Product 1", price: 100 });

    expect(response1.statusCode).toBe(200);
    
    const input = {
      name: "Product Updated",
      price: 200,
    };

    const response2 = await request(app)
      .put(`/product/${response1.body.id}`)
      .send(input);
  
    expect(response2.statusCode).toBe(200);
    expect(response2.body.id).toBe(response1.body.id);
    expect(response2.body.name).toBe(input.name);
    expect(response2.body.price).toBe(input.price);
  });

  it("should not find product", async () => {
    const input = {
      name: "Product Updated",
      price: 200,
    };
    
    const response = await request(app)
      .put(`/product/1`)
      .send(input);
  
    expect(response.statusCode).toBe(500);
  });
});