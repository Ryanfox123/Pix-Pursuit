const format = require("pg-format");
const db = require("../db/connection");
const bcrypt = require("bcryptjs");

exports.selectUsers = () => {
  const queryStr = `SELECT * FROM users ORDER BY points DESC`;
  return db.query(queryStr).then(({ rows }) => {
    return rows;
  });
};

exports.insertUsers = async ({ username, email, password }) => {
  if (!username || !email || !password) {
    return Promise.reject({ status: 400, msg: "invalid request body" });
  }
  const saltRounds = 4;
  const hash = await bcrypt.hash(password, saltRounds);

  return db
    .query(
      `
        INSERT INTO users 
        (username, email, password)
        VALUES
        ($1,
        $2,
        $3)
        RETURNING *
        `,
      [username, email, hash]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.selectUsersByUsername = (username) => {
  return db
    .query(
      `SELECT username, password, users.user_ID, users.points, usersToCurrentPursuit.pursuit_ID, pursuits.pursuit_ID AS hosted_pursuit_id FROM users
      JOIN usersToCurrentPursuit
      ON users.user_ID = usersToCurrentPursuit.user_ID
      LEFT JOIN pursuits
      ON users.user_ID = pursuits.host_ID
      WHERE username = $1;`,
      [username]
    )
    .then((user) => {
      const userInfo = user.rows[0];

      if (!userInfo) {
        return Promise.reject({ status: 404, msg: "404: User not found" });
      }

      return {
        username: userInfo.username,
        points: userInfo.points,
        user_id: userInfo.user_id,
        pursuit_id: userInfo.pursuit_id,
        hosted_pursuit_id: userInfo.hosted_pursuit_id,
      };
    });
};

exports.selectUsersPointsByPursuitId = (id) => {
  return db
    .query(
      `SELECT username, pursuitsCompletedByUsers.points FROM users
    JOIN pursuitsCompletedByUsers ON users.user_ID = pursuitsCompletedByUsers.user_ID
    WHERE pursuit_id = $1
    ORDER BY points DESC
    LIMIT 3;
    `,
      [id]
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.updateUsersPointsByUserId = (userID, inc_points) => {
  return Promise.all([
    inc_points,
    db.query(
      `
            SELECT user_ID, points FROM users
            WHERE user_ID = $1
            `,
      [userID]
    ),
  ])
    .then(([inc_points, { rows }]) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: "user_id is invalid" });
      }
      const user = rows[0];
      const newPoints = inc_points + user.points;
      return db.query(
        `
        UPDATE users
        SET points = $1
        WHERE user_ID = $2
        RETURNING *
        `,
        [newPoints, user.user_id]
      );
    })
    .then(({ rows }) => {
      const user = rows[0];
      return { username: user.username, points: user.points };
    });
};

exports.updateUsersPursuitByUserId = (id, { newPursuit }) => {
  if (newPursuit === undefined) {
    return Promise.reject({
      status: 400,
      msg: "request must include newPursuit",
    });
  }
  return db
    .query(`SELECT * FROM users WHERE user_id = $1`, [id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "user does not exist" });
      }
      return db.query(
        `
    UPDATE usersToCurrentPursuit
    SET pursuit_id = $1
    WHERE user_id = $2
    RETURNING *`,
        [newPursuit, id]
      );
    })
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.insertUsersPursuitPoints = (body, placement) => {
  const pointsChart = {
    0: 50,
    1: 25,
    2: 10,
  };
  const newBody = [
    body.pursuit_id,
    body.user_id,
    placement > 2 ? 5 : pointsChart[placement],
  ];
  const postStr = format(
    `INSERT INTO pursuitsCompletedByUsers
  (pursuit_id, user_id, points)
  VALUES %L
  RETURNING *;`,
    [newBody]
  );
  return db.query(postStr).then((points) => {
    return points.rows[0].points;
  });
};

exports.insertUsersAuth = () => {};

exports.selectUsersPWbyUsername = (username) => {
  return db
    .query(
      `SELECT * FROM users
  WHERE username = $1;`,
      [username]
    )
    .then((user) => {
      const userInfo = user.rows[0];
      if (!userInfo) {
        return Promise.reject({ status: 404, msg: "404: User not found" });
      }
      return {
        Password: userInfo.password,
      };
    });
};

exports.selectCompletedPursuits = (user_id) => {
  return db
    .query(`select * from pursuitsCompletedByUsers Where user_ID = $1`, [
      user_id,
    ])
    .then(({ rows }) => {
      return rows;
    });
};
