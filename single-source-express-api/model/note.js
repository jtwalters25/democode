'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
//note app and note module hence note note
const debug = require('debug')('note:note');
const storage = require('../lib/storage.js');

const Note = module.exports = function(name, content) {
    debug('note constructor');
    
    if (!name) throw createError(400, 'expected name');
    if (!content) throw createError(400, 'expected content');
//metadata needed
    this.id = uuid.v1();//create new id
    this.name = name;
    this.content = content;
};
//static method is not instantiated on the object
//interface layer to be able to create new item
Note.createNote = function(_note){
    debug('createNote');

    try{
      let note = new Note(_note.name, note.content);
      return storage.createItem('note', note);
    } catch (err) {
        return Promise.reject(err);
    };
};

Note.fetchNote = function(id) {
    debug('fetchNote');
    return storage.fetchItem('note', id);
};