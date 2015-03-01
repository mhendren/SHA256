/**
 * Created by mhendren on 3/1/15.
 */
var fs = require('fs');
fs.readdirSync(__dirname + '/gulp').forEach(function(task) {
    require('./gulp/' + task);
});
