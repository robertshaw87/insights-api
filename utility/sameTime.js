const moment = require("moment");

// Given two times and a granularity, returns true if the two times are within the same time granularity
module.exports = function (time1, time2, granularity) {
  const momentTime1 = moment(time1, "MM/DD/YYYY HH:mm:ss");
  const momentTime2 = moment(time2, "MM/DD/YYYY HH:mm:ss");
  return momentTime1.isSame(momentTime2, granularity);
}
