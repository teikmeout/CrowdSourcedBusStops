/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }] */
/* eslint no-param-reassign: ["error", { "props": false }] */
// to allow console log
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

// changing this project to psql because I like it more

const { ObjectID } = require('mongodb');
const { getDB }    = require('../lib/dbConnect.js');
const db           = require('./db.js');
const bcrypt       = require('bcryptjs');

const SALTROUNDS = 10;

// function createUser(req, res, next) {
//   const userObject = {
//     username: req.body.user.username,
//     // email: req.body.user.email,

//     // Store hashed password
//     password: bcrypt.hashSync(req.body.user.password, SALTROUNDS)
//   };

//   getDB().then((db) => {
//     db.collection('users')
//       .insert(userObject, (insertErr, dbUser) => {
//         if (insertErr) return next(insertErr);

//         res.user = dbUser;
//         db.close();
//         return next();
//       });
//   });
// }

// createUser finished PSQL
function createUser(req, res, next) {
  console.log('createUser');
  bcrypt.hash(req.body.user.pass)
  .then((hash) => {
    db.one(`INSERT INTO USERS (uname, pass)
      VALUES ($1, $2) RETURNING *;`,
      [req.body.user.username, hash])
    .then((createdUser) => {
      res.createdUser = createdUser;
      next();
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/login');
    });
  })
  .catch((bcrypterr) => {
    console.error('bcrypt failed to hash');
    next(bcrypterr);
  });
}

// function getUserById(id) {
//   return getDB().then((db) => {
//     const promise = new Promise((resolve, reject) => {
//       db.collection('users')
//         .findOne({ _id: ObjectID(id) }, (findError, user) => {
//           if (findError) reject(findError);
//           db.close();
//           resolve(user);
//         });
//     });
//     return promise;
//   });
// }

// fn getOneUser PSQL DONE
function getOneUser(req, res, next) {
  console.log('getOneUser');
  db.one(`SELECT * FROM users WHERE id = $1`,
    [req.params.id])
    .then((user) => {
      res.user = user;
      next();
    })
    .catch((err) => {
      console.log('failed shit');
      next(err);
    });
}

// function getUserByUsername(username) {
//   return getDB().then((db) => {
//     const promise = new Promise((resolve, reject) => {
//       db.collection('users')
//         .findOne({ username }, (findError, user) => {
//           if (findError) reject(findError);
//           db.close();
//           resolve(user);
//         });
//     });
//     return promise;
//   });
// }

// checkUserByUsername no bcrypt
function checkUserByUsername(req, res, next) {
  console.log('checkUserByUsername');
  db.one(`SELECT * FROM users WHERE uname = $1`,
    [req.body.uname])
    .then((user) => {
      res.user = user;
      next();
    })
    .catch((err) => {
      next(err);
    });
}

// middleware checkIfBcryptMatches
function checkIfBcryptMatches(req, res, next) {
  console.log('checkIfBcryptMatches');
  bcrypt.compare(req.body.pass, res.user.pass)
    .then((match) => {
      if (match) {
        console.log('they match!');
        console.log(req.body);
      } else {
        console.log('dont match');
        res.redirect('/login');
      }
    })
    .catch( err => {
      console.log('failed to compare');
      // should there be a redirect here?
      next(err);
    })
}

module.exports = {
  createUser,
  getOneUser,
  checkUserByUsername,
  checkIfBcryptMatches,
};
