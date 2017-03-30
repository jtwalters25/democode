'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const Memo = require('../model/memo.js');
const url = 'http://localhost:8000';

require('../server.js');

const exampleMemo = {
  title: 'example title',
  entry: 'example entry'
};

describe('testing memo route', function(){
  describe('GET: /api/memo', function(){
    before(done => {
      Memo.createMemo(exampleMemo)
        .then(memo => {
          this.tempMemo = memo;
          done();
        })
        .catch(err => done(err));
    });
    
    after( done => {
      Memo.deleteMemo(this.tempMemo.id)
      .then( () => done())
      .catch( err => done(err));
    });

    it('should return a memo', done => {
      request.get(`${url}/api/memo/${this.tempMemo.id}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.id).to.equal(this.tempMemo.id);
        expect(res.body.title).to.equal(this.tempMemo.title);
        expect(res.body.entry).to.equal(this.tempMemo.entry);
        done();
      });
    });

    describe('with an invalid id', function(){
      it('should respond with a 404 status code', done => {
        request.get(`${url}/api/memo/123434567`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      }); 
    });
  });

  describe('POST: /api/memo', function(){
    describe('with a valid body', function(){
      after( done => {
        if(this.tempMemo){
          Memo.deleteMemo(this.tempMemo.id)
          .then(() => done())
          .catch(err => done(err));
        }
      });
      it('should return an updated memo', done => {
        request.post(`${url}/api/memo`)
        .send(exampleMemo)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal(exampleMemo.title);
          expect(res.body.entry).to.equal(exampleMemo.entry);
          this.tempMemo = res.body;
          done();
        });
      });
    });
  });

  describe('PUT: /api/memo', function(){
    describe('valid id and body', function(){
      before( done => {
        Memo.createMemo(exampleMemo)
        .then( memo => {
          this.tempMemo = memo;
          done();
        })
        .catch(err => done(err));
      });
     
      after( done => {
        if(this.tempMemo){
          Memo.deleteMemo(this.tempMemo.id)
          .then( () => done())
          .catch(done);
        }
      });

      it('should return a memo', done => {
        let updateMemo = { title: 'new title', entry: 'new entry' };
        request.put(`${url}/api/memo?id=${this.tempMemo.id}`)
        .send(updateMemo)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempMemo.id);
          for (var prop in updateMemo) {
            expect(res.body[prop]).to.equal(updateMemo[prop]);
          }
          done();
        });
      });

    });
  });
});