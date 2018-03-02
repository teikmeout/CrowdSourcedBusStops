/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }] */
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

const bcrypt    = require('bcryptjs');
const userModel = require('../models/userModel');


/**
 * logIn - Middleware to compare password from login form with password
 *         from the user in the DB. If matches, the user Id is stored in the
 *         session.
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 *
 */
function logIn(req, res, next) {
  console.log('logging in...');
  console.log('the user: ', req.body.uname);
  userModel.getUserByUsername(req.body.uname)
    .then((dbUser) => {
      console.log('username matched... comparing passwords: ', dbUser);
      // comparesync is a method from bcrypt used to check a text pass vs it's hash in your DB
      // if the provided password (encrypted again) and the hash match TRUE, if not FALSE
      const matches = bcrypt.compareSync(req.body.pass, dbUser.hash);

      console.log('userpass: ', dbUser.pass,'does it match? ', matches);
      if (matches) {
        req.session.userId = dbUser.id;
        res.user = dbUser;
        next();
      } else {
        res.redirect('/');
      }
    })
    .catch((err) => {
      res.status(404).json({
        message: 'failed findig this user',
        err,
      });
    });
}


/**
 * authenticate - Middleware to protect routes
 *
 * @param {object} req  request object
 * @param {object} res  response object
 * @param {function} next invoked to continue the response flow
 *
 */
function authenticate(req, res, next) {
  console.log('authenticating...');
  // if sesstion exists
  if (req.session.userId) {
    console.log('session found');
    userModel.getUserById(req.session.userId)
      .then((dbUser) => {
        res.user = dbUser;
        next();
      })
      .catch(() => {
        res.redirect('/login');
      });
      // else take me to home page to sign in
  } else {
    console.log('no session found', req.session);
    res.redirect('/');
  }
}

module.exports = {
  logIn,
  authenticate,
};
