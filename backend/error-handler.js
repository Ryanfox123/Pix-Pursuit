exports.customErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.sqlErrors = (err, req, res, next) => {
  if (err.code === "23502") {
    return res
      .status(400)
      .send({ msg: "Bad request: You are missing body information" });
  }
  if (err.code === "23503") {
    return res.status(404).send({ msg: "404: Item not found" });
  }
  if (err.code === "22P02") {
    return res.status(400).send({ msg: "400: Invalid request" });
  }

  console.log("\u001b[1;41m uncaught error >>", err);
  console.log("\u001b[0m");

  res.status(500).send({});
};
