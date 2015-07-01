var $ = require('jquery'),
    _ = require('underscore'),
    Chart = require('chart.js'),
    config = require('./config.js');

// Set page title
document.title = config.stattitle;

$.getJSON( config.api + "/v1/history/stats", function( data ) {
   $('#js_hoursUsed').html((data['totalLength'] / 60 / 60).toFixed(2));
   $('#js_timeUsed').html(data['totalCount']);
   $('#js_avgTime').html((data['averageTime'] / 60).toFixed(4));
   $('#js_avgPerDay').html(data['avgPerDay'].toFixed(2));
   $('#js_avgPerHour').html(data['avgPerHour'].toFixed(2));

   var chartData = {
       labels: _.keys(data['popularity']),
       datasets: [
           {
               label: "Popularity of day",
               data: _.values(data['popularity'])
           }
       ]
   };

   var ctx = $('#js_popularity').get(0).getContext("2d");
   new Chart(ctx).Bar(chartData, {responsive: true});;
});


$.getJSON( config.api + "/v1/history/day", function( data ) {

   var chartData = {
       labels: _.keys(data),
       datasets: [
           {
               label: "Number of times used",
               data: _.map(data, function(item) {
                  return item['count'];
               })
           }
       ]
   };

   var ctx = $('#js_hourly').get(0).getContext("2d");
   new Chart(ctx).Bar(chartData, {responsive: true});


   var chartData = {
       labels: _.keys(data),
       datasets: [
           {
               label: "Percent of hour used",
               data: _.map(data, function(item) {
                  return item['percent'] * 100;
               })
           }
       ]
   };

   var ctx = $('#js_hourlyAmount').get(0).getContext("2d");
   new Chart(ctx).Bar(chartData, {responsive: true});;
});



