'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('memo:memo-router');
const Memo = require('../model/memo.js');
const memoRouter = new Router();

memoRouter.post('/api/memo', jsonParser, function(req, res, next) {
  debug('POST: /api/memo');
  
  Memo.createMemo(req.body)
  .then( memo => res.json(memo))
  .catch(err => next(err));
});

memoRouter.get('/api/memo/:id', function(req, res, next) {
  debug('GET /api/memo/:id');

  Memo.fetchMemo(req.params.id)
   .then( memo => res.json(memo))
   .catch(err => next(err));
});

memoRouter.get('/api/memo', function( req, res, next){
  debug('GET: /api/memo');

  Memo.fetchIDs()
    .then( ids => res.json(ids))
    .catch(next);
});

memoRouter.put('/api/memo', jsonParser, function(req, res, next) {
  debug('PUT: /api/memo');

  Memo.updateMemo(req.query.id, req.body)
    .then( memo => res.json(memo))
    .catch(next);
});

module.exports = memoRouter;

