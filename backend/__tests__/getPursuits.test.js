const app = require("../app");
const data = require("../db/data/testData/index");
const request = require("supertest");
const db = require("../DB/connection");
const seed = require("../DB/seeds/seed");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("/api/pursuits", () => {
  test("should return an array of pursuits, each of which should have a ", () => {
    return request(app)
      .get("/api/pursuits")
      .expect(200)
      .then(({ body }) => {
        expect(body.pursuits).toEqual(expect.any(Array));
        expect(Object.keys(body.pursuits[0].length === 12));
        body.pursuits.forEach((pursuit) => {
          expect(typeof pursuit.pursuit_id).toBe("number");
          expect(typeof pursuit.host_id).toBe("number");
          expect(typeof pursuit.image).toBe("string");
          expect(typeof pursuit.target_lat).toBe("number");
          expect(typeof pursuit.target_long).toBe("number");
          expect(typeof pursuit.difficulty).toBe("string");
          expect(typeof pursuit.completions).toBe("number");
          expect(typeof pursuit.active).toBe("boolean");
          expect(typeof pursuit.created_at).toBe("string");
          expect(typeof pursuit.title).toBe("string");
        });
      });
  });
  test("should return an array of pursuits withing 20km of given lat and long ", () => {
    return request(app)
      .get("/api/pursuits?lat=40.7128&long=-74.006")
      .expect(200)
      .then(({ body: { pursuits } }) => {
        expect(pursuits.length).toBe(1);
      });
  });
});
