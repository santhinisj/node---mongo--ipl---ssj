/* jshint esversion:6 */

const express = require('express');
const app = express();
const path = require('path');
let solutions = require(path.resolve('src/solutions.js'));
const dataset1 = 'matches';
const dataset2 = 'deliveries';
app.set('view engine', 'ejs');
app.use(express.static('charts'));
let matchesPerYear;
let winnersPerYear;
let extraRunsPerTeam;
let topEconomicalBowlers;
let battingAverages;

solutions.matchesPerYear(dataset1).then(data => {
    matchesPerYear = data;
})
app.get('/1', (req, res) => {
    res.render('index1', { matchesPerYear: JSON.stringify(matchesPerYear) });
});

solutions.winnersPerYear(dataset1).then((data) => {
    winnersPerYear = data;
});

app.get('/2', function(req, res) {
    res.render('index2', { 'winnersPerYearObj': JSON.stringify(winnersPerYear) });
});
solutions.extraRunsPerTeam(dataset1, dataset2, 2016).then((data) => {
    extraRunsPerTeam = data;

})
app.get('/3', function(req, res) {
    res.render('index3', { extraRunsPerTeam: JSON.stringify(extraRunsPerTeam) });
});

solutions.topEconomicalBowlers(dataset1, dataset2, 2015).then((data) => {
    topEconomicalBowlers = data;

})
app.get('/4', function(req, res) {
    res.render('index4', { topEconomicalBowlers: JSON.stringify(topEconomicalBowlers) });
});

solutions.battingAverages(dataset1, dataset2, 2016).then((data) => {
    battingAverages = data;

})
app.get('/5', function(req, res) {
    res.render('index5', { battingAverages: JSON.stringify(battingAverages) });
});

app.listen(3000, () => {
    console.log("listening to the port");
});