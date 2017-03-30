'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Promise = require('bluebird');

const debug = require('debug')('art:server');
const mongoose = require('mongoose');
const galleryRouter = require('');
const artistRouter = require('');
const error = require('');

const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localost/artappdev';

app.listen(PORT, () => {
  debug(`server up: ${PORT}`);
});
