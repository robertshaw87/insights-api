// Use the provided data
const DATA = require("./testData.json").data;
// import helper utilities
const utils = require("../utility");

const posts = module.exports = {};

const filterData = (data, key, options) => {
  const params = {};
  options.split(",").forEach((elem) => {
    if (key === "country")
      elem = utils.getCountry(elem.toUpperCase());
    params[elem] = true;
  });
  // Filter by the provided key
  return data.filter(function(elem) {
    return params[elem[key]];
  })
}

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
    returnData = filterData(returnData, "country", options.country)
    // // Handle multiple countries seperated by commas
    // // Country names are stored in an object for efficient reference
    // const countries = {};
    // options.country.split(",").forEach((elem) => {
    //   countries[utils.getCountry(elem.toUpperCase())] = true;
    // });
    // // Filter by country
    // returnData = returnData.filter(function(elem) {
    //   return countries[elem.country];
    // })
  }

  // Check for city filter
  if (options.city && (typeof options.city === "string")) {
    // Handle multiple cities seperated by commas
    // City names are stored in an object for efficient reference
    const cities = {};
    options.city.split(",").forEach((elem) => {
      cities[elem.toLowerCase()] = true;
    });
    console.log(cities)
    // Filter by city
    returnData = returnData.filter(function(elem) {
      return cities[elem.city.toLowerCase()];
    })
  }

  // If an entry limit was defined, use it
  const maxEntries = isNaN(options.limit) ? DATA.length : options.limit;
  returnData.splice(maxEntries);
  return returnData;
}