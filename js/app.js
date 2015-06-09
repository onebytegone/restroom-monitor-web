var $ = require('jquery'),
    config = require('./config.js');


// Setup
updateStatus();
$('#jsAlert').click(clickedAlertButton);
setInterval(updateStatus, config.interval);


/**
 * Ping the API and update the displayed status if needed
 */
function updateStatus() {
   $.getJSON( config.api + "/v1/status", function( data ) {
      var options = {
         year: "numeric", month: "numeric", day: "numeric",
         hour: "2-digit", minute: "2-digit"
      };
      var updateInMillis = data.comm*1000;
      var formattedDate = new Date(data.date*1000).toLocaleTimeString("en-us", options);
      var formattedPing = new Date(updateInMillis).toLocaleTimeString("en-us", options);

      if (Date.now() - updateInMillis > 18000) {
         console.log("Warning: stale data");
      }

      if (data.status === 'closed') {
         updateDisplay('jsUnavailable', 'Unavailable', formattedDate, formattedPing);
         changeFavicon('assets/img/closedsign.gif');
      }else {
         updateDisplay('jsAvailable', 'Available', formattedDate, formattedPing);
         if (alertRequested()) {
            postNotification();
         }
         alertRequested(false);
         changeFavicon('assets/img/opensign.gif');
      }

   });
}


/**
 * Update what is shown to the user
 *
 * @param state String - expects either js_available or js_unavailable
 * @param text String - The message to display in the main text area
 * @param time String - The value to display in the last updated field
 * @param ping String - The value to display in the last changed field
 */
function updateDisplay(state, text, time, ping) {
   var container = $('#jsStatus');
   container.removeClass('jsAvailable');
   container.removeClass('jsUnavailable');
   container.addClass(state);

   $('#jsMessage').html(text);

   $('#jsUpdate').html(time);
   $('#jsPing').html(ping);
}


/**
 * Get or set whether an alert is requested.
 *
 * @param requested boolean - If is not set, this will return the requested state
 * @return Boolean - This is returned only if requested is not set.
 */
function alertRequested(requested) {
   var button = $('#jsAlert');

   if(typeof requested === 'undefined') {
      return button.hasClass('jsNotify');
   }

   button.removeClass('jsNotify');
   if (requested) {
      button.addClass('jsNotify');
   }
}


/**
 * Handle when the alert button is pressed
 */
function clickedAlertButton() {
   if (alertRequested()) {
      return;
   }

   if (isNotificationAvailable() && !hasNotificationPermission()) {
      Notification.requestPermission(function (permission) {
         // Whatever the user answers, we make sure we store the information
         if (!('permission' in Notification)) {
            Notification.permission = permission;
         }
      });
   }

   alertRequested(true);
}


/**
 * Display a notification
 */
function postNotification() {
   var title = 'The restroom is now available!';

   if (isNotificationAvailable() && hasNotificationPermission()) {
      var notification = new Notification(title);
   }else {
      alert(title);
   }
}


/**
 * Check to see if notifications are allowed.
 *
 * @return Boolean
 */
function hasNotificationPermission() {
   if (!isNotificationAvailable()) {
      return false;
   }

   return (Notification.permission === 'granted');
}


/**
 * Check to see if the Notification class exists
 *
 * @return Boolean
 */
function isNotificationAvailable() {
   return ("Notification" in window);
}


/**
 * Updates the favicon
 *
 * @param src String - Path to new image
 */
function changeFavicon(src) {
   var link = document.createElement('link'),
      oldLink = document.getElementById('dynamic-favicon');
   link.id = 'dynamic-favicon';
   link.rel = 'shortcut icon';
   link.href = src;
   if (oldLink) {
      document.head.removeChild(oldLink);
   }
   document.head.appendChild(link);
}
