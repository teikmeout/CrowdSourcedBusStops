// to avoid error in column separation in eslint
/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }] */
// to allow console log
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

const dotEnv           = require('dotenv').config({silent: true});
const express          = require('express');
const logger           = require('morgan');
const path             = require('path');
const bodyParser       = require('body-parser');
const session          = require('express-session');
const cookieParser     = require('cookie-parser');
const methodOverride   = require('method-override');

// setting up routes
const homeRoute        = require('./routes/home');
const mapRoute         = require('./routes/map');
const geoRoute         = require('./routes/geo');
const authRoute       = require('./routes/auth');

// calling in a new instance of express
const app              = express();
// setting up ports for server
const port             = process.env.PORT || 3000;
const SECRET           = 'taka3000';


// setting views to use ejs
app.set('view engine', 'ejs');
app.set('views', './views');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
// setting morgan flavor to DEV
app.use(logger('dev'));
// middleware for method override
app.use(methodOverride('_method'));
// This is how we read the cookies sent over from the browser
app.use(cookieParser());
// session creating
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: SECRET,
}));

// telling express that all static files come from this folder
app.use(express.static(path.join(__dirname, 'public')));

// using correct routes
app.use('/', homeRoute);
app.use('/auth', authRoute);
app.use('/map', mapRoute);
app.use('/geo', geoRoute);

app.listen(port, () => console.log(`Server running yeah! ${port}`));
