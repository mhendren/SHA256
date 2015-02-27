/**
 * Created by mhendren on 2/26/15.
 */
module.exports = function(fn, fnprime, maxIter, tol) {
    if (typeof fn === "undefined") {
        throw new Error("fn must be defined");
    }
    if (typeof fnprime === "undefined") {
        throw new Error("fnprime must be defined");
    }

    var maxIterations = typeof maxIter === "undefined" ? 20 : maxIter;
    var tolerance = typeof tol === "undefined" ? .00000001 : tol;
    var f = fn, fprime = fnprime;

    var newtonMethod = function (x0, depth) {
        var newtonIteration = function (x0) {
            return x0 - (f(x0) / fprime(x0));
        };

        if (depth > maxIterations) {
            throw new Error('Maximum iterations encouters, last best guess: ' + x0);
        }
        var x1 = newtonIteration(x0);
        if (Math.abs(x1 - x0) / Math.abs(x1) < tolerance) {
            return x1;
        }
        return newtonMethod(x1, depth + 1);
    };

    return {
        run: function (n) {
            return newtonMethod(n, 0);
        }
    };
};
