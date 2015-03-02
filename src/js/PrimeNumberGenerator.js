/**
 * Created by mhendren on 2/26/15.
 */
module.exports = function(max) {
    function PNG(base, previous) {
        function getNext() {
            function gcd(a, b) {
                return a == b ? a : a > b ? gcd(a - b, b) : gcd(a, b - a);
            }

            function findNext(primeSet, check) {
                return primeSet.length == 0 ? check : gcd(primeSet[0], check) == 1 ?
                    findNext(primeSet.slice(1), check) : findNext(previous, check + 1);
            }

            return findNext(previous, base);
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
    return new PNG(2, []).advance(max - 1).list();
};