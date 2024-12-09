const app = require("../app");
const data = require("../db/data/testData/index");
const request = require("supertest");
const db = require("../DB/connection");
const seed = require("../DB/seeds/seed");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("/api/users/points/:pursuitId", () => {
  it("responds 200 - returns an array of 3 user objects with properties username and points", () => {
    return request(app)
      .get("/api/pursuitsCompletedByUsers/1")
      .expect(200)
      .then(({ body: { users } }) => {
        expect(users.length).toBe(3);
        users.forEach((user) => {
          expect(typeof user.username).toBe("string");
          expect(typeof user.points).toBe("number");
        });
      });
  });
  it("responds 200 - returns the top 3 users in descending order of points", () => {
    return request(app)
      .get("/api/pursuitsCompletedByUsers/1")
      .expect(200)
      .then(({ body: { users } }) => {
        expect(users).toBeSorted({ descending: true, key: "points" });
      });
  });
  it("responds 404 - returns an error message if the pursuit id is a valid type but does not exist", () => {
    return request(app)
      .get("/api/pursuitsCompletedByUsers/999")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("404: Pursuit not found");
      });
  });
  it("responds 400 - returns an error message if the pursuit id is an invalid type", () => {
    return request(app)
      .get("/api/pursuitsCompletedByUsers/invalidId")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("400: Invalid request");
      });
  });
});
