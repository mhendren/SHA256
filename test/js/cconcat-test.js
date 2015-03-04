/**
 * Created by mhendren on 3/4/2015.
 */
var cconcat = require('../../src/js/cconcat');
var expect = require('chai').expect;

describe('cconcat', function() {
    it('should concatenate', function() {
        expect(cconcat("hello")(", world")).to.equal('hello, world');
    });
});