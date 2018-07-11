/*jshint esversion:6 */
const MongoClient = require("mongodb").MongoClient;


var user = { name: 'santhi', location: 'tvpm' };
var { name } = user;
console.log(name);

MongoClient.connect('mongodb://localhost:27017/ipldataset', (err, client) => {
    if (err) {
        return console.log("Connection to MongoDB server refused");
    }
    //reference for ipldataset DB.
    const db = client.db('ipldataset');
    console.log('Connected to mongodb database');
});