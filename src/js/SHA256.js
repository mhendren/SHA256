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

module.exports = function(message) {
    if (message.length % 512) throw new Error('Message must be evenly divisible by 512 bits (' + message.length + ')');

    var fractionsToBinary = compose(fractionalToBinaryString, binaryStringToHex, hexToBinary);
    var h0 = map(compose(sqrt, fractionsToBinary))(PrimeNumberGenerator(8));
    var k = map(compose(cbrt, fractionsToBinary))(PrimeNumberGenerator(64));

    function iter(msg, h) {
        function schedule(depth, wi) {
            var n = 48 - depth;

            function sCompute(w0, s1, s2, s3) {
                return compose(XOR(ROR(w0)(s1)), XOR(ROR(w0)(s2)))(SHR(w0)(s3));
            }

            var s0 = sCompute(WORD(wi)(n+1), 7, 18, 3);
            var s1 = sCompute(WORD(wi)(n+14), 17, 19, 10);
            return depth == 0 ? wi : schedule(depth - 1, wi.concat(compose(ADD(WORD(wi)(n)),ADD(s0),ADD(s1))(WORD(wi)(n+9))));
        }

        function compress(depth, maxDepth, w, a, b, c, d, e, f, g, j) {

            var pos = maxDepth - depth;

            function sCompute(v, s1, s2, s3) {
                return compose(XOR(ROR(v)(s1)), XOR(ROR(v)(s2)))(ROR(v)(s3));
            }

            function genTemp1() {
                var s1 = sCompute(e, 6, 11, 25);
                var ch = XOR(AND(e)(f))(AND(NOT(e))(g));
                return compose(ADD(j),ADD(s1),ADD(ch),ADD(WORD(k)(pos)))(WORD(w)(pos));
            }

            function genTemp2() {
                var s0 = sCompute(a, 2, 13, 22);
                var maj = compose(XOR(AND(a)(b)), XOR(AND(a)(c)))(AND(b)(c));
                return ADD(s0)(maj);
            }

            function genHash() {
                return ADD(WORD(h)(0))(a)
                    .concat(ADD(WORD(h)(1))(b))
                    .concat(ADD(WORD(h)(2))(c))
                    .concat(ADD(WORD(h)(3))(d))
                    .concat(ADD(WORD(h)(4))(e))
                    .concat(ADD(WORD(h)(5))(f))
                    .concat(ADD(WORD(h)(6))(g))
                    .concat(ADD(WORD(h)(7))(j));
            }

            return depth == 0 ? genHash() : compress(depth - 1, maxDepth, w, ADD(genTemp1())(genTemp2()), a,
                b, c, ADD(d)(genTemp1()), e, f, g);
        }

        var a0 = WORD(h)(0);
        var b0 = WORD(h)(1);
        var c0 = WORD(h)(2);
        var d0 = WORD(h)(3);
        var e0 = WORD(h)(4);
        var f0 = WORD(h)(5);
        var g0 = WORD(h)(6);
        var j0 = WORD(h)(7);

        return msg.length == 0 ? h : iter(msg.slice(512), compress(64, 64, schedule(48, msg.slice(0, 512)),
            a0, b0, c0, d0, e0, f0, g0, j0));
    }

    return binary.toHex(iter(message, h0));
};