/**
 * Created by mhendren on 3/1/15.
 */
module.exports = function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, tooMany) {
    function exec(arg) {
        function op(arr, cur) {
            return arr.length == 0 ? cur : typeof arr[0] === "undefined" ? op(arr.slice(1), cur) : op(arr.slice(1), arr[0](cur));
        }
        return op(fnArray, arg);
    }
    var fnArray = [].concat(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z);
    if (typeof tooMany !== "undefined") throw new Error('this compose will only support up to 26 function compositions');

    return exec;
};