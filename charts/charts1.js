/* jshint esversion:6 */
// Create the chart
console.log("charts1");
let matchesPerYear = (window.data);
// console.log(matchesPerYear.map(a => a.count));
let container = document.createElement('div');
document.body.appendChild(container);
window.chart = new Highcharts.Chart({
    chart: {
        renderTo: container,
        height: 600,
        type: 'column'
    },
    title: {
        text: 'IPL MATCHES IN YEARS'
    },
    xAxis: {
        categories: matchesPerYear.map(a => a._id),
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'No of matches'
        }
    },
    series: [{
        "colorByPoint": true,
        name: 'Matches',
        "data": matchesPerYear.map(a => a.count)
    }]
});