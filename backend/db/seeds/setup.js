const db = require("../connection.js");
const setup = async () => {
  await db.query(`
      CREATE DATABASE pix_pursuit;`);
  await db.query(`
    CREATE DATABASE pix_pursuit_test;`);
};

setup();
