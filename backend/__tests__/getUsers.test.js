const app = require("../app.js");
const request = require("supertest");
const db = require("../DB/connection");
const seed = require("../DB/seeds/seed");
const data = require("../db/data/testData/index.js");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("GET /api/users", () => {
  test("200 sends an array of all the users with the correct data", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const users = body.users;
        expect(users.length).toBe(5);
        users.forEach((user) => {
          expect(typeof user.user_id).toBe("number");
          expect(typeof user.email).toBe("string");
          expect(typeof user.points).toBe("number");
          expect(typeof user.password).toBe("string");
          expect(typeof user.username).toBe("string");
        });
      });
  });
  test("200 sends an array of all the users ordered by points descending", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body: { users } }) => {
        expect(users).toBeSorted({ key: "points", descending: true });
      });
  });
});
