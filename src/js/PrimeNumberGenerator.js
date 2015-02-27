/**
 * Created by mhendren on 2/26/15.
 */
module.exports = function(max) {
    if (max < 1) return [];

    function PNG(bs, prev) {
        var base = bs;
        var previous = prev;

        function getNext() {
            function iter(n) {
                function gcd(a, b) {
                    return a == b ? a : a > b ? gcd(a - b, b) : gcd(a, b - a);
                }

                var check = base + n;
                for (var i in previous) {
                    if (gcd(previous[i], check) != 1) {
                        return iter(n + 1);
                    }
                }
                return check;
            }

            return iter(1);
        }

        return {
            list: function () {
                return previous.concat(getNext());
            },
            next: function () {
                var n = getNext();
                return new PNG(n, previous.concat(n));
            }
        };
    }

    var png = new PNG(1, []);
    for (var i = 1; i < max; i++) {
        png = png.next();
    }
    return png.list();
};