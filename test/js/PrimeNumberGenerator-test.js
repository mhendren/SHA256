/**
 * Created by mhendren on 2/26/15.
 */
var PrimeNumberGenerator = require('../../src/js/PrimeNumberGenerator');
var expect = require('chai').expect;

describe('PrimeNumberGenerator', function () {
    it('should generate an empty list for 0', function() {
        expect(PrimeNumberGenerator(0)).to.deep.equal([]);
    });
    it("should generate [2] for 1", function() {
        expect(PrimeNumberGenerator(1)).to.deep.equal([2]);
    });
    it('should generate [2, 3, 5, 7, 11] for 5', function() {
        expect(PrimeNumberGenerator(5)).to.deep.equal([2, 3, 5, 7, 11]);
    });
});