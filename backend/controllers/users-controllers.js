const { selectUserPursuitByPursuitId } = require("../models/pursuits-model.js");
const {
  selectUsers,
  insertUsers,
  selectUsersByUsername,
  selectUsersPointsByPursuitId,
  updateUsersPointsByUserId,
  updateUsersPursuitByUserId,
  insertUsersPursuitPoints,
  insertUsersAuth,
  selectUsersPWbyUsername,
  selectCompletedPursuits,
} = require("../models/users-models.js");
const bcrypt = require("bcryptjs");

exports.getUsers = (req, res, next) => {
  selectUsers().then((users) => {
    res.status(200).send({ users: users });
  });
};

exports.postUsers = (req, res, next) => {
  selectUsers()
    .then((users) => {
      console.log(users, req.body.username);

      if (
        users.some((user) => user.username === req.body.username) ||
        users.some((user) => user.email === req.body.email)
      ) {
        return Promise.reject({ status: 400, msg: "User already exists" });
      }

      return insertUsers(req.body);
    })
    .then((user) => {
      console.log(user);
      res.status(201).send({ user });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getUsersbyUsername = (req, res, next) => {
  const { username } = req.params;
  selectUsersByUsername(username)
    .then((user) => {
      res.status(200).send({ user: user });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getUsersPointsByPursuitId = (req, res, next) => {
  const { pursuitId } = req.params;

  selectUserPursuitByPursuitId(pursuitId)
    .then(() => {
      selectUsersPointsByPursuitId(pursuitId).then((users) => {
        res.status(200).send({ users });
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchUsersPointsByUserId = (req, res, next) => {
  const { userID } = req.params;
  const { body } = req;
  const { inc_points } = body;
  updateUsersPointsByUserId(userID, inc_points)
    .then((user) => {
      res.status(200).send({ user: user });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchUsersPursuitByUserId = (req, res, next) => {
  const { userID } = req.params;

  updateUsersPursuitByUserId(userID, req.body)
    .then((currentPursuit) => {
      res.status(200).send({ currentPursuit });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postUsersPursuitPoints = (req, res, next) => {
  const body = req.body;
  selectUsersPointsByPursuitId(body.pursuit_id)
    .then((winners) => {
      const placement = winners.length;
      return insertUsersPursuitPoints(body, placement);
    })
    .then((points) => {
      res.status(200).send({ points: points });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postUsersAuth = async (req, res, next) => {
  const { username, password } = req.body;
  selectUsersPWbyUsername(username)
    .then((encryptedPw) => {
      return bcrypt.compare(password, encryptedPw.Password);
    })
    .then((result) => {
      if (result) {
        selectUsersByUsername(username).then((user) => {
          res.status(200).send({ user });
        });
      } else {
        res.status(401).send({ msg: "Invalid username or password." });
      }
    })
    .catch((err) => {
      next(err);
    });
  return insertUsersAuth();
};

exports.getCompletedPursuits = (req, res, next) => {
  const { userId } = req.params;
  selectCompletedPursuits(userId)
    .then((pursuits) => {
      res.status(200).send({ pursuits });
    })
    .catch((err) => {
      next(err);
    });
};
