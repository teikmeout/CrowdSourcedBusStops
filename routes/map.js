// using express routes in this file
const router = require('express').Router();

// this code is commented because it's the iTunes implementation
const { authenticate }    = require('../lib/auth');
// const { searchMusic }     = require('../services/itunes');
const { getFavorites,
        saveFavorite,
        deleteFavorites } = require('../models/favorites');

// HOME route
// I NEED TO ADD authenticate to this process
router.get('/', authenticate, (req, res) => {
  res.render('map', {
    // this part was taken from @smna15 since I didn't figure out how to hide the map key on my own
    API_KEY: process.env.MAPS_KEY,
    user: res.user,
  });
}); // end of router

module.exports = router;

// CODE commented off for reference and creating of routes to work through
// pret a manger bathroom code 8701
router.get('/', authenticate, getFavorites, (req, res) => {
  res.render('/users', {
    user: res.user,
    results: res.results || [],
    favorites: res.favorites || []
  });
});

// router.post('/search', authenticate, searchMusic, getFavorites, (req,res) => {
//   res.render('music/index', {
//     user: res.user,
//     results: res.results || [],
//     favorites: res.favorites || []
//   });
// });

// router.delete('/favorites/:id', deleteFavorites, (req, res) => {
//   res.redirect('/music');
// });

// router.post('/favorites', saveFavorite, (req, res) => {
//   res.redirect('/music');
// });

// module.exports = router;
