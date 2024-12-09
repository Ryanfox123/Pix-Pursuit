const app = require("../app");
const request = require("supertest");
const data = require("../db/data/testData/index.js");
const db = require("../DB/connection");
const seed = require("../DB/seeds/seed");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("post /api/users", () => {
  it("responds 201 - returns a newly created user object", () => {
    return request(app)
      .post("/api/users")
      .send({
        email: "testemail@email.com",
        password: "password",
        username: "username",
      })
      .expect(201)
      .then(({ body: { user } }) => {
        console.log(user);
        expect(user.username).toBe("username");
        expect(typeof user.user_id).toBe("number");
        expect(user.email).toBe("testemail@email.com");
        expect(user.points).toBe(0);
      });
  });
  it("responds 201 - new users password is hashed", () => {
    return request(app)
      .post("/api/users")
      .send({
        email: "testemail@email.com",
        password: "password",
        username: "username",
      })
      .expect(201)
      .then(({ body: { user } }) => {
        expect(user.password).not.toBe("password");
      });
  });
  it("responds 400 - returns an error message if anything is missing from the request body", () => {
    return request(app)
      .post("/api/users")
      .send({ username: "username" })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("invalid request body");
      });
  });
  it("responds 400 - returns an error message if user with duplicate username tries to create an account", () => {
    return request(app)
      .post("/api/users")
      .send({
        email: "user1@example.com",
        password: "pass123",
        username: "user1",
      })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("User already exists");
      });
  });
  it("responds 400 - returns an error message if user with duplicate email tries to create an account", () => {
    return request(app)
      .post("/api/users")
      .send({
        email: "user1@example.com",
        password: "pass11223",
        username: "user100",
      })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("User already exists");
      });
  });
});
