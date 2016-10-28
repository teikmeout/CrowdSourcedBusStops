const express = require('express');
const logger = require('morgan');
// calling in a new instance of express
const app = express();
// "importing" path package
const path = require('path');
// setting up ports for server
const port = process.env.PORT || 3000;

// setting up routes
const homeRoute = require('./routes/home');
const mapRoute = require('./routes/map');


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

app.listen(port, () => console.log(`Server running yeah! ${port}`));
