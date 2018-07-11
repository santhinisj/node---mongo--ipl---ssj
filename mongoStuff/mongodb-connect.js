/*jshint esversion:6 */
const MongoClient = require("mongodb").MongoClient;
MongoClient.connect('mongodb://localhost:27017/ipldataset', (err, client) => {
    if (err) {
        return console.log("Connection to MongoDB server refused");
    }
    //reference for ipldataset DB.
    const db = client.db('ipldataset');
    console.log('Connected to mongodb database');
    db.collection('ipldataset').insertOne({
        text: 'Adding text here for demo',
        completed: false
            //result is fired if things go well
    }, (err, result) => {
        if (err) {
            return console.log("unable to insert demo text", err);

        }
        //ops contain all the documents inserted. Here one!
        //undefined is for the filter fn and indendation is 2.
        console.log(JSON.stringify(result.ops), undefined, 2);

    });


    client.close();
});