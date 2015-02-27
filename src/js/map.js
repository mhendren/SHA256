/**
 * Created by mhendren on 2/26/15.
 */
module.exports = function (list, fn) {
    function iter(rest, out) {
        return rest.length == 0 ? out : iter(rest.slice(1), out.concat(fn(rest[0])));
    }

    return iter(list, []);
};