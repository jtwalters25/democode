'use strict';

const fs = require('fs');

fs.readFile(`${__dirname}/data/data.txt`, function(err, data) {
  if (err) throw err;
  console.log('content:', data.toString());
});
