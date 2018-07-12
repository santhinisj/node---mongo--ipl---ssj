/*jshint esversion:6 */
// const MongoClient = require("mongodb").MongoClient;
// const { MongoClient } = require('mongodb');
const { MongoClient } = require('mongodb');
MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) {
        return console.log("connection is refused");
    }
    const db = client.db('ipldataset');
    console.log("connected");
    db.collection('user').aggregate([{
        $match: {
            name: 'santhi'
        }
    }]).toArray().then((docs) => {
        console.log(docs);

    });
});