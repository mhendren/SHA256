/**
 * Created by mhendren on 2/27/2015.
 */
var map = require('./map');
var binary = require('./binary');
var PrimeNumberGenerator = require('./PrimeNumberGenerator');
var RootFinders = require('./RootFinders');

module.exports = function(message) {
    if (message.length % 512) throw new Error('Message must be evenly divisible by 512 bits (' + message.length + ')');

    var h = map(map(map(map(PrimeNumberGenerator(8), RootFinders.sqroot), binary.fractionalToBinaryString), binary.binaryStringToHex), binary.hexToBinary);
    var k = map(map(map(map(PrimeNumberGenerator(64), RootFinders.cuberoot), binary.fractionalToBinaryString), binary.binaryStringToHex), binary.hexToBinary);

    function iter(msg, h, k) {
        function schedule(depth, wi) {
            var n = depth - 48;
            var s0 = binary.XOR(binary.XOR(binary.ROR(binary.WORD(wi, n + 1), 7), binary.ROR(binary.WORD(wi, n + 1), 18)), binary.SHR(binary.WORD(wi, n + 1), 3));
            var s1 = binary.XOR(binary.XOR(binary.ROR(binary.WORD(wi, n + 14), 17), binary.ROR(binary.WORD(wi, n + 14), 19)), binary.SHR(binary.WORD(wi, n + 14), 10));
            return depth == 0 ? wi : schedule(depth - 1, wi.concat(binary.ADD(binary.ADD(binary.ADD(binary.WORD(wi, n), s0), binary.WORD(wi, n + 9)), s1)));
        }

        function compress(depth, maxDepth, h0, w) {
            var a = binary.WORD(h0, 0);
            var b = binary.WORD(h0, 1);
            var c = binary.WORD(h0, 2);
            var d = binary.WORD(h0, 3);
            var e = binary.WORD(h0, 4);
            var f = binary.WORD(h0, 5);
            var g = binary.WORD(h0, 6);

            var pos = depth - maxDepth;

            var s1 = binary.XOR(binary.XOR(binary.ROR(e, 6), binary.ROR(e, 11)), binary.ROR(e, 25));
            var ch = binary.XOR(binary.AND(e, f), binary.AND(binary.NOT(e), g));
            var temp1 = binary.ADD(g, binary.ADD(s1, binary.ADD(ch, binary.ADD(binary.WORD(k0, pos), binary.WORD(w0, pos)))));
            var s0 = binary.XOR(binary.ROR(a, 2), binary.XOR(binary.ROR(a, 13), binary.ROR(22)));
            var maj = binary.XOR(binary.AND(a, b), binary.XOR(binary.AND(a, c), binary.AND(b, c)));
            var temp2 = binary.ADD(s0, maj);

            return depth == 0 ? h0 : compress(depth - 1, maxDepth, [].concat(binary.ADD(temp1, temp2), a, b, c, binary.ADD(d, temp1), e, f, g), w, k);
        }

        return msg.length == 0 ? h : iter(msg.slice(512), compress(63, 63, h, schedule(48, msg.slice(0, 511))), k);
    }

    return binary.toHex(iter(message, h, k));
};