const { Pool } = require("pg");

require("dotenv").config();

const config = {
  user: process.env.PG_USER || "postgres",
  password: process.env.PG_PASSWORD || "postgres",
  host: process.env.PG_HOST || "localhost",
  port: process.env.PG_PORT || 5432,
  database: process.env.PG_DB || "pix_pursuit",
};

console.log(config);

module.exports = new Pool(config);
