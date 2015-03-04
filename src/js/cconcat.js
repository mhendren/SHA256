/**
 * Created by mhendren on 3/4/2015.
 */
// This is a curried concat
module.exports = function(a) {
    return function(b) {
        return a.concat(b);
    };
};