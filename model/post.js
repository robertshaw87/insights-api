// Use the provided data
const DATA = require("./testData.json").data;
// import helper utilities
const utils = require("../utility");

const posts = module.exports = {};

posts.getAll = (options) => {
  // Copy the data to preserve the original
  let returnData = [...DATA];

  // Check for sort by time option and use the compareTime utility function to sort
  switch (options.sort) {
    case "asc": 
      returnData.sort((post1,post2) => utils.compareTime(post1.time_stamp, post2.time_stamp));
      break;
    case "desc":
      returnData.sort((post1,post2) => (-1 * utils.compareTime(post1.time_stamp, post2.time_stamp)));
      break;
  }
  // Check for country filter and use getCountry utility to translate abbreviation to full country name
  if (options.country && (typeof options.country === "string")) {
    // Handle multiple countries seperated by commas
    // Country names are stored in an object for efficient reference
    const countries = {};
    options.country.split(",").forEach((elem) => {
      countries[utils.getCountry(elem.toUpperCase())] = true;
    });
    returnData = returnData.filter(function(elem) {
      return countries[elem.country];
    })
  }
  // If an entry limit was defined, use it
  const maxEntries = isNaN(options.limit) ? DATA.length : options.limit;
  returnData.splice(maxEntries);
  return returnData;
}