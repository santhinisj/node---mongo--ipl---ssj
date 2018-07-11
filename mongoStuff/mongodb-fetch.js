/*jshint esversion:6 */
// const MongoClient = require("mongodb").MongoClient;
// const { MongoClient } = require('mongodb');
const { MongoClient, ObjectID } = require('mongodb');
MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) {
        return console.log("Connection to MongoDB server refused");
    }
    const db = client.db('ipldataset');
    console.log('Connected to mongodb database');

    db.collection('Users').find({
        _id: new ObjectID("5b459b6d9665cbba6181eea9")
    }).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
        console.log("User Data");
    }), (err) => {
        console.log('Unable to fetch data', err);
    };

});