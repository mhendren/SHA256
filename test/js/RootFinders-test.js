/**
 * Created by mhendren on 2/26/15.
 */
var RootFinders = require('../../src/js/RootFinders');
var expect = require('chai').expect;

describe('RootFinders', function() {
    describe('sqroot', function () {
        it('should find 2 as the sqroot of 4', function () {
            expect(RootFinders.sqroot(4)).to.equal(2);
        });
        it('should find 3 as the sqroot of 9', function () {
            expect(RootFinders.sqroot(9)).to.equal(3);
        });
        it('should find 1.414214 as the sqroot of 2', function () {
            expect(RootFinders.sqroot(2)).to.be.closeTo(1.414214, .000001);
        });
    });

    describe('cuberoot', function () {
        it('should find 2 as the cuberoot of 8', function () {
            expect(RootFinders.cuberoot(8)).to.equal(2);
        });
        it('should find 3 as the cuberoot of 27', function () {
            expect(RootFinders.cuberoot(27)).to.equal(3);
        });
        it('should find 1.2599211 as the cuberoot of 2', function () {
            expect(RootFinders.cuberoot(2)).to.be.closeTo(1.2599211, .0000001);
        });
    });
});