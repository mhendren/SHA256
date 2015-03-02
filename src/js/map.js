/**
 * Created by mhendren on 2/26/15.
 */
module.exports = function(fn, list) {
    function domap(list) {
        function iter(rest, out) {
            return rest.length == 0 ? out : iter(rest.slice(1), out.concat(fn(rest[0])));
        }

        return iter(list, []);
    }

    return typeof list === "undefined" ? domap : domap(list);
};