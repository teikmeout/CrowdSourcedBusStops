// using express routes in this file
const router = require('express').Router();

// HOME route
router.get('/', (req, res) => {
  res.render('map', {
    // this part was taken from @smna15 since I didn't figure out how to hide the map key
    API_KEY: process.env.MAPS_KEY,
  });
}); // end of router

module.exports = router;
