/**
 * Created by mhendren on 2/26/15.
 */
var binary = require('../../src/js/binary');
var expect = require('chai').expect;

describe('binary', function () {
    describe('fractionalToBinaryString', function () {
        it('should convert 0.25 into 01000000000000000000000000000000', function () {
            expect(binary.fractionalToBinaryString(0.25)).to.equal('01000000000000000000000000000000');
        });
        it('should convert 6.625 into 10100000000000000000000000000000', function () {
            expect(binary.fractionalToBinaryString(6.625)).to.equal('10100000000000000000000000000000');
        })
    });

    describe('binaryStringToHex', function () {
        it('should convert 1010010110111001 to a5b9', function () {
            expect(binary.binaryStringToHex("1010010110111001")).to.equal("a5b9");
        });
    });

    describe('hexToBinary', function () {
        it('should convert a5b9 to [1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1]', function () {
            expect(binary.hexToBinary("a5b9"))
                .to.deep.equal([1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1]);
        })
    });

    describe('ROR', function () {
        it('should make 10101, 1 be 11010', function () {
            expect(binary.ROR([1, 0, 1, 0, 1])).to.deep.equal([1, 1, 0, 1, 0]);
        });
        it('should make 100100100, 2 be 001001001', function () {
            expect(binary.ROR([1, 0, 0, 1, 0, 0, 1, 0, 0], 2)).to.deep.equal([0, 0, 1, 0, 0, 1, 0, 0, 1]);
        });
    });

    describe('AND', function () {
        it('should get 1001 with 1101 AND 1011', function () {
            expect(binary.AND([1, 1, 0, 1], [1, 0, 1, 1])).to.deep.equal([1, 0, 0, 1]);
        });
        it('should get 0000 with 1001 AND 0110', function () {
            expect(binary.AND([1, 0, 0, 1], [0, 1, 1, 0])).to.deep.equal([0, 0, 0, 0]);
        });
    });

    describe('OR', function () {
        it('should get 1011 with 1001 OR 0011', function () {
            expect(binary.OR([1, 0, 0, 1], [0, 0, 1, 1])).to.deep.equal([1, 0, 1, 1]);
        });
        it('should get 1111 with 1001 OR 0110', function () {
            expect(binary.OR([1, 0, 0, 1], [0, 1, 1, 0])).to.deep.equal([1, 1, 1, 1]);
        });
    });

    describe('XOR', function() {
        it('should get 1010 for 1100 XOR 0110', function() {
            expect(binary.XOR([1, 1, 0, 0], [0, 1, 1, 0])).to.deep.equal([1, 0, 1, 0]);
        });
        it('should get 0010 for 1001 XOR 1011', function() {
            expect(binary.XOR([1, 0, 0, 1], [1, 0, 1, 1])).to.deep.equal([0, 0, 1, 0]);
        });
    });
});