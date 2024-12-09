const app = require("../app");
const request = require("supertest");
const data = require("../db/data/testData/index.js");
const db = require("../DB/connection");
const seed = require("../DB/seeds/seed");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("get /api/pursuits/:pursuitID/users", () => {
  test(" 200: should return a specific pursuits information based on the ID passed", () => {
    return request(app)
      .get("/api/pursuits/1")
      .expect(200)
      .then(({ body }) => {
        const pursuit = body.pursuit;
        expect(pursuit.pursuit_id).toBe(1);
        expect(pursuit.host_id).toBe(1);
        expect(pursuit.image).toBe("https://example.com/hunt1.jpg");
        expect(pursuit.target_lat).toBe(40.7128);
        expect(pursuit.created_at).toBe("2024-01-01T00:00:00.000Z");
        expect(pursuit.active).toBe(true);
      });
  });
  test("404: should return with a error if passed a pursuit id that is not valid", () => {
    return request(app)
      .get("/api/pursuits/100")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("404: Pursuit not found");
      });
  });
  test("400: should return with a error if passed a pursuit id that is not a valid data type for pursuitID", () => {
    return request(app)
      .get("/api/pursuits/wrong")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("400: Invalid request");
      });
  });
});
