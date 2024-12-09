const app = require("../app.js");
const request = require("supertest");
const db = require("../DB/connection");
const seed = require("../DB/seeds/seed");
const data = require("../db/data/testData/index.js");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("Post /api/pursuits/", () => {
  test("should post a pursuit to the pursuits table and return information of the posted pursuit", () => {
    return request(app)
      .post("/api/pursuits/")
      .send({
        host_ID: 5,
        image: "https://example.com/hunt1.jpg",
        targetLat: 41.7128,
        targetLong: -75.006,
        randomLat: 41.71,
        randomLong: -75.01,
        difficulty: "Easy",
        active: true,
        title: "Simple Hunt 2",
      })
      .expect(200)
      .then(({ body }) => {
        const pursuit = body.pursuit;
        expect(typeof pursuit.created_at).toBe("string");
      });
  });
  test("should return a 400 if passed an incomplete post body.", () => {
    return request(app)
      .post("/api/pursuits/")
      .send({
        host_ID: 5,
        image: "https://example.com/hunt1.jpg",
        targetLat: 41.7128,
        active: true,
        title: "Simple Hunt 2",
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request: You are missing body information");
      });
  });
});
