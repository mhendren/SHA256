/**
 * Created by mhendren on 2/27/2015.
 */
var map = require('./map');
var compose = require('./compose');
var binary = require('./binary');
var AND = binary.AND;
var ADD = binary.ADD;
var ROR = binary.ROR;
var SHR = binary.SHR;
var XOR = binary.XOR;
var NOT = binary.NOT;
var WORD = binary.WORD;
var PrimeNumberGenerator = require('./PrimeNumberGenerator');
var RootFinders = require('./RootFinders');

module.exports = function(message) {
    if (message.length % 512) throw new Error('Message must be evenly divisible by 512 bits (' + message.length + ')');

    var h0 = map(compose(RootFinders.sqroot, binary.fractionalToBinaryString, binary.binaryStringToHex, binary.hexToBinary))(PrimeNumberGenerator(8));
    var k = map(compose(RootFinders.cuberoot, binary.fractionalToBinaryString, binary.binaryStringToHex, binary.hexToBinary))(PrimeNumberGenerator(64));

    function iter(msg, h) {
        function schedule(depth, wi) {
            var n = 48 - depth;
            var s0 = XOR(XOR(ROR(WORD(wi, n + 1), 7), ROR(WORD(wi, n + 1), 18)), SHR(WORD(wi, n + 1), 3));
            var s1 = XOR(XOR(ROR(WORD(wi, n + 14), 17), ROR(WORD(wi, n + 14), 19)), SHR(WORD(wi, n + 14), 10));
            return depth == 0 ? wi : schedule(depth - 1, wi.concat(ADD(ADD(ADD(WORD(wi, n), s0), WORD(wi, n + 9)), s1)));
        }

        var a0 = binary.WORD(h, 0);
        var b0 = binary.WORD(h, 1);
        var c0 = binary.WORD(h, 2);
        var d0 = binary.WORD(h, 3);
        var e0 = binary.WORD(h, 4);
        var f0 = binary.WORD(h, 5);
        var g0 = binary.WORD(h, 6);
        var j0 = binary.WORD(h, 7);

        function compress(depth, maxDepth, w, a, b, c, d, e, f, g, j) {

            var pos = maxDepth - depth;

            function genTemp1() {
                var s1 = XOR(XOR(ROR(e, 6), ROR(e, 11)), ROR(e, 25));
                var ch = XOR(AND(e, f), AND(NOT(e), g));
                return ADD(j, ADD(s1, ADD(ch, ADD(WORD(k, pos), WORD(w, pos)))));
            }

            function genTemp2() {
                var s0 = XOR(ROR(a, 2), XOR(ROR(a, 13), ROR(a, 22)));
                var maj = XOR(AND(a, b), XOR(AND(a, c), AND(b, c)));
                return binary.ADD(s0, maj);
            }

            function genHash() {
                return ADD(WORD(h, 0), a)
                    .concat(ADD(WORD(h, 1), b))
                    .concat(ADD(WORD(h, 2), c))
                    .concat(ADD(WORD(h, 3), d))
                    .concat(ADD(WORD(h, 4), e))
                    .concat(ADD(WORD(h, 5), f))
                    .concat(ADD(WORD(h, 6), g))
                    .concat(ADD(WORD(h, 7), j));
            }

            return depth == 0 ? genHash() : compress(depth - 1, maxDepth, w, ADD(genTemp1(), genTemp2()), a,
                b, c, ADD(d, genTemp1()), e, f, g);
        }

        return msg.length == 0 ? h : iter(msg.slice(512), compress(64, 64, schedule(48, msg.slice(0, 512)),
            a0, b0, c0, d0, e0, f0, g0, j0));
    }

    return binary.toHex(iter(message, h0));
};