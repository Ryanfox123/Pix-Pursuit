const app = require("../app");
const request = require("supertest");
const data = require("../db/data/testData/index.js");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const endpointsJSON = require("../endpoints.json");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("/api", () => {
  it("responds 200 - returnd endpoints.json", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJSON);
      });
  });
});
