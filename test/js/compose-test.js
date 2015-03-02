/**
 * Created by mhendren on 3/1/15.
 */
var compose = require('../../src/js/compose');
var expect = require('chai').expect;

describe('compose', function() {
    it('should exist', function() {
        expect(compose).to.exist;
    });
    it('should return a function that will compose two functions that will operate on 3 returning 8',
        function() {
           expect(compose(function(x) { return x + 1; }, function(x) { return 2 * x; })(3)).to.equal(8);
        });
    it('should return a function composed of three functions that will operate on 3 returning 10', function() {
        expect(compose(function(x) { return x + 1; }, function(x) { return 2 * x; }, function(x) { return x + 2; })(3))
            .to.equal(10);
    });
    it('should throw an error with more than 26 functions chained', function() {
        function f(x) { return x + 1; }
        function badCompose() {
            return compose(f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f)(1);
        }
        expect(badCompose).to.throw('this compose will only support up to 26 function compositions')
    });
    it('should work with 26 functions chained', function() {
        function f(x) { return x + 1; }
        expect(compose(f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f)(1)).to.equal(27);
    });
});