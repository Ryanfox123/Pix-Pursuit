const express = require("express");
const apiRouter = require("./routers/api-router");
const { customErrors, sqlErrors } = require("./error-handler");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);

app.get("*", (req, res, next) => {
  res.status(404).send({ msg: "endpoint not found" });
});

app.use(customErrors);

app.use(sqlErrors);

module.exports = app;
