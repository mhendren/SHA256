/**
 * Created by mhendren on 2/27/2015.
 */
var map = require('./map');
var binary = require('./binary');
var PrimeNumberGenerator = require('./PrimeNumberGenerator');
var RootFinders = require('./RootFinders');

module.exports = function(message) {
    if (message.length % 512) throw new Error('Message must be evenly divisible by 512 bits (' + message.length + ')');

    var h0 = map(map(map(map(PrimeNumberGenerator(8), RootFinders.sqroot), binary.fractionalToBinaryString), binary.binaryStringToHex), binary.hexToBinary);
    var k = map(map(map(map(PrimeNumberGenerator(64), RootFinders.cuberoot), binary.fractionalToBinaryString), binary.binaryStringToHex), binary.hexToBinary);

    function iter(msg, h) {
        function schedule(depth, wi) {
            var n = 48 - depth;
            var s0 = binary.XOR(binary.XOR(binary.ROR(binary.WORD(wi, n + 1), 7), binary.ROR(binary.WORD(wi, n + 1), 18)), binary.SHR(binary.WORD(wi, n + 1), 3));
            var s1 = binary.XOR(binary.XOR(binary.ROR(binary.WORD(wi, n + 14), 17), binary.ROR(binary.WORD(wi, n + 14), 19)), binary.SHR(binary.WORD(wi, n + 14), 10));
            return depth == 0 ? wi : schedule(depth - 1, wi.concat(binary.ADD(binary.ADD(binary.ADD(binary.WORD(wi, n), s0), binary.WORD(wi, n + 9)), s1)));
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
                var s1 = binary.XOR(binary.XOR(binary.ROR(e, 6), binary.ROR(e, 11)), binary.ROR(e, 25));
                var ch = binary.XOR(binary.AND(e, f), binary.AND(binary.NOT(e), g));
                return binary.ADD(j, binary.ADD(s1, binary.ADD(ch, binary.ADD(binary.WORD(k, pos), binary.WORD(w, pos)))));
            }

            function genTemp2() {
                var s0 = binary.XOR(binary.ROR(a, 2), binary.XOR(binary.ROR(a, 13), binary.ROR(a, 22)));
                var maj = binary.XOR(binary.AND(a, b), binary.XOR(binary.AND(a, c), binary.AND(b, c)));
                return binary.ADD(s0, maj);
            }

            function genHash() {
                return binary.ADD(binary.WORD(h, 0), a)
                    .concat(binary.ADD(binary.WORD(h, 1), b))
                    .concat(binary.ADD(binary.WORD(h, 2), c))
                    .concat(binary.ADD(binary.WORD(h, 3), d))
                    .concat(binary.ADD(binary.WORD(h, 4), e))
                    .concat(binary.ADD(binary.WORD(h, 5), f))
                    .concat(binary.ADD(binary.WORD(h, 6), g))
                    .concat(binary.ADD(binary.WORD(h, 7), j));
            }

            return depth == 0 ? genHash() : compress(depth - 1, maxDepth, w, binary.ADD(genTemp1(), genTemp2()), a,
                b, c, binary.ADD(d, genTemp1()), e, f, g);
        }

        return msg.length == 0 ? h : iter(msg.slice(512), compress(64, 64, schedule(48, msg.slice(0, 512)),
            a0, b0, c0, d0, e0, f0, g0, j0));
    }

    return binary.toHex(iter(message, h0));
};