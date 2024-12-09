const app = require("../app");
const request = require("supertest");
const data = require("../db/data/testData/index.js");
const db = require("../DB/connection");
const seed = require("../DB/seeds/seed");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("GET /pursuits/:hostID/host", () => {
  test("200: should get back pursuit info when give a host id.", () => {
    return request(app)
      .get("/api/pursuits/host/1")
      .expect(200)
      .then(({ body }) => {
        const pursuit = body.pursuit;
        expect(pursuit).toEqual({
          pursuit_id: 1,
          host_id: 1,
          image: "https://example.com/hunt1.jpg",
          target_lat: 40.7128,
          target_long: -74.006,
          random_lat: 40.71,
          random_long: -74.01,
          difficulty: "Easy",
          completions: 3,
          active: true,
          created_at: "2024-01-01T00:00:00.000Z",
          title: "Simple Hunt",
        });
      });
  });
  test("should return a 400 if passed a bad type of host_ID", () => {
    return request(app)
      .get("/api/pursuits/host/wrong")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("400: Invalid request");
      });
  });
  test("should return a 404 if passed a host id of valid user but they are not linked to any active pursuits", () => {
    return request(app)
      .get("/api/pursuits/host/2")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("No active pursuits linked to this host");
      });
  });
});
