/*jshint esversion:6 */
// const MongoClient = require("mongodb").MongoClient;
// const { MongoClient } = require('mongodb');
const { MongoClient, ObjectID } = require('mongodb');
var obj = new ObjectID();
console.log(obj);




MongoClient.connect('mongodb://localhost:27017/ipldataset', (err, client) => {
    if (err) {
        return console.log("Connection to MongoDB server refused");
    }
    //reference for ipldataset DB.
    const db = client.db('ipldataset');
    console.log('Connected to mongodb database');
});