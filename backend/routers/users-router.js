const {
  patchUsersPointsByUserId,
  getUsersbyUsername,
  postUsersAuth,
} = require("../controllers/users-controllers");

const usersRouter = require("express").Router();

const { getUsers, postUsers } = require("../controllers/users-controllers");

usersRouter.route("/").get(getUsers).post(postUsers);

usersRouter.get("/:username", getUsersbyUsername);

usersRouter.patch("/points/:userID", patchUsersPointsByUserId);

usersRouter.post("/login", postUsersAuth);

module.exports = usersRouter;
