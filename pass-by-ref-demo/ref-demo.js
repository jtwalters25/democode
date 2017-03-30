'use strict';
//const properties can be manipulated but not reassigned
const course = { title: 'Code 401 JS', instructor: 'Jeremiah'};
//calling logger function
logger(course);

console.log('course:', course);
//c refers to the course object.  objects are passed by reference
function logger(c) {
  c.title = 'Code 401 Python';
  console.log('logger:', c);
};
