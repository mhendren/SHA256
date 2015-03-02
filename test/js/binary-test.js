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

    describe('toHex', function() {
        it('should throw an exception for a bit array that is not a multiple of 4', function() {
            function badToHex() {
                binary.toHex([1, 0, 1, 0, 1, 0]);
            }
            expect(badToHex).to.throw('number of bits in array is not divisible by 4');
        });
        it('should get a5 for 10100101', function() {
            expect(binary.toHex([1, 0, 1, 0, 0, 1, 0, 1])).to.equal("a5");
        });
        it('should get c7 for 11000111', function() {
            expect(binary.toHex([1, 1, 0, 0, 0, 1, 1, 1])).to.equal('c7');
        })
    });

    describe('ROR', function () {
        it('should make 100100100, 2 be 001001001', function () {
            expect(binary.ROR([1, 0, 0, 1, 0, 0, 1, 0, 0], 2)).to.deep.equal([0, 0, 1, 0, 0, 1, 0, 0, 1]);
        });
        it('should curry', function() {
            expect(binary.ROR([1, 0, 0, 1, 0, 0, 1, 0, 0])(2)).to.deep.equal([0, 0, 1, 0, 0, 1, 0, 0, 1]);
        });
    });

    describe('SHR', function() {
        it('should get 00 for 11, 2', function() {
            expect(binary.SHR([1, 1], 2)).to.deep.equal([0, 0]);
        });
        it('should get 000 for 101, 5', function() {
            expect(binary.SHR([1, 0, 1], 5)).to.deep.equal([0, 0, 0]);
        });
        it('should get 000101001 for 101001010, 3', function() {
            expect(binary.SHR([1, 0, 1, 0, 0, 1, 0, 1, 0], 3)).to.deep.equal([0, 0, 0, 1, 0, 1, 0, 0, 1]);
        });
        it('should curry', function() {
            expect(binary.SHR([1, 0, 1, 0, 0, 1, 0, 1, 0])(3)).to.deep.equal([0, 0, 0, 1, 0, 1, 0, 0, 1]);
        })
    });

    describe('AND', function () {
        it('should throw an exception if arrays are different lengths', function() {
            function badAND() {
                return binary.AND([0, 1, 0, 1], [1, 1, 0]);
            }
            expect(badAND).to.throw('cannot do binary math on arrays of differing lengths');
        });
        it('should get 1001 with 1101 AND 1011', function () {
            expect(binary.AND([1, 1, 0, 1], [1, 0, 1, 1])).to.deep.equal([1, 0, 0, 1]);
        });
        it('should get 0000 with 1001 AND 0110', function () {
            expect(binary.AND([1, 0, 0, 1], [0, 1, 1, 0])).to.deep.equal([0, 0, 0, 0]);
        });
        it('should curry', function() {
            expect(binary.AND([1, 0, 0, 1])([0, 1, 1, 0])).to.deep.equal([0, 0, 0, 0]);
        });
    });

    describe('OR', function () {
        it('should throw an exception if arrays are different lengths', function() {
            function badOR() {
                return binary.OR([0, 1, 0, 1], [1, 1, 0]);
            }
            expect(badOR).to.throw('cannot do binary math on arrays of differing lengths');
        });
        it('should get 1011 with 1001 OR 0011', function () {
            expect(binary.OR([1, 0, 0, 1], [0, 0, 1, 1])).to.deep.equal([1, 0, 1, 1]);
        });
        it('should get 1111 with 1001 OR 0110', function () {
            expect(binary.OR([1, 0, 0, 1], [0, 1, 1, 0])).to.deep.equal([1, 1, 1, 1]);
        });
        it('should curry', function() {
           expect(binary.OR([1, 0, 0, 1])([0, 1, 1, 0])).to.deep.equal([1, 1, 1, 1]);
        });
    });

    describe('XOR', function() {
        it('should throw an exception if arrays are different lengths', function() {
            function badXOR() {
                return binary.XOR([0, 1, 0, 1], [1, 1, 0]);
            }
            expect(badXOR).to.throw('cannot do binary math on arrays of differing lengths');
        });
        it('should get 1010 for 1100 XOR 0110', function() {
            expect(binary.XOR([1, 1, 0, 0], [0, 1, 1, 0])).to.deep.equal([1, 0, 1, 0]);
        });
        it('should get 0010 for 1001 XOR 1011', function() {
            expect(binary.XOR([1, 0, 0, 1], [1, 0, 1, 1])).to.deep.equal([0, 0, 1, 0]);
        });
        it('should curry', function() {
            expect(binary.XOR([1, 0, 0, 1])([1, 0, 1, 1])).to.deep.equal([0, 0, 1, 0]);
        });
    });

    describe('ADD', function() {
        it('should get 0010 for 1001 ADD 1001', function() {
            expect(binary.ADD([1, 0, 0, 1], [1, 0, 0, 1])).to.deep.equal([0, 0, 1, 0]);
        });
        it('should get 1010 for 0101 ADD 0101', function() {
            expect(binary.ADD([0, 1, 0, 1], [0, 1, 0, 1])).to.deep.equal([1, 0, 1, 0]);
        });
        it('should get 10010110 for 01100100 ADD 00110010', function() {
            expect(binary.ADD([0, 1, 1, 0, 0, 1, 0, 0], [0, 0, 1, 1, 0, 0, 1, 0]))
                .to.deep.equal([1, 0, 0, 1, 0, 1, 1, 0]);
        });
        it('should throw an exception if the bit arrays are unequal length', function() {
            function badADD() {
                binary.ADD([1, 1, 0, 1, 0], [0, 0, 1, 0]);
            }
            expect(badADD).to.throw('cannot do binary math on arrays of differing lengths');
        });
        it('should curry', function() {
            expect(binary.ADD([0, 1, 1, 0, 0, 1, 0, 0])([0, 0, 1, 1, 0, 0, 1, 0]))
                .to.deep.equal([1, 0, 0, 1, 0, 1, 1, 0]);
        });
    });

    describe('NOT', function() {
        it('should get 11 for 00', function() {
            expect(binary.NOT([0, 0])).to.deep.equal([1, 1]);
        });
        it('should get 00 for 11', function() {
            expect(binary.NOT([1, 1])).to.deep.equal([0, 0]);
        });
        it('should get 10101 for 01010', function() {
            expect(binary.NOT([0, 1, 0, 1, 0])).to.deep.equal([1, 0, 1, 0, 1]);
        });
        it('should curry', function() {
            expect(binary.NOT()([0, 1, 0, 1, 0])).to.deep.equal([1, 0, 1, 0, 1]);
        });
    });

    describe('WORD', function() {
        var base = null;
        beforeEach(function() {
            base = [
                0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0,
                1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0,
                0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0,
                1, 1, 1, 1, 1
            ];
        });
        it('should get [0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1] for WORD(0)', function() {
            expect(binary.WORD(base, 0)).to.deep.equal([0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1]);
        });
        it('should get [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0] for WORD(1)', function() {
            expect(binary.WORD(base, 1)).to.deep.equal([0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0]);
        });
        it('should get [1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0] for WORD(2)', function() {
            expect(binary.WORD(base, 2)).to.deep.equal([1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0]);
        });
        it('should get [0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0] for WORD(3)', function() {
            expect(binary.WORD(base, 3)).to.deep.equal([0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0]);
        });
        it('should get an exception for word(4)', function() {
            function badWORD() {
                binary.WORD(base, 4);
            }
            expect(badWORD).to.throw('data is not large enough to contain word 4 (133)');
        });
        it('should curry', function() {
            expect(binary.WORD(base)(3)).to.deep.equal([0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0]);
        });
    });
});