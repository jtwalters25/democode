'use strict';
//created callback
var someCallback =function(data) {
  console.log('got some data:', data);
};
//function to call callback
//function called useCallback with some parameter
var useCallback = function(cb) {
  cb('the data that I wanted to get');
};

// :::: ERROR FIRST CD PATTERN ::::////

var someCallback = function(err, data){
  if (err) throw err;
  console.log('got some data:', data);
};

var useCallback = function(cb) {
  cb(null, 'the data that i wanted to get');
};

useCallback(someCallback);
