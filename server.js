const express = require('express');
const logger = require('morgan');
// calling in a new instance of express
const app = express();
// "importing" path package
const path = require('path');
// setting up ports for server
const port = process.env.PORT || 3000;

// setting up the homeRoute
const homeRoute = require('./routes/home');

// setting logger flavor to DEV
app.use(logger('dev'));
// setting views to use ejs
app.set('view engine', 'ejs');
app.set('views', './views');
// telling express that all static files come from this folder
app.use(express.static(path.join(__dirname, 'public')));

// defining route for '/'
app.use('/', homeRoute);

app.listen(port, () => console.log(`Server running yeah! ${port}`));
