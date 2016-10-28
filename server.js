const express = require('express');
const logger = require('morgan');
const app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));

app.listen(port, () => console.log(`Server running yeah! ${port}`));
