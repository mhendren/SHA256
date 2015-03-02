/**
 * Created by mhendren on 2/26/15.
 */
var map = require('./map');
function mathValidator(ba1, ba2) {
    if (ba1.length != ba2.length) throw new Error('cannot do binary math on arrays of differing lengths');
}
module.exports = {
    fractionalToBinaryString: function (value) {
        function iter(val, divisor, depth, out) {
            var vmd = val - (1 / divisor);
            return depth == 32 ? out : iter(vmd >= 0 ? vmd : val, divisor * 2, depth + 1, out + (vmd >= 0 ? 1 : 0));
        }

        return iter(value - parseInt(value.toString().split('.')[0]), 2, 0, "");
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
                iter(val.substr(1), pos - 1, current.concat(map(function(x) { return x == "1" ? 1 : 0 })(zpad(binNumber).split(''))));
        }

        return iter(value, value.length, []);
    },

    toHex: function(ba) {
        if (ba.length % 4 != 0) throw new Error('number of bits in array is not divisible by 4');
        var alphabet = '0123456789abcdef';
        function iter(b, out) {
            var c = b.slice(0, 4);
            return b.length == 0 ? out : iter(b.slice(4), out.concat(alphabet[c[0] * 8 + c[1] * 4 + c[2] * 2 + c[3]]));
        }
        return iter(ba, '');
    },

    ROR: function (value, amount) {
        function doROR(amt0) {
            function iter(val, amt) {
                var pos = value.length - 1;
                return amt == 0 ? val : iter([val[pos]].concat(val.slice(0, pos)), amt - 1);
            }

            return iter(value, amt0);
        }
        return typeof amount === "undefined" ? doROR : doROR(amount);
    },

    SHR: function(ba, amount) {
        function doSHR(amt) {
            function iter(b, depth, out) {
                return depth <= 0 ? out : iter(b.slice(1), depth - 1, out.concat(b[0]));
            }

            return iter(ba, ba.length - amt, map(function () {
                return 0;
            })(new Array(amt < ba.length ? amt : ba.length)));
        }
        return typeof amount === "undefined" ? doSHR : doSHR(amount);
    },

    AND: function (ba1, ba2) {
        function doAND(baTarget) {
            mathValidator(ba1, baTarget);
            function iter(val1, val2, out) {
                return val1.length == 0 ? out : iter(val1.slice(1), val2.slice(1), out.concat(val1[0] == 1 && val2[0] == 1 ? 1 : 0));
            }
            return iter(ba1, baTarget, []);
        }

        return typeof ba2 === "undefined" ? doAND : doAND(ba2);
    },

    OR: function (ba1, ba2) {
        function doOR(baTarget) {
            mathValidator(ba1, baTarget);
            function iter(val1, val2, out) {
                return val1.length == 0 ? out : iter(val1.slice(1), val2.slice(1), out.concat(val1[0] == 1 || val2[0] == 1 ? 1 : 0));
            }
            return iter(ba1, baTarget, []);
        }

        return typeof ba2 === "undefined" ? doOR : doOR(ba2);
    },

    XOR: function (ba1, ba2) {
        function doXOR(baTarget) {
            mathValidator(ba1, baTarget);
            function iter(val1, val2, out) {
                return val1.length == 0 ? out : iter(val1.slice(1), val2.slice(1),
                    out.concat((val1[0] == 1 && val2[0] == 0) || (val1[0] == 0 && val2[0] == 1) ? 1 : 0));
            }
            return iter(ba1, baTarget, []);
        }

        return typeof ba2 === "undefined" ? doXOR : doXOR(ba2);
    },

    ADD: function (ba1, ba2) {
        function doADD(baTarget) {
            mathValidator(ba1, baTarget);
            function iter(val1, val2, carry, out) {
                function bit(b0, b1, c) {
                    var on = ((b0 && !b1) || (!b0 && b1)) ? 1 : 0;
                    return ((on && !c) || (!on && c)) ? 1 : 0;
                }
                function carr(b0, b1, c) {
                    return ((b0 && b1) || (b0 && c) || (b1 && c)) ? 1 : 0;
                }
                var p = val1.length - 1;
                return val1.length == 0 ? out : iter(val1.slice(0, p), val2.slice(0, p), carr(val1[p], val2[p], carry),
                    [bit(val1[p], val2[p], carry)].concat(out));
            }
            return iter(ba1, baTarget, 0, []);
        }
        return typeof ba2 === "undefined" ? doADD : doADD(ba2);
    },

    NOT: function(ba) {
        function doNOT(baTarget) {
            function iter(val, out) {
                return val.length == 0 ? out : iter(val.slice(1), out.concat(val[0] == 1 ? 0 : 1));
            }
            return iter(baTarget, [])
        }
        return typeof ba === "undefined" ? doNOT : doNOT(ba);
    },

    WORD: function(base, pos) {
        function doWORD(position) {
            var start = position * 32;
            var end = start + 32;
            if (end > base.length) throw new Error('data is not large enough to contain word ' + position + ' (' + base.length + ')');
            return base.slice(start, end);
        }
        return typeof pos === "undefined" ? doWORD : doWORD(pos);
    }
};