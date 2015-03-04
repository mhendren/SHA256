/**
 * Created by mhendren on 3/4/2015.
 */
module.exports = function(fn, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, tooMany) {
    function apply(fn, arr, sum) {
        return arr.length == 0 ? sum : apply(fn, arr.slice(1), typeof arr[0] === "undefined" ? sum : fn(sum)(arr[0]));
    }
    if(typeof a === "undefined") throw new Error ('At least one argument must apply to the function');
    if(typeof tooMany !== "undefined") throw new Error ('Can only apply function to 26 arguments');
    var fnArray = Object.prototype.toString.call(a) === "[object Array]" && typeof b === "undefined" ? a.slice(1) :
        [b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z];
    var initial = Object.prototype.toString.call(a) === "[object Array]" && typeof b === "undefined"? a[0] : a;
    return apply(fn, fnArray, initial);
};