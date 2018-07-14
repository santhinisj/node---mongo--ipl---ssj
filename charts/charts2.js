/* jshint esversion:6 */
// Create the chart
console.log("charts2");
let winnersPerYearObj = (window.data);
// console.log(winnersPerYearOb/]j);

let winnersPerYear = {};

winnersPerYearObj.forEach(function(data) {
        let teamName = data["_id"];
        if (teamName.length > 0) {
            winnersPerYear[teamName] = {};
            data["values"].forEach(function(yearCount) {
                let year = yearCount.year;
                let count = yearCount.count;
                winnersPerYear[teamName][year] = count;
            })
        }
    })
    // console.log(winnersPerYear);
let chartSeries = [];
let teamNames = Object.keys(winnersPerYear);
let series = [];
for (var i = 0; i < teamNames.length; i++) {
    let data = [];
    for (let year = 2008; year < 2018; year++) {
        if (winnersPerYear[teamNames[i]].hasOwnProperty(year))
            data.push(winnersPerYear[teamNames[i]][year])
        else
            data.push(0)
    }
    series.push({
        name: teamNames[i],
        data: data
    });
}
// console.log("HERE");

chartSeries.reverse();
let container = document.createElement('div');
document.body.appendChild(container);
window.chart = new Highcharts.Chart({
    chart: {
        renderTo: container,
        height: 700,
        type: 'bar'
    },
    title: {
        text: 'MATCHES WON BY ALL TEAMS PER YEAR'
    },
    xAxis: {
        categories: ['2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008']
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Total matches played'
        }
    },
    legend: {
        reversed: true
    },
    plotOptions: {
        series: {
            stacking: 'normal'
        }
    },
    series: series
});