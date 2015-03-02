/**
 * Created by mhendren on 2/26/15.
 */
var map = require('../../src/js/map');
var expect = require('chai').expect;

describe('map', function() {
    it('should apply x^2 to all values in the array', function() {
        expect(map(function(x) { return x * x; }, [1, 2, 3, 4])).to.deep.equal([1, 4, 9, 16]);
    });
    it('should append "-x" to all values in the array', function() {
        expect(map(function(x) { return x + '-x';}, ['a', 'b', 'c'])).to.deep.equal(['a-x', 'b-x', 'c-x']);
    });
    it('should curry the map', function() {
        expect(map(function(x) { return 2*x;})([1, 2, 3, 4])).to.deep.equal([2, 4, 6, 8]);
    })
});