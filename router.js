const router = require('express').Router();


// setting correct routes
// homeRouter will handle login singup and singin views
router.use('/', require('./routes/homeRouter'));
// authRouter will handle POST for login and DEL for logout
router.use('/auth', require('./routes/authRouter'));
// render map, savelocation, deletelocation
router.use('/map', require('./routes/mapRouter'));
router.use('/users', require('./routes/userRouter'));
// takes me to create user or show profile

// error handling route
router.use('*', (req, res) => {
  res.status(404).send('fucked up dude');
});

module.exports = router;
