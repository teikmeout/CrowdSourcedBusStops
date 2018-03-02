// using express routes in this file
const router = require('express').Router();

// this code is commented because it's the iTunes implementation
const { authenticate }    = require('../lib/auth');
// const { searchMusic }     = require('../services/itunes');
const { getLocationsByUser,
        saveLocation,
        deleteLocation } = require('../models/locationModel');

// HOME route PROTECTED with authenticate
router.get('/', authenticate, (req, res) => {
  res.render('map', {
    // this part was taken from @smna15 since I didn't figure out how to hide the map key on my own
    API_KEY: process.env.MAPS_KEY,
    user: res.user,
  });
});

// CODE commented off for reference and creating of routes to work through
// pret a manger bathroom code 8701
// router.get('/', authenticate, getFavorites, (req, res) => {
//   res.render('/users', {
//     user: res.user,
//     results: res.results || [],
//     favorites: res.favorites || []
//   });
// });

// router option to add location to favorites and redirect to user profile page
router.post('/', authenticate, saveLocation, (req, res) => {
  res.redirect('/users/profile');
});

router.delete('/favorites/:id', deleteLocation, (req, res) => {
  res.redirect('/users/profile');
});
module.exports = router;
