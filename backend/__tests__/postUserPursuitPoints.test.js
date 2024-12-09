const app = require("../app.js");
const request = require("supertest");
const db = require("../DB/connection");
const seed = require("../DB/seeds/seed");
const data = require("../db/data/testData/index.js");
const exp = require("constants");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("post User/pursuits/points", () => {
  test("200: should post a new user into the completed_pursuits table and give them the correct points depending on their position", () => {
    return request(app)
      .post("/api/pursuitsCompletedByUsers")
      .send({ user_id: 1, pursuit_id: 3 })
      .expect(200)
      .then(({ body }) => {
        expect(body.points).toBe(10);
      });
  });
  test("400 should return an error if passed incorrect body data", () => {
    return request(app)
      .post("/api/pursuitsCompletedByUsers")
      .send({ user_id: 1, pursuit_id: "hello" })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("400: Invalid request");
      });
  });
  test("should return a 404 if a valid but non-existant pursuit id is passed", () => {
    return request(app)
      .post("/api/pursuitsCompletedByUsers")
      .send({ user_id: 1, pursuit_id: 10 })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("404: Item not found");
      });
  });
});
