/**
 * Created by mhendren on 2/26/15.
 */
var map = require('../../src/js/map');
var expect = require('chai').expect;

describe('map', function() {
    it('should apply x^2 to all values in the array', function() {
        expect(map([1, 2, 3, 4], function(x) { return x * x; })).to.deep.equal([1, 4, 9, 16]);
    });
    it('should append "-x" to all values in the array', function() {
        expect(map(['a', 'b', 'c'], function(x) { return x + '-x';})).to.deep.equal(['a-x', 'b-x', 'c-x']);
    });
});