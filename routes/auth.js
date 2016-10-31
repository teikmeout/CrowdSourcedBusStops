/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }] */
/* eslint no-param-reassign: ["error", { "props": false }] */

const authRouter    = require('express').Router();
const { logIn }     = require('../lib/auth');

/**
 * Log In and if successful assign res.user._id to the session
 * It uses the logIn middleware from the auth library to parse the form inputs
 * and save the user to the database
 */
authRouter.post('/', logIn, (req, res) => {
  // once logged in takes you to /map and gives you option to start saving
  res.redirect('/map');
});

// Logout by assigning null to the userId in the session
authRouter.delete('/', (req, res) => {
  req.session.userId = null;
  // takes you to homepage to signin again once logged out
  res.redirect('/');
});

module.exports = authRouter;

// NOTE: this is code provided by @rapala61, I have no dominated login process at all.
