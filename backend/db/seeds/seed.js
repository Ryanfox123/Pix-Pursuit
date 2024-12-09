const db = require("../connection");
const format = require("pg-format");
const bcrypt = require("bcryptjs");

const seed = ({ usersData, huntsData, completionsData }) => {
  return db
    .query(`DROP TABLE IF EXISTS pursuitsCompletedByUsers;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS usersToCurrentPursuit;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS pursuits;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return db.query(`CREATE TABLE users (
        user_ID SERIAL PRIMARY KEY,
        email VARCHAR(60) NOT NULL,
        password VARCHAR(100) NOT NULL,
        username VARCHAR(20) NOT NULL,
        points INT DEFAULT 0
        );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE pursuits (
        pursuit_ID SERIAL PRIMARY KEY,
        host_ID INT NOT NULL REFERENCES users(user_ID) ON DELETE CASCADE,
        image VARCHAR(500) NOT NULL,
        target_lat FLOAT NOT NULL,
        target_long FLOAT NOT NULL,
        random_lat FLOAT NOT NULL,
        random_long FLOAT NOT NULL,
        difficulty VARCHAR(6) NOT NULL,
        completions INT DEFAULT 0,
        active BOOLEAN NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        title VARCHAR(100)
        );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE usersToCurrentPursuit (
            user_ID INT REFERENCES users(user_ID) NOT NULL,
            pursuit_ID INT REFERENCES pursuits(pursuit_ID) DEFAULT NULL
            )`);
    })
    .then(() => {
      return db.query(`CREATE TABLE pursuitsCompletedByUsers (
            pursuit_ID INT REFERENCES pursuits(pursuit_ID) DEFAULT NULL,
            user_ID INT REFERENCES users(user_ID) NOT NULL,
            points INT NOT NULL
            )`);
    })
    .then(() => {
      const saltRounds = 4;
      const promisedUsers = usersData.map(
        ({ email, password, points, username }) =>
          bcrypt.hash(password, saltRounds).then((encryptedPW) => {
            return [email, encryptedPW, points, username];
          })
      );
      return Promise.all(promisedUsers).then((res) => {
        const insertIntoUsersQueryStr = format(
          "INSERT INTO users (email, password, points, username) VALUES %L",
          res
        );
        return db.query(insertIntoUsersQueryStr);
      });
    })
    .then(() => {
      const insertIntoPursuitsStr = format(
        "INSERT INTO pursuits (host_ID, image, target_lat, target_long, random_lat, random_long, difficulty, active, created_at, title ) VALUES %L",
        huntsData.map(
          ({
            hostID,
            image,
            targetLat,
            targetLong,
            randomLat,
            randomLong,
            difficulty,
            active,
            createdAt,
            title,
          }) => [
            hostID,
            image,
            targetLat,
            targetLong,
            randomLat,
            randomLong,
            difficulty,
            active,
            createdAt,
            title,
          ]
        )
      );
      return db.query(insertIntoPursuitsStr);
    })
    .then(() => {
      const insertIntoParticipants = format(
        "INSERT INTO usersToCurrentPursuit (user_ID, pursuit_ID) VALUES %L",
        usersData.map(({ ID, pursuitID }) => [ID, pursuitID])
      );
      return db.query(insertIntoParticipants);
    })
    .then(() => {
      const insertIntoCompletions = format(
        "INSERT INTO pursuitsCompletedByUsers (pursuit_ID, user_ID, points) VALUES %L",
        completionsData.map(({ pursuit_id, user_id, points }) => [
          pursuit_id,
          user_id,
          points,
        ])
      );
      return db.query(insertIntoCompletions);
    });
};

module.exports = seed;
