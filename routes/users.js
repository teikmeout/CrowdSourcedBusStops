/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }] */

const express             = require('express');
const { createUser }      = require('../models/user.js');
const { authenticate }    = require('../lib/auth');
const { getFavorites }    = require('../models/favorites.js');

const usersRouter         = express.Router();

/**
 * Creates a new user by handling the POST request from a form with action `/users`
 * It uses the createUser middleware from the user model
 */
usersRouter.post('/', createUser, (req, res) => {
  // redirects to home page, to signin now that user is created
  res.redirect('/');
});

/**
 * Takes the user to its profile by handling any GET request to `/users/profile`
 * It redirects to /login when attempted to be reached by a non logged in user
 * It is "protected" by the authenticate middleware from the auth library
 */

// need to add function to pipeline that finds all the saved favs of this user
usersRouter.get('/profile', authenticate, getFavorites, (req, res) => {
  res.render('./users/profile', {
    user: res.user,
    fav: res.favorites,
    // once uncommented need to add getFavorites to pipeline
  });
});

module.exports = usersRouter;

// this users route might be redundant since I have a route for index.js
// important to note that this is pretty necessary for login process
