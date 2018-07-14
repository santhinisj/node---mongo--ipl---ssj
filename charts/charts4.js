/* jshint esversion:6 */
// Create the chart
console.log("charts4");
let topEconomicalBowlers = (window.data);
let bowlers = [];
let economyRate = [];

for (each of topEconomicalBowlers) {
    bowlers.push(each._id);
    economyRate.push(each.economy);
}
let container = document.createElement('div');
document.body.appendChild(container);
window.chart = new Highcharts.Chart({
    chart: {
        renderTo: container,
        height: 600,
        type: 'column'
    },
    title: {
        text: 'TOP ECONOMICAL BOWLERS FOR 2015'
    },
    xAxis: {
        categories: bowlers
    },
    yAxis: {
        text: 'Extra Economy Rate',
        data: economyRate
    },
    series: [{
        name: 'Economy Rate',
        data: economyRate
    }]
});