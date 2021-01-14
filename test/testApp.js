const chai = require('chai');
const expect = chai.expect;
const request = require('request')


// Check GET of './config/myFaves.json'
describe('Check read of "myFaves.json" works correctly', function() {
  describe ('Page loads correctly', function() {
    it('status', function(done) {
      request('http://localhost:8081/favesList',
      function(error, response, body) {
        expect (response.statusCode).to.equal(200);
        done();
      });
    });

    it('Content is a string', function(done) {
      request('http://localhost:8081/favesList',
        function(error, response, body) {
          expect (body).to.be.a('string');
          done();
        });
    });
  });
});

// Check POST of Itunes Store API
describe('Check POST function works correctly', function() {
  describe ('Get Itunes API data', function() {
    it('Content returns a string', function(done) {
      request('http://localhost:8081/search',
        function(error, response, body) {
          expect (body).to.be.a('string');
          done();
        });
    });
  });
});
