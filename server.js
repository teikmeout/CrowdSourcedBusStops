// to avoid error in column separation in eslint
/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }] */
// to allow console log
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

const dotEnv           = require('dotenv').config({ silent: true });
const express          = require('express');
const logger           = require('morgan');
const path             = require('path');
const bodyParser       = require('body-parser');
const session          = require('express-session');
const cookieParser     = require('cookie-parser');

// setting up ports for server
const PORT             = process.env.PORT || 3000;

// might need to remove methd override
const methodOverride   = require('method-override');

// calling in a new instance of express
const app              = express();

// setting out logger as the first middleware
app.use(logger('dev'));
// different flavors for morgan
//combined
//common
//dev
//short
//tiny



// setting views to use ejs
app.set('view engine', 'ejs');
// new ejs defaults to views folder
// app.set('views', './views');

// telling express to server static assets from public
// path helps tell node the full pwd of where public is
app.use(express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded
// in other words, accept forms and some old fancy forms too
// extended true is for name="user[username]"
// I'm not using that, so false
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
// in other words, accept json stuff from postman or fetch, or axios or ajax
app.use(bodyParser.json());

// vv do I really need middleware for method override??
// this would be in case of form deleting or put
// maybe will need... will keep here
app.use(methodOverride('_method'));

// This is how we read the cookies sent over from the browser
// necessary for session login
app.use(cookieParser());
// session creating
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
}));

// sending ALL routes to Router
app.use(require('./router.js'));

app.listen(PORT, () => console.log(`🍙   ${PORT}, ${process.env.NODE_ENV}`));
