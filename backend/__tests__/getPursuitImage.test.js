const app = require("../app");
const data = require("../db/data/testData/index");
const request = require("supertest");
const db = require("../DB/connection");
const seed = require("../DB/seeds/seed");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("Grabs image from amazon bucket via pursuit id", () => {
  test.only("should take a pursuit id and return an image from amazon bucket", () => {
    return request(app)
      .get("/api/pursuits/4/image")
      .expect(200)
      .then(({ body }) => {
        console.log(body.image);
      });
  });
});
