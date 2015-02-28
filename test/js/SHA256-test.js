/**
 * Created by mhendren on 2/27/2015.
 */
var SHA256 = require('../../src/js/SHA256');
var binary = require('../../src/js/binary');
var expect = require('chai').expect;

describe('SHA265', function() {
   it('should get e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 for an empty message', function() {
       expect(SHA256(binary.hexToBinary("8000000000000000000000000000000000000000000000000000000000000000" +
       "0000000000000000000000000000000000000000000000000000000000000000")))
           .to.equal("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
   });
});