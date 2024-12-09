const app = require("../app");
const request = require("supertest");
const data = require("../db/data/testData/index.js");
const db = require("../DB/connection");
const seed = require("../DB/seeds/seed");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("get users/:username", () => {
  test("should return a users information when passed a username", () => {
    return request(app)
      .get("/api/users/user1")
      .expect(200)
      .then(({ body }) => {
        const user = body.user;
        expect(user.username).toBe("user1");
        expect(user.points).toBe(100);
        expect(user.user_id).toBe(1);
        expect(user.pursuit_id).toBe(null);
        expect(user.hosted_pursuit_id).toBe(1);
      });
  });
  test("should return a 404 when a user isnt found with matching endpoint", () => {
    return request(app)
      .get("/api/users/falseuser")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("404: User not found");
      });
  });
  test("should return a users information when passed a username for a user that is not hosting a hunt", () => {
    return request(app)
      .get("/api/users/user5")
      .expect(200)
      .then(({ body }) => {
        const user = body.user;
        expect(user.username).toBe("user5");
        expect(user.points).toBe(200);
        expect(user.user_id).toBe(5);
        expect(user.pursuit_id).toBe(2);
        expect(user.hosted_pursuit_id).toBe(null);
      });
  });
});
