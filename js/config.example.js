var config = {
   "pagetitle": "Restroom Monitor",
   "stattitle": "Stats - Restroom Monitor",
   "api": "http://example.com/api.php",
   "interval": 1000,
   "staleness": {
      "jsStaleMajor": 120 * 1000,
      "jsStaleMedium": 60 * 1000,
      "jsStaleSlight": 30 * 1000
   },
   "time": {
      "locale": "en-us",
      "options": {
         year: "numeric", month: "numeric", day: "numeric",
         hour: "2-digit", minute: "2-digit"
      }
   }
};

module.exports = config;
