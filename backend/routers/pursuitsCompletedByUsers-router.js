const {
  getUsersPointsByPursuitId,
  patchUsersPursuitByUserId,
  postUsersPursuitPoints,
} = require("../controllers/users-controllers");
const { getCompletedPursuits } = require("../controllers/users-controllers");

const pursuitsCompletedByUsersRouter = require("express").Router();

pursuitsCompletedByUsersRouter.post("/", postUsersPursuitPoints);

pursuitsCompletedByUsersRouter
  .route("/:pursuitId")
  .get(getUsersPointsByPursuitId);

pursuitsCompletedByUsersRouter.get("/users/:userId", getCompletedPursuits);

module.exports = pursuitsCompletedByUsersRouter;
