/**
 * Created by mhendren on 2/26/15.
 */
var NewtonMethod = require('../../src/js/NewtonMethod');
var expect = require('chai').expect;

describe('NewtonMethod', function() {
    describe('constructor', function () {
        it('should throw an exception with no function', function () {
            var badConstructor = function () {
                return new NewtonMethod();
            };
            expect(badConstructor).to.throw('fn must be defined');
        });
        it(('should throw an exception with no derivative function'), function () {
            var badConstructor = function () {
                return new NewtonMethod(function (x) {
                    return x * x;
                });
            };
            expect(badConstructor).to.throw('fnprime must be defined');
        });
        it('should have a run function if it is set up correctly', function () {
            var nm = new NewtonMethod(function (x) {
                return x * x;
            }, function (x) {
                return 2 * x;
            });
            expect(nm).to.respondTo('run');
        })
    });
});
