'use strict';

const fs = require('fs');
//this method reads file
fs.readFile(`${__dirname}/data/data.txt`, function(err, data) {
  if (err) throw err;
  console.log('content:', data.toString());
//buffer we pass to write new file too
fs.writeFile(`${__dirname}/data/newdata.txt`, function(err, data) {
  if (err) throw err;
  console.log('write file msg:', 'new file created');
  });
});
