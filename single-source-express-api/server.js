'use strict';

const express = require('express');
const debug = require('debug')('note:server');
const morgan = require('morgan');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();

const Note = require('./model/note.js');
const storage = require('./lib/storage.js');

const PORT = process.env.port || 3000;
const app = express();

app.use(morgan('dev'));

app.get('/test', function(req, res){
    debug('GET: /test');
    res.json({ msg: 'test route worked'});
});
//post or put method always needs 'jsonParser'
app.post('/api/note', jsonParser, function(req, res, next) {
    debug('POST: /api/note');

    Note.createNote(req.body)
    .then( note => res.json(note))
    .catch( err => next(err));
});

app.get('/api/note/id', function(req, res, next) {
    debug('GET: /api/note');

    Note.fetchNote(req.body)
    .then( note => res.json(note))
    .catch( err => next(err));
});


app.use(function(err, req, res, next) {
    debug('error middleware');
    console.error(err.message);

    if(err.status){
        res.status(err.status).send(err.name);
        return
    }

    err = createError(500, err,message);
    res.status(err.status).send(err.name);
});

// app.use(errors);

app.listen(PORT, () => {
    debug(`server is izzup: ${PORT}`);
});