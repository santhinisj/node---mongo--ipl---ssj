/* jshint esversion:6 */

const express = require('express');
const app = express();
const path = require('path');
let solutions = require(path.resolve('src/solutions.js'));
app.set('view engine', 'ejs');
app.use(express.static('charts'));

app.get('/1', (req, res) => {
    solutions.matchesPerYear('matches').then((result) => {
        matchesPerYear = result;
        res.render('index1', { matchesPerYear: JSON.stringify(matchesPerYear) });
        console.log(matchesPerYear);
    });
});


app.listen(3001, () => {
    console.log("listening to the port");

});