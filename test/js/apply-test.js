/**
 * Created by mhendren on 3/4/2015.
 */
var apply = require('../../src/js/apply');
var expect = require('chai').expect;

describe('apply', function() {
    it('should throw an exception if there are no arguments', function() {
        function badApply() {
            apply(function(x) { return x + 1 });
        }
        expect(badApply).to.throw('At least one argument must apply to the function')
    });
    it('should throw an exception if there are more than 26 arguments', function() {
       function badApply() {
           apply(function(x) { return function(y) { x + y; }}, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
           1, 1, 1, 1, 1, 1, 1, 1);
       }
        expect(badApply).to.throw('Can only apply function to 26 arguments');
    });
    it('should get 3 for add, 1, 1, 1', function() {
        function add(x) { return function(y) { return x + y; }}
        expect(apply(add, 1, 1, 1)).to.equal(3);
    });
    it('should operate on an array of arguments', function() {
        function add(x) { return function(y) { return x + y; }}
        expect(apply(add, [1, 1, 1])).to.equal(3);
    })
});