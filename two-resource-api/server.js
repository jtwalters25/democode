'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Promise = require('bluebird');
//debug: internal testing tool
const debug = require('debug')('car:server');
const mongoose = require('mongoose');

const errors = require('./lib/error-middleware.js');

const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/cardb';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(errors);

app.listen(PORT, () => {
  debug(`served up: ${PORT}`);
});
