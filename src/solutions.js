/* jshint esversion:6 */

const connectToMongo = () => {
    return new Promise((resolve, reject) => {
        const { MongoClient, ObjectID } = require('mongodb');
        const url = 'mongodb://localhost:27017';
        MongoClient.connect(url, (err, client) => {
            if (err) {
                return console.log("Connection to MongoDB server refused");
            }
            //reference for ipldataset DB.
            db = client.db('ipldataset');
            console.log('Connected to mongodb database');
            resolve(db);
        });
    });
};
const matchesPerYear = (dataset) => {
    return new Promise((resolve, reject) => {
        connectToMongo().then((db) => {
            db.collection(dataset).aggregate([{
                $group: {
                    _id: "$season",
                    count: { $sum: 1 }
                }
            }]).toArray().then((docs) => {
                resolve(docs);
            }), (err) => {
                console.log("cannot fetch data", err);
            };
        });
    });

};

const winnersPerYear = (dataset) => {
    return new Promise((resolve, reject) => {
        connectToMongo().then((db) => {
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
                { $unwind: '$values' }

            ]).toArray().then((docs) => {
                console.log(docs);
                process.exit(0);

            }), (err) => {
                console.log("cannot fetch data", err);
                process.exit(0);
            };
        });
    });

};
// winnersPerYear('matches')

const extraRunsPerTeam = () => {
    return new Promise((resolve, reject) => {
        connectToMongo().then((db) => {
            db.collection('matches').aggregate([{
                    $match: {
                        season: 2016
                    }
                },
                {
                    $lookup: {
                        from: 'deliveries',
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
                console.log(docs);
                process.exit(0);

            }), (err) => {
                console.log("cannot fetch data", err);
            };

        });
    });


};
// extraRunsPerTeam();

const topEconomicalBowlers = () => {
    return new Promise((resolve, reject) => {
        connectToMongo().then((db) => {
            db.collection('matches').aggregate([{
                    $match: { season: 2015 }
                },
                {
                    $lookup: {
                        from: 'deliveries',
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
                }, { $sort: { economy: 1 } },
                { $limit: 10 }


            ]).toArray().then((docs) => {
                resolve(docs);
                console.log(docs);
                process.exit(0);

            }), (err) => {
                console.log("cannot fetch data", err);
                process.exit(0);
            };

        });
    });
};

// topEconomicalBowlers();

const battingAverage = (dataset1, dataset2, year) => {
    return new Promise((resolve, reject) => {
        connectToMongo().then((db) => {
            db.collection(dataset1).aggregate([{
                    $match: { season: 2016 }
                },
                {
                    $lookup: {
                        from: 'deliveries',
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
                        avg: { $cond: { if: { $ne: ["$player_dismissed", 0] }, then: { $divide: ['$runs', '$player_dismissed'] }, else: 'NA' } }
                    }
                },
                { $sort: { avg: -1 } }
            ]).toArray().then((docs) => {
                resolve(docs);
                console.log(docs);
                process.exit(0);

            }), (err) => {
                console.log("cannot fetch data", err);
                process.exit(0);
            };
        });
    });
};
battingAverage('matches', 'deliveries', 2016);

// matchesPerYear('matches');

module.exports = {
    matchesPerYear
};