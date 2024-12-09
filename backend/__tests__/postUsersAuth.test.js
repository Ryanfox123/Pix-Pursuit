const exp = require("constants");
const app = require("../app");
const data = require("../db/data/testData/index.js");
const request = require("supertest");
const db = require("../DB/connection");
const seed = require("../DB/seeds/seed");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("POST /api/users/login", () => {
  test("200: Should successfully login to an account if user provides correct info", () => {
    return request(app)
      .post("/api/users/login")
      .send({ username: "user1", password: "pass123" })
      .expect(200)
      .then(({ body: { user } }) => {
        expect(user).toEqual({
          hosted_pursuit_id: 1,
          points: 100,
          pursuit_id: null,
          user_id: 1,
          username: "user1",
        });
      });
  });
  test("401: Should FAIL to login in to an account if user provides incorrect info", () => {
    return request(app)
      .post("/api/users/login")
      .send({ username: "user1", password: "wrongPass" })
      .expect(401)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid username or password.");
      });
  });
  test("404: Should give a 404 if no username is found", () => {
    return request(app)
      .post("/api/users/login")
      .send({ username: "wrongUser", password: "wrongPass" })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("404: User not found");
      });
  });
});
