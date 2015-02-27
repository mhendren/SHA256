/**
 * Created by mhendren on 2/27/2015.
 */
var map = require('./map');
var binary = require('./binary');
var PrimeNumberGenerator = require('./PrimeNumberGenerator');
var RootFinders = require('./RootFinders');


module.exports = function(message) {
    if (message.length % 512) throw new Error('Message must be evenly divisible by 512 bits');

    var h0 = map(map(map(map(PrimeNumberGenerator(8), RootFinders.sqroot), binary.fractionalToBinaryString), binary.binaryStringToHex), binary.hexToBinary);
    var k0 = map(map(map(map(PrimeNumberGenerator(64), RootFinders.cuberoot), binary.fractionalToBinaryString), binary.binaryStringToHex), binary.hexToBinary);
    var w0 = binary.hexToBinary("0000000000000000000000000000000000000000000000000000000000000000");

    function iter(msg, h, k, w) {
        var rest = msg.slice(512);
        function schedule(depth, wi) {
            var n = depth - 48;
            var s0 = binary.XOR(binary.XOR(binary.ROR(binary.WORD(wi, n + 1), 7), binary.ROR(binary.WORD(wi, n + 1), 18)), binary.SHR(binary.WORD(wi, n + 1), 3));
            var s1 = binary.XOR(binary.XOR(binary.ROR(binary.WORD(wi, n + 14), 17), binary.ROR(binary.WORD(wi, n + 14), 19)), binary.SHR(binary.WORD(wi, n + 14), 10));
            return depth == 0 ? wi : schedule(depth - 1, wi.concat(binary.ADD(binary.ADD(binary.ADD(binary.WORD(wi, n), s0), binary.WORD(wi, n + 9)), s1)));
        }
        var w = schedule(48, msg.slice(0, 511));

        var a = binary.WORD(h, 0);
        var b = binary.WORD(h, 1);
        var c = binary.WORD(h, 2);
        var d = binary.WORD(h, 3);
        var e = binary.WORD(h, 4);
        var f = binary.WORD(h, 5);
        var g = binary.WORD(h, 6);
        var i = binary.WORD(h, 7);

    }

};