'use strict';

const mongoose = require('mongoose');
const createError = require('http-errors');
const debug = require('debug')('car:lot');
const Schema = mongoose.Schema;

const Car = require('./car.js');

const lotSchema = Schema({
  name: { type: String, required: true },
  timestamp: { type: Date, required: true },
  cars: [{ type: Schema.Types.ObjectId, ref: 'car' }]
});
