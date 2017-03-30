'use strict';

const greet = require('../lib/greet.js');
const expecr = require('chai').expect;

describe('Greet Module', function(){
  describe('#sayHey', function(){
    it('should return hey jeremiah!', function(){
      var result = greet.sayHey('jeremiah');
      expect(greet).to.have.property('sayHey');
      expect(result).to.equal('hey jeremiah!');
    });

    it('should throw a missing name error', function(){
      var result = greet.sayHey;
      expect(result).to.throw(Error);
    });
  });

  describe('#sayBye', function(){
    it('should return See ya later!', function(){
      var result = greet.sayBye('jeremiah')
      expect(result).to.equal('bye jeremiah!');
    });
  });
});
