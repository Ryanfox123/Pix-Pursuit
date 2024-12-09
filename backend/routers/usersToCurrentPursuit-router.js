const {
  patchUsersPursuitByUserId,
} = require("../controllers/users-controllers");

const usersToCurrentPursuitRouter = require("express").Router();

usersToCurrentPursuitRouter.patch("/:userID", patchUsersPursuitByUserId);

module.exports = usersToCurrentPursuitRouter;
