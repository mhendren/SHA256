/**
 * Created by mhendren on 2/26/15.
 */
var NewtonMethod = require('./NewtonMethod');

module.exports = {
    sqroot: function (n) {
        var nm = new NewtonMethod(function (x) {
            return (x * x) - n;
        }, function (x) {
            return 2 * x;
        });
        return nm.run(1);
    },
    cuberoot: function (n) {
        var nm = new NewtonMethod(function (x) {
            return (x * x * x) - n;
        }, function (x) {
            return 3 * (x * x);
        });
        return nm.run(1);
    }
};
