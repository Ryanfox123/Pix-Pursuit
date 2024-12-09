const app = require("../app");
const request = require("supertest");
const data = require("../db/data/testData/index.js");
const db = require("../DB/connection");
const seed = require("../DB/seeds/seed");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("/api/pursuitsCompletedByUsers/users/:user_id", () => {
  it("responds 200 - returns an array off all the pursuits a user has completed", () => {
    return request(app)
      .get("/api/pursuitsCompletedByUsers/users/2")
      .expect(200)
      .then(({ body: { pursuits } }) => {
        expect(pursuits.length).toBe(2);
        expect(pursuits[0].pursuit_id).toBe(1);
        expect(pursuits[1].pursuit_id).toBe(3);
      });
  });

  it("responds 400 - returns an error message if user id is an invalid type", () => {
    return request(app)
      .get("/api/pursuitsCompletedByUsers/users/invalid_id")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("400: Invalid request");
      });
  });
});
