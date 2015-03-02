/**
 * Created by mhendren on 2/26/15.
 */
module.exports = function(max) {
    function PNG(base, previous) {
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

        function next() {
            var n = getNext();
            return new PNG(n, previous.concat(n))
        }

        function advance(count, png) {
            return count == 0 ? png : advance(count - 1, png.next())
        }

        return {
            list: function () {
                return previous.concat(getNext());
            },
            next: function() { return next(); },
            advance: function(count) {
                return advance(count, this);
            }
        };
    }
    if (max < 1) return [];
    return new PNG(1, []).advance(max - 1).list();
};