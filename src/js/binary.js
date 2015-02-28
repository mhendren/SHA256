/**
 * Created by mhendren on 2/26/15.
 */
var map = require('./map');
module.exports = {
    fractionalToBinaryString: function (value) {
        function iter(val, divisor, depth, out) {
            var vmd = val - (1 / divisor);
            return depth == 32 ? out : iter(vmd >= 0 ? vmd : val, divisor * 2, depth + 1, out + (vmd >= 0 ? 1 : 0));
        }

        return iter(value - Math.floor(value), 2, 0, "");
    },

    binaryStringToHex: function (binaryString) {
        function iter(current, out) {
            var alphabet = "0123456789abcdef";
            return current.length == 0 ? out : iter(current.slice(4), out + alphabet[parseInt(current[0]) * 8 + parseInt(current[1]) * 4 + parseInt(current[2]) * 2 + parseInt(current[3])]);
        }

        return iter(binaryString, "");
    },

    hexToBinary: function (value) {
        function iter(val, pos, current) {
            function zpad(n) {
                var l = "0000".length;
                return n.length >= l ? n : new Array(l - n.length + 1).join('0') + n;
            }

            var binNumber = "0123456789abcdef".search(val[0]).toString(2);
            return pos == 0 ? current :
                iter(val.substr(1), pos - 1, current.concat(map(zpad(binNumber).split(''), function (x) {
                    return x == "1" ? 1 : 0
                })));
        }

        return iter(value, value.length, []);
    },

    ROR: function (value, amount) {
        function iter(val, amt) {
            var len = value.length - 1;
            return amt == 0 ? val : iter([val[len]].concat(val.slice(0, len)), amt - 1);
        }

        return iter(value, typeof amount === "undefined" ? 1 : amount);
    },

    AND: function (ba1, ba2) {
        function iter(val, depth) {
            var pos = ba1.length - depth;
            return depth == 0 ? val : iter(val.concat(ba1[pos] == 1 && ba2[pos] == 1 ? 1 : 0), depth - 1)
        }

        return iter([], ba1.length);
    },

    OR: function (ba1, ba2) {
        function iter(val, depth) {
            var pos = ba1.length - depth;
            return depth == 0 ? val : iter(val.concat(ba1[pos] == 1 || ba2[pos] == 1 ? 1 : 0), depth - 1)
        }

        return iter([], ba1.length);
    },

    XOR: function (ba1, ba2) {
        function iter(val, depth) {
            var pos = ba1.length - depth;
            return depth == 0 ? val :
                iter(val.concat((ba1[pos] == 1 && ba2[pos] == 0) ||
                (ba1[pos] == 0 && ba2[pos] == 1) ? 1 : 0), depth - 1)
        }

        return iter([], ba1.length);
    },

    ADD: function (ba1, ba2) {
        if (ba1.length != ba2.length)
            throw new Error('binary arrays are not the same length (' + ba1.length + ', ' + ba2.length + ')');
        function iter(depth, carry, out) {
            function bit(b0, b1, c) {
                var on = ((b0 && !b1) || (!b0 && b1)) ? 1 : 0;
                return ((on && !c) || (!on && c)) ? 1 : 0;
            }
            function carr(b0, b1, c) {
                return ((b0 && b1) || (b0 && c) || (b1 && c)) ? 1 : 0;
            }
            var pos = depth - 1;
            return depth == 0 ? out : iter(depth - 1, carr(ba1[pos], ba2[pos], carry),
                [bit(ba1[pos], ba2[pos], carry)].concat(out));
        }
        return iter(ba1.length, 0, []);
    },

    WORD: function(base, pos) {
        var start = pos * 32;
        var end = start + 32;
        if (end > base.length) throw new Error('data is not large enough to contain word ' + pos + ' (' + base.length + ')');
        return base.slice(start, end);
    }
};