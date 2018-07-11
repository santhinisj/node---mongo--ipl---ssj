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

    db.collection('Users').find().count().then((count) => {
        console.log(`User Data count: ${count}`);
    }), (err) => {
        console.log('Unable to fetch data', err);
    };

});