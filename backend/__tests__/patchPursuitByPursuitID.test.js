const app = require("../app");
const request = require("supertest");
const data = require("../db/data/testData/index.js");
const db = require("../DB/connection");
const seed = require("../DB/seeds/seed");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("patch /pursuits/:pursuitID", () => {
  it("responds 200 - returns pursuit with active updated to either true or false", () => {
    return request(app)
      .patch("/api/pursuits/1")
      .send({ active: false })
      .expect(200)
      .then(({ body: { pursuit } }) => {
        expect(pursuit.pursuit_id).toBe(1);
        expect(pursuit.host_id).toBe(1);
        expect(pursuit.image).toBe("https://example.com/hunt1.jpg");
        expect(pursuit.target_lat).toBe(40.7128);
        expect(pursuit.target_long).toBe(-74.006);
        expect(pursuit.random_lat).toBe(40.71);
        expect(pursuit.random_long).toBe(-74.01);
        expect(pursuit.difficulty).toBe("Easy");
        expect(pursuit.active).toBe(false);
        expect(pursuit.title).toBe("Simple Hunt");
      });
  });
  it("responds 400 - returns an error message if the given pursuit is an invalid type", () => {
    return request(app)
      .patch("/api/pursuits/invalidType")
      .send({ active: false })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("400: Invalid request");
      });
  });
  it("responds 404 - returns an error message if the given pursuit is a valid type but does not exist", () => {
    return request(app)
      .patch("/api/pursuits/999")
      .send({ active: false })
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("404: Pursuit does not exist");
      });
  });
  it("responds 400 - returns an error message if the request body does not contain active", () => {
    return request(app)
      .patch("/api/pursuits/1")
      .send()
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request: You are missing body information");
      });
  });
  it("responds 400 - returns an error message if the request body contains active but it is the wrong data type", () => {
    return request(app)
      .patch("/api/pursuits/1")
      .send({ active: "false" })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("active my be type bool");
      });
  });
});
