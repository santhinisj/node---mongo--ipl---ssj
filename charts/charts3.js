/* jshint esversion:6 */
// Create the chart
console.log("charts1");
let extraRunsPerTeam = (window.data);
let teams = [];
let runs = [];
for (let value of extraRunsPerTeam) {
    console.log(value);

    if (value._id !== 'undefined') {
        teams.push(value._id);
        runs.push(value.extraRuns);
    }
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
        text: 'EXTRA RUNS PER TEAM FOR 2016'
    },
    xAxis: {
        categories: teams
    },
    yAxis: {
        text: 'Extra Runs',
        data: runs
    },
    series: [{
        name: 'Extra runs',
        data: runs
    }]
});