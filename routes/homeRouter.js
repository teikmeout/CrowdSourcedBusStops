// using express routes in this file
const homeRouter = require('express').Router();

// HOME route
homeRouter.get('/', (req, res) => {
  res.redirect('login');
}); // end of router

// This route serves your `/login` form
homeRouter.get('/login', (req, res) => {
  res.render('login');
});

// This route serves your `/signup` form
homeRouter.get('/signup', (req, res) => {
  res.render('signup');
});

// this route serves the `/geo` view
// just proof of concept for window.navigator
homeRouter.get('/geo', (req, res) => {
  res.render('geolocation');
});

module.exports = homeRouter;
