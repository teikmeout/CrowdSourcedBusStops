// to allow console log
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

// const db = pgp(process.env.DATABASE_URL || 'postgres://taka@localhost:5423/csbusstop2')
// user: process.env.PG_USER,
// password: process.env.PG_PASS,

// these are some fancy options that we use to log each SQL query we make to pg-promise
const options = {
  query: (e) => {
    console.log(e.query);
  },
};

// and we use these^^ options when we first require pg-promise
const pgp = require('pg-promise')(options);

// but we have to configure the details of this pg-promise
// DATABASE_URL will be URL from heroku
const config = process.env.DATABASE_URL || {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
};

const db = pgp(config);
module.exports = db;
