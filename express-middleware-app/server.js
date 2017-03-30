'use strict';

const morgan = require('morgan');
const express = require('express');
const createError = require('http-errors');
const debug = require('debug')('memo:server');

const memoRouter = require('./route/memo-router.js');
const cors = require('./lib/cors-middleware.js');
const errors = require('./lib/error-middleware.js');

const PORT = process.env.PORT || 8000;
const app = express();

app.use(morgan('dev'));
app.use(cors);
app.use(memoRouter);
app.use(errors);

app.listen(PORT, () => {
  debug(`server up: ${PORT}`);
});