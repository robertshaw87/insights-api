const DATA = require("./testData.json").data;
const utils = require("../utility");

const posts = module.exports = {};

posts.getAll = function(options) {
  const returnData = [...DATA];
  const maxEntries = isNaN(options.limit) ? DATA.length : options.limit;
  switch (options.sort) {
    case "asc": 
      returnData.sort( function(post1,post2){
        return utils.compareTime(post1.time_stamp, post2.time_stamp);
      });
      break;
    case "desc":
      returnData.sort( function(post1,post2){
        return (-1 * utils.compareTime(post1.time_stamp, post2.time_stamp));
      });
      break;
  }
  returnData.splice(maxEntries);
  return returnData;
}