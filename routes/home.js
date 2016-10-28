// using express routes in this file
const router = require('express').Router();

// HOME route
router.get('/', (req, res) => {
  res.render('index');
}); // end of router

module.exports = router;
