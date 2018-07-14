/* jshint esversion:6 */
const path = require('path');
let mongoapi = require(path.resolve('mongoStuff/mongodb-connect'));
var round = require('mongo-round');

const matchesPerYear = (dataset) => {
    return new Promise((resolve, reject) => {
        mongoapi.connectToMongo().then((db) => {
            db.collection(dataset).aggregate([{
                $group: {
                    _id: "$season",
                    count: { $sum: 1 }
                }
            }]).toArray().then((docs) => {
                // console.log(docs);
                resolve(docs);
                console.log("matchesperyear");

            }), (err) => {
                console.log("cannot fetch data", err);
            }
        });
    });
};

const winnersPerYear = (dataset) => {
    return new Promise((resolve, reject) => {
        mongoapi.connectToMongo().then((db) => {
            db.collection(dataset).aggregate([{
                    $group: {
                        _id: {
                            winner_id: '$winner',
                            year_id: '$season'
                        },
                        count: { $sum: 1 },
                    }
                },
                {
                    $group: {
                        _id: '$_id.winner_id',
                        values: {
                            $push: {
                                years: '$_id.year_id',
                                count: '$count'
                            }
                        }
                    }
                },
                { $unwind: '$values' },
                {
                    $group: {
                        _id: '$_id',
                        values: { $push: { year: '$values.years', count: '$values.count' } }

                    }
                }

            ]).toArray().then((docs) => {
                resolve(docs);
                console.log('winnersPerYear');
            }), (err) => {
                console.log("cannot fetch data", err);
                // process.exit(0);
            };
        });
    });

};


const extraRunsPerTeam = (dataset1, dataset2, year) => {
    return new Promise((resolve, reject) => {
        mongoapi.connectToMongo().then((db) => {
            db.collection(dataset1).aggregate([{
                    $match: {
                        season: year
                    }
                },
                {
                    $lookup: {
                        from: dataset2,
                        localField: 'id',
                        foreignField: 'match_id',
                        as: 'details'
                    }
                },
                {
                    $project: {
                        details: { bowling_team: 1, extra_runs: 1 }
                    }
                }, {
                    $unwind: '$details'
                },

                {
                    $group: {
                        _id: '$details.bowling_team',
                        extraRuns: { $sum: '$details.extra_runs' },

                    }
                }

            ]).toArray().then((docs) => {
                resolve(docs);
                console.log("extrarunsperyear");
            }), (err) => {
                console.log("cannot fetch data", err);
            };

        });
    });
};


const topEconomicalBowlers = (dataset1, dataset2, year) => {
    return new Promise((resolve, reject) => {
        mongoapi.connectToMongo().then((db) => {
            db.collection(dataset1).aggregate([{
                    $match: { season: year }
                },
                {
                    $lookup: {
                        from: dataset2,
                        localField: 'id',
                        foreignField: 'match_id',
                        as: 'details'
                    }
                }, {
                    $project: {
                        details: { bowler: 1, total_runs: 1, wide_runs: 1, noball_runs: 1 }
                    }
                }, { $unwind: '$details' }, {
                    $group: {
                        _id: '$details.bowler',
                        totalRuns: { $sum: '$details.total_runs' },
                        balls: { $sum: 1 },
                        wideBalls: { $sum: { $cond: { if: { $ne: ["$details.wide_runs", 0] }, then: 1, else: 0 } } },
                        noBalls: { $sum: { $cond: { if: { $ne: ["$details.noball_runs", 0] }, then: 1, else: 0 } } }
                    }
                }, {
                    $project: {
                        _id: '$_id',
                        economy: {
                            $divide: ['$totalRuns', {
                                $divide: [{
                                    $subtract: ['$balls', {
                                        $add: ['$wideBalls', '$noBalls']
                                    }]
                                }, 6]
                            }]
                        }
                    }

                }, {
                    $project: {
                        _id: '$_id',
                        economy: round('$economy', 2)
                    }

                }, { $sort: { economy: 1 } },
                { $limit: 10 }


            ]).toArray().then((docs) => {
                resolve(docs);
                console.log("top economical bowlers");

            }), (err) => {
                console.log("cannot fetch data", err);
                // process.exit(0);
            };

        });
    });
};

// topEconomicalBowlers();

const battingAverages = (dataset1, dataset2, year) => {
    return new Promise((resolve, reject) => {
        mongoapi.connectToMongo().then((db) => {
            db.collection(dataset1).aggregate([{
                    $match: { season: year }
                },
                {
                    $lookup: {
                        from: dataset2,
                        localField: 'id',
                        foreignField: 'match_id',
                        as: 'details'
                    }
                }, {
                    $project: {
                        details: { batsman: 1, total_runs: 1, player_dismissed: 1 }
                    }
                }, { $unwind: '$details' },
                {
                    $group: {
                        _id: '$details.batsman',
                        runs: { $sum: '$details.total_runs' },
                        player_dismissed: { $sum: { $cond: { if: { $ne: ["$details.player_dismissed", ''] }, then: 1, else: 0 } } }
                    }
                },
                {
                    $project: {
                        _id: '$_id',
                        avg: { $cond: { if: { $ne: ["$player_dismissed", 0] }, then: { $divide: ['$runs', '$player_dismissed'] }, else: 0 } }
                    }
                }, {
                    $project: {
                        _id: '$_id',
                        avg: round('$avg', 2)
                    }
                },
                { $sort: { avg: -1 } },
                { $limit: 10 }

            ]).toArray().then((docs) => {
                resolve(docs);
                console.log("batting averages");
            }), (err) => {
                console.log("cannot fetch data", err);
                // process.exit(0);
            };
        });
    });
};
// extraRunsPerTeam('matches', 'deliveries', 2016);
module.exports = {
    matchesPerYear,
    winnersPerYear,
    extraRunsPerTeam,
    topEconomicalBowlers,
    battingAverages
};