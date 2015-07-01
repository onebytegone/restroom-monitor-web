var $ = require('jquery'),
    _ = require('underscore'),
    config = require('./config.js');



$.getJSON( config.api + "/v1/history/stats", function( data ) {
   $('#js_hoursUsed').html((data['totalLength'] / 60 / 60).toFixed(2));
   $('#js_timeUsed').html(data['totalCount']);
   $('#js_avgTime').html(data['averageTime'] / 60);
});

