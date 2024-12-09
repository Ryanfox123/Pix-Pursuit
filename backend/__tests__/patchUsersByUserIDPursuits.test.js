const app = require("../app");
const request = require("supertest");
const data = require("../db/data/testData/index.js");
const db = require("../DB/connection");
const seed = require("../DB/seeds/seed");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("patch /api/users/:user_id/pursuit", () => {
  it("responds 200 - returns the user id and their updated current pursuit id", () => {
    return request(app)
      .patch("/api/usersToCurrentPursuit/1")
      .send({ newPursuit: 1 })
      .expect(200)
      .then(({ body: { currentPursuit } }) => {
        expect(currentPursuit.pursuit_id).toBe(1);
        expect(currentPursuit.user_id).toBe(1);
      });
  });
  it("responds 200 - returns the user id and their updated current pursuit id when setting the pursuit id to null", () => {
    return request(app)
      .patch("/api/usersToCurrentPursuit/1")
      .send({ newPursuit: null })
      .expect(200)
      .then(({ body: { currentPursuit } }) => {
        expect(currentPursuit.pursuit_id).toBe(null);
        expect(currentPursuit.user_id).toBe(1);
      });
  });
  it("responds 400 - returns an error message if the new pursuit is missing", () => {
    return request(app)
      .patch("/api/usersToCurrentPursuit/1")
      .send()
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("request must include newPursuit");
      });
  });
  it("responds 400 - returns an error message if the newPursuits is an invalid data type", () => {
    return request(app)
      .patch("/api/usersToCurrentPursuit/1")
      .send({ newPursuit: "string" })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("400: Invalid request");
      });
  });
  it("responds 404 - returns an error message if user id does not exist", () => {
    return request(app)
      .patch("/api/usersToCurrentPursuit/999")
      .send({ newPursuit: 1 })
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("user does not exist");
      });
  });
  it("responds 400 - returns an error message if user id is an invalid type", () => {
    return request(app)
      .patch("/api/usersToCurrentPursuit/invalidType")
      .send({ newPursuit: 1 })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("400: Invalid request");
      });
  });
  it("responds 404 - returns an error message if the newPursuit id does not exist", () => {
    return request(app)
      .patch("/api/usersToCurrentPursuit/1")
      .send({ newPursuit: 99 })
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("404: Item not found");
      });
  });
});
