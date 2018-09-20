const DATA = require("./testData.json").data;

const posts = module.exports = {};

posts.getAll = function(options) {
  const returnData = [...DATA]
  const maxEntries = isNaN(options.limit) ? DATA.length : options.limit;
  returnData.splice(maxEntries)
  return returnData;
}