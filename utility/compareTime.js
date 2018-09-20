const moment = require("moment");

// Given two times in string form, returns -1 if time1 is before time2 or 1 if time2 is before than time1
module.exports = function (time1, time2) {
  const momentTime1 = moment(time1, "MM/DD/YYY HH:mm:ss");
  const momentTime2 = moment(time2, "MM/DD/YYY HH:mm:ss");
  return momentTime1.isBefore(momentTime2) ? -1 : 1;
}
