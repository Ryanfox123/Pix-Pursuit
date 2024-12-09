const apiRouter = require("express").Router();
const usersRouter = require("./users-router");
const purusitsRouter = require("./pursuits-router");
const pursuitsCompletedByUsersRouter = require("./pursuitsCompletedByUsers-router");
const usersToCurrentPursuitRouter = require("./usersToCurrentPursuit-router");
const endpointsJSON = require("../endpoints.json");

apiRouter.use("/users", usersRouter);

apiRouter.use("/pursuits", purusitsRouter);

apiRouter.use("/pursuitsCompletedByUsers", pursuitsCompletedByUsersRouter);

apiRouter.use("/usersToCurrentPursuit", usersToCurrentPursuitRouter);

apiRouter.get("/", (req, res) => {
  res.status(200).send({ endpoints: endpointsJSON });
});

module.exports = apiRouter;
