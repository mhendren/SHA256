/**
 * Created by mhendren on 2/27/2015.
 */
var map = require('./map');
var compose = require('./compose');
var binary = require('./binary');
var fractionalToBinaryString = binary.fractionalToBinaryString;
var binaryStringToHex = binary.binaryStringToHex;
var hexToBinary = binary.hexToBinary;
var AND = binary.AND;
var ADD = binary.ADD;
var ROR = binary.ROR;
var SHR = binary.SHR;
var XOR = binary.XOR;
var NOT = binary.NOT;
var WORD = binary.WORD;
var PrimeNumberGenerator = require('./PrimeNumberGenerator');
var RootFinders = require('./RootFinders');
var sqrt = RootFinders.sqroot;
var cbrt = RootFinders.cuberoot;
var apply = require('./apply');
var cconcat = require('./cconcat');

module.exports = function(message) {
    if (message.length % 512) throw new Error('Message must be evenly divisible by 512 bits (' + message.length + ')');

    var fractionsToBinary = compose(fractionalToBinaryString, binaryStringToHex, hexToBinary);
    var h0 = map(compose(sqrt, fractionsToBinary))(PrimeNumberGenerator(8));
    var k = map(compose(cbrt, fractionsToBinary))(PrimeNumberGenerator(64));

    function iter(msg, h) {
        function schedule(depth, wi) {
            var n = 48 - depth;
            var ww = WORD(wi);

            function sCompute(w0, s1, s2, s3) {
                var RORw = ROR(w0);
                return apply(XOR, RORw(s1), RORw(s2), SHR(w0, s3));
            }

            var s0 = sCompute(ww(n+1), 7, 18, 3);
            var s1 = sCompute(ww(n+14), 17, 19, 10);
            return depth == 0 ? wi : schedule(depth - 1, wi.concat(apply(ADD, ww(n), s0, s1, ww(n+9))));
        }

        function compress(depth, maxDepth, w, a, b, c, d, e, f, g, j) {

            var pos = maxDepth - depth;
            var wh = WORD(h);

            function sCompute(v, s1, s2, s3) {
                var RORv = ROR(v);
                return apply(XOR, RORv(s1), RORv(s2), RORv(s3));
            }

            function genTemp1() {
                var s1 = sCompute(e, 6, 11, 25);
                var ch = XOR(AND(e, f), AND(NOT(e), g));
                return apply(ADD, j, s1, ch, WORD(k)(pos), WORD(w)(pos));
            }

            function genTemp2() {
                var s0 = sCompute(a, 2, 13, 22);
                var maj = apply(XOR, AND(a, b), AND(a, c), AND(b, c));
                return ADD(s0)(maj);
            }

            function genHash() {
                return apply(cconcat, ADD(wh(0), a), ADD(wh(1), b), ADD(wh(2), c), ADD(wh(3), d),
                    ADD(wh(4), e), ADD(wh(5), f), ADD(wh(6), g), ADD(wh(7), j));
            }

            return depth == 0 ? genHash() : compress(depth - 1, maxDepth, w, ADD(genTemp1(), genTemp2()), a,
                b, c, ADD(d, genTemp1()), e, f, g);
        }

        var wh = WORD(h);

        return msg.length == 0 ? h : iter(msg.slice(512), compress(64, 64, schedule(48, msg.slice(0, 512)),
            wh(0), wh(1), wh(2), wh(3), wh(4), wh(5), wh(6), wh(7)));
    }

    return binary.toHex(iter(message, h0));
};