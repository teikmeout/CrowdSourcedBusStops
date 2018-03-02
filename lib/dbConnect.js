// const MongoClient = require('mongodb');

// // process.env.MONGOLAB_URI is DEPRECATED
// // process.env.MONGODB_URI is needed for when we deploy to Heroku
// const connectionURL = process.env.MONGODB_URI || 'mongodb://localhost/bus_stop_crowdsourcing';

// function getDB() {
//   return MongoClient.connect(connectionURL);
// }

// module.exports = {
//   getDB
// };
const options = {
  query: (e) => {
    console.log(e.query);
  }
};

const pgp = require('pg-promise')(options);
const config = process.env.DATABASE_URL || {
  host: 'localhost',
  port: 5432,
  database: 'bus_stop_crowdsourcing',
};

const db



