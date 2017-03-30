'use strict';

const num = 1;

logger(num);

console.log('num:', num);

function logger(n){
  n += 1;
  console.log('logger:', n);
};
