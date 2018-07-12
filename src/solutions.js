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
            db.collection('matches').aggregate([{
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

const extraRunsPerTeam = () => {

}


// matchesPerYear('matches');

module.exports = {
    matchesPerYear
};