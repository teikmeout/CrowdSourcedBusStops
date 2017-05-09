const pgp = require('pg-promise')();

const db = pgp(process.env.DATABASE_URL || {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASS,
});

// const db = pgp(process.env.DATABASE_URL || 'postgres://taka@localhost:5423/csbusstop2')

module.exports = db;
