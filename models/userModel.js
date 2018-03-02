/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }] */
/* eslint no-param-reassign: ["error", { "props": false }] */
// to allow console log
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

// changing this project to psql because I like it more

// const { ObjectID } = require('mongodb');
// const { getDB }    = require('../lib/dbConnect.js');
const db           = require('../lib/dbConnect.js');
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

// PSQL DONE WORKS!
function createUser(req, res, next) {
  // console.log('createUser');
  // use bcrypt to hash the password async so wait for it
  bcrypt.hash(req.body.pass, SALTROUNDS)
  .then((hash) => {
    db.one(`INSERT INTO USERS (uname, hash)
      VALUES ($1, $2) RETURNING *;`,
      [req.body.uname, hash])
    .then((createdUser) => {
      res.createdUser = createdUser;
      next();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: 'failure creaing user',
        err,
      });
    });
  })
  .catch((bcrypterr) => {
    console.error('bcrypt failed to hash');
    next(bcrypterr);
  });
};

// PSQL DONE get user by username for login
function getUserByUsername(uname) {
  console.log('getOneUser');
  return db.one(`SELECT * FROM users WHERE uname = $1`, uname);
};

// PSQL DONE get user by id for authentication
function getUserById(id) {
  console.log('getUserById');
  return db.one('SELECT * FROM users WHERE id = $1', id);
};


// middleware checkIfBcryptMatches
function checkIfBcryptMatches(req, res, next) {
  console.log('checkIfBcryptMatches');
  bcrypt.compare(req.body.pass, res.user.hash)
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
  getUserById,
  getUserByUsername,
  checkIfBcryptMatches,
};
