// to avoid error in column separation in eslint
/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }] */
// to allow console log
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }] */

const express = require('express');
const logger = require('morgan');
const dotEnv = require('dotenv').config({silent: true});

// calling in a new instance of express
const app = express();
// "importing" path package
const path = require('path');
// setting up ports for server
const port = process.env.PORT || 3000;

// setting up routes
const homeRoute = require('./routes/home');
const mapRoute = require('./routes/map');
const geoRoute = require('./routes/geo');


// setting logger flavor to DEV
app.use(logger('dev'));
// setting views to use ejs
app.set('view engine', 'ejs');
app.set('views', './views');
// telling express that all static files come from this folder
app.use(express.static(path.join(__dirname, 'public')));

// using correct routes
app.use('/', homeRoute);
app.use('/map', mapRoute);
app.use('/geo', geoRoute);

app.listen(port, () => console.log(`Server running yeah! ${port}`));
