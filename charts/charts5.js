/* jshint esversion:6 */
// Create the chart
console.log("charts4");
let battingAverage = (window.data);
let batsman = [];
let battingAvg = [];
let seriesValues = [];
for (each of battingAverage) {
    batsman.push(each._id);
    // battingAvg.push(battingAverage[i].batting_average);
    let obj = {};
    obj.name = each._id;
    obj.y = each.avg;
    seriesValues.push(obj);
}
// console.log(bowlers);
// console.log(battingAvg);


let container = document.createElement('div');
document.body.appendChild(container);
window.chart = new Highcharts.Chart({
    chart: {
        renderTo: container,
        height: 600,
        type: 'column'
    },
    title: {
        text: 'BATTING AVERAGE FOR 2016'
    },
    xAxis: {
        categories: batsman
    },
    yAxis: {
        text: 'Extra Economy Rate',
        data: battingAvg
    },
    series: [{
        "colorByPoint": true,
        "data": seriesValues
    }]
});