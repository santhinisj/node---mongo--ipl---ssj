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

    db.collection('Users').find({ completed: false }).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
        console.log("User Data");
    }), (err) => {
        console.log('Unable to fetch data', err);
    };

});
// USERS COLLECTION
// [
//     {
//       "_id": "5b459a98152443ba4f0cf9ab",
//       "name": "santhi",
//       "age": "5",
//       "location": "kerala",
//       "completed": false
//     },
//     {
//       "_id": "5b459b6d9665cbba6181eea9",
//       "name": "santhi2",
//       "age": "5",
//       "location": "kerala",
//       "completed": true
//     },
//     {
//       "_id": "5b459d1feb4a0fba8b6f11fd",
//       "name": "santhi3",
//       "age": "5",
//       "location": "kerala",
//       "completed": false
//     },
//     {
//       "_id": "5b459d368823bcba94e39aa5",
//       "name": "santhi",
//       "age": "5",
//       "location": "kerala"
//     },
//     {
//       "_id": "5b459d47b6d0b4baa506a3d4",
//       "name": "santhi",
//       "age": "5",
//       "location": "kerala"
//     },
//     {
//       "_id": "5b45ded568e219ea3541272b",
//       "name": " isnerting document in robomongo",
//       "location": "somewhere in rorbomongo",
//       "tasks": "i cannot do anything"
//     }
//   ]


// RESULT
// [
//     {
//       "_id": "5b459a98152443ba4f0cf9ab",
//       "name": "santhi",
//       "age": "5",
//       "location": "kerala",
//       "completed": false
//     },
//     {
//       "_id": "5b459d1feb4a0fba8b6f11fd",
//       "name": "santhi3",
//       "age": "5",
//       "location": "kerala",
//       "completed": false
//     }
//   ]