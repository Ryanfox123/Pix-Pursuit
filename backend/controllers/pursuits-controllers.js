const {
  selectPursuits,
  selectHostedPursuitByHostId,
  selectUserPursuitByPursuitId,
  insertPursuit,
  updatePursuitByPursuitId,
  selectPursuitImage,
} = require("../models/pursuits-model");

exports.getPursuits = (req, res, next) => {
  const { lat, long } = req.query;
  selectPursuits(lat, long)
    .then((pursuits) => {
      res.status(200).send({ pursuits: pursuits });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postPursuit = (req, res, next) => {
  const body = req.body;
  insertPursuit(body)
    .then((pursuit) => {
      res.status(200).send({ pursuit: pursuit });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getUserPursuitByPursuitId = (req, res, next) => {
  const { pursuitID } = req.params;
  selectUserPursuitByPursuitId(pursuitID)
    .then((pursuit) => {
      res.status(200).send({ pursuit: pursuit });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getHostedPursuitByHostId = (req, res, next) => {
  const { hostID } = req.params;

  selectHostedPursuitByHostId(hostID)
    .then((pursuit) => {
      res.status(200).send({ pursuit: pursuit });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchPursuitByPursuitId = (req, res, next) => {
  const { pursuitID } = req.params;

  updatePursuitByPursuitId(pursuitID, req.body)
    .then((pursuit) => {
      res.status(200).send({ pursuit });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getPursuitImage = (req, res, next) => {
  const { pursuitID } = req.params;
  selectUserPursuitByPursuitId(pursuitID)
    .then((res) => {
      return selectPursuitImage(res.image);
    })
    .then(({ image }) => {
      res.status(200).send({ image });
    })
    .catch((err) => {
      next(err);
    });
};
