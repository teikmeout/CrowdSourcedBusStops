// using express routes in this file
const indexRouter = require('express').Router();

// HOME route
indexRouter.get('/', (req, res) => {
  // rafa has a choosing page for login and signup, I don't
  res.render('index');
}); // end of router

// This route serves your `/login` form
indexRouter.get('/login', (req, res) => {
  // rafa has a landing load page, I only have sign in
  res.render('index');
});

// This route serves your `/signup` form
indexRouter.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = indexRouter;

// this route replaces routes/index.js in @rapala61 project
