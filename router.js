const router = require('express').Router();


// setting correct routes
router.use('/', require('./routes/home'));
router.use('/auth', require('./routes/auth'));
router.use('/map', require('./routes/map'));
router.use('/geo', require('./routes/geo'));
router.use('/users', require('./routes/users'));
// takes me to create user or show profile
router.use('*', (req, res) => {
  res.send('fucked up dude');
});

module.exports = router;
