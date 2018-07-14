/*jshint esversion: 6 */
const expect = require("chai").expect;
const path = require('path');
const operations = require(path.resolve("src/solutions.js"));
const dataset1 = 'matches_test';
const dataset2 = 'deliveries_test';
const dataset1_negative = 'matches_test_negative'
const dataset2_negative = 'deliveries_test_negative';

describe('operations', function() {
    it("should return the number of matches per year", function(done) {
        let expectedResult = [
            { _id: 2010, count: 2 },
            { _id: 2009, count: 2 },
            { _id: 2008, count: 2 },
            { _id: 2017, count: 3 }
        ];
        operations.matchesPerYear(dataset1).then(function(data) {
            try {
                // console.log(data);
                expect(data).to.deep.equal(expectedResult);
                done();
            } catch (e) {
                console.log(e);
                done(e);
            }
        });

    }); //end of it

    it("should return the matches won by all teams per year", function(done) {
        let expectedResult = [{
                _id: 'Mumbai Indians',
                values: [
                    { year: 2010, count: 1 }, { year: 2017, count: 2 }
                ]
            },
            {
                _id: 'Deccan Chargers',
                values: [{ year: 2009, count: 1 }]
            },
            {
                _id: 'Royal Challengers Bangalore',
                values: [{ year: 2008, count: 1 }, { year: 2009, count: 1 }]

            },
            {
                _id: 'Kolkata Knight Riders',
                values: [{ year: 2010, count: 1 }, { year: 2017, count: 1 }]
            },
            {
                _id: 'Kings XI Punjab',
                values: [{ year: 2008, count: 1 }]
            }
        ];

        operations.winnersPerYear(dataset1).then(function(data) {
            try {
                expect(data).to.deep.equal(expectedResult);
                done();
            } catch (e) {
                done(e);
            }

        });

    }); //end of it
    it("should return the extra runs conceded per team for 2017", function(done) {
        let expectedResult = [{
            _id: 'Royal Challengers Bangalore',
            extraRuns: 4
        }];
        operations.extraRunsPerTeam(dataset1, dataset2, 2017).then(function(data) {
            try {
                expect(data).to.deep.equal(expectedResult);
                done();
            } catch (e) {
                done(e);
            }
        });
    }); //end of it

    it("should return the top economical bowlers for year 2017", function(done) {
        let expectedResult = [{
                _id: 'TS Mills',
                economy: 7
            },
            {
                _id: 'A Choudhary',
                economy: 14.399999999999999
            }
        ];
        operations.topEconomicalBowlers(dataset1, dataset2, 2017).then(function(data) {
            try {
                expect(data).to.deep.equal(expectedResult);
                done();
            } catch (e) {
                done(e);
            }
        });
    }); // end of it

    it("should return the batting average in 2017", function(done) {
        let expectedResult = [{
                _id: 'DA Warner',
                avg: 17
            }, {
                _id: 'MC Henriques',
                avg: 0
            }, {
                _id: 'S Dhawan',
                avg: 0
            }

        ];
        operations.battingAverages(dataset1, dataset2, 2017).then(function(data) {
            try {
                expect(data).to.deep.equal(expectedResult);
                done();
            } catch (e) {
                done(e);
            }
        });
    }); //end of it




}); //end of describe