import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for custmer", () => {

  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const response = await request(app)
     .post("/customer")
     .send({ 
        name: "John", 
        address: {
          street: "street",
          number: 1,
          zipcode: "zipcode",
          city: "city",
          country: "country",
        },
      });
    
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("John");
    expect(response.body.address.street).toBe("street");
    expect(response.body.address.number).toBe(1);
    expect(response.body.address.zipcode).toBe("zipcode");
    expect(response.body.address.city).toBe("city");
    expect(response.body.address.country).toBe("country");
  });

  it("should not create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({ name: "John" });

    expect(response.statusCode).toBe(500);
  });

  it("should list all customers", async () => {
    const response1 = await request(app)
      .post("/customer")
      .send({ 
        name: "John", 
        address: {
          street: "street",
          number: 1,
          zipcode: "zipcode",
          city: "city",
          country: "country",
        },
      });

    const response2 = await request(app)
      .post("/customer")
      .send({ 
        name: "Jane", 
        address: {
          street: "street",
          number: 1,
          zipcode: "zipcode",
          city: "city",
          country: "country",
        },
      });

    expect(response1.statusCode).toEqual(200);
    expect(response2.statusCode).toEqual(200);

    const listResponse = await request(app).get("/customer").send();

    expect(listResponse.statusCode).toEqual(200);
    expect(listResponse.body.customers.length).toBe(2);
    expect(listResponse.body.customers[0].id).toBe(response1.body.id);
    expect(listResponse.body.customers[0].name).toBe("John");
    expect(listResponse.body.customers[1].id).toBe(response2.body.id);
    expect(listResponse.body.customers[1].name).toBe("Jane");
  });
});