/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }] */

const usersRouter         = require('express').Router();
const { createUser }      = require('../models/userModel.js');
const { authenticate }    = require('../lib/auth');
const { getLocationsByUser, deleteLocation }    = require('../models/locationModel.js');


/**
 * Creates a new user by handling the POST request from a form with action `/users`
 * It uses the createUser middleware from the user model
 */
usersRouter.post('/', createUser, (req, res) => {
  // redirects to home page, to signin now that user is created
  res.redirect('/login');
});

/**
 * Takes the user to its profile by handling any GET request to `/users/profile`
 * It redirects to /login when attempted to be reached by a non logged in user
 * It is "protected" by the authenticate middleware from the auth library
 */

// need to add function to pipeline that finds all the saved favs of this user
usersRouter.get('/profile', authenticate, getLocationsByUser, (req, res) => {
  res.render('./users/profile', {
    user: res.user,
    fav: res.favorites,
    // once uncommented need to add getFavorites to pipeline
  });
});

usersRouter.delete('/delete/:id', deleteLocation, (req, res) => {
  res.redirect('/users/profile');
});

module.exports = usersRouter;
